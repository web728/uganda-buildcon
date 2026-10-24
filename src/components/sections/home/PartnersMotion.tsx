
"use client";

import type { ReactNode } from "react";

import {
  motion,
  type Variants,
} from "framer-motion";

/* =========================================================
   FRAMER MOTION HELPERS

   Keeps PartnersSection as a server component,
   while animations run on the client.
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function PartnersReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -30px 0px",
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   ANIMATED PARTNER SVG

   Continuous subtle line tracing
   + rotating orbital accents
   + green node pulses

   Designed to stay in the background.
========================================================= */

export function PartnersArtwork() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 620 620"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="partners-orbit-gradient"
          x1="50"
          y1="50"
          x2="570"
          y2="570"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1769A4" />

          <stop
            offset=".72"
            stopColor="#1769A4"
          />

          <stop
            offset="1"
            stopColor="#28A45A"
          />
        </linearGradient>
      </defs>

      {/* Static circles */}
      {[145, 200, 255].map((radius) => (
        <circle
          key={radius}
          cx="310"
          cy="310"
          r={radius}
          stroke="#1769A4"
          strokeOpacity=".15"
          strokeWidth="1"
        />
      ))}

      {/* Inner traveling circle trace */}
      <motion.circle
        cx="310"
        cy="310"
        r="200"
        stroke="url(#partners-orbit-gradient)"
        strokeOpacity=".55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="105 1256.64"
        initial={{ strokeDashoffset: 0 }}
        animate={{
          strokeDashoffset: -1361.64,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Outer traveling green trace */}
      <motion.circle
        cx="310"
        cy="310"
        r="255"
        stroke="#28A45A"
        strokeOpacity=".43"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="65 1602.21"
        initial={{ strokeDashoffset: 0 }}
        animate={{
          strokeDashoffset: 1667.21,
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Moving small orbital marker */}
      <motion.g
        initial={false}
        animate={{ rotate: 360 }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "310px 310px",
        }}
      >
        <circle
          cx="310"
          cy="55"
          r="5.5"
          fill="#28A45A"
        />

        <circle
          cx="310"
          cy="55"
          r="13"
          stroke="#28A45A"
          strokeOpacity=".3"
        />
      </motion.g>

      {/* Center crosshair */}
      <path
        d="M310 285V335M285 310H335"
        stroke="#1769A4"
        strokeOpacity=".22"
        strokeWidth="1"
      />

      <motion.circle
        cx="310"
        cy="310"
        r="4"
        fill="#1769A4"
        animate={{
          opacity: [0.4, 1, 0.4],
          r: [3, 5, 3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
