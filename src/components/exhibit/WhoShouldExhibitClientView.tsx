
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

/* ==========================================
   ANIMATION SYSTEM
========================================== */

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.05,
    },
  },
};

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

const WORD: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

/* ==========================================
   EXISTING EXHIBITOR PROFILES

   Original categories and SVG paths
   preserved from uploaded component.
========================================== */

const EXHIBITOR_PROFILES = [
  {
    title: "Manufacturers",
    desc:
      "Producers of raw materials, fabricated parts, and architectural systems seeking direct distribution agreements.",
    icon:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Exporters",
    desc:
      "Global trading houses and export consortiums supplying building products to East Africa.",
    icon:
      "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "International Suppliers",
    desc:
      "Multinational companies introducing specialised engineering products and construction solutions into Uganda.",
    icon:
      "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "Ugandan Manufacturers",
    desc:
      "Local producers of construction materials, building components and industrial products serving domestic and regional markets.",
    icon:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Importers & Distributors",
    desc:
      "Importers, wholesalers and distribution networks supplying contractors, hardware dealers and building product retailers.",
    icon:
      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    title: "Construction Machinery Companies",
    desc:
      "Suppliers of excavators, loaders, cranes, scaffolding, earthmoving equipment and construction site machinery.",
    icon:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    title: "Building Material Companies",
    desc:
      "Suppliers of cement, blocks, gypsum, roofing systems, waterproofing products and building insulation materials.",
    icon:
      "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Engineering Product Manufacturers",
    desc:
      "Manufacturers of structural components, MEP products, industrial valves, pumps and engineering equipment.",
    icon:
      "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Equipment Suppliers",
    desc:
      "Suppliers of power tools, workshop machinery, drilling equipment and construction site safety products.",
    icon:
      "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  },
  {
    title: "Building Technology Companies",
    desc:
      "Providers of smart building automation, solar energy, HVAC controls, BIM/CAD software and construction technologies.",
    icon:
      "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Construction Product & System Providers",
    desc:
      "Providers of precast building systems, architectural façades, fire detection solutions and surface finishing products.",
    icon:
      "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
] as const;

/* ==========================================
   SHARED ELEMENTS
========================================== */

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

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span className="text-[11px] font-bold uppercase leading-[1.5] tracking-[0.13em] text-[#1769A4]">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   ANIMATED HEADING
========================================== */

function AnimatedHeading({
  first,
  second,
  className = "",
}: {
  first: string;
  second: string;
  className?: string;
}) {
  const reduced = useReducedMotion() === true;

  const words = [
    ...first.split(" ").map((word) => ({
      word,
      accent: false,
    })),
    ...second.split(" ").map((word) => ({
      word,
      accent: true,
    })),
  ];

  return (
    <motion.span
      variants={WORD_GROUP}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-block ${className}`}
    >
      {words.map(({ word, accent }, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block overflow-hidden align-bottom ${
            accent ? "text-[#1769A4]" : ""
          }`}
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
    </motion.span>
  );
}

/* ==========================================
   SUBTLE ORIGINAL SVG GRID
========================================== */

function ArchitecturalGrid() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 420"
      fill="none"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="who-exhibit-grid-premium"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke="#1769A4"
            strokeOpacity=".11"
            strokeWidth=".8"
          />
        </pattern>
      </defs>

      <rect
        width="720"
        height="420"
        fill="url(#who-exhibit-grid-premium)"
      />

      <motion.path
        d="M0 310H220V230H390V145H720"
        stroke="#1769A4"
        strokeOpacity=".38"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.65, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M40 380V275H285V195H520V90H720"
        stroke="#28A45A"
        strokeOpacity=".42"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.7, 0],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   PROFILE CARD
========================================== */

function ExhibitorCard({
  item,
  index,
}: {
  item: (typeof EXHIBITOR_PROFILES)[number];
  index: number;
}) {
  const isBlue = index % 2 === 0;

  return (
    <motion.article
      variants={REVEAL}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E1E7ED] bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1769A4]/30 hover:shadow-[0_16px_38px_rgba(15,33,53,0.055)] motion-reduce:transform-none sm:p-7"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
          isBlue
            ? "bg-[#1769A4]/[0.08] text-[#1769A4] group-hover:bg-[#1769A4] group-hover:text-white"
            : "bg-[#28A45A]/[0.08] text-[#28A45A] group-hover:bg-[#28A45A] group-hover:text-white"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[21px] w-[21px]"
        >
          <path d={item.icon} />
        </svg>
      </div>

      <h3 className="mt-6 font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111820] sm:text-[18px]">
        {item.title}
      </h3>

      <p className="mt-3 flex-1 text-[13px] leading-[1.8] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
        {item.desc}
      </p>

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
          isBlue ? "bg-[#1769A4]" : "bg-[#28A45A]"
        }`}
      />
    </motion.article>
  );
}

/* ==========================================
   MAIN CLIENT VIEW
========================================== */

export function WhoShouldExhibitClientView() {
  const reduced = useReducedMotion() === true;

  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* =====================================
          EDITORIAL INTRODUCTION
      ===================================== */}
      <section
        aria-labelledby="exhibitor-profiles-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-16 z-0 h-[360px] w-[620px] opacity-40"
        >
          <ArchitecturalGrid />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col gap-7 border-b border-[#E5EBF0] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[790px]">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <SectionLabel>
                  Exhibitor Profiles
                </SectionLabel>
              </motion.div>

              <h2
                id="exhibitor-profiles-heading"
                className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.6rem)] font-extrabold leading-[1.13] tracking-[-0.045em]"
              >
                <AnimatedHeading
                  first="Explore the Companies"
                  second="That Should Exhibit."
                />
              </h2>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.12,
                  ease: EASE,
                }}
                className="mt-5 max-w-[690px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                {event.name} brings together
                manufacturers, exporters, suppliers and
                solution providers serving Uganda&apos;s
                building and construction industry.
                Discover the exhibitor profiles relevant
                to the international trade exhibition.
              </motion.p>
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.16,
                ease: EASE,
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/exhibition-profile"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#DCE4EB] bg-white px-5 py-3 text-[13px] font-semibold text-[#1769A4] transition-colors hover:border-[#1769A4]"
              >
                Exhibition Profile
              </Link>

              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685]"
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ORIGINAL EXHIBITOR CATEGORIES */}
          <motion.div
            variants={GROUP}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.06,
            }}
            className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXHIBITOR_PROFILES.map((item, index) => (
              <ExhibitorCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================
          PARTICIPATION CTA
      ===================================== */}
      <section
        aria-labelledby="exhibitor-participation-heading"
        className="border-t border-[#E4EAF0] bg-[#F8FAFB] py-12 sm:py-14 lg:py-16"
      >
        <Container>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
          >
            <div className="max-w-[710px]">
              <SectionLabel>
                Exhibition Participation
              </SectionLabel>

              <h2
                id="exhibitor-participation-heading"
                className="mt-4 font-heading text-[clamp(1.7rem,2.7vw,2.75rem)] font-bold leading-[1.18] tracking-[-0.04em]"
              >
                Present Your Products to the{" "}
                <span className="text-[#1769A4]">
                  Construction Industry.
                </span>
              </h2>

              <p className="mt-4 max-w-[660px] text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">
                Explore exhibitor participation at{" "}
                {event.name}, taking place{" "}
                {event.dates.display} at{" "}
                {event.venue.fullLocation}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/exhibit"
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-[#D5DEE6] bg-white px-6 py-3 text-[13px] font-semibold text-[#1769A4] transition-colors hover:border-[#1769A4]"
              >
                Why Exhibit
                <ArrowIcon />
              </Link>

              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685]"
              >
                Enquire About Stand Space

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
