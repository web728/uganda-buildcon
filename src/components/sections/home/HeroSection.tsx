
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";

/* ===================================================
   PREMIUM EDITORIAL HERO
   - Word-by-word bottom-to-top reveal
   - Fixed-frame image with center zoom
   - Screenshot-inspired labels and accents
   - Subtle architectural SVG background
=================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;
const YEAR = event.dates.start.slice(0, 4);

const TITLE = event.name.includes(YEAR)
  ? event.name.replace(YEAR, "").trim()
  : event.name;

const TITLE_MATCH = TITLE.match(/^(.*?Buildcon)\s*(.*)$/i);

const FIRST_LINE = TITLE_MATCH
  ? TITLE_MATCH[1]
  : TITLE;

const SECOND_LINE = TITLE_MATCH
  ? TITLE_MATCH[2]
  : "";

const CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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

/* ===================================================
   ICONS
=================================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
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
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
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
      className="h-[17px] w-[17px]"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

/* ===================================================
   WORD REVEAL
   Each word rises within its own clipped wrapper.
=================================================== */

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
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
          {index < words.length - 1 && (
            <span aria-hidden="true">
              {"\u00A0"}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

/* ===================================================
   ARCHITECTURAL BACKGROUND
   Grid + traced architectural contours.
=================================================== */

const CURVE_PATHS = [
  "M-110 370 C155 270 310 475 590 390 S1080 305 1540 405",
  "M-110 392 C155 292 310 497 590 412 S1080 327 1540 427",
  "M-110 414 C155 314 310 519 590 434 S1080 349 1540 449",
  "M-110 436 C155 336 310 541 590 456 S1080 371 1540 471",
];

function BackgroundArt() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#FBFCFD]" />

      {/* Architectural drawing grid */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16,36,62,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,36,62,.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <svg
        viewBox="0 0 1440 680"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id="hero-architectural-curve"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="#1769A4"
              stopOpacity=".07"
            />
            <stop
              offset=".55"
              stopColor="#1769A4"
              stopOpacity=".24"
            />
            <stop
              offset="1"
              stopColor="#28A45A"
              stopOpacity=".22"
            />
          </linearGradient>
        </defs>

        {/* Large architectural guide circles */}
        <circle
          cx="-45"
          cy="665"
          r="315"
          stroke="#28A45A"
          strokeOpacity=".12"
          strokeWidth="1"
        />

        <circle
          cx="-45"
          cy="665"
          r="255"
          stroke="#1769A4"
          strokeOpacity=".10"
          strokeWidth="1"
          strokeDasharray="6 14"
        />

        <circle
          cx="1470"
          cy="-80"
          r="350"
          stroke="#1769A4"
          strokeOpacity=".11"
          strokeWidth="1"
        />

        <circle
          cx="1470"
          cy="-80"
          r="270"
          stroke="#28A45A"
          strokeOpacity=".09"
          strokeWidth="1"
        />

        {/* Fine background contours */}
        {CURVE_PATHS.map((path) => (
          <path
            key={path}
            d={path}
            stroke="url(#hero-architectural-curve)"
            strokeWidth="1"
          />
        ))}

        {/* Moving red drawing trace */}
        <motion.path
          d={CURVE_PATHS[0]}
          stroke="#1769A4"
          strokeOpacity=".28"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="80 2200"
          initial={false}
          animate={{
            strokeDashoffset: [0, -2280],
          }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Moving green drawing trace */}
        <motion.path
          d={CURVE_PATHS[2]}
          stroke="#28A45A"
          strokeOpacity=".28"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="55 2200"
          initial={false}
          animate={{
            strokeDashoffset: [0, -2255],
          }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Quiet scanning lines */}
        <motion.path
          d="M790 0V680"
          stroke="#1769A4"
          strokeOpacity=".08"
          strokeWidth="1"
          strokeDasharray="5 14"
          initial={false}
          animate={{
            opacity: [0.2, 0.75, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

/* ===================================================
   META BLOCK
=================================================== */

function MetaItem({
  icon,
  label,
  title,
  subtitle,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  subtitle: string;
  accent: "red" | "green";
}) {
  const isRed = accent === "red";

  return (
    <div className="flex min-w-0 items-start gap-3">
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          isRed
            ? "bg-[#1769A4]/[0.07] text-[#1769A4]"
            : "bg-[#28A45A]/[0.07] text-[#28A45A]",
        ].join(" ")}
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#84909D]">
          {label}
        </p>

        <p className="mt-1 text-[12px] font-bold leading-[1.45] text-[#101214] sm:text-[13px]">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-[1.45] text-[#687685]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ===================================================
   IMAGE
   Outer layout is stationary.
   Actual image scales from center.
=================================================== */

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[525px] lg:ml-auto lg:mr-0">
      {/* Image outside decoration */}
      <motion.span
        initial={{ opacity: 0, x: -9 }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.75,
          delay: 0.75,
          ease: EASE,
        }}
        aria-hidden="true"
        className="absolute -left-6 top-1/2 hidden -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9AA5AE] lg:block [writing-mode:vertical-rl]"
      >
        BUILDCON / {YEAR}
      </motion.span>

      {/* White category label protrudes outside frame */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.7,
          ease: EASE,
        }}
        className="absolute -top-3 right-5 z-30 flex items-center gap-2 border border-[#E8ECF0] bg-white px-4 py-2.5 shadow-[0_7px_23px_rgba(0,0,0,0.045)] sm:right-7"
      >
        <span className="h-2 w-2 rounded-full bg-[#28A45A]" />

        <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#101214] sm:text-[10px]">
          Building & Construction
        </span>
      </motion.div>

      {/* FIXED image frame */}
      <div className="relative overflow-hidden rounded-[10px] bg-[#B6C1CD]">
        <div className="relative h-[300px] sm:h-[365px] lg:h-[395px] xl:h-[420px]">
          {/* Actual center zoom */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.91,
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
                duration: 0.95,
                ease: EASE,
              },
              scale: {
                duration: 1.8,
                ease: EASE,
              },
            }}
            style={{
              transformOrigin: "50% 50%",
            }}
            className="absolute inset-0 transform-gpu"
          >
            <Image
              src="/images/home/skyline-construction.jpg"
              alt="Building and construction industry representing Buildcon International Expo"
              fill
              priority
              quality={75}
              sizes="(min-width: 1280px) 525px, (min-width: 1024px) 45vw, (min-width: 640px) 525px, 100vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Top image identifier */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: EASE,
            }}
            className="absolute left-5 top-5 z-10 flex items-center gap-2.5"
          >
            <span className="h-px w-7 bg-white/90" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              EXPO / {YEAR.slice(-2)}
            </span>
          </motion.div>

          {/* Bottom dark area */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0A0D11] via-[#0A0D11]/75 to-transparent" />

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: 0.75,
              ease: EASE,
            }}
            className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/65">
              The Industry Meets Here
            </p>

            <p className="mt-1.5 font-heading text-[19px] font-bold tracking-[-0.035em] text-white sm:text-[21px]">
              {event.venue.city}, {event.venue.country}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative red and green underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: EASE,
        }}
        className="ml-5 mt-1.5 flex h-[3px] w-[150px] origin-left sm:w-[170px]"
        aria-hidden="true"
      >
        <span className="h-full w-[70%] bg-[#1769A4]" />
        <span className="h-full w-[30%] bg-[#28A45A]" />
      </motion.div>
    </div>
  );
}

