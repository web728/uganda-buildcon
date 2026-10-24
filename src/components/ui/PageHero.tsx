
"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==================================================
   SHARED PAGE HERO
   Split layout + premium editorial animation
================================================== */

interface PageHeroProps {
  title: string;
  highlightTitle?: string;
  intro?: string;
  badgeText?: string;
  image?: {
    src: string;
    alt: string;
  };
  children?: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ==================================================
   MOTION VARIANTS
================================================== */

const CONTENT: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08,
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

const TITLE_REVEAL: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.06,
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
      duration: 0.92,
      ease: EASE,
    },
  },
};

/* ==================================================
   WORD-BY-WORD ANIMATED TYPOGRAPHY

   Same clipped reveal method used in
   your premium editorial Home Hero.
================================================== */

function AnimatedWords({
  text,
  reduced,
}: {
  text: string;
  reduced: boolean;
}) {
  if (reduced) {
    return <>{text}</>;
  }

  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <>
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
    </>
  );
}

/* ==================================================
   FLOW PATHS

   Fixed geometry, animated stroke traces.
   The base curves remain visible at all times.
================================================== */

const FLOW_PATHS = [
  "M-140 270 C150 100 370 455 690 285 S1160 160 1580 315",
  "M-140 300 C175 135 390 480 710 315 S1180 195 1580 345",
  "M-140 330 C200 170 420 505 740 345 S1200 230 1580 375",
  "M-140 360 C225 205 450 530 770 375 S1220 265 1580 405",
  "M-140 390 C250 240 480 555 800 405 S1240 300 1580 435",
  "M-140 420 C275 275 510 580 830 435 S1260 335 1580 465",
  "M-140 450 C300 310 540 605 860 465 S1280 370 1580 495",
] as const;

/* ==================================================
   ANIMATED FLOWING BACKGROUND

   Inspired by uploaded HeroSection:
   - Permanent guide curves
   - Traveling blue / green traces
   - Slow background movement
   - No grid lines
================================================== */

