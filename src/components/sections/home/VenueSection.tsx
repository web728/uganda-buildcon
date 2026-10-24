
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

/* =====================================================
   VENUE SECTION
   Premium Minimal / Smooth Scroll Animations

   Original:
   - Layout
   - Map
   - Event data
   - Blue/green colors
   - Section sizing

   All preserved.
===================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.06,
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
      duration: 0.85,
      ease: EASE,
    },
  },
};

const WORD: Variants = {
  hidden: {
    opacity: 0,
    y: "115%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

const WORD_STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.105,
      delayChildren: 0.1,
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
      className="h-4 w-4 shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

/* =====================================================
   WORD-BY-WORD HEADING ANIMATION

   Each word rises from below in its own clipped area.
   Heading does not change position or layout.
===================================================== */

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.trim().split(/\s+/).filter(Boolean);

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

          {index < words.length - 1
            ? "\u00A0"
            : null}
        </span>
      ))}
    </span>
  );
}

/* =====================================================
   ORIGINAL BLUE-GREEN SVG
   More refined continuous tracing animation
===================================================== */

const VENUE_LINES = [
  "M-40 165C120 50 220 280 360 130S520 80 620 130",
  "M-40 190C120 75 220 295 360 145S520 100 620 150",
  "M-40 215C120 100 220 310 360 160S520 120 620 170",
];

