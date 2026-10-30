"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { visitorGroups } from "@/data/visitorProfile";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";

const EASE = [0.22, 1, 0.36, 1] as const;
const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } },
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#1769A4]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1769A4]">
        {children}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"
      className="h-4 w-4 shrink-0">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArchitecturalGrid() {
  const reducedMotion = useReducedMotion() === true;
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 720 360"
      fill="none" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <pattern id="visitor-profile-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" stroke="#1769A4" strokeOpacity=".12" strokeWidth=".8" />
        </pattern>
      </defs>
      <rect width="720" height="360" fill="url(#visitor-profile-grid)" />
      <motion.path d="M0 280H185V210H340V125H720" stroke="#1769A4"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={false}
        animate={reducedMotion ? undefined : { pathLength: [0, 1, 1], opacity: [0, 0.5, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />
      <motion.path d="M75 360V265H280V185H510V80H720" stroke="#111111"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={false}
        animate={reducedMotion ? undefined : { pathLength: [0, 1, 1], opacity: [0, 0.3, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function VisitorGroupCard({
  group,
  index,
}: {
  group: (typeof visitorGroups)[number];
  index: number;
}) {
  const Icon = visitorGroupIconMap[group.slug];

  return (
    <motion.article
      id={group.slug}
      variants={REVEAL}
      className="group relative flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-xl border border-[#E2E8EE] bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1769A4]/30 hover:shadow-[0_14px_35px_rgba(16,35,55,0.055)] motion-reduce:transform-none sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.08] text-[#1769A4] transition-colors duration-300 group-hover:bg-[#1769A4] group-hover:text-white">
          {Icon ? (
            <Icon className="h-[21px] w-[21px]" />
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={1.7} className="h-[21px] w-[21px]">
              <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M1 21h22M8 8h3m-3 4h3m2-4h3m-3 4h3" />
            </svg>
          )}
        </span>
      
      </div>

      <h3 className="mt-5 min-h-[44px] font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors group-hover:text-[#1769A4] sm:text-[18px]">
        {group.name}
      </h3>

      <div className="mt-4 border-t border-[#E8EDF2] pt-4">
        <ul className="space-y-2.5">
          {group.roles.map((role) => (
            <li key={role} className="flex items-start gap-2.5 text-[13px] leading-[1.65] text-[#607083]">
              <span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1769A4]" />
              <span>{role}</span>
            </li>
          ))}
        </ul>
      </div>

      <span aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#1769A4] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export function VisitorProfileClientView() {
  const reducedMotion = useReducedMotion() === true;
  const initial = reducedMotion ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111111]">
      <section aria-labelledby="visitor-profile-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-16 -z-10 h-[360px] w-[680px] opacity-35">
          <ArchitecturalGrid />
        </div>

        <Container className="relative z-10">
          <motion.div variants={GROUP} initial={initial} whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-5 border-b border-[#E5EAF0] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>Visitor Categories</SectionLabel>
              </motion.div>
              <motion.h2 id="visitor-profile-heading" variants={REVEAL}
                className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.45rem)] font-extrabold leading-[1.13] tracking-[-0.045em]">
                Professionals Across <span className="text-[#1769A4]">Building &amp; Construction.</span>
              </motion.h2>
              <motion.p variants={REVEAL}
                className="mt-5 max-w-[690px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]">
                The exhibition is relevant to architects, engineers, contractors,
                developers, trade buyers and professionals involved in building
                projects, construction and product sourcing.
              </motion.p>
            </div>
            <motion.div variants={REVEAL}>
              <Link href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769A4]">
                Register to Visit
                <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={GROUP} initial={initial} whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visitorGroups.map((group, index) => (
              <VisitorGroupCard key={group.slug} group={group} index={index} />
            ))}
          </motion.div>

       
        </Container>
      </section>
    </div>
  );
}
