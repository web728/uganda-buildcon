"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const WORD: Variants = {
  hidden: { opacity: 0, y: "115%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.95, ease: EASE } },
};
const WORDS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.105, delayChildren: 0.2 } },
};
const UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

function AnimatedLine({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <>{text}</>;
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={WORD} className="inline-block will-change-transform">
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </>
  );
}

export function BookStandHero() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";
  const year = event.dates.start.slice(0, 4);
  const name = event.name.includes(year) ? event.name : `${event.name} ${year}`;

  return (
    <section className="relative isolate overflow-hidden border-b border-[#E7EBF0] bg-[#FBFCFD] text-[#10243E]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(to right,rgba(16,36,62,.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(16,36,62,.035) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      <svg aria-hidden="true" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <circle cx="1360" cy="80" r="315" stroke="#1769A4" strokeOpacity=".09" />
        <circle cx="1360" cy="80" r="260" stroke="#28A45A" strokeOpacity=".11" strokeDasharray="6 12" />
        <circle cx="20" cy="555" r="260" stroke="#1769A4" strokeOpacity=".08" />
        <path d="M-80 360 C220 260 430 475 730 350 S1200 270 1540 370" stroke="#1769A4" strokeOpacity=".11" />
        <path d="M-80 386 C220 286 430 501 730 376 S1200 296 1540 396" stroke="#28A45A" strokeOpacity=".13" />
        <motion.path d="M-80 360 C220 260 430 475 730 350 S1200 270 1540 370" stroke="#1769A4" strokeOpacity=".4" strokeWidth="1.6" strokeDasharray="90 2100" initial={false} animate={reduced ? undefined : { strokeDashoffset: [0, -2190] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M-80 386 C220 286 430 501 730 376 S1200 296 1540 396" stroke="#28A45A" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="65 2100" initial={false} animate={reduced ? undefined : { strokeDashoffset: [0, -2165] }} transition={{ duration: 29, repeat: Infinity, ease: "linear" }} />
      </svg>
      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <motion.nav aria-label="Breadcrumb" initial={initial} animate="visible" variants={{ hidden: {}, visible: { transition: { delayChildren: 0.05 } } }} className="mb-8">
          <motion.div variants={UP} className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[.13em] text-[#778696]">
            <Link href="/" className="transition-colors hover:text-[#1769A4]">Home</Link>
            <span aria-hidden="true" className="text-[#28A45A]">/</span>
            <span aria-current="page" className="text-[#1769A4]">Book a Stand</span>
          </motion.div>
        </motion.nav>
        <motion.div initial={initial} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.07 } } }} className="max-w-[900px]">
          <motion.div variants={UP} className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#28A45A]" aria-hidden="true" />
            <span className="text-[10px] font-extrabold uppercase tracking-[.19em] text-[#1769A4]">Exhibit at Uganda Buildcon · {year}</span>
          </motion.div>
          <motion.h1 variants={WORDS} aria-label="Reserve Your Exhibition Stand" className="font-heading text-[clamp(2.5rem,5.6vw,5.5rem)] font-extrabold leading-[1.07] tracking-[-.055em]">
            <span aria-hidden="true" className="block"><AnimatedLine text="Reserve Your" reduced={reduced} /></span>
            <span aria-hidden="true" className="block text-[#1769A4]"><AnimatedLine text="Exhibition Stand" reduced={reduced} /></span>
          </motion.h1>
          <motion.p variants={UP} className="mt-6 max-w-[720px] text-[14px] leading-[1.85] text-[#607083] sm:text-[16px]">
            Explore exhibition participation at {name}, {event.dates.display} at {event.venue.fullLocation}. Submit your stand enquiry to discuss available options with the organising team.
          </motion.p>
          <motion.div variants={UP} className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#stand-enquiry-heading" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(23,105,164,.15)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#115A91] hover:shadow-[0_12px_30px_rgba(23,105,164,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769A4]">
              Apply to Exhibit
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <span className="text-[12px] font-semibold text-[#778696]">{event.venue.city}, {event.venue.country}</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
