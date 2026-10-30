
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

import {
  marketFacts,
  opportunityCategories,
  type MarketFact,
} from "@/data/marketFacts";

/* =========================================================
   WHY UGANDA — PREMIUM MOTION EDITION

   Important:
   Official Buildcon SVG geometry is preserved.
   No brand shape or colour changes.

   - Word-by-word scroll reveal
   - Animated official brand SVG
   - Real 0 -> target counters
   - Staggered market facts
   - Seamless focus area marquee
========================================================= */

const BLACK = "#080808";
const BLUE = "#1769A4";
const GREEN = "#28A45A";
const LIME = "#7ACB58";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.105,
      delayChildren: 0.05,
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
      duration: 0.8,
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
      duration: 0.85,
      ease: EASE,
    },
  },
};

/* =========================================================
   ICONS
========================================================= */

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
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function TrendIcon() {
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
      <path d="m3 17 6-6 4 4 8-9" />
      <path d="M15 6h6v6" />
    </svg>
  );
}

/* =========================================================
   ANIMATED HEADING WORDS

   Each word reveals upwards inside an overflow
   hidden wrapper. No layout shifting.
========================================================= */

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

/* =========================================================
   SMOOTH MARKET FACT COUNTER

   Supports:
   6.0%
   26.77%
   1,200+
   $5.2B

   Initial number always 0.
   Counts gradually and stops at exact target.
========================================================= */

function AnimatedCounter({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
  });

  const match = value.match(
    /-?\d[\d,]*(?:\.\d+)?/
  );

  const numericText = match?.[0] ?? "";

  const target = Number(
    numericText.replace(/,/g, "")
  );

  const valid =
    match !== null && Number.isFinite(target);

  const decimals =
    numericText.split(".")[1]?.length ?? 0;

  const prefix = match
    ? value.slice(0, match.index ?? 0)
    : "";

  const suffix = match
    ? value.slice(
        (match.index ?? 0) + numericText.length
      )
    : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !valid) return;

    // Do not jump directly to final number.
    // Count visibly increases, even on systems
    // where reduced-motion is enabled.
    const controls = animate(0, target, {
      duration: 2.8,
      delay,
      ease: "linear",

      onUpdate(latest) {
        setCount(latest);
      },

      onComplete() {
        setCount(target);
      },
    });

    return () => controls.stop();
  }, [inView, valid, target, delay]);

  if (!valid) {
    return <span>{value}</span>;
  }

  const displayNumber = count.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  );

  return (
    <span
      ref={ref}
      className="whitespace-nowrap tabular-nums"
      aria-label={value}
    >
      <span aria-hidden="true">
        {prefix}
        {displayNumber}
        {suffix}
      </span>
    </span>
  );
}

/* =========================================================
   OFFICIAL BUILDCON SVG

   EXACT ORIGINAL GEOMETRY RETAINED.

   Top blue fan:
   M400,400 L275,100 A340,340 0 0,1 525,100 Z

   Green triangle:
   465,370 655,80 655,470

   Lower green fan:
   M400,400 L95,475 A330,330 0 0,0 270,710 Z

   Centre:
   400,400

   Only animation behaviour has been refined.
========================================================= */

