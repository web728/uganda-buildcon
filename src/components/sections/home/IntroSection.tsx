
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

const WORD: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: EASE },
  },
};

function AnimatedLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((word, index, words) => (
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

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ==========================================
   PREMIUM ANIMATED ARCHITECTURAL SVG
========================================== */

const BUILDINGS = [
  "M70 340V145L170 105V340",
  "M190 340V70L315 25V340",
  "M335 340V120L457 75V340",
  "M475 340V170L575 130V340",
];

function ArchitecturalDrawing() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 350"
      fill="none"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="intro-technical-trace"
          x1="0"
          y1="0"
          x2="640"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1769A4" />
          <stop offset="1" stopColor="#28A45A" />
        </linearGradient>
      </defs>

      {/* Fine architectural grid */}
      {Array.from({ length: 13 }, (_, i) => (
        <path
          key={`v-${i}`}
          d={`M${i * 55} 0V350`}
          stroke="white"
          strokeOpacity=".045"
        />
      ))}

      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={`h-${i}`}
          d={`M0 ${i * 50}H640`}
          stroke="white"
          strokeOpacity=".045"
        />
      ))}

      {/* Buildings draw themselves on scroll */}
      {BUILDINGS.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke={
            index === 1 ? "#28A45A" : "#1769A4"
          }
          strokeOpacity={index === 1 ? 0.65 : 0.48}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.55,
            delay: 0.15 + index * 0.16,
            ease: EASE,
          }}
        />
      ))}

      {/* Floor levels */}
      {[110, 160, 210, 260, 310].map((y, index) => (
        <motion.path
          key={y}
          d={`M190 ${y}H315`}
          stroke="white"
          strokeOpacity=".16"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            delay: 0.75 + index * 0.12,
            ease: EASE,
          }}
        />
      ))}

      {/* Stationary connection route */}
      <path
        d="M20 285C140 220 205 285 300 185S440 180 535 95"
        stroke="url(#intro-technical-trace)"
        strokeOpacity=".22"
        strokeWidth="1.5"
      />

      {/* Continuous moving signal */}
      <motion.path
        d="M20 285C140 220 205 285 300 185S440 180 535 95"
        stroke="url(#intro-technical-trace)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="65 1200"
        initial={false}
        animate={{ strokeDashoffset: [0, -1265] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Location marker */}
      <circle
        cx="535"
        cy="95"
        r="12"
        stroke="#28A45A"
        strokeOpacity=".4"
      />

      <motion.circle
        cx="535"
        cy="95"
        r="4"
        fill="#28A45A"
        initial={false}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.85, 1.3, 0.85],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}

/* ==========================================
   FEATURE ROW
========================================== */

function FeatureRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={REVEAL}
      className="group flex items-start gap-4 border-b border-[#E5E8EB] py-4 sm:gap-5"
    >
      <span className="mt-1 font-heading text-[11px] font-bold text-[#28A45A]">
        {number}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-[15px] font-bold text-[#111111] transition-colors duration-300 group-hover:text-[#1769A4]">
          {title}
        </h3>

        <p className="mt-1.5 max-w-[480px] text-[13px] leading-[1.75] text-[#58677B]">
          {description}
        </p>
      </div>

      <span className="mt-1 text-[#1769A4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none">
        <ArrowUpRight />
      </span>
    </motion.div>
  );
}

/* ==========================================
   INTRO SECTION
========================================== */

