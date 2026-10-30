
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
    title: "Industry Networking",
    desc:
      "Meet manufacturers, suppliers, contractors, architects, engineers and other industry professionals.",
    icon:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Product Showcase",
    desc:
      "Explore building materials, construction equipment, architectural products and modern building systems.",
    icon:
      "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Knowledge Sharing",
    desc:
      "Learn about industry developments, new materials, technologies and building practices.",
    icon:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Business Development",
    desc:
      "Connect with potential customers, identify suppliers and explore business partnerships.",
    icon:
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Product Displays",
    desc:
      "View products, equipment and technical solutions presented by exhibitors.",
    icon:
      "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Industry Solutions",
    desc:
      "Find solutions for building design, construction projects and facility operations.",
    icon:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
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
  return (
    <motion.article
      variants={CARD_REVEAL}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E3E8ED] bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1769A4]/30 hover:shadow-[0_16px_40px_rgba(15,33,53,0.07)] motion-reduce:transform-none sm:p-6"
    >
      {/* Icon and number */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#1769A4]/10 bg-[#1769A4]/[0.07] text-[#1769A4] transition-colors duration-300 group-hover:border-[#1769A4] group-hover:bg-[#1769A4] group-hover:text-white">
          <ObjectiveIcon path={item.icon} />
        </div>
 
      </div>

      {/* Content */}
      <div className="mt-6 flex flex-1 flex-col">
        <h4 className="font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#1769A4]">
          {item.title}
        </h4>

        <p className="mt-3 text-[13px] leading-[1.8] tracking-[-0.005em] text-[#627183]">
          {item.desc}
        </p>
      </div>

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#1769A4] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
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
                  Exhibition Overview
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="about-introduction-heading"
                variants={WORD_GROUP}
                aria-label="Connecting the Building and Construction Industry"
                className="mt-5 max-w-[710px] font-heading text-[clamp(2.05rem,3.65vw,3.8rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
             <span aria-hidden="true">
  <AnimatedWords text="Bringing Together" />
  {" "}
  <AnimatedWords
    text="Building & Construction"
    className="text-[#1769A4]"
  />
  {" "}
  <AnimatedWords
    text="Professionals."
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
  provides a platform for manufacturers,
  suppliers and service providers to present
  their products to contractors, architects,
  engineers, developers and trade buyers.
</motion.p>

<motion.p
  variants={REVEAL}
  className="mt-4 max-w-[660px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#58677B] sm:text-[15px]"
>
  The exhibition covers building materials,
  construction machinery, architectural
  products, interior solutions, engineering
  services and building technologies.
  It offers opportunities to compare products,
  meet suppliers and discuss business needs
  across Uganda and East Africa.
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
  Business Connections
</SectionLabel>

<h3 className="mt-6 max-w-[360px] font-heading text-[clamp(1.65rem,2.5vw,2.35rem)] font-bold leading-[1.2] tracking-[-0.04em] text-white">
  Meet Buyers &{" "}
  <span className="text-[#7DBBE8]">
    Industry Professionals.
  </span>
</h3>

<p className="mt-5 max-w-[390px] text-[13px] leading-[1.85] text-white/70 sm:text-[14px]">
  Meet professionals involved in building
  projects, construction and property
  development. Discuss product requirements,
  explore supplier options and establish
  business contacts across the region.
</p>

<div className="mt-8 border-t border-white/15 pt-6">
  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
    Event Location
  </p>

  <p className="mt-2 font-heading text-[16px] font-semibold leading-[1.5] tracking-[-0.015em] text-white">
    {event.venue.fullLocation}
  </p>

  <p className="mt-2 text-[12px] font-medium text-[#7DBBE8]">
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
                  Exhibition Objectives
                </SectionLabel>
              </motion.div>

           <motion.h2
  id="about-objectives-heading"
  variants={REVEAL}
  className="mt-4 font-heading text-[clamp(1.85rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-[#111111]"
>
  More Than an{" "}
  <span className="text-[#1769A4]">
    Exhibition.
  </span>
</motion.h2>


            </div>
<motion.p
  variants={REVEAL}
  className="max-w-[395px] text-[13px] leading-[1.8] text-[#627183] sm:text-[14px]"
>
  Explore products, exchange industry knowledge
  and meet professionals from the building
  and construction sectors.
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
 
    </div>
  );
}
