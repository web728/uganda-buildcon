
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";

import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";

import { supporters } from "@/data/previousEdition";

import {
  PartnersReveal,
  PartnersArtwork,
} from "./PartnersMotion";

type DisplayPartner = {
  id: string;
  name: string;
  role: string;
  logo?: string;
  cmsPartner?: PartnerSummary;
};

const PARTNER_ROLES = {
  partnership: "In Partnership With",
  supported: "Supported By",
  local: "Local Partner",
} as const;

function normalizeRole(role?: string): string {
  const value = role?.trim().toLowerCase();

  if (
    value === "in partnership with" ||
    value === "in partnership"
  ) {
    return PARTNER_ROLES.partnership;
  }

  if (
    value === "supported by" ||
    value === "supporter"
  ) {
    return PARTNER_ROLES.supported;
  }

  if (
    value === "local partner" ||
    value === "local partnership"
  ) {
    return PARTNER_ROLES.local;
  }

  return role?.trim() || "Other Partners";
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
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* ------------------------------------------
   INDIVIDUAL PARTNER LOGO
------------------------------------------ */

function PartnerCard({
  partner,
}: {
  partner: DisplayPartner;
}) {
  return (
    <div className="group flex h-[132px] w-full items-center justify-center overflow-hidden rounded-md border border-[#E5EBEF] bg-white px-5 py-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#1769A4]/35 hover:shadow-[0_10px_25px_rgba(0,0,0,0.045)] motion-reduce:transform-none sm:h-[148px]">
      {partner.cmsPartner ? (
        <div className="flex h-full w-full items-center justify-center [&_img]:max-h-[110px] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain">
          <PartnerLogo partner={partner.cmsPartner} />
        </div>
      ) : partner.logo ? (
        <div className="relative h-[100px] w-full sm:h-[116px]">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="(min-width: 1024px) 250px, (min-width: 640px) 40vw, 80vw"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="max-w-[240px] text-center font-heading text-[13px] font-bold leading-[1.5] text-[#1769A4]">
          {partner.name}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------
   CENTERED PARTNER CATEGORY
------------------------------------------ */

function PartnerCategory({
  title,
  partners,
}: {
  title: string;
  partners: DisplayPartner[];
}) {
  if (partners.length === 0) {
    return null;
  }

  return (
    <div className="min-w-0">
      <div className="mb-4 flex items-center justify-center gap-2.5">
        <span className="h-[2px] w-6 bg-[#28A45A]" />

        <h4 className="text-center text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
          {title}
        </h4>

        <span className="h-[2px] w-6 bg-[#28A45A]" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
        {partners.map((partner, index) => (
          <PartnersReveal
            key={partner.id}
            delay={Math.min(index * 0.045, 0.22)}
            className="w-full min-w-0 max-w-[290px] flex-[1_1_170px] sm:max-w-[240px]"
          >
            <PartnerCard partner={partner} />
          </PartnersReveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------
   MAIN SECTION
------------------------------------------ */

export async function PartnersSection() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  const displayPartners: DisplayPartner[] =
    partners.length > 0
      ? partners.map((partner) => {
          const record = partner as PartnerSummary & {
            role?: string;
          };

          return {
            id: String(
              partner._id || partner.name
            ),
            name: partner.name,
            role: normalizeRole(record.role),
            cmsPartner: partner,
          };
        })
      : supporters.map((supporter) => ({
          id: supporter.name,
          name: supporter.name,
          role: normalizeRole(supporter.role),
          logo: supporter.logo,
        }));

  const partnershipPartners =
    displayPartners.filter(
      (partner) =>
        partner.role === PARTNER_ROLES.partnership
    );

  const localPartners =
    displayPartners.filter(
      (partner) =>
        partner.role === PARTNER_ROLES.local
    );

  const supportedPartners =
    displayPartners.filter(
      (partner) =>
        partner.role === PARTNER_ROLES.supported
    );

  const otherRoles = [
    ...new Set(
      displayPartners
        .map((partner) => partner.role)
        .filter(
          (role) =>
            role !== PARTNER_ROLES.partnership &&
            role !== PARTNER_ROLES.local &&
            role !== PARTNER_ROLES.supported
        )
    ),
  ];

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative isolate overflow-hidden border-b border-[#E6EBEF] bg-white py-12 text-[#111111] sm:py-14 lg:py-16"
    >
      {/* Background artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -right-[240px] -top-[210px] h-[520px] w-[520px] opacity-[0.35] sm:-right-[180px] sm:h-[630px] sm:w-[630px] lg:opacity-[0.45]">
          <PartnersArtwork />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* Main heading */}
        <PartnersReveal>
          <div className="flex flex-col gap-6 border-b border-[#E5EBEF] pb-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[740px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#28A45A]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1769A4]">
                  Industry Partners
                </span>
              </div>

              <h2
                id="partners-heading"
                className="font-heading text-[clamp(1.9rem,2.9vw,2.95rem)] font-bold leading-[1.13] tracking-[-0.045em] text-[#111111]"
              >
                Organisers &{" "}
                <span className="text-[#1769A4]">
                  Partners.
                </span>
              </h2>

              <p className="mt-3 max-w-[580px] text-[13px] leading-[1.8] text-[#647385] sm:text-[14px]">
                Meet the organisers and organisations
                supporting the building and construction
                exhibition in Uganda.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-3 self-start rounded-md border border-[#DCE4E9] bg-white px-5 py-2.5 text-[12px] font-bold text-[#111111] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#1769A4] hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none md:self-auto"
            >
              Partner With Us

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>
        </PartnersReveal>

        {/* ORGANISERS — UNCHANGED */}
        <PartnersReveal delay={0.08}>
          <div className="grid gap-6 border-b border-[#E5EBEF] py-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12 lg:py-11">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28A45A]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1769A4]">
                  Joint Organisers
                </p>
              </div>

              <h3 className="max-w-[450px] font-heading text-[clamp(1.25rem,1.8vw,1.65rem)] font-bold leading-[1.35] tracking-[-0.035em] text-[#111111]">
                Futurex Trade Fair & Events Pvt. Ltd.
                <span className="mx-2 text-[#A1ADB6]">
                  /
                </span>
                ETSIPL
              </h3>

              <p className="mt-3 max-w-[440px] text-[12px] leading-[1.85] text-[#647385] sm:text-[13px]">
                Futurex Trade Fair & Events Pvt. Ltd.
                and Exhibitions & Trade Services India
                Pvt. Ltd. (ETSIPL) jointly organise
                6th Uganda Buildcon International Expo 2027.
              </p>
            </div>

            <div className="flex min-h-[140px] items-center justify-center border border-[#E7ECF0] bg-[#FAFBFC] px-5 py-7 sm:px-8 lg:min-h-[160px]">
              <div className="flex w-full items-center justify-center">
                <OrganiserLogos />
              </div>
            </div>
          </div>
        </PartnersReveal>

        {/* Supporting organisations */}
        {displayPartners.length > 0 && (
          <>
            <PartnersReveal delay={0.08}>
              <div className="mb-7 mt-8 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#28A45A]">
                  Industry Support
                </p>

                <h3 className="mt-1.5 font-heading text-[19px] font-bold tracking-[-0.035em] text-[#111111] sm:text-[22px]">
                  Supporting Associations & Partners
                </h3>
              </div>
            </PartnersReveal>

            <div className="mx-auto max-w-[1120px]">
              {/* FIRST ROW: Partnership + Local */}
              {(partnershipPartners.length > 0 ||
                localPartners.length > 0) && (
                <div className="grid gap-7 border-b border-[#E5EBEF] pb-7 md:grid-cols-2 md:gap-8">
                  <PartnerCategory
                    title="In Partnership With"
                    partners={partnershipPartners}
                  />

                  <PartnerCategory
                    title="Local Partner"
                    partners={localPartners}
                  />
                </div>
              )}

              {/* SECOND ROW: All supporters */}
              {supportedPartners.length > 0 && (
                <div className="pt-7">
                  <PartnerCategory
                    title="Supported By"
                    partners={supportedPartners}
                  />
                </div>
              )}

              {/* Any additional CMS roles */}
              {otherRoles.map((role) => (
                <div
                  key={role}
                  className="mt-7 border-t border-[#E5EBEF] pt-7"
                >
                  <PartnerCategory
                    title={role}
                    partners={displayPartners.filter(
                      (partner) => partner.role === role
                    )}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Partnership enquiry */}
        <PartnersReveal delay={0.08}>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5EBEF] pt-6">
            <p className="max-w-[610px] text-[12px] leading-[1.75] text-[#718092]">
              Interested in becoming an industry
              or media partner for
              6th Uganda Buildcon International Expo 2027?
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-[#1769A4]/35 pb-1 text-[12px] font-bold text-[#1769A4] transition-colors hover:border-[#28A45A] hover:text-[#28A45A]"
            >
              Enquire About Partnership

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </PartnersReveal>
      </Container>
    </section>
  );
}
