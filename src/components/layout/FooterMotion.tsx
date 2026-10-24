
"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   PREMIUM FOOTER SCROLL REVEAL
========================================================= */

export function FooterReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
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
   SUBTLE ANIMATED BRAND SVG

   Designed specifically for dark footer.

   - Blue/green travelling paths
   - Architectural line geometry
   - Moving markers
   - Infinite Framer Motion animations
========================================================= */

export function FooterArtwork() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 800 620"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="footer-motion-gradient"
          x1="80"
          y1="100"
          x2="740"
          y2="530"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1769A4" />
          <stop offset=".55" stopColor="#1769A4" />
          <stop offset="1" stopColor="#28A45A" />
        </linearGradient>
      </defs>

      {/* Static architectural curves */}
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={`curve-${index}`}
          d={`M-120 ${375 + index * 24}
              C110 ${200 + index * 24}
               250 ${540 + index * 12}
               445 ${350 + index * 18}
              S710 ${170 + index * 18}
               920 ${275 + index * 18}`}
          stroke="#FFFFFF"
          strokeOpacity=".10"
          strokeWidth="1"
        />
      ))}

      {/* Continuous moving trace */}
      <motion.path
        d="M-120 375C110 200 250 540 445 350S710 170 920 275"
        stroke="url(#footer-motion-gradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="90 1500"
        initial={false}
        animate={{
          strokeDashoffset: [0, -1590],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.path
        d="M-120 423C110 248 250 564 445 386S710 206 920 311"
        stroke="#28A45A"
        strokeOpacity=".7"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="60 1500"
        initial={false}
        animate={{
          strokeDashoffset: [0, -1560],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Rings */}
      {[115, 160, 205].map((r) => (
        <circle
          key={r}
          cx="580"
          cy="205"
          r={r}
          stroke="#FFFFFF"
          strokeOpacity=".10"
        />
      ))}

      {/* Moving orbit */}
      <motion.g
        initial={false}
        animate={{ rotate: 360 }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "580px 205px",
        }}
      >
        <path
          d="M375 205A205 205 0 0 1 785 205"
          stroke="#1769A4"
          strokeOpacity=".75"
          strokeWidth="2"
        />

        <circle
          cx="580"
          cy="0"
          r="5"
          fill="#28A45A"
        />
      </motion.g>

      {/* Active node */}
      <motion.circle
        cx="580"
        cy="205"
        r="4"
        fill="#28A45A"
        initial={false}
        animate={{
          opacity: [0.3, 1, 0.3],
          r: [3, 6, 3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
