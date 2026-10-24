
"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  motion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

/* =====================================================
   WHO WILL YOU MEET — MINIMAL PREMIUM SECTION
===================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const BUYER_GROUPS = [
  {
    num: "01",
    title: "Architects & Engineers",
    subtitle: "Specifiers & Consultants",
    tags: [
      "Architects & Planners",
      "Structural & Civil Engineers",
      "Consultants",
      "Urban Planners",
    ],
  },
  {
    num: "02",
    title: "Contractors & Builders",
    subtitle: "Execution Specialists",
    tags: [
      "Building Contractors",
      "Subcontractors",
      "Builders",
      "Safety Professionals",
    ],
  },
  {
    num: "03",
    title: "Importers & Distributors",
    subtitle: "Supply Chain & Wholesalers",
    tags: [
      "Importers",
      "Dealers & Distributors",
      "Retailers",
      "Sourcing Professionals",
    ],
  },
  {
    num: "04",
    title: "Developers & Owners",
    subtitle: "Capital Project Leaders",
    tags: [
      "Real Estate Developers",
      "Property Investors",
      "Investors & Financiers",
      "Hoteliers",
    ],
  },
  {
    num: "05",
    title: "Government & Institutions",
    subtitle: "Public & Private Sector",
    tags: [
      "Building Authorities",
      "Universities & Research Institutes",
      "Health Facilities",
    ],
  },
] as const;

/* =====================================================
   HYDRATION-SAFE REDUCED MOTION
===================================================== */

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  media.addEventListener("change", callback);

  return () =>
    media.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}

function useMotionPreference() {
  return useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    () => true
  );
}

/* =====================================================
   ANIMATION VARIANTS
===================================================== */

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

/* =====================================================
   ICONS
===================================================== */

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
      className="h-[17px] w-[17px] shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px] shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* =====================================================
   MINIMAL ANIMATED SVG

   Deliberately subtle:
   - Thin orbital lines
   - Moving blue/green tracing segments
   - Slow rotating marker
   - No network clutter or giant illustration
===================================================== */

function AnimatedAccent({
  reduced,
}: {
  reduced: boolean;
}) {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <circle
        cx="360"
        cy="205"
        r="174"
        stroke="#1769A4"
        strokeOpacity=".12"
        strokeWidth="1"
      />

      <circle
        cx="360"
        cy="205"
        r="134"
        stroke="#28A45A"
        strokeOpacity=".16"
        strokeWidth="1"
      />

      <circle
        cx="360"
        cy="205"
        r="92"
        stroke="#1769A4"
        strokeOpacity=".1"
        strokeWidth="1"
      />

      {/* Traveling arc */}
      <motion.circle
        cx="360"
        cy="205"
        r="174"
        stroke="#1769A4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="100 1094"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                strokeDashoffset: [0, -1194],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Second traveling arc */}
      <motion.circle
        cx="360"
        cy="205"
        r="134"
        stroke="#28A45A"
        strokeOpacity=".65"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="64 842"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                strokeDashoffset: [0, 906],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Slow orbital point */}
      <motion.g
        initial={false}
        animate={
          reduced
            ? undefined
            : { rotate: 360 }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "360px 205px",
        }}
      >
        <circle
          cx="360"
          cy="31"
          r="5"
          fill="#28A45A"
        />
      </motion.g>

      {/* Fine technical guide lines */}
      <path
        d="M360 0V420M0 205H560"
        stroke="#1769A4"
        strokeOpacity=".055"
        strokeWidth="1"
        strokeDasharray="4 9"
      />
    </svg>
  );
}

/* =====================================================
   REFINED BUYER ROW
===================================================== */

function BuyerRow({
  buyer,
}: {
  buyer: (typeof BUYER_GROUPS)[number];
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative border-b border-[#E4E9EC] py-6 sm:py-7"
    >
      <div className="grid items-start gap-4 sm:grid-cols-[44px_minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-6">
        {/* Number */}
        <span className="font-heading text-[12px] font-bold tracking-[0.08em] text-[#28A45A] sm:pt-1">
          {buyer.num}
        </span>

        {/* Title */}
        <div>
          <h3 className="font-heading text-[clamp(1.05rem,1.5vw,1.3rem)] font-bold leading-[1.3] tracking-[-0.035em] text-[#111111] transition-colors duration-300 group-hover:text-[#1769A4]">
            {buyer.title}
          </h3>

          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#8795A1]">
            {buyer.subtitle}
          </p>
        </div>

        {/* Roles */}
        <div className="flex flex-wrap gap-x-5 gap-y-2.5">
          {buyer.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 text-[12px] leading-[1.6] text-[#58677B]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A]/70" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover accent */}
      <span
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-[2px] w-20 origin-left scale-x-0 bg-[#1769A4] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* =====================================================
   MAIN SECTION
===================================================== */

export function WhoWillYouMeetSection() {
  const reduced = useMotionPreference();

  return (
    <section
      aria-labelledby="who-will-you-meet"
      className="relative isolate overflow-hidden border-b border-[#E4E9EC] bg-white py-16 text-[#111111] sm:py-20 lg:py-24"
    >
      {/* Background SVG */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-[220px] -top-[145px] h-[420px] w-[560px] opacity-[0.45] sm:-right-[110px] sm:h-[510px] sm:w-[680px] lg:-right-[80px] lg:opacity-[0.55]">
          <AnimatedAccent reduced={reduced} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/35" />
      </div>

      <Container className="relative z-10">
        {/* ==================================
            HEADER
        ================================== */}

        <motion.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
        >
          <div className="max-w-[760px]">
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[3px] w-9 bg-[#28A45A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1769A4] sm:text-[11px]">
                Visitor Profiles
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              id="who-will-you-meet"
              className="font-heading text-[clamp(2.15rem,3.6vw,3.75rem)] font-extrabold leading-[1.12] tracking-[-0.05em] text-[#111111]"
            >
              The People Behind
              <br />
              Every{" "}
              <span className="text-[#1769A4]">
                Project.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[590px] text-[14px] leading-[1.85] text-[#58677B] sm:text-[15px]"
            >
              Meet the professionals who design,
              build, develop, specify and source
              for Uganda&apos;s construction sector.
              Explore the key visitor groups
              attending Uganda Buildcon.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/who-should-visit"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#DCE5EA] bg-white px-5 py-3 text-[13px] font-bold text-[#111111] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#28A45A] hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
            >
              Visitor Guide
              <ArrowUpRightIcon />
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
            >
              Register to Visit
              <ArrowIcon />
            </Link>
          </motion.div>
        </motion.div>

        {/* ==================================
            BUYER DIRECTORY
        ================================== */}

        <motion.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-12 border-t border-[#E4E9EC] sm:mt-14"
        >
          {BUYER_GROUPS.map((buyer) => (
            <BuyerRow key={buyer.num} buyer={buyer} />
          ))}
        </motion.div>

        {/* ==================================
            QUIET FOOTER
        ================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-[640px] text-[12px] leading-[1.75] text-[#718396]">
            From early-stage planning to project delivery,
            Uganda Buildcon connects the people and
            organisations involved in the built environment.
          </p>

          <Link
            href={event.cta.registerVisit}
            className="group inline-flex items-center gap-2 border-b border-[#1769A4]/35 pb-1 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#28A45A]"
          >
            Get Visitor Pass
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
