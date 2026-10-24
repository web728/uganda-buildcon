
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   ABOUT PAGE — PREMIUM EDITORIAL DESIGN
   Blue:  #1769A4
   Green: #28A45A
   Black: #101214
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
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
      duration: 0.85,
      ease: EASE,
    },
  },
};

const CARD_REVEAL: Variants = {
  hidden: { opacity: 0, y: 24 },
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
      staggerChildren: 0.085,
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
   OFFICIAL EXHIBITION OBJECTIVES & FEATURES
========================================== */

const CORE_DELIVERABLES = [
  {
    title: "Networking",
    desc: "Facilitate meaningful connections among industry professionals, investors and government representatives.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Showcasing Innovation",
    desc: "Present emerging technologies and sustainable practices shaping building and construction in East Africa.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Knowledge Sharing",
    desc: "Workshops, seminars and discussions offering insights into industry trends, solutions and emerging challenges.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Business Development",
    desc: "Help exhibitors and visitors explore partnerships, identify potential clients and develop new business opportunities.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Product Demonstrations",
    desc: "Experience demonstrations of construction materials, machinery and building technologies on the exhibition floor.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Professional Development",
    desc: "Learning opportunities relevant to engineers, architects, contractors and construction professionals.",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    title: "Interactive Exhibits",
    desc: "Explore displays that help visitors evaluate solutions, compare products and connect with relevant suppliers.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Networking Events",
    desc: "Connect with industry leaders, specialists and peers through exhibition networking opportunities.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
] as const;

/* ==========================================
   WORD-BY-WORD REVEAL
========================================== */

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
   ICONS
========================================== */

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

function ObjectiveIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={path} />
    </svg>
  );
}

/* ==========================================
   EDITORIAL SECTION LABEL
========================================== */

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
          light ? "text-white/65" : "text-[#1769A4]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   OBJECTIVE CARD
========================================== */

