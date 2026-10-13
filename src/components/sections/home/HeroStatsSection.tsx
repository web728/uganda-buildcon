
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

/* Animated number with reduced-motion support */
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -30px 0px",
  });

  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    reducedMotion ? value : 0
  );

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        setDisplayValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, reducedMotion]);

  const formattedValue =
    reducedMotion || (isInView && displayValue === 0 && value === 0)
      ? value.toLocaleString("en-US")
      : displayValue.toLocaleString("en-US");

  return (
    <span ref={ref} className="tabular-nums">
      {formattedValue}
      {suffix}
    </span>
  );
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroStatsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label={`${previousEdition.shortLabel} exhibition statistics`}
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#091c36] py-7 text-white sm:py-8"
    >
      {/* Subtle premium lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/45 to-transparent" />

        <div className="absolute -top-28 left-1/2 h-44 w-[500px] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[70px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            staggerChildren: 0.1,
          }}
          className="grid grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-y-0"
        >
          {previousEditionStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={[
                "group relative flex flex-col items-center justify-center px-3 text-center sm:px-6",
                index % 2 === 1
                  ? "border-l border-white/10 md:border-l"
                  : "",
                index === 2
                  ? "md:border-l"
                  : "",
              ].join(" ")}
            >
              {/* Animated value */}
              <div className="flex items-baseline justify-center font-heading text-[clamp(1.8rem,3vw,2.7rem)] leading-none font-extrabold tracking-[-0.045em] text-white">
                <AnimatedCounter
                  value={stat.numericValue}
                  suffix={stat.suffix}
                />
              </div>

              {/* Accent line */}
              <motion.span
                aria-hidden="true"
                className="mt-3 h-[2px] w-7 rounded-full bg-brand-lime"
                initial={reducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                }}
              />

              {/* Stat label */}
              <p className="mt-3 font-heading text-[10px] font-semibold uppercase leading-relaxed tracking-[0.13em] text-slate-300 sm:text-[11px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Small source label */}
        <div className="mt-7 flex items-center justify-center gap-3 border-t border-white/[0.07] pt-4">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-brand-lime"
          />

          <p className="text-center text-[9px] font-medium uppercase leading-relaxed tracking-[0.15em] text-slate-400 sm:text-[10px]">
            Previous Edition Highlights
            <span className="mx-2 text-slate-600">/</span>
            {previousEdition.label}
          </p>
        </div>
      </Container>
    </section>
  );
}
