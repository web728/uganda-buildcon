
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.06,
    },
  },
};

const WORD: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

/* ==========================================
   EXHIBITOR BENEFITS
========================================== */

const CORE_PILLARS = [
  {
    title: "Access New Buyers",
    body:
      "Present your products to businesses involved in construction projects, procurement and wholesale distribution across Uganda and East Africa.",
  },
  {
    title: "Develop Distribution",
    body:
      "Meet importers, distributors, wholesalers and dealers to explore new manufacturing and supply partnerships.",
  },
  {
    title: "Enter the Ugandan Market",
    body:
      "Introduce your brand to the regional construction industry and develop long-term commercial relationships.",
  },
  {
    title: "Generate Business Enquiries",
    body:
      "Engage contractors, developers and procurement teams searching for construction materials, equipment and technology suppliers.",
  },
  {
    title: "Reach Industry Specifiers",
    body:
      "Connect with architects, engineers, MEP consultants and quantity surveyors who influence construction product selection.",
  },
  {
    title: "Live Product Demonstration",
    body:
      "Present machinery, technical equipment, building products and finishes through live demonstrations and interactive displays.",
  },
] as const;

/* ==========================================
   EXHIBITOR PROFILES
========================================== */

const WHO_SHOULD_EXHIBIT = [
  "Building Material Companies",
  "Construction Machinery Companies",
  "Engineering Service Companies",
  "Green Building Solution Providers",
  "Building Technology Companies",
  "Architectural Design & Finishing Firms",
  "Importers & Distributors",
  "Ugandan Manufacturers",
] as const;

/* ==========================================
   PARTICIPATION OPTIONS
========================================== */

const PARTICIPATION_OPTIONS = [
  {
    title: "Shell Scheme Space",
    desc:
      "A ready-to-use exhibition booth with standard fittings. Final inclusions and specifications are confirmed by the organisers.",
  },
  {
    title: "Raw Bare Space",
    desc:
      "Unfurnished exhibition space for companies planning custom-built stands, display environments or branded pavilions.",
  },
  {
    title: "International Pavilions",
    desc:
      "Coordinated exhibition participation for trade associations, export promotion bodies and international business delegations.",
  },
  {
    title: "Machinery & Heavy Displays",
    desc:
      "Exhibition space for construction machinery and equipment, subject to venue access, load requirements and organiser approval.",
  },
] as const;

/* ==========================================
   SHARED UI
========================================== */

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
          light ? "text-white/65" : "text-[#1769A4]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.trim().split(/\s+/);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            variants={WORD}
            className="inline-block"
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

/* ==========================================
   ORIGINAL BLUEPRINT SVG
   Same grid geometry, subtle motion added
========================================== */

function BlueprintArtwork({
  dark = false,
}: {
  dark?: boolean;
}) {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 300"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <pattern
          id={dark ? "exhibit-grid-dark" : "exhibit-grid-light"}
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke={dark ? "#FFFFFF" : "#1769A4"}
            strokeOpacity={dark ? ".16" : ".12"}
            strokeWidth=".8"
          />
        </pattern>

        <linearGradient
          id={dark ? "exhibit-trace-dark" : "exhibit-trace-light"}
          x1="0"
          y1="0"
          x2="600"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1769A4" />
          <stop offset="1" stopColor="#28A45A" />
        </linearGradient>
      </defs>

      <rect
        width="600"
        height="300"
        fill={`url(#${dark ? "exhibit-grid-dark" : "exhibit-grid-light"})`}
      />

      <path
        d="M-40 220C120 110 240 300 390 155S530 95 650 145"
        stroke={dark ? "#FFFFFF" : "#1769A4"}
        strokeOpacity={dark ? ".16" : ".13"}
        strokeWidth="1.2"
      />

      <motion.path
        d="M-40 220C120 110 240 300 390 155S530 95 650 145"
        stroke={`url(#${dark ? "exhibit-trace-dark" : "exhibit-trace-light"})`}
        strokeOpacity=".8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="75 1500"
        initial={false}
        animate={
          reduced
            ? undefined
            : { strokeDashoffset: [0, -1575] }
        }
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}

/* ==========================================
   BENEFIT CARD
========================================== */

function BenefitItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E2E8EF] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_15px_40px_rgba(16,35,55,0.055)] sm:p-7"
    >
      <span
        aria-hidden="true"
        className="mb-5 h-[3px] w-9 bg-[#28A45A] transition-[width] duration-500 group-hover:w-16"
      />

      <h3 className="font-heading text-[18px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111820]">
        {title}
      </h3>

      <p className="mt-3 text-[13px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
        {body}
      </p>
    </motion.article>
  );
}