function HeroBackground() {
  const reduced = useReducedMotion() === true;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Deep navy foundation */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#030917_0%,#061326_48%,#081B35_100%)]" />

      {/* Soft ambient blue lighting */}
      <motion.div
        className="absolute -left-40 top-[-130px] h-[400px] w-[520px] rounded-full bg-[#1769A4]/[0.15] blur-[110px]"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 85, 0],
                y: [0, 45, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft ambient green lighting */}
      <motion.div
        className="absolute -right-40 bottom-[-180px] h-[470px] w-[520px] rounded-full bg-[#28A45A]/[0.11] blur-[115px]"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                x: [0, -80, 0],
                y: [0, -40, 0],
              }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main animated flowing SVG */}
      <svg
        viewBox="0 0 1440 650"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id="page-hero-flow-blue"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#1769A4"
              stopOpacity=".07"
            />
            <stop
              offset=".48"
              stopColor="#57B0E8"
              stopOpacity=".65"
            />
            <stop
              offset="1"
              stopColor="#1769A4"
              stopOpacity=".08"
            />
          </linearGradient>

          <linearGradient
            id="page-hero-flow-green"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#28A45A"
              stopOpacity=".06"
            />
            <stop
              offset=".52"
              stopColor="#7ACB58"
              stopOpacity=".65"
            />
            <stop
              offset="1"
              stopColor="#28A45A"
              stopOpacity=".08"
            />
          </linearGradient>
        </defs>

        {/* Static contours remain visible */}
        <g opacity=".27">
          {FLOW_PATHS.map((path, index) => (
            <path
              key={`guide-${index}`}
              d={path}
              stroke={
                index % 2 === 0
                  ? "url(#page-hero-flow-blue)"
                  : "url(#page-hero-flow-green)"
              }
              strokeWidth={index % 3 === 0 ? 1.4 : 0.9}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Slow breathing movement */}
        <motion.g
          initial={false}
          animate={
            reduced
              ? undefined
              : {
                  x: [-16, 18, -16],
                  y: [0, -8, 0],
                  opacity: [0.5, 0.95, 0.5],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {FLOW_PATHS.map((path, index) => (
            <path
              key={`ambient-${index}`}
              d={path}
              stroke={
                index % 2 === 0
                  ? "url(#page-hero-flow-blue)"
                  : "url(#page-hero-flow-green)"
              }
              strokeWidth="1"
              strokeOpacity=".28"
              strokeLinecap="round"
            />
          ))}
        </motion.g>

        {/* Moving blue stroke trace */}
        <motion.path
          d={FLOW_PATHS[1]}
          stroke="#65BDF0"
          strokeOpacity=".56"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="100 2200"
          initial={false}
          animate={
            reduced
              ? undefined
              : {
                  strokeDashoffset: [0, -2300],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Moving green stroke trace */}
        <motion.path
          d={FLOW_PATHS[4]}
          stroke="#7ACB58"
          strokeOpacity=".52"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeDasharray="85 2200"
          initial={false}
          animate={
            reduced
              ? undefined
              : {
                  strokeDashoffset: [0, -2285],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
            delay: 1.1,
          }}
        />

        {/* Additional subtle traveling trace */}
        <motion.path
          d={FLOW_PATHS[6]}
          stroke="#57B0E8"
          strokeOpacity=".3"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="65 2200"
          initial={false}
          animate={
            reduced
              ? undefined
              : {
                  strokeDashoffset: [0, -2265],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
      </svg>

      {/* Extra soft floating flow */}
      <motion.div
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                x: [-35, 35, -35],
                opacity: [0.14, 0.28, 0.14],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[6%] left-[20%] h-[170px] w-[650px] rounded-full bg-[#1769A4] opacity-[0.12] blur-[130px]"
      />

      {/* Readability layer behind left text */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030917]/50 via-[#030917]/10 to-transparent" />
    </div>
  );
}

/* ==================================================
   ORIGINAL RIGHT-SIDE BUILDCON SVG

   Geometry, colours, paths and animations retained.
================================================== */

function BuildconOrbitalSVG() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 640 640"
      fill="none"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <radialGradient
          id="buildcon-orbit-glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stopColor="#1769A4"
            stopOpacity=".18"
          />
          <stop
            offset="100%"
            stopColor="#1769A4"
            stopOpacity="0"
          />
        </radialGradient>

        <linearGradient
          id="buildcon-blue-sector"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#1769A4" />
          <stop offset="100%" stopColor="#2582BF" />
        </linearGradient>

        <linearGradient
          id="buildcon-green-sector"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#239E55" />
          <stop offset="100%" stopColor="#35B867" />
        </linearGradient>
      </defs>

      <circle
        cx="320"
        cy="320"
        r="305"
        fill="url(#buildcon-orbit-glow)"
      />

      {/* OUTER TECHNICAL ORBITS */}
      <motion.g
        style={{ transformOrigin: "320px 320px" }}
        animate={
          reduced ? undefined : { rotate: 360 }
        }
        transition={{
          duration: 90,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <circle
          cx="320"
          cy="320"
          r="285"
          stroke="#FFFFFF"
          strokeOpacity=".14"
          strokeWidth=".8"
          strokeDasharray="3 15"
        />

        <circle
          cx="320"
          cy="320"
          r="225"
          stroke="#FFFFFF"
          strokeOpacity=".17"
          strokeWidth=".8"
          strokeDasharray="175 95 80 1062"
        />

        <circle
          cx="320"
          cy="320"
          r="242"
          stroke="#57B0E8"
          strokeOpacity=".15"
          strokeWidth=".8"
          strokeDasharray="130 1390"
        />
      </motion.g>

      {/* ROTATING GEOMETRIC SECTORS */}
      <motion.g
        style={{ transformOrigin: "320px 320px" }}
        animate={
          reduced ? undefined : { rotate: [0, 8, 0] }
        }
        transition={{
          duration: 13,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <path
          d="M215 68 Q320 25 425 68 L354 246 Q320 231 286 246 Z"
          fill="url(#buildcon-blue-sector)"
          fillOpacity=".96"
        />

        <path
          d="M530 70 L530 380 L392 305 Z"
          fill="#28A45A"
          fillOpacity=".96"
        />

        <path
          d="M68 370 L278 322 L212 568 Q106 522 68 370 Z"
          fill="url(#buildcon-green-sector)"
          fillOpacity=".94"
        />

        <path
          d="M162 260 L286 304 L222 440 Q136 389 162 260 Z"
          fill="#198C50"
          fillOpacity=".9"
        />

        <path
          d="M359 350 L412 378 L372 450 L335 375 Z"
          fill="#2FAE5D"
          fillOpacity=".95"
        />
      </motion.g>

      {/* CENTRAL RINGS */}
      <motion.g
        style={{ transformOrigin: "320px 320px" }}
        animate={
          reduced ? undefined : { rotate: [0, -9, 0] }
        }
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <circle
          cx="320"
          cy="320"
          r="113"
          stroke="#FFFFFF"
          strokeOpacity=".33"
          strokeWidth="1.2"
        />

        <circle
          cx="320"
          cy="320"
          r="102"
          stroke="#FFFFFF"
          strokeOpacity=".87"
          strokeWidth="2.4"
        />
      </motion.g>

      {/* CENTRAL BLUE CORE */}
      <circle
        cx="320"
        cy="320"
        r="87"
        fill="#1769A4"
      />

      <circle
        cx="320"
        cy="320"
        r="86"
        fill="#2583C4"
        fillOpacity=".12"
      />

      {/* ORBITAL PARTICLES */}
      <motion.g
        style={{ transformOrigin: "320px 320px" }}
        animate={
          reduced ? undefined : { rotate: 360 }
        }
        transition={{
          duration: 26,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <circle cx="320" cy="35" r="4" fill="#28A45A" />
        <circle cx="221" cy="95" r="5" fill="#1769A4" />
        <circle cx="470" cy="111" r="7" fill="#7ACB58" />
        <circle cx="120" cy="215" r="7" fill="#7ACB58" />
        <circle cx="122" cy="322" r="6" fill="#1769A4" />
        <circle cx="455" cy="504" r="6" fill="#28A45A" />
      </motion.g>
    </svg>
  );
}

/* ==================================================
   MAIN PAGE HERO
================================================== */

export function PageHero({
  title,
  highlightTitle,
  intro,
  badgeText = event.shortName,
  image: _image,
  children,
}: PageHeroProps) {
  const reduced = useReducedMotion() === true;

  // Existing image prop stays accepted so old
  // PageHero calls do not need editing.
  void _image;

  const fullTitle = highlightTitle
    ? `${title} ${highlightTitle}`
    : title;

  return (
    <section
      aria-label={fullTitle}
      className="
        relative isolate flex w-full items-center
        overflow-hidden bg-[#030917]
        min-h-[420px] pb-9 pt-28
        sm:min-h-[450px] sm:pb-11 sm:pt-32
        lg:h-[70vh] lg:min-h-[440px]
        lg:max-h-[590px] lg:pb-10 lg:pt-28
      "
    >
      {/* BACKGROUND */}
      <HeroBackground />

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)] lg:gap-8">
          {/* LEFT TEXT CONTENT */}
          <motion.div
            variants={CONTENT}
            initial={reduced ? false : "hidden"}
            animate="visible"
            className="relative z-10 min-w-0 max-w-[710px] text-left"
          >
            {/* BRAND LABEL */}
            {badgeText && (
              <motion.div
                variants={REVEAL}
                className="flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className="h-[2px] w-8 bg-[#7ACB58]"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A4E58B] sm:text-[11px]">
                  {badgeText}
                </span>
              </motion.div>
            )}

            {/* PREMIUM WORD REVEAL */}
            <motion.h1
              variants={TITLE_REVEAL}
              aria-label={fullTitle}
              className="
                mt-5 max-w-[710px]
                font-heading font-extrabold
                text-[clamp(2.1rem,4vw,4.2rem)]
                leading-[1.1] tracking-[-0.045em]
                [text-wrap:balance]
              "
            >
              <span
                aria-hidden="true"
                className="block text-[#F5F8FC]"
              >
                <AnimatedWords
                  text={title}
                  reduced={reduced}
                />
              </span>

              {highlightTitle && (
                <span
                  aria-hidden="true"
                  className="mt-1 block text-[#7ACB58]"
                >
                  <AnimatedWords
                    text={highlightTitle}
                    reduced={reduced}
                  />
                </span>
              )}
            </motion.h1>

            {/* INTRODUCTION */}
            {intro && (
              <motion.p
                variants={REVEAL}
                className="
                  mt-5 max-w-[600px]
                  text-[13px] leading-[1.85]
                  text-[#CFDCE8]
                  sm:text-[14px] lg:text-[15px]
                "
              >
                {intro}
              </motion.p>
            )}

            {/* OPTIONAL CHILD ACTIONS */}
            {children && (
              <motion.div
                variants={REVEAL}
                className="mt-6 flex flex-wrap items-center justify-start gap-3"
              >
                {children}
              </motion.div>
            )}

            {/* SMALL EDITORIAL ACCENT */}
            <motion.div
              aria-hidden="true"
              variants={REVEAL}
              className="mt-7 flex h-[3px] w-[96px] overflow-hidden"
            >
              <span className="h-full w-[65%] bg-[#1769A4]" />
              <span className="h-full w-[35%] bg-[#7ACB58]" />
            </motion.div>
          </motion.div>

          {/* RIGHT: ORIGINAL ORBITAL SVG */}
          <motion.div
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    scale: 0.9,
                    x: 24,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 1.2,
              delay: reduced ? 0 : 0.22,
              ease: EASE,
            }}
            className="
              relative mx-auto flex w-full
              max-w-[310px] items-center justify-center
              sm:max-w-[350px]
              lg:max-w-[390px]
              xl:max-w-[425px]
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[10%] rounded-full bg-[#1769A4]/10 blur-[75px]"
            />

            <div className="relative aspect-square w-full">
              <BuildconOrbitalSVG />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