function AnimatedBuildconSVG({
  reduced,
}: {
  reduced: boolean;
}) {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <defs>
        <radialGradient
          id="uganda-why-official-glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stopColor={BLUE}
            stopOpacity=".17"
          />
          <stop
            offset="100%"
            stopColor={BLUE}
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <circle
        cx="400"
        cy="400"
        r="365"
        fill="url(#uganda-why-official-glow)"
      />

      {/* ----------------------------------
          ROTATING ORIGINAL OUTER ORBIT
      ---------------------------------- */}

      <motion.g
        initial={false}
        animate={
          reduced ? undefined : { rotate: 360 }
        }
        transition={{
          duration: 58,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      >
        <path
          d="M180,210 A320,320 0 0,1 620,210"
          stroke="#FFFFFF"
          strokeOpacity=".30"
          strokeWidth="1.25"
        />

        <circle
          cx="280"
          cy="140"
          r="6"
          fill={BLUE}
        />

        <circle
          cx="580"
          cy="170"
          r="8"
          fill={LIME}
        />

        <path
          d="M130,340 A320,320 0 0,1 360,90"
          stroke="#FFFFFF"
          strokeOpacity=".28"
          strokeWidth="1"
        />

        <circle
          cx="160"
          cy="270"
          r="9"
          fill={LIME}
        />

        <circle
          cx="165"
          cy="400"
          r="8"
          fill={BLUE}
        />

        <path
          d="M480,680 A320,320 0 0,0 710,510"
          stroke="#FFFFFF"
          strokeOpacity=".27"
          strokeWidth="1"
        />

        <circle
          cx="560"
          cy="620"
          r="8"
          fill={GREEN}
        />
      </motion.g>

      {/* ----------------------------------
          REVERSE ORBIT
      ---------------------------------- */}

      <motion.g
        initial={false}
        animate={
          reduced
            ? undefined
            : { rotate: -360 }
        }
        transition={{
          duration: 74,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="345"
          stroke="#FFFFFF"
          strokeOpacity=".13"
          strokeWidth="1"
          strokeDasharray="5 15"
        />

        <circle
          cx="400"
          cy="55"
          r="5"
          fill={GREEN}
        />
      </motion.g>

      {/* ----------------------------------
          OFFICIAL TOP BLUE FAN
      ---------------------------------- */}

      <motion.path
        d="M400,400 L275,100 A340,340 0 0,1 525,100 Z"
        fill={BLUE}
        opacity=".95"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.022, 1],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      />

      {/* ----------------------------------
          OFFICIAL GREEN TRIANGLE
      ---------------------------------- */}

      <motion.polygon
        points="465,370 655,80 655,470"
        fill={GREEN}
        opacity=".94"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.018, 1],
              }
        }
        transition={{
          duration: 7,
          delay: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      />

      {/* ----------------------------------
          OFFICIAL LOWER GREEN FAN
      ---------------------------------- */}

      <motion.path
        d="M400,400 L95,475 A330,330 0 0,0 270,710 Z"
        fill={GREEN}
        opacity=".89"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.022, 1],
              }
        }
        transition={{
          duration: 6.5,
          delay: 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      />

      {/* ORIGINAL INNER GREEN SECTORS */}

      <path
        d="M400,400 L210,340 A205,205 0 0,0 280,560 Z"
        fill="#208749"
        opacity=".85"
      />

      <path
        d="M400,400 L510,480 A205,205 0 0,1 465,565 Z"
        fill={GREEN}
        opacity=".87"
      />

      {/* ORIGINAL CENTRAL TRACKS */}

      <circle
        cx="400"
        cy="400"
        r="140"
        stroke="#FFFFFF"
        strokeOpacity=".34"
        strokeWidth="1.5"
      />

      <circle
        cx="400"
        cy="400"
        r="125"
        stroke="#FFFFFF"
        strokeOpacity=".90"
        strokeWidth="3.5"
      />

      {/* CENTER PULSE */}

      <motion.circle
        cx="400"
        cy="400"
        r="105"
        fill={BLUE}
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                r: [105, 110, 105],
                fill: [
                  BLUE,
                  "#105685",
                  BLUE,
                ],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* =========================================================
   BACKGROUND SVG ENTRANCE

   SVG stays in its exact position.
   Reveal uses only subtle scale + opacity.
========================================================= */

function OfficialArtwork({
  reduced,
}: {
  reduced: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -right-40 -top-36 h-[520px] w-[520px] rounded-full bg-[#1769A4]/[0.07] blur-[100px]" />

      <div className="absolute -bottom-44 -left-36 h-[420px] w-[420px] rounded-full bg-[#28A45A]/[0.045] blur-[100px]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.94,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 1.65,
          ease: EASE,
        }}
        className="
          absolute
          -right-[280px]
          top-1/2
          h-[780px]
          w-[780px]
          -translate-y-1/2
          opacity-[0.24]
          sm:-right-[220px]
          sm:h-[900px]
          sm:w-[900px]
          lg:-right-[170px]
          lg:h-[1050px]
          lg:w-[1050px]
          xl:-right-[130px]
        "
      >
        <div className="h-full w-full opacity-[0.27] lg:opacity-[0.34]">
          <AnimatedBuildconSVG reduced={reduced} />
        </div>
      </motion.div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "65px 65px",
          maskImage:
            "linear-gradient(to right, transparent, black 45%, black)",
        }}
      />

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-[#080808]/45 to-transparent" />
    </div>
  );
}

/* =========================================================
   MARKET FACT CARD

   Clean premium cards with staggered scroll reveal.
========================================================= */