export function IntroSection() {
  return (
    <section
      aria-labelledby="uganda-intro-title"
      className="relative overflow-hidden bg-white py-14 text-[#111111] sm:py-16 lg:py-20"
    >
      <Container>
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-7 flex items-center justify-between gap-5 border-b border-[#E5E8EB] pb-5"
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#28A45A]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1769A4]">
              The Exhibition
            </span>
          </div>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748B] sm:block">
            {event.editionLabel}
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
          {/* LEFT */}
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="min-w-0"
          >
            <motion.p
              variants={REVEAL}
              className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748B]"
            >
              Uganda Buildcon International Expo
            </motion.p>

            <h2
              id="uganda-intro-title"
              aria-label="Where the Construction Industry Connects."
              className="font-heading text-[clamp(2.15rem,3.6vw,4rem)] font-extrabold leading-[1.13] tracking-[-0.055em]"
            >
              <AnimatedLine text="Where the" />
              <AnimatedLine
                text="Construction"
                className="text-[#1769A4]"
              />
              <AnimatedLine text="Industry" />
              <AnimatedLine text="Connects." />
            </h2>

            <motion.p
              variants={REVEAL}
              className="mt-6 max-w-[430px] text-[14px] leading-[1.85] text-[#58677B] sm:text-[15px]"
            >
              Bringing people, products and ideas
              together to create meaningful
              opportunities for the building and
              construction industry across Uganda
              and East Africa.
            </motion.p>

            <motion.div
              variants={REVEAL}
              className="mt-7 flex items-center gap-2"
              aria-hidden="true"
            >
              <motion.span
                className="h-[3px] w-16 origin-left bg-[#1769A4]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: EASE,
                }}
              />
              <span className="h-[3px] w-6 bg-[#28A45A]" />
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="min-w-0"
          >
            <motion.p
              variants={REVEAL}
              className="max-w-[650px] text-[14px] leading-[1.9] text-[#58677B] sm:text-[15px]"
            >
              <strong className="font-semibold text-[#111111]">
                {event.name}
              </strong>{" "}
              connects manufacturers, suppliers,
              contractors, architects, engineers
              and industry decision-makers on a
              dedicated B2B platform.
            </motion.p>

            <motion.p
              variants={REVEAL}
              className="mt-4 max-w-[650px] text-[14px] leading-[1.9] text-[#58677B] sm:text-[15px]"
            >
              Taking place{" "}
              <span className="font-semibold text-[#111111]">
                {event.dates.display}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-[#111111]">
                {event.venue.fullLocation}
              </span>
              , the exhibition brings together
              construction machinery, building
              materials, architectural solutions
              and emerging technologies.
            </motion.p>

            <div className="mt-7 border-t border-[#E5E8EB]">
              <FeatureRow
                number="01"
                title="Industry Connections"
                description="Meet professionals, suppliers and decision-makers working across the construction value chain."
              />

              <FeatureRow
                number="02"
                title="Business Opportunities"
                description="Discover solutions, explore partnerships and build relationships in Uganda and East Africa."
              />
            </div>

            <motion.div
              variants={REVEAL}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/about"
                className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-lg bg-[#1769A4] px-5 py-2.5 text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
              >
                Explore the Exhibition

                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight />
                </span>
              </Link>

              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-[#DDE4EA] bg-white px-5 py-2.5 text-[12px] font-bold text-[#111111] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#28A45A] hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* BLACK ARCHITECTURAL BAND */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mt-11 overflow-hidden rounded-xl bg-[#0D0D0D] sm:mt-12 lg:mt-14"
        >
          <div className="relative grid min-h-[175px] items-center gap-5 px-6 py-7 sm:px-8 lg:grid-cols-2 lg:px-11">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: EASE,
              }}
              className="relative z-10"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28A45A]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Building the Future
                </span>
              </div>

              <p className="max-w-[470px] font-heading text-[clamp(1.25rem,1.9vw,1.8rem)] font-semibold leading-[1.35] tracking-[-0.035em] text-white">
                Connecting the people shaping
                tomorrow&apos;s built environment.
              </p>

              <p className="mt-3 text-[12px] text-white/55">
                {event.venue.city}, Uganda
                <span className="mx-2 text-white/25">/</span>
                {event.dates.display}
              </p>
            </motion.div>

            <div className="relative h-[135px] overflow-hidden lg:h-[185px]">
              <ArchitecturalDrawing />
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-24 origin-left bg-[#28A45A]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: EASE,
            }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
