
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

const STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
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
      duration: 0.85,
      ease: EASE,
    },
  },
};

const WORD: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

/* ==============================================
   ICONS
============================================== */

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
      className="h-[17px] w-[17px]"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
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
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[16px] w-[16px]"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
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
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[16px] w-[16px]"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==============================================
   WORD-BY-WORD HEADING
============================================== */

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.trim().split(/\s+/).map((word, index, words) => (
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

/* ==============================================
   ORIGINAL SVG — PREMIUM CONTINUOUS MOTION

   Preserved:
   - All original paths
   - Orbital center: 575,205
   - Blue and green traces
   - Concentric rings
   - Original artwork dimensions
============================================== */

function FinalCtaArtwork({
  reduced,
}: {
  reduced: boolean;
}) {
  return (
    <svg
      viewBox="0 0 780 500"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="final-cta-line"
          x1="90"
          y1="400"
          x2="700"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1769A4" />
          <stop offset=".65" stopColor="#1769A4" />
          <stop offset="1" stopColor="#28A45A" />
        </linearGradient>

        <radialGradient id="final-cta-glow">
          <stop stopColor="#1769A4" stopOpacity=".20" />
          <stop
            offset="1"
            stopColor="#1769A4"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <ellipse
        cx="535"
        cy="245"
        rx="300"
        ry="250"
        fill="url(#final-cta-glow)"
      />

      {/* Original contour lines */}
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={`contour-${index}`}
          d={`M-100 ${340 + index * 23}
              C90 ${230 + index * 21}
               200 ${465 + index * 12}
               410 ${300 + index * 17}
              S690 ${190 + index * 14}
               870 ${260 + index * 18}`}
          stroke="#FFFFFF"
          strokeOpacity=".13"
          strokeWidth="1.1"
        />
      ))}

      {/* Blue travelling trace */}
      <motion.path
        d="M-100 340C90 230 200 465 410 300S690 190 870 260"
        stroke="url(#final-cta-line)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="95 1600"
        initial={false}
        animate={
          reduced
            ? undefined
            : { strokeDashoffset: [0, -1695] }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Green travelling trace */}
      <motion.path
        d="M-100 386C90 272 200 489 410 334S690 218 870 296"
        stroke="#28A45A"
        strokeOpacity=".8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="65 1600"
        initial={false}
        animate={
          reduced
            ? undefined
            : { strokeDashoffset: [0, -1665] }
        }
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Original concentric circles */}
      {[115, 155, 195].map((radius) => (
        <circle
          key={radius}
          cx="575"
          cy="205"
          r={radius}
          stroke="#FFFFFF"
          strokeOpacity=".12"
          strokeWidth="1"
        />
      ))}

      {/* Slowly rotating orbital assembly */}
      <motion.g
        initial={false}
        animate={
          reduced ? undefined : { rotate: 360 }
        }
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "575px 205px",
          transformBox: "view-box",
        }}
      >
        <path
          d="M380 205A195 195 0 0 1 770 205"
          stroke="#1769A4"
          strokeOpacity=".75"
          strokeWidth="2"
        />

        <circle
          cx="575"
          cy="10"
          r="5.5"
          fill="#28A45A"
        />
      </motion.g>

      {/* Soft central node pulse */}
      <motion.circle
        cx="575"
        cy="205"
        r="5"
        fill="#28A45A"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                r: [4, 7, 4],
                opacity: [0.35, 1, 0.35],
              }
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==============================================
   CTA BUTTON

   Existing dimensions and destinations unchanged.
============================================== */

function CtaButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex min-h-12 min-w-[185px]",
        "items-center justify-center gap-5 rounded-md",
        "px-6 py-3 text-[13px] font-bold",
        "transition-[background-color,border-color,transform,box-shadow]",
        "duration-300",
        "hover:-translate-y-0.5",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-4",
        "focus-visible:outline-[#28A45A]",
        "motion-reduce:transform-none",
        primary
          ? "bg-[#1769A4] text-white hover:bg-[#105685] hover:shadow-[0_12px_24px_rgba(23,105,164,0.25)]"
          : "border border-white/25 bg-white/[0.04] text-white hover:border-[#28A45A] hover:bg-white/[0.09]",
      ].join(" ")}
    >
      {children}

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
    </Link>
  );
}

/* ==============================================
   FINAL CTA SECTION
============================================== */

export function FinalCtaSection() {
  const reduced = useReducedMotion() === true;

  return (
    <section
      aria-label="Event Participation and Registration"
      className="relative overflow-hidden border-b border-[#E6EAEE] bg-white py-12 text-[#111111] sm:py-14 lg:py-16"
    >
      <Container>
        {/* Fixed layout panel */}
        <motion.div
          initial={{
            opacity: 0,
            y: 22,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={{
            duration: 1,
            ease: EASE,
          }}
          className="relative isolate overflow-hidden rounded-xl bg-[#080808] text-white sm:rounded-2xl"
        >
          {/* =====================================
              ANIMATED SVG BACKGROUND
          ===================================== */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: EASE,
              }}
              className="absolute -right-[275px] top-1/2 h-[480px] w-[760px] -translate-y-1/2 opacity-[0.36] sm:-right-[210px] lg:-right-[125px]"
            >
              <div className="h-full w-full opacity-[0.8]">
                <FinalCtaArtwork reduced={reduced} />
              </div>
            </motion.div>

            {/* Contrast protection */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-transparent" />
          </div>

          {/* Animated green top accent */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: EASE,
            }}
            className="absolute left-0 top-0 h-[3px] w-28 origin-left bg-[#28A45A]"
          />

          {/* =====================================
              CONTENT
          ===================================== */}
          <div className="relative z-10 px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-12">
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
            >
              {/* LEFT */}
              <div className="max-w-[710px]">
                {/* Eyebrow */}
                <motion.div
                  variants={REVEAL}
                  className="mb-4 flex items-center gap-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28A45A]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/65">
                    {event.brandLines.main}
                  </span>
                </motion.div>

                {/* Word-by-word heading */}
                <motion.h2
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.06,
                      },
                    },
                  }}
                  aria-label="Be Part of What's Next."
                  className="font-heading text-[clamp(1.75rem,2.6vw,2.8rem)] font-bold leading-[1.18] tracking-[-0.045em] text-white"
                >
                  <span aria-hidden="true">
                    <AnimatedWords text="Be Part of What's" />
                    {" "}
                    <AnimatedWords
                      text="Next."
                      className="text-[#7ACB58]"
                    />
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={REVEAL}
                  className="mt-3 max-w-[585px] text-[13px] leading-[1.8] text-white/65 sm:text-[14px]"
                >
                  Connect with industry professionals,
                  explore business opportunities and
                  experience {event.name} at{" "}
                  {event.venue.name}.
                </motion.p>

                {/* Event metadata */}
                <motion.div
                  variants={REVEAL}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] font-medium text-white/65 sm:text-[12px]"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-[#7ACB58]">
                      <CalendarIcon />
                    </span>

                    {event.dates.display}
                  </span>

                  <span className="hidden h-3.5 w-px bg-white/20 sm:block" />

                  <span className="inline-flex items-center gap-2">
                    <span className="text-[#7ACB58]">
                      <LocationIcon />
                    </span>

                    {event.venue.fullLocation}
                  </span>
                </motion.div>
              </div>

              {/* RIGHT BUTTONS */}
              <motion.div
                variants={REVEAL}
                className="flex flex-col gap-3 sm:flex-row lg:flex-col"
              >
                <CtaButton
                  href={event.cta.bookStand}
                  primary
                >
                  Book a Stand
                </CtaButton>

                <CtaButton href={event.cta.registerVisit}>
                  Register to Visit
                </CtaButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
