
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  exhibitorEnquirySchema,
  type ExhibitorEnquiryInput,
  companyTypeOptions,
  participationOptions,
  areaOptions,
  yesNoOptions,
  yesNoMaybeOptions,
} from "@/lib/validation/exhibitorEnquiry";

import {
  FieldWrapper,
  inputClasses,
  RECAPTCHA_ENABLED,
} from "./fields";

import { SuccessPanel } from "./SuccessPanel";
import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";

import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   PREMIUM ANIMATION SYSTEM
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const SECTION_REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

/* ==========================================
   FIELD STYLING

   Original inputClasses() remains active.
   These classes enhance its visual styling.
========================================== */

const FIELD_STYLE = [
  "w-full",
  "min-h-[48px]",
  "rounded-lg",
  "border-[#DCE5ED]",
  "bg-[#FBFCFE]",
  "px-4",
  "text-[13px]",
  "font-medium",
  "text-[#172536]",
  "placeholder:text-[#98A5B3]",
  "transition-[border-color,background-color,box-shadow]",
  "duration-200",
  "hover:border-[#B8CBD9]",
  "focus:border-[#1769A4]",
  "focus:bg-white",
  "focus:ring-2",
  "focus:ring-[#1769A4]/10",
  "focus:outline-none",
].join(" ");

const TEXTAREA_STYLE = [
  FIELD_STYLE,
  "min-h-[112px]",
  "resize-y",
  "py-3.5",
  "leading-[1.7]",
].join(" ");

/* ==========================================
   ICONS
========================================== */

function BuildingIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2M14 7h1M9 11h2M14 11h1M9 15h2M14 15h1M10 21v-3h4v3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 9v12M15 9v12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ==========================================
   REUSABLE FORM SECTION HEADING
========================================== */

function FormSectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3.5 border-b border-[#E8EDF2] pb-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.07] text-[#1769A4]">
        {icon}
      </span>

      <div className="min-w-0 pt-0.5">
        <h3 className="font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#172536] sm:text-[19px]">
          {title}
        </h3>

        <p className="mt-1 text-[12px] leading-[1.7] text-[#748393] sm:text-[13px]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   MAIN EXHIBITOR FORM
========================================== */

export function BookStandForm() {
  const reduced = useReducedMotion() === true;

  /* ORIGINAL STATE */
  const [startedAt] = useState(() => Date.now());

  const [recaptchaToken, setRecaptchaToken] =
    useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /* ORIGINAL API HOOK */
  const {
    submit,
    status,
    referenceId,
    errorMessage,
  } = useLeadSubmit("/api/exhibitor-enquiry");

  /* ORIGINAL REACT HOOK FORM */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExhibitorEnquiryInput>({
    resolver: zodResolver(exhibitorEnquirySchema),
    defaultValues: {
      preferredParticipation: participationOptions[0],
      requiredArea: areaOptions[0],
    },
  });

  const selectedParticipation = watch(
    "preferredParticipation"
  );

  const selectedArea = watch("requiredArea");

  /* ORIGINAL RECAPTCHA */
  const handleRecaptchaChange = (
    token: string | null
  ) => {
    setRecaptchaToken(token);
  };

  /* ORIGINAL SUBMISSION PAYLOAD */
  const onSubmit = (data: ExhibitorEnquiryInput) => {
    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      alert("Please check the 'I'm not a robot' box.");
      return;
    }

    submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  /* ORIGINAL SUCCESS STATE */
  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Exhibitor Enquiry Received"
        message="Thank you for your interest in exhibiting at Uganda Buildcon International Expo. Our exhibition sales team will contact you shortly with participation details."
        referenceId={referenceId}
      />
    );
  }

  const motionProps = {
    initial: reduced ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
    variants: SECTION_REVEAL,
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-10 sm:space-y-12"
    >
      {/* ORIGINAL BOT-PROTECTION HONEYPOT */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">
          Website
        </label>

        <input
          id="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website_hp")}
        />
      </div>

      {/* =====================================
          COMPANY INFORMATION
      ===================================== */}

      <motion.section
        {...motionProps}
        className="min-w-0"
        aria-labelledby="company-info-heading"
      >
        <div id="company-info-heading">
          <FormSectionHeading
            icon={<BuildingIcon />}
            title="Company Information"
            description="Tell us about the organisation that would like to exhibit."
          />
        </div>

        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
          <FieldWrapper
            label="Company Name"
            htmlFor="companyName"
            required
            error={errors.companyName}
          >
            <input
              id="companyName"
              placeholder="e.g. Acme Construction Ltd"
              autoComplete="organization"
              className={`${inputClasses(!!errors.companyName)} ${FIELD_STYLE}`}
              {...register("companyName")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Country"
            htmlFor="country"
            required
            error={errors.country}
          >
            <select
              id="country"
              defaultValue=""
              className={`${inputClasses(!!errors.country)} ${FIELD_STYLE}`}
              {...register("country")}
            >
              <option value="" disabled>
                Select country
              </option>

              {countries.map((country) => (
                <option
                  key={country}
                  value={country}
                >
                  {country}
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="City"
            htmlFor="city"
            error={errors.city}
          >
            <input
              id="city"
              placeholder="e.g. Kampala"
              autoComplete="address-level2"
              className={`${inputClasses(!!errors.city)} ${FIELD_STYLE}`}
              {...register("city")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Company Website"
            htmlFor="website"
            error={errors.website}
          >
            <input
              id="website"
              placeholder="https://example.com"
              autoComplete="url"
              className={`${inputClasses(!!errors.website)} ${FIELD_STYLE}`}
              {...register("website")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Company Type"
            htmlFor="companyType"
            required
            error={errors.companyType}
            className="sm:col-span-2"
          >
            <select
              id="companyType"
              defaultValue=""
              className={`${inputClasses(!!errors.companyType)} ${FIELD_STYLE}`}
              {...register("companyType")}
            >
              <option value="" disabled>
                Select company type
              </option>

              {companyTypeOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          </FieldWrapper>
        </div>
      </motion.section>

      {/* =====================================
          PRIMARY CONTACT PERSON
      ===================================== */}

      <motion.section
        {...motionProps}
        className="min-w-0 border-t border-[#E8EDF2] pt-9"
        aria-labelledby="contact-person-heading"
      >
        <div id="contact-person-heading">
          <FormSectionHeading
            icon={<UserIcon />}
            title="Primary Contact Person"
            description="Provide the details of the person coordinating exhibition participation."
          />
        </div>

        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
          <FieldWrapper
            label="First Name"
            htmlFor="firstName"
            required
            error={errors.firstName}
          >
            <input
              id="firstName"
              placeholder="First name"
              autoComplete="given-name"
              className={`${inputClasses(!!errors.firstName)} ${FIELD_STYLE}`}
              {...register("firstName")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Last Name"
            htmlFor="lastName"
            required
            error={errors.lastName}
          >
            <input
              id="lastName"
              placeholder="Last name"
              autoComplete="family-name"
              className={`${inputClasses(!!errors.lastName)} ${FIELD_STYLE}`}
              {...register("lastName")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Designation / Job Title"
            htmlFor="designation"
            required
            error={errors.designation}
          >
            <input
              id="designation"
              placeholder="e.g. Sales Director"
              autoComplete="organization-title"
              className={`${inputClasses(!!errors.designation)} ${FIELD_STYLE}`}
              {...register("designation")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Business Email"
            htmlFor="email"
            required
            error={errors.email}
          >
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              className={`${inputClasses(!!errors.email)} ${FIELD_STYLE}`}
              {...register("email")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Mobile / WhatsApp Number"
            htmlFor="mobile"
            required
            error={errors.mobile}
            className="sm:col-span-2"
          >
            <input
              id="mobile"
              type="tel"
              placeholder="+256 700 000 000"
              autoComplete="tel"
              className={`${inputClasses(!!errors.mobile)} ${FIELD_STYLE}`}
              {...register("mobile")}
            />
          </FieldWrapper>
        </div>
      </motion.section>

      {/* =====================================
          EXHIBITION REQUIREMENTS
      ===================================== */}

      <motion.section
        {...motionProps}
        className="min-w-0 border-t border-[#E8EDF2] pt-9"
        aria-labelledby="exhibition-preferences-heading"
      >
        <div id="exhibition-preferences-heading">
          <FormSectionHeading
            icon={<LayoutIcon />}
            title="Stand & Exhibition Preferences"
            description="Share the exhibition sector, stand type and approximate space you need."
          />
        </div>

        <div className="space-y-7">
          {/* SECTOR */}
          <FieldWrapper
            label="Product Category / Sector"
            htmlFor="productCategory"
            required
            error={errors.productCategory}
          >
            <select
              id="productCategory"
              defaultValue=""
              className={`${inputClasses(!!errors.productCategory)} ${FIELD_STYLE}`}
              {...register("productCategory")}
            >
              <option value="" disabled>
                Select sector category
              </option>

              {exhibitionSectors.map((sector) => (
                <option
                  key={sector.slug}
                  value={sector.name}
                >
                  {sector.name}
                </option>
              ))}
            </select>
          </FieldWrapper>

          {/* PARTICIPATION TYPE */}
          <fieldset className="min-w-0">
            <legend className="mb-3 text-[12px] font-bold uppercase tracking-[0.065em] text-[#354657]">
              Preferred Participation Type{" "}
              <span className="text-[#DC3545]">
                *
              </span>
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {participationOptions.map((option) => {
                const selected =
                  selectedParticipation === option;

                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setValue(
                        "preferredParticipation",
                        option,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                    className={[
                      "group relative flex min-h-[108px] w-full flex-col items-start overflow-hidden rounded-xl border p-4 text-left",
                      "transition-[background-color,border-color,box-shadow] duration-200",
                      "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]",
                      selected
                        ? "border-[#1769A4] bg-[#1769A4]/[0.045] shadow-[0_0_0_3px_rgba(23,105,164,0.07)]"
                        : "border-[#DCE5ED] bg-white hover:border-[#1769A4]/40 hover:bg-[#FAFCFE]",
                    ].join(" ")}
                  >
                    <span className="flex w-full items-start justify-between gap-3">
                      <span
                        className={`text-[13px] font-bold leading-[1.5] ${
                          selected
                            ? "text-[#1769A4]"
                            : "text-[#172536]"
                        }`}
                      >
                        {option}
                      </span>

                      <span
                        aria-hidden="true"
                        className={[
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                          selected
                            ? "border-[#1769A4] bg-[#1769A4] text-white"
                            : "border-[#CBD6E0] bg-white",
                        ].join(" ")}
                      >
                        {selected && <CheckIcon />}
                      </span>
                    </span>

                    <span className="mt-2 pr-3 text-[11px] leading-[1.65] text-[#718193] sm:text-[12px]">
                      {option.includes("Shell")
                        ? "Includes pre-built booth, lighting, table & chairs"
                        : "Custom build space (min 18 sqm)"}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#28A45A] transition-transform duration-300 ${
                        selected
                          ? "scale-x-100"
                          : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {errors.preferredParticipation && (
              <p
                role="alert"
                className="mt-2 text-[12px] font-medium text-red-600"
              >
                {errors.preferredParticipation.message}
              </p>
            )}
          </fieldset>

          {/* SPACE AREA */}
          <fieldset className="min-w-0">
            <legend className="mb-3 text-[12px] font-bold uppercase tracking-[0.065em] text-[#354657]">
              Required Area Space{" "}
              <span className="text-[#DC3545]">
                *
              </span>
            </legend>

            <div className="flex flex-wrap gap-2.5">
              {areaOptions.map((area) => {
                const selected = selectedArea === area;

                return (
                  <button
                    key={area}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setValue(
                        "requiredArea",
                        area,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                    className={[
                      "inline-flex min-h-11 items-center justify-center rounded-lg border px-4 py-2.5",
                      "text-[12px] font-semibold transition-[background-color,border-color,color,box-shadow] duration-200",
                      "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]",
                      selected
                        ? "border-[#1769A4] bg-[#1769A4] text-white shadow-[0_5px_14px_rgba(23,105,164,0.14)]"
                        : "border-[#DCE5ED] bg-white text-[#526477] hover:border-[#1769A4]/50 hover:text-[#1769A4]",
                    ].join(" ")}
                  >
                    {area}
                  </button>
                );
              })}
            </div>

            {errors.requiredArea && (
              <p
                role="alert"
                className="mt-2 text-[12px] font-medium text-red-600"
              >
                {errors.requiredArea.message}
              </p>
            )}
          </fieldset>

          {/* DISPLAY PRODUCTS */}
          <FieldWrapper
            label="Key Products / Services to Display"
            htmlFor="productsServices"
            required
            error={errors.productsServices}
          >
            <textarea
              id="productsServices"
              rows={3}
              placeholder="Briefly describe the products, materials, machinery or services you plan to exhibit..."
              className={`${inputClasses(!!errors.productsServices)} ${TEXTAREA_STYLE}`}
              {...register("productsServices")}
            />
          </FieldWrapper>

          {/* MARKET QUESTIONS */}
          <div className="rounded-xl border border-[#E6ECF2] bg-[#F8FAFC] p-4 sm:p-5">
            <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#354657]">
              Business Interests
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldWrapper
                label="Existing business in Uganda?"
                htmlFor="existingBusinessInUganda"
                error={errors.existingBusinessInUganda}
              >
                <select
                  id="existingBusinessInUganda"
                  defaultValue=""
                  className={`${inputClasses()} ${FIELD_STYLE} bg-white`}
                  {...register("existingBusinessInUganda")}
                >
                  <option value="">
                    Select option
                  </option>

                  {yesNoOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </FieldWrapper>

              <FieldWrapper
                label="Looking for local distributors?"
                htmlFor="lookingForDistributor"
                error={errors.lookingForDistributor}
              >
                <select
                  id="lookingForDistributor"
                  defaultValue=""
                  className={`${inputClasses()} ${FIELD_STYLE} bg-white`}
                  {...register("lookingForDistributor")}
                >
                  <option value="">
                    Select option
                  </option>

                  {yesNoMaybeOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            </div>
          </div>

          {/* ADDITIONAL MESSAGE */}
          <FieldWrapper
            label="Additional Messages / Custom Requirements"
            htmlFor="message"
            error={errors.message}
          >
            <textarea
              id="message"
              rows={3}
              placeholder="Share any stand location preference, custom requirement or questions..."
              className={`${inputClasses()} ${TEXTAREA_STYLE}`}
              {...register("message")}
            />
          </FieldWrapper>
        </div>
      </motion.section>

      {/* =====================================
          CONSENT + RECAPTCHA + SUBMISSION
      ===================================== */}

      <motion.div
        {...motionProps}
        className="min-w-0 border-t border-[#E8EDF2] pt-8"
      >
        {/* Consent */}
        <div className="rounded-xl border border-[#E1E9F0] bg-[#F8FAFC] p-4 sm:p-5">
          <label className="flex cursor-pointer items-start gap-3.5">
            <input
              type="checkbox"
              className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-[#CBD5E1] text-[#1769A4] accent-[#1769A4] focus:ring-[#1769A4]"
              {...register("consent")}
            />

            <span className="text-[12px] leading-[1.85] text-[#586B7E] sm:text-[13px]">
              I agree that Uganda Buildcon International Expo
              may contact me regarding my exhibitor enquiry
              in accordance with the{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1769A4] underline underline-offset-2 transition-colors hover:text-[#28A45A]"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.consent && (
            <p
              role="alert"
              className="mt-3 text-[12px] font-medium text-red-600"
            >
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Existing reCAPTCHA */}
        {RECAPTCHA_ENABLED && (
          <div className="mt-6 min-w-0 overflow-x-auto pb-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
              }
              onChange={handleRecaptchaChange}
            />
          </div>
        )}

        {/* Existing API error handling */}
        {status === "error" && errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3.5 text-[13px] leading-[1.7] text-red-700"
          >
            {errorMessage}
          </div>
        )}

        {/* Main submission action */}
        <button
          type="submit"
          disabled={
            status === "submitting" ||
            (RECAPTCHA_ENABLED && !recaptchaToken)
          }
          className={[
            "group mt-6 flex min-h-[54px] w-full items-center justify-center gap-3",
            "rounded-lg bg-[#1769A4] px-6 py-4",
            "text-[13px] font-bold uppercase tracking-[0.045em] text-white",
            "shadow-[0_10px_28px_rgba(23,105,164,0.16)]",
            "transition-[background-color,box-shadow,transform] duration-300",
            "hover:-translate-y-0.5 hover:bg-[#125B91]",
            "hover:shadow-[0_14px_30px_rgba(23,105,164,0.22)]",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "disabled:hover:translate-y-0",
            "motion-reduce:transform-none",
          ].join(" ")}
        >
          {status === "submitting" ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeOpacity=".25"
                  strokeWidth="3"
                />

                <path
                  d="M12 3a9 9 0 0 1 9 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <span>
                Submitting Application...
              </span>
            </>
          ) : (
            <>
              <span>
                Submit Exhibitor Application
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0">
                <ArrowIcon />
              </span>
            </>
          )}
        </button>

        <p className="mt-4 text-center text-[11px] leading-[1.7] text-[#8491A0]">
          Submitting this form sends an exhibitor enquiry.
          Stand allocation is subject to confirmation
          by the organising team.
        </p>
      </motion.div>
    </form>
  );
}
