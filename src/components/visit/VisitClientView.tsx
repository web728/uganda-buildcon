
"use client";

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

const STAGGER: Variants = {
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
    y: 22,
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

const WORDS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const WORD: Variants = {
  hidden: {
    opacity: 0,
    y: "105%",
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
   ORIGINAL VISITOR BENEFITS
========================================== */

const VISIT_BENEFITS = [
  {
    title: "Discover Innovations",
    description:
      "Explore building materials, construction machinery and emerging technologies relevant to projects across Uganda and East Africa.",
  },
  {
    title: "Gain Industry Insights",
    description:
      "Learn about construction products, technical developments and industry trends through conversations with exhibitors and specialists.",
  },
  {
    title: "Network with Industry Leaders",
    description:
      "Connect with manufacturers, suppliers, developers, consultants and other professionals in the building and construction industry.",
  },
  {
    title: "Explore Practical Solutions",
    description:
      "Compare products, examine materials and discuss technical solutions relevant to your project and sourcing requirements.",
  },
  {
    title: "Identify New Opportunities",
    description:
      "Meet potential suppliers, distributors and business partners to explore opportunities for sourcing and collaboration.",
  },
  {
    title: "Strengthen Supplier Relationships",
    description:
      "Reconnect with existing contacts, discuss upcoming requirements and develop stronger commercial relationships.",
  },
] as const;

/* ==========================================
   ORIGINAL VISITOR PROFILES
========================================== */

const VISITOR_SEGMENTS = [
  {
    title: "Architects, Engineers & Consultants",
    roles:
      "Architects & Planners, Structural & Civil Engineers, Consulting Engineers, Project Managers, Urban Planners, Interior Designers",
  },
  {
    title: "Contractors & Builders",
    roles:
      "Building Contractors, Contractors & Subcontractors, Builders & Developers, Construction Industry Professionals",
  },
  {
    title: "Developers, Investors & Owners",
    roles:
      "Homeowners & Property Investors, Investors & Financiers, Hoteliers, Hospitality & Health Facilities, Facility Managers",
  },
  {
    title: "Trade & Distribution",
    roles:
      "Building Material Suppliers, Importers, Dealers & Distributors, Retailers, Sourcing Professionals",
  },
  {
    title: "Government & Institutions",
    roles:
      "Government Agencies / Building Authorities, Universities, Technical & Research Institutes, Academics & Researchers",
  },
] as const;

/* ==========================================
   REUSABLE ELEMENTS
========================================== */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-[2px] w-8 bg-[#28A45A]"
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
      className="h-4 w-4"
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
   ARCHITECTURAL BACKGROUND SVG

   Original 36px grid retained.
   No decorative badges or floating statistics.
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
          id="why-visit-grid"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke="#1769A4"
            strokeWidth=".8"
            strokeOpacity=".14"
          />
        </pattern>
      </defs>

      <rect
        width="720"
        height="360"
        fill="url(#why-visit-grid)"
      />

      <motion.path
        d="M0 270H165V215H330V115H720"
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
                opacity: [0, 0.55, 0],
              }
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M60 355V280H275V190H490V90H720"
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
                opacity: [0, 0.6, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   VISITOR BENEFIT CARD
========================================== */

function BenefitItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E2E8EF] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_14px_34px_rgba(16,35,55,0.05)] sm:p-7"
    >
      <span
        aria-hidden="true"
        className="mb-5 h-[3px] w-9 bg-[#28A45A] transition-[width] duration-300 group-hover:w-16"
      />

      <h3 className="font-heading text-[18px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111820] sm:text-[19px]">
        {title}
      </h3>

      <p className="mt-3 text-[13px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
        {description}
      </p>
    </motion.article>
  );
}

/* ==========================================
   VISITOR SEGMENT CARD
========================================== */

function VisitorSegment({
  title,
  roles,
}: {
  title: string;
  roles: string;
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="group flex h-full min-w-0 flex-col border-b border-[#DFE7EE] py-5 sm:py-6"
    >
      <h3 className="font-heading text-[16px] font-bold leading-[1.4] tracking-[-0.025em] text-[#172536] transition-colors duration-300 group-hover:text-[#1769A4] sm:text-[17px]">
        {title}
      </h3>

      <p className="mt-2 text-[13px] leading-[1.8] text-[#68788A]">
        {roles}
      </p>
    </motion.article>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function VisitClientView() {
  const reduced = useReducedMotion() === true;

  const initial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* =====================================
          WHY VISIT / BENEFITS
      ===================================== */}
      <section
        aria-labelledby="why-visit-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-20 -z-10 h-[360px] w-[680px] opacity-40"
        >
          <ArchitecturalGrid />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={STAGGER}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col gap-7 border-b border-[#E5EBF0] pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[780px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Visitor Opportunities
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="why-visit-heading"
                variants={WORDS}
                aria-label="Why Visit Uganda Buildcon?"
                className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.55rem)] font-extrabold leading-[1.13] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Why Visit" />
                  {" "}
                  <AnimatedWords
                    text="Uganda Buildcon?"
                    className="text-[#1769A4]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[680px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                Discover new construction products,
                evaluate suppliers and connect with
                industry professionals. Uganda Buildcon
                provides a focused environment for
                product discovery, trade conversations
                and business networking.
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

          {/* VISITOR BENEFITS */}
          <motion.div
            variants={STAGGER}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VISIT_BENEFITS.map((benefit) => (
              <BenefitItem
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================
          VISITOR PROFILE
      ===================================== */}
      <section
        aria-labelledby="visitor-profile-heading"
        className="border-t border-[#E5EBF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* LEFT EDITORIAL PANEL */}
            <motion.div
              variants={STAGGER}
              initial={initial}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Visitor Profiles
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="visitor-profile-heading"
                variants={REVEAL}
                className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-bold leading-[1.15] tracking-[-0.045em]"
              >
                Meet the People Who{" "}
                <span className="text-[#1769A4]">
                  Buy, Build & Source.
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[430px] text-[14px] leading-[1.85] text-[#607083]"
              >
                The exhibition is designed for
                professionals involved in planning,
                specifying, purchasing, supplying
                and delivering construction projects.
              </motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-6"
              >
                <Link
                  href="/who-should-visit"
                  className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#28A45A]"
                >
                  Explore Visitor Profiles

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* ORIGINAL VISITOR GROUPS */}
            <motion.div
              variants={STAGGER}
              initial={initial}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid content-start gap-x-7 sm:grid-cols-2"
            >
              {VISITOR_SEGMENTS.map((segment) => (
                <VisitorSegment
                  key={segment.title}
                  title={segment.title}
                  roles={segment.roles}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
