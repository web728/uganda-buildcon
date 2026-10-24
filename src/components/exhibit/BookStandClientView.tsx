"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { BookStandForm } from "@/components/forms/BookStandForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: EASE },
  },
};
const WORD_GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.105, delayChildren: 0.18 } },
};
const WORD: Variants = {
  hidden: { opacity: 0, y: "125%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 1.0, ease: EASE },
  },
};

function AnimatedWords({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <>{text}</>;

  return (
    <>
      {text.trim().split(/\s+/).map((word, index, words) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={WORD} className="inline-block will-change-transform">
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px]">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px]">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** Quiet architecture-inspired backdrop; never intercepts form interactions. */
function BackgroundArtwork({ reduced }: { reduced: boolean }) {
  const paths = [
    "M-110 290 C165 165 435 465 730 300 S1200 175 1550 340",
    "M-110 318 C165 193 435 493 730 328 S1200 203 1550 368",
    "M-110 346 C165 221 435 521 730 356 S1200 231 1550 396",
    "M-110 374 C165 249 435 549 730 384 S1200 259 1550 424",
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.48]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16,36,62,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,36,62,.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-[900px] w-full opacity-75">
        <defs>
          <linearGradient id="stand-flow-blue" x1="0" x2="1440" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1769A4" stopOpacity="0" />
            <stop offset=".5" stopColor="#1769A4" stopOpacity=".2" />
            <stop offset="1" stopColor="#1769A4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stand-flow-green" x1="0" x2="1440" gradientUnits="userSpaceOnUse">
            <stop stopColor="#28A45A" stopOpacity="0" />
            <stop offset=".5" stopColor="#28A45A" stopOpacity=".2" />
            <stop offset="1" stopColor="#28A45A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="-50" cy="750" r="310" stroke="#1769A4" strokeOpacity=".1" />
        <circle cx="-50" cy="750" r="250" stroke="#28A45A" strokeOpacity=".12" strokeDasharray="5 13" />
        <circle cx="1490" cy="0" r="330" stroke="#1769A4" strokeOpacity=".1" />
        {paths.map((path, index) => (
          <path key={path} d={path} stroke={index < 2 ? "url(#stand-flow-blue)" : "url(#stand-flow-green)"} strokeWidth="1" />
        ))}
        <motion.path
          d={paths[0]}
          stroke="#1769A4"
          strokeOpacity=".28"
          strokeWidth="1.5"
          strokeDasharray="80 2250"
          initial={false}
          animate={reduced ? undefined : { strokeDashoffset: [0, -2330] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        />
        <motion.path
          d={paths[2]}
          stroke="#28A45A"
          strokeOpacity=".3"
          strokeWidth="1.4"
          strokeDasharray="65 2250"
          initial={false}
          animate={reduced ? undefined : { strokeDashoffset: [0, -2315] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

function EventInfoCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "blue" | "green";
}) {
  const isBlue = color === "blue";
  return (
    <motion.div
      variants={REVEAL}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#E1E8EF] bg-white/95 p-4 shadow-[0_4px_20px_rgba(15,23,42,.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/25 hover:shadow-[0_12px_30px_rgba(15,23,42,.055)] sm:p-5"
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${isBlue ? "bg-[#1769A4]/[.075] text-[#1769A4]" : "bg-[#28A45A]/[.075] text-[#28A45A]"}`}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#8995A1]">{label}</span>
        <span className="mt-1 block text-[13px] font-bold leading-[1.55] text-[#10243E] sm:text-[14px]">{value}</span>
      </span>
    </motion.div>
  );
}

export function BookStandClientView() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";

  return (
    <section aria-labelledby="stand-enquiry-heading" className="relative isolate overflow-hidden border-t border-[#E8EDF2] bg-[#FAFBFC] py-14 text-[#10243E] sm:py-16 lg:py-20">
      <BackgroundArtwork reduced={reduced} />
      <Container className="relative z-10">
        <motion.div
          variants={GROUP}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto max-w-[830px] text-center"
        >
          <motion.div variants={REVEAL} className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[2px] w-8 bg-[#28A45A]" />
            <span className="text-[10px] font-bold uppercase tracking-[.17em] text-[#1769A4]">Exhibitor Enquiry · Stand Space</span>
            <span aria-hidden="true" className="h-[2px] w-8 bg-[#28A45A]" />
          </motion.div>

          <motion.h2
            id="stand-enquiry-heading"
            aria-label="Apply to Exhibit at Uganda Buildcon"
            variants={WORD_GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
            className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.55rem)] font-extrabold leading-[1.12] tracking-[-0.05em]"
          >
            <span aria-hidden="true">
              <AnimatedWords text="Apply to Exhibit" reduced={reduced} />{" "}
              <span className="text-[#1769A4]"><AnimatedWords text="at Uganda Buildcon." reduced={reduced} /></span>
            </span>
          </motion.h2>

          <motion.p variants={REVEAL} className="mx-auto mt-5 max-w-[660px] text-[13px] leading-[1.85] text-[#607083] sm:text-[15px]">
            Tell us about your company, products and preferred exhibition space.
            Our organising team can follow up with stand options, participation details and availability.
          </motion.p>
        </motion.div>

        <motion.div
          variants={GROUP}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mx-auto mt-8 grid max-w-[920px] grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <EventInfoCard icon={<CalendarIcon />} label="Exhibition Dates" value={event.dates.display} color="blue" />
          <EventInfoCard icon={<PinIcon />} label="Exhibition Venue" value={`${event.venue.name}, ${event.venue.city}`} color="green" />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto mt-6 max-w-[920px] min-w-0 overflow-hidden rounded-xl border border-[#DFE6ED] bg-white shadow-[0_20px_60px_rgba(16,35,55,.055)] sm:mt-8"
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[3px]">
            <span className="w-[72%] bg-[#1769A4]" />
            <span className="flex-1 bg-[#28A45A]" />
          </div>
          <div className="flex flex-col justify-between gap-4 border-b border-[#E7EDF2] px-5 py-6 sm:flex-row sm:items-center sm:px-8 sm:py-7 lg:px-10">
            <div>
              <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: EASE }} className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#1769A4]">Participation Request</motion.p>
              <motion.h3 initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={WORD_GROUP} aria-label="Exhibitor Application" className="font-heading text-[20px] font-bold leading-[1.3] tracking-[-.03em] text-[#10243E] sm:text-[23px]"><span aria-hidden="true"><AnimatedWords text="Exhibitor Application" reduced={reduced} /></span></motion.h3>
              <motion.p initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.23, ease: EASE }} className="mt-2 max-w-[650px] text-[12px] leading-[1.8] text-[#667789] sm:text-[13px]">
                Complete the details below to submit your stand enquiry. Required fields are marked in the form.
              </motion.p>
            </div>
            <span aria-hidden="true" className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[.07] text-[#1769A4] sm:flex"><ArrowIcon /></span>
          </div>

          {/* Existing form, validation, submissions and API integrations stay unchanged. */}
          <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <BookStandForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