/* ==========================================
   PARTICIPATION CARD
========================================== */

function ParticipationItem({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="group relative flex min-w-0 flex-col border border-white/15 bg-white/[0.045] p-5 transition-[background-color,border-color] duration-300 hover:border-[#28A45A]/55 hover:bg-white/[0.075] sm:p-6"
    >
      <span
        aria-hidden="true"
        className="mb-5 h-[2px] w-9 bg-[#28A45A]"
      />

      <h3 className="font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-white">
        {title}
      </h3>

      <p className="mt-3 text-[13px] leading-[1.8] text-white/65">
        {desc}
      </p>
    </motion.article>
  );
}

/* ==========================================
   MAIN EXHIBIT CLIENT VIEW
========================================== */

export function ExhibitClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* =====================================
          EXHIBITOR BENEFITS
      ===================================== */}
      <section
        aria-labelledby="exhibitor-benefits-heading"
        className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-200px] top-[-80px] h-[300px] w-[600px] opacity-[0.4]"
        >
          <BlueprintArtwork />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-6 border-b border-[#E5EAF0] pb-7 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[790px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Exhibitor Opportunities
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="exhibitor-benefits-heading"
                variants={WORD_GROUP}
                aria-label="Grow Your Business at Uganda Buildcon"
                className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.65rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Grow Your Business" />
                  {" "}
                  <AnimatedWords text="at" />
                  {" "}
                  <AnimatedWords
                    text="Uganda Buildcon."
                    className="text-[#1769A4]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[670px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                Showcase your construction products,
                machinery and technologies to industry
                professionals seeking new suppliers,
                business partnerships and project
                solutions across Uganda and East Africa.
              </motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
              >
                Book a Stand
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CORE_PILLARS.map((item) => (
              <BenefitItem
                key={item.title}
                title={item.title}
                body={item.body}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================
          WHO SHOULD EXHIBIT
      ===================================== */}
      <section
        aria-labelledby="who-should-exhibit-heading"
        className="border-y border-[#E5EBF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <motion.div
              variants={GROUP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Exhibitor Profiles
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="who-should-exhibit-heading"
                variants={REVEAL}
                className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                Who Should{" "}
                <span className="text-[#1769A4]">
                  Exhibit?
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-4 max-w-[420px] text-[14px] leading-[1.85] text-[#607083]"
              >
                Uganda Buildcon welcomes companies
                supplying building materials, machinery,
                technologies and specialised solutions
                to the construction industry.
              </motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-6"
              >
                <Link
                  href="/exhibition-profile"
                  className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#28A45A]"
                >
                  Explore Exhibition Profile
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.ul
              variants={GROUP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {WHO_SHOULD_EXHIBIT.map((item) => (
                <motion.li
                  key={item}
                  variants={REVEAL}
                  className="group flex min-w-0 items-start gap-3 rounded-lg border border-[#E2E8EF] bg-white px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_8px_25px_rgba(16,35,55,0.035)]"
                >
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A]" />
                  <span className="text-[13px] font-semibold leading-[1.6] tracking-[-0.01em] text-[#243548]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </section>

      {/* =====================================
          STAND PARTICIPATION OPTIONS
      ===================================== */}
      <section
        aria-labelledby="participation-options-heading"
        className="relative isolate overflow-hidden bg-[#080F1D] py-14 text-white sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.4]"
        >
          <div className="absolute -right-[180px] top-0 h-[300px] w-[600px]">
            <BlueprintArtwork dark />
          </div>
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="flex flex-col gap-6 border-b border-white/15 pb-7 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[740px]">
              <motion.div variants={REVEAL}>
                <SectionLabel light>
                  Exhibition Participation
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="participation-options-heading"
                variants={REVEAL}
                className="mt-5 font-heading text-[clamp(1.9rem,3.25vw,3.25rem)] font-extrabold leading-[1.14] tracking-[-0.045em]"
              >
                Choose Your{" "}
                <span className="text-[#7ACB58]">
                  Exhibition Presence.
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[640px] text-[14px] leading-[1.85] text-white/65 sm:text-[15px]"
              >
                Explore participation formats for
                product displays, custom-built stands,
                international delegations and
                construction machinery.
              </motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A]"
              >
                Enquire About Stand Space
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PARTICIPATION_OPTIONS.map((option) => (
              <ParticipationItem
                key={option.title}
                title={option.title}
                desc={option.desc}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="mt-6 text-[12px] leading-[1.75] text-white/50"
          >
            Stand specifications, availability and
            installation requirements are confirmed
            directly by the organising team.
          </motion.p>
        </Container>
      </section>
    </div>
  );
}
