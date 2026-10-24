"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import {
  previousEdition,
  previousEditionStats,
} from "@/data/previousEdition";

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


function AnimatedCounter({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  // SSR aur first client render dono mein 0
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2.8,
      delay,
      ease: "linear",

      onUpdate(latest) {
        // Har frame par increasing integer dikhayega
        setCount(
          Math.min(value, Math.floor(latest))
        );
      },

      onComplete() {
        setCount(value);
      },
    });

    return () => controls.stop();
  }, [isInView, value, delay]);

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline whitespace-nowrap tabular-nums"
      aria-label={`${value.toLocaleString("en-US")}${suffix}`}
    >
      <span aria-hidden="true">
        {count.toLocaleString("en-US")}
      </span>

      {suffix && (
        <span
          aria-hidden="true"
          className="ml-0.5 text-[#7ACB58]"
        >
          {suffix}
        </span>
      )}
    </span>
  );
}


export function HeroStatsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label={`${previousEdition.shortLabel} exhibition statistics`}
      className="relative isolate overflow-hidden border-y border-white/10 bg-black py-8 text-white sm:py-9"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* glow */}
        <div className="absolute left-1/2 top-0 h-40 w-[520px] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-32 w-72 rounded-full bg-brand-green/10 blur-[90px]" />

        {/* animated svg lines */}
        {!reducedMotion && (
          <svg
            className="absolute inset-0 h-full w-full opacity-25"
            viewBox="0 0 1440 220"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M-40 155C125 115 240 190 405 152C570 114 695 58 860 88C1040 120 1170 188 1480 142"
              stroke="url(#lineBlue)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="8 12"
              animate={{ x: [0, 18, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M-60 182C120 138 265 214 440 176C650 130 795 74 960 110C1140 145 1260 205 1490 175"
              stroke="url(#lineGreen)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="10 14"
              animate={{ x: [0, -22, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="lineBlue" x1="0" y1="0" x2="1440" y2="0">
                <stop offset="0%" stopColor="#1769a4" stopOpacity="0" />
                <stop offset="35%" stopColor="#1769a4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1769a4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGreen" x1="0" y1="0" x2="1440" y2="0">
                <stop offset="0%" stopColor="#28a45a" stopOpacity="0" />
                <stop offset="45%" stopColor="#28a45a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#28a45a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0"
        >
          {previousEditionStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={[
                "group relative flex flex-col items-center justify-center px-3 text-center sm:px-6",
                index % 2 === 1 ? "border-l border-white/10" : "",
                index >= 2 ? "md:border-l md:border-white/10" : "",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-center font-heading text-[clamp(2rem,3vw,2.85rem)] font-extrabold leading-none tracking-[-0.05em] text-white">
             <AnimatedCounter
  value={stat.numericValue}
  suffix={stat.suffix}
  delay={index * 0.12}
/>
              </div>

              <motion.span
                aria-hidden="true"
                className="mt-3 h-[2px] w-8 rounded-full bg-brand-green"
                initial={reducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.18 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <p className="mt-3 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/70 sm:text-[11px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

     
      </Container>
    </section>
  );
}