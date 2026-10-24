
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
import { visitorGroups } from "@/data/visitorProfile";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";

/* ==========================================
   MOTION SYSTEM
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
};

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.05,
    },
  },
};

const WORD: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

/* ==========================================
   ORIGINAL BROCHURE OBJECTIVES
========================================== */

const WHY_VISIT_OBJECTIVES = [
  {
    title: "Source New Products",
    desc:
      "Discover building materials, machinery, heavy equipment and construction technologies from participating suppliers.",
    icon:
      "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Compare Products & Suppliers",
    desc:
      "Evaluate alternative products, systems and specifications, and discuss pricing and supply arrangements directly with exhibitors.",
    icon:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Solve Current Requirements",
    desc:
      "Explore products and supplier capabilities relevant to current construction projects, procurement needs and future developments.",
    icon:
      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Meet Manufacturers Directly",
    desc:
      "Speak with manufacturers, exporters and technical representatives about product performance, specifications and availability.",
    icon:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Discover New Brands",
    desc:
      "Explore emerging manufacturers, building product brands and innovative solutions relevant to the Ugandan construction market.",
    icon:
      "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Develop Supplier Relationships",
    desc:
      "Build direct business connections for current sourcing requirements, longer-term supplier relationships and upcoming projects.",
    icon:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
] as const;

/* ==========================================
   SHARED UI
========================================== */

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-[2px] w-8 shrink-0 bg-[#28A45A]"
      />

      <span className="text-[11px] font-bold uppercase leading-[1.5] tracking-[0.13em] text-[#1769A4]">
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
   EXISTING ARCHITECTURAL SVG GRID
========================================== */

function ArchitecturalGrid() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 720 360"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <pattern
          id="who-should-visit-grid"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke="#1769A4"
            strokeOpacity=".13"
            strokeWidth=".8"
          />
        </pattern>
      </defs>

      <rect
        width="720"
        height="360"
        fill="url(#who-should-visit-grid)"
      />

      <motion.path
        d="M0 280H185V210H340V125H720"
        fill="none"
        stroke="#1769A4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.6, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M75 360V265H280V185H510V80H720"
        fill="none"
        stroke="#28A45A"
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
          duration: 16,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   VISITOR PROFILE CARD
========================================== */

function VisitorGroupCard({
  group,
  index,
}: {
  group: (typeof visitorGroups)[number];
  index: number;
}) {
  const Icon = visitorGroupIconMap[group.slug];
  const blue = index % 2 === 0;

  return (
    <motion.article
      id={group.slug}
      variants={REVEAL}
      className="group relative flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-xl border border-[#E1E8EF] bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1769A4]/30 hover:shadow-[0_14px_35px_rgba(16,35,55,0.05)] motion-reduce:transform-none sm:p-7"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
          blue
            ? "bg-[#1769A4]/[0.08] text-[#1769A4] group-hover:bg-[#1769A4] group-hover:text-white"
            : "bg-[#28A45A]/[0.08] text-[#28A45A] group-hover:bg-[#28A45A] group-hover:text-white"
        }`}
      >
        {Icon ? (
          <Icon className="h-[21px] w-[21px]" />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            className="h-[21px] w-[21px]"
          >
            <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M1 21h22M8 8h3m-3 4h3m2-4h3m-3 4h3" />
          </svg>
        )}
      </div>

      <h3 className="mt-5 font-heading text-[18px] font-bold leading-[1.35] tracking-[-0.025em] text-[#172536] transition-colors duration-300 group-hover:text-[#1769A4]">
        {group.name}
      </h3>

      <ul className="mt-4 flex flex-wrap items-start gap-2">
        {group.roles.map((role) => (
          <li
            key={role}
            className="rounded-md border border-[#E8EDF2] bg-[#F8FAFB] px-3 py-1.5 text-[12px] font-medium leading-[1.55] text-[#607083]"
          >
            {role}
          </li>
        ))}
      </ul>

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
          blue ? "bg-[#1769A4]" : "bg-[#28A45A]"
        }`}
      />
    </motion.article>
  );
}

/* ==========================================
   WHY VISIT OBJECTIVE
========================================== */

function ObjectiveCard({
  title,
  desc,
  icon,
}: (typeof WHY_VISIT_OBJECTIVES)[number]) {
  return (
    <motion.article
      variants={REVEAL}
      className="group flex h-full min-w-0 flex-col border-b border-[#DEE6ED] py-5 transition-colors duration-300 sm:py-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.075] text-[#1769A4] transition-colors duration-300 group-hover:bg-[#1769A4] group-hover:text-white">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.65}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d={icon} />
          </svg>
        </div>

        <div className="min-w-0">
          <h3 className="font-heading text-[16px] font-bold leading-[1.4] tracking-[-0.02em] text-[#172536] transition-colors group-hover:text-[#1769A4] sm:text-[17px]">
            {title}
          </h3>

          <p className="mt-2 text-[13px] leading-[1.8] text-[#68788A]">
            {desc}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function WhoShouldVisitClientView() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* =====================================
          VISITOR PROFILES
      ===================================== */}

      <section
        aria-labelledby="visitor-audiences-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-16 -z-10 h-[360px] w-[680px] opacity-40"
        >
          <ArchitecturalGrid />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12,
            }}
            className="flex flex-col gap-6 border-b border-[#E5EAF0] pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[790px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Visitor Profiles
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="visitor-audiences-heading"
                variants={WORD_GROUP}
                aria-label="Who Should Visit Uganda Buildcon?"
                className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.55rem)] font-extrabold leading-[1.13] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Who Should Visit" />
                  {" "}
                  <AnimatedWords
                    text="Uganda Buildcon?"
                    className="text-[#1769A4]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[690px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                The exhibition welcomes professionals
                involved in designing, constructing,
                financing, purchasing and supplying
                building projects. Explore the audience
                groups that can benefit from visiting{" "}
                {event.shortName}.
              </motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
              >
                Register to Visit

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* EXISTING VISITOR GROUPS */}
          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.06,
            }}
            className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visitorGroups.map((group, index) => (
              <VisitorGroupCard
                key={group.slug}
                group={group}
                index={index}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================
          REASONS TO VISIT
      ===================================== */}

      <section
        aria-labelledby="visitor-reasons-heading"
        className="border-t border-[#E5EAF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
            {/* EDITORIAL COLUMN */}
            <motion.div
              variants={GROUP}
              initial={initial}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
            >
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Why Attend
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="visitor-reasons-heading"
                variants={REVEAL}
                className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-bold leading-[1.15] tracking-[-0.045em]"
              >
                Discover Products.{" "}
                <span className="text-[#1769A4]">
                  Build Connections.
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[430px] text-[14px] leading-[1.85] text-[#607083]"
              >
                From comparing construction materials
                to meeting new suppliers, the exhibition
                provides opportunities for practical
                product discovery and industry engagement.
              </motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-6"
              >
                <Link
                  href="/exhibition-profile"
                  className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#28A45A]"
                >
                  Explore Exhibition Products

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* BROCHURE VISITOR OBJECTIVES */}
            <motion.div
              variants={GROUP}
              initial={initial}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="grid content-start gap-x-7 sm:grid-cols-2"
            >
              {WHY_VISIT_OBJECTIVES.map((item) => (
                <ObjectiveCard
                  key={item.title}
                  {...item}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