function ObjectiveCard({
  item,
  index,
}: {
  item: (typeof CORE_DELIVERABLES)[number];
  index: number;
}) {
  const isBlue = index % 2 === 0;

  return (
    <motion.article
      variants={CARD_REVEAL}
      className="group relative flex min-w-0 flex-col border border-[#E3E8ED] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_12px_32px_rgba(15,33,53,0.045)] sm:p-6"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300 ${
          isBlue
            ? "bg-[#1769A4]/[0.075] text-[#1769A4] group-hover:bg-[#1769A4] group-hover:text-white"
            : "bg-[#28A45A]/[0.075] text-[#28A45A] group-hover:bg-[#28A45A] group-hover:text-white"
        }`}
      >
        <ObjectiveIcon path={item.icon} />
      </div>

      <h4 className="mt-5 font-heading text-[16px] font-bold leading-[1.35] tracking-[-0.025em] text-[#101214] sm:text-[17px]">
        {item.title}
      </h4>

      <p className="mt-2 text-[13px] leading-[1.75] tracking-[-0.005em] text-[#627183]">
        {item.desc}
      </p>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#28A45A] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==========================================
   ABOUT CLIENT VIEW
========================================== */

export function AboutClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#101214]">
      {/* =====================================
          ABOUT INTRODUCTION
      ===================================== */}

      <section
        aria-labelledby="about-introduction-heading"
        className="relative py-14 sm:py-18 lg:py-22"
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16">
            {/* LEFT: EDITORIAL CONTENT */}
            <motion.div
              variants={GROUP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.16 }}
              className="min-w-0"
            >
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  About the Exhibition
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="about-introduction-heading"
                variants={WORD_GROUP}
                aria-label="Connecting the Building and Construction Industry"
                className="mt-5 max-w-[710px] font-heading text-[clamp(2.05rem,3.65vw,3.8rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Connecting the" />
                  {" "}
                  <AnimatedWords
                    text="Building"
                    className="text-[#1769A4]"
                  />
                  {" "}
                  <AnimatedWords text="& Construction" />
                  {" "}
                  <AnimatedWords
                    text="Industry."
                    className="text-[#28A45A]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-6 max-w-[660px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#58677B] sm:text-[15px]"
              >
                <strong className="font-semibold text-[#101214]">
                  {event.name}
                </strong>{" "}
                is an international B2B exhibition
                connecting manufacturers, suppliers,
                contractors, architects, engineers and
                decision-makers from the building and
                construction industry.
              </motion.p>

              <motion.p
                variants={REVEAL}
                className="mt-4 max-w-[660px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#58677B] sm:text-[15px]"
              >
                The expo showcases construction
                machinery, building materials,
                architectural products, engineering
                solutions and sustainable technologies,
                creating opportunities for professional
                networking, product discovery and
                business development across Uganda and
                East Africa.
              </motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4"
              >
                <Link
                  href="/exhibition-profile"
                  className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#105685]"
                >
                  Explore Exhibitor Profile
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>

                <Link
                  href="/exhibit"
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#344456] transition-colors hover:text-[#1769A4]"
                >
                  Why Exhibit
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: DARK STRATEGIC PANEL */}
            <motion.aside
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, ease: EASE }}
              className="relative isolate overflow-hidden rounded-xl bg-[#101214] p-7 text-white sm:p-9 lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1769A4]/15 blur-3xl"
              />

              <div className="relative z-10">
                <SectionLabel light>
                  Strategic Gateway
                </SectionLabel>

                <h3 className="mt-6 max-w-[360px] font-heading text-[clamp(1.65rem,2.5vw,2.35rem)] font-bold leading-[1.2] tracking-[-0.04em]">
                  A Platform for
                  <span className="text-[#7ACB58]">
                    {" "}Industry Connections.
                  </span>
                </h3>

                <p className="mt-5 max-w-[390px] text-[13px] leading-[1.85] text-white/65 sm:text-[14px]">
                  Uganda Buildcon offers a meeting
                  platform for businesses involved in
                  construction, infrastructure and
                  property development. Exhibitors can
                  present products, engage potential
                  buyers and explore opportunities in
                  the regional market.
                </p>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
                    Event Location
                  </p>

                  <p className="mt-2 font-heading text-[16px] font-semibold leading-[1.5] tracking-[-0.015em] text-white">
                    {event.venue.fullLocation}
                  </p>

                  <p className="mt-2 text-[12px] font-medium text-[#7ACB58]">
                    {event.dates.display}
                  </p>
                </div>

                <Link
                  href="/why-uganda"
                  className="group mt-7 inline-flex items-center gap-3 border-b border-white/25 pb-1.5 text-[12px] font-bold text-white transition-colors hover:border-[#7ACB58] hover:text-[#7ACB58]"
                >
                  Explore Why Uganda

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>

              <motion.div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-28 origin-left bg-[#28A45A]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.95,
                  delay: 0.25,
                  ease: EASE,
                }}
              />
            </motion.aside>
          </div>
        </Container>
      </section>

      {/* =====================================
          OBJECTIVES AND FEATURES
      ===================================== */}

      <section
        aria-labelledby="about-objectives-heading"
        className="border-y border-[#E8EDF1] bg-[#F8FAFB] py-14 sm:py-18 lg:py-20"
      >
        <Container>
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[650px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Objectives &amp; Features
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="about-objectives-heading"
                variants={REVEAL}
                className="mt-4 font-heading text-[clamp(1.85rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                What the Expo{" "}
                <span className="text-[#1769A4]">
                  Delivers.
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={REVEAL}
              className="max-w-[395px] text-[13px] leading-[1.8] text-[#627183] sm:text-[14px]"
            >
              Bringing together innovation, knowledge,
              products and professionals across the
              building and construction value chain.
            </motion.p>
          </motion.div>

          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CORE_DELIVERABLES.map((item, index) => (
              <ObjectiveCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================
          EVENT INFORMATION
          Only confirmed event details
      ===================================== */}

      <section
        aria-labelledby="about-event-information-heading"
        className="py-14 sm:py-18 lg:py-20"
      >
        <Container>
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16"
          >
            <div>
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Event Information
                </SectionLabel>
              </motion.div>

              <motion.h2
                variants={REVEAL}
                id="about-event-information-heading"
                className="mt-4 font-heading text-[clamp(1.8rem,2.8vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                Plan Your{" "}
                <span className="text-[#1769A4]">
                  Participation.
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-4 max-w-[380px] text-[13px] leading-[1.85] text-[#627183] sm:text-[14px]"
              >
                Learn about the exhibition dates,
                venue and participation opportunities
                for {event.name}.
              </motion.p>

              <motion.div variants={REVEAL} className="mt-6">
                <Link
                  href="/plan-your-visit"
                  className="group inline-flex items-center gap-3 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#105685]"
                >
                  Plan Your Visit
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.dl
              variants={GROUP}
              className="border-t border-[#E3E9EF]"
            >
              {[
                {
                  label: "Event",
                  value: event.name,
                },
                {
                  label: "Exhibition Dates",
                  value: event.dates.display,
                },
                {
                  label: "Venue",
                  value: event.venue.fullLocation,
                },
                {
                  label: "Exhibition Format",
                  value: event.format,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={REVEAL}
                  className="grid gap-2 border-b border-[#E3E9EF] py-5 sm:grid-cols-[165px_minmax(0,1fr)] sm:items-start sm:gap-6"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#82909E]">
                    {item.label}
                  </dt>

                  <dd className="font-heading text-[14px] font-semibold leading-[1.6] tracking-[-0.015em] text-[#101214] sm:text-[15px]">
                    {item.value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>

          {/* EXISTING INTERNAL PAGE LINKS */}
          <motion.nav
            aria-label="Explore Uganda Buildcon"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-[#E3E9EF] pt-6"
          >
            {[
              {
                href: "/exhibition-profile",
                label: "Exhibitor Profile",
              },
              {
                href: "/exhibit",
                label: "Why Exhibit",
              },
              {
                href: "/why-uganda",
                label: "Why Uganda",
              },
              {
                href: event.cta.registerVisit,
                label: "Register to Visit",
              },
              {
                href: event.cta.bookStand,
                label: "Book a Stand",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#1769A4] transition-colors duration-300 hover:text-[#28A45A]"
              >
                {link.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </motion.nav>
        </Container>
      </section>
    </div>
  );
}