/* ===================================================
   MAIN HERO SECTION
=================================================== */

export function HeroSection() {
  return (
    <section
      aria-labelledby="buildcon-hero-heading"
      className="relative isolate overflow-hidden border-b border-[#E8ECF0] bg-[#FBFCFD] text-[#101214]"
    >
      <BackgroundArt />

      <div
        className="
          container-premium
          relative z-10
          grid grid-cols-1
          items-center
          gap-9
          py-12
          sm:gap-10 sm:py-14
          lg:min-h-[550px]
          lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
          lg:gap-10 lg:py-12
          xl:gap-14 xl:py-14
        "
      >
        {/* LEFT COLUMN */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="min-w-0"
        >
          {/* Eyebrow */}
          <motion.div
            variants={REVEAL}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-[#1769A4]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#1769A4] sm:text-[11px]">
              {event.editionLabel}
            </span>

           
          </motion.div>

          {/* Word-by-word animated heading */}
          <h1
            id="buildcon-hero-heading"
            aria-label={`${TITLE} ${YEAR}`}
            className="max-w-[680px] font-heading leading-[1.07] tracking-[-0.055em]"
          >
            <span
              aria-hidden="true"
              className="block text-[clamp(2.15rem,3.65vw,4.15rem)] font-extrabold text-[#101214]"
            >
              <AnimatedWords text={FIRST_LINE} />
            </span>

            {SECOND_LINE && (
              <span
                aria-hidden="true"
                className="mt-2 block text-[clamp(1.65rem,2.65vw,3.05rem)] font-semibold tracking-[-0.045em] text-[#172333]"
              >
                <AnimatedWords text={SECOND_LINE} />
              </span>
            )}
          </h1>

          {/* Date and brand descriptor */}
          <motion.div
            variants={REVEAL}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <time
              dateTime={event.dates.start}
              className="font-heading text-[clamp(1.4rem,2.05vw,2.1rem)] font-bold tracking-[-0.055em] text-[#1769A4]"
            >
              {event.dates.display}
            </time>

            <span
              aria-hidden="true"
              className="h-9 w-[2px] bg-[#28A45A]"
            />

            <span className="max-w-[130px] text-[10px] font-bold uppercase leading-[1.55] tracking-[0.08em] text-[#84909B]">
              Building
              <br />
              Construction
              <br />
              Innovation
            </span>
          </motion.div>

          {/* Tricolor brand underline */}
          <motion.div
            variants={REVEAL}
            className="mt-4 flex h-[3px] w-[140px]"
            aria-hidden="true"
          >
            <span className="h-full w-[65%] bg-[#1769A4]" />
            <span className="h-full w-[27%] bg-[#28A45A]" />
            <span className="h-full w-[8%] bg-[#101214]" />
          </motion.div>

          {/* Supporting brand line */}
          <motion.p
            variants={REVEAL}
            className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#1769A4] sm:text-[11px]"
          >
            Building the Future. Together.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={REVEAL}
            className="mt-3 max-w-[590px] text-[13px] leading-[1.85] text-[#586779] sm:text-[14px]"
          >
            {event.descriptor}
          </motion.p>

          {/* Event details */}
        <motion.div
  variants={REVEAL}
  className="mt-5 w-full max-w-[320px] rounded-xl border border-[#E7EBEF] bg-white/90 p-4 shadow-[0_8px_28px_rgba(16,36,62,0.035)]"
>
  <MetaItem
    icon={<PinIcon />}
    label="Event Venue"
    title={event.venue.name}
    subtitle={`${event.venue.city}, ${event.venue.country}`}
    accent="green"
  />
</motion.div>

          {/* Action buttons */}
          <motion.div
            variants={REVEAL}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-[7px] bg-[#1769A4] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.02em] text-white shadow-[0_10px_24px_rgba(197,31,49,0.14)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] hover:shadow-[0_14px_27px_rgba(197,31,49,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
            >
              Book a Stand
              <ArrowIcon diagonal />
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-[7px] border border-[#D7DDE3] bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.02em] text-[#101214] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#1769A4] hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
            >
              Register to Visit
              <ArrowIcon />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <HeroVisual />
      </div>
    </section>
  );
}