function MarketFactCard({
  fact,
  index,
}: {
  fact: MarketFact;
  index: number;
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="
        group
        relative
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-white/[0.035]
        p-5
        transition-[border-color,background-color,transform]
        duration-300
        hover:-translate-y-1
        hover:border-[#1769A4]/45
        hover:bg-white/[0.06]
        motion-reduce:transform-none
        sm:p-6
      "
    >
      {/* Top accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#28A45A] transition-transform duration-500 group-hover:scale-x-100"
      />
 

      {/* Animated numeric value */}
      <p className="mt-5 font-heading text-[clamp(2rem,3vw,2.8rem)] font-extrabold leading-none tracking-[-0.055em] text-white">
        <AnimatedCounter
          value={fact.value}
          delay={index * 0.14}
        />
      </p>

      <h3 className="mt-3 font-heading text-[14px] font-bold leading-[1.4] text-white sm:text-[15px]">
        {fact.label}
      </h3>

      {fact.detail && (
        <p className="mt-2 text-[12px] leading-[1.7] text-white/60">
          {fact.detail}
        </p>
      )}

     
      
    </motion.article>
  );
}

/* =========================================================
   SEAMLESS FOCUS AREA MARQUEE

   Pixel based width measurement.
   No repeated jump at loop boundary.
========================================================= */


function FocusAreas({
  reduced: _reduced,
}: {
  reduced: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [trackWidth, setTrackWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const x = useMotionValue(0);

  useEffect(() => {
    const element = trackRef.current;
    if (!element) return;

    const measure = () => {
      setTrackWidth(element.getBoundingClientRect().width);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || trackWidth <= 0) return;

    // Smooth continuous scrolling
    const speed = 36; // pixels per second
    const distance = (speed * Math.min(delta, 64)) / 1000;

    const next = x.get() - distance;

    // Seamless wrapping
    x.set(
      next <= -trackWidth
        ? ((next % trackWidth) + trackWidth) % trackWidth - trackWidth
        : next
    );
  });

  if (opportunityCategories.length === 0) {
    return null;
  }

  const renderItems = (prefix: string) =>
    opportunityCategories.map((category, index) => (
      <span
        key={`${prefix}-${index}`}
        className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-[12px] font-medium text-white/75"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A]" />
        {category}
      </span>
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        ease: EASE,
      }}
      className="mt-8 overflow-hidden border-y border-white/10 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Heading unchanged */}
        <div className="relative z-10 flex shrink-0 items-center gap-3 lg:pr-8">
          <span className="h-2 w-2 rounded-full bg-[#28A45A]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            Key Focus Areas
          </span>
        </div>

        {/* Infinite scrolling content */}
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <motion.div
            className="flex w-max items-center"
            style={{ x }}
          >
            {/* Original items */}
            <div
              ref={trackRef}
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {renderItems("original")}
            </div>

            {/* Duplicate for seamless looping */}
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {renderItems("duplicate")}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}


/* =========================================================
   MAIN SECTION
========================================================= */

export function WhyUgandaSection() {
  const reduced = useReducedMotion() === true;

  return (
    <section
      aria-labelledby="why-uganda-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#080808] py-14 text-white sm:py-16 lg:py-20"
      style={{ backgroundColor: BLACK }}
    >
      {/* Official branded SVG */}
      <OfficialArtwork reduced={reduced} />

      <Container className="relative z-10">
        {/* =========================================
            HEADER
        ========================================= */}

   
<motion.div
  variants={STAGGER}
  initial="hidden"
  whileInView="visible"
  viewport={{
    once: true,
    amount: 0.2,
  }}
  className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end md:justify-between"
>
  <div className="max-w-[730px]">
    <motion.div
      variants={REVEAL}
      className="mb-5 flex items-center gap-3"
    >
      <span className="h-[3px] w-9 bg-[#28A45A]" />

      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7ACB58] sm:text-[11px]">
        Why Uganda
      </span>
    </motion.div>

    <h2
      id="why-uganda-heading"
      aria-label="Why Uganda for Building and Construction?"
      className="font-heading text-[clamp(2.15rem,3.5vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-0.055em] text-white"
    >
      <span aria-hidden="true" className="block">
        <AnimatedWords text="Why Uganda for" />
      </span>

      <span aria-hidden="true" className="block">
        <AnimatedWords
          text="Building & Construction?"
          className="text-[#7ACB58]"
        />
      </span>
    </h2>

    <motion.p
      variants={REVEAL}
      className="mt-5 max-w-[630px] text-[14px] leading-[1.85] text-white/70 sm:text-[15px]"
    >
      Uganda's growing urban population
      and investment in housing, commercial
      development and infrastructure support
      demand for building materials,
      construction equipment, engineering
      services and modern building systems.
    </motion.p>
  </div>

  <motion.div
    variants={REVEAL}
    className="shrink-0"
  >
    <Link
      href="/why-uganda"
      className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-bold text-white transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#28A45A] hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
    >
      Explore Why Uganda

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
    </Link>
  </motion.div>
</motion.div>


        {/* =========================================
            MARKET FACTS
        ========================================= */}

        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {marketFacts.map((fact, index) => (
            <MarketFactCard
              key={fact.id}
              fact={fact}
              index={index}
            />
          ))}
        </motion.div>

        {/* =========================================
            FOCUS AREAS
        ========================================= */}

        <FocusAreas reduced={reduced} />
      </Container>
    </section>
  );
}