function VenueLineArtwork() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 560 260"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="venue-line-blue-green"
          x1="0"
          y1="0"
          x2="560"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1769A4" stopOpacity=".55" />
          <stop
            offset=".65"
            stopColor="#1769A4"
            stopOpacity=".42"
          />
          <stop
            offset="1"
            stopColor="#28A45A"
            stopOpacity=".58"
          />
        </linearGradient>
      </defs>

      {/* Original architectural curves */}
      {VENUE_LINES.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke="#1769A4"
          strokeOpacity=".12"
          strokeWidth="1"
          initial={false}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7 + index * 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Blue travelling trace */}
      <motion.path
        d={VENUE_LINES[0]}
        stroke="url(#venue-line-blue-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="80 1500"
        initial={false}
        animate={{
          strokeDashoffset: [0, -1580],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Green travelling trace */}
      <motion.path
        d={VENUE_LINES[1]}
        stroke="#28A45A"
        strokeOpacity=".55"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="45 1550"
        initial={false}
        animate={{
          strokeDashoffset: [0, -1595],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Location marker */}
      <circle
        cx="360"
        cy="130"
        r="11"
        stroke="#1769A4"
        strokeOpacity=".22"
      />

      <motion.circle
        cx="360"
        cy="130"
        r="4"
        fill="#28A45A"
        initial={false}
        animate={{
          r: [4, 6, 4],
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* =====================================================
   VENUE DETAIL ROW
===================================================== */

function VenueDetail({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={REVEAL}
      className="group flex items-start gap-3 border-b border-[#E7EBEF] py-4"
    >
      <span className="mt-0.5 shrink-0 text-[#1769A4] transition-colors duration-300 group-hover:text-[#28A45A]">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8693A0]">
          {label}
        </p>

        <p className="mt-1 text-[13px] font-semibold leading-[1.65] text-[#152435] sm:text-[14px]">
          {children}
        </p>
      </div>
    </motion.div>
  );
}

/* =====================================================
   FIXED MAP FRAME WITH CENTER REVEAL

   Outer frame remains in its exact position.
   Only the map content scales softly from center.
===================================================== */

function VenueMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.85,
        ease: EASE,
      }}
      className="relative min-w-0"
    >
      {/* Map label */}
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1769A4]">
          Venue Map
        </span>

        <span className="text-[11px] text-[#8996A2]">
          {event.venue.city}
        </span>
      </div>

      {/* Fixed frame: original dimensions */}
      <div className="relative h-[300px] overflow-hidden rounded-lg border border-[#E0E7EC] bg-[#EEF2F5] sm:h-[360px] lg:h-[380px]">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            opacity: {
              duration: 0.9,
              ease: EASE,
            },
            scale: {
              duration: 1.3,
              ease: EASE,
            },
          }}
          style={{
            transformOrigin: "50% 50%",
          }}
          className="absolute inset-0"
        >
          <iframe
            title={`Map of ${event.venue.name}, ${event.venue.city}`}
            src={event.venue.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =====================================================
   MAIN VENUE SECTION
===================================================== */

export function VenueSection() {
  const heading = `See You in ${event.venue.city}.`;

  return (
    <section
      aria-labelledby="venue-heading"
      className="relative isolate overflow-hidden border-b border-[#E7EBEF] bg-white py-14 text-[#111111] sm:py-16 lg:py-20"
    >
      {/* Original background SVG placement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-140px] top-[-40px] h-[240px] w-[520px] opacity-[0.45] sm:right-[-60px] sm:w-[600px]"
      >
        <VenueLineArtwork />
      </div>

      <Container className="relative z-10">
        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col gap-5 border-b border-[#E7EBEF] pb-6 sm:mb-9 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="max-w-[660px]"
          >
            {/* Eyebrow */}
            <motion.div
              variants={REVEAL}
              className="mb-3.5 flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-[#28A45A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1769A4]">
                Event Venue
              </span>
            </motion.div>

            {/* Word-by-word animated heading */}
            <motion.h2
              id="venue-heading"
              aria-label={heading}
              variants={WORD_STAGGER}
              className="font-heading text-[clamp(1.85rem,2.9vw,2.85rem)] font-bold leading-[1.15] tracking-[-0.045em] text-[#111111]"
            >
              <span aria-hidden="true">
                <AnimatedWords text="See You in" />
                {" "}
                <AnimatedWords
                  text={`${event.venue.city}.`}
                  className="text-[#1769A4]"
                />
              </span>
            </motion.h2>

            {/* Supporting text */}
            <motion.p
              variants={REVEAL}
              className="mt-3 max-w-[575px] text-[13px] leading-[1.8] text-[#647385] sm:text-[14px]"
            >
              Find the exhibition venue, check the
              event dates and plan your journey to
              Uganda Buildcon.
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.16,
              ease: EASE,
            }}
          >
            <Link
              href="/plan-your-visit"
              className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-md bg-[#1769A4] px-5 py-2.5 text-[12px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
            >
              Plan Your Visit

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* =====================================
            MAIN TWO-COLUMN LAYOUT
        ===================================== */}

        <div className="grid items-stretch gap-7 lg:grid-cols-[minmax(0,0.83fr)_minmax(0,1.17fr)] lg:gap-10">
          {/* LEFT VENUE DETAILS */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.18,
            }}
            className="flex min-w-0 flex-col justify-between"
          >
            <div>
              <motion.div variants={REVEAL}>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#28A45A]">
                  Official Location
                </p>

                <h3 className="mt-2 font-heading text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-[1.25] tracking-[-0.035em] text-[#111111]">
                  {event.venue.name}
                </h3>

                <p className="mt-1.5 text-[13px] font-semibold text-[#1769A4]">
                  {event.venue.city},{" "}
                  {event.venue.country}
                </p>
              </motion.div>

              <div className="mt-5 border-t border-[#E7EBEF]">
                <VenueDetail
                  icon={<LocationIcon />}
                  label="Venue Location"
                >
                  {event.venue.fullLocation}
                </VenueDetail>

                <VenueDetail
                  icon={<CalendarIcon />}
                  label="Exhibition Dates"
                >
                  {event.dates.display}
                </VenueDetail>
              </div>
            </div>

            <motion.div
              variants={REVEAL}
              className="mt-6"
            >
              <a
                href={event.venue.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-b border-[#1769A4]/40 pb-1 text-[12px] font-bold text-[#1769A4] transition-colors hover:border-[#28A45A] hover:text-[#28A45A]"
              >
                Open in Google Maps

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT FIXED MAP */}
          <VenueMap />
        </div>
      </Container>
    </section>
  );
}
