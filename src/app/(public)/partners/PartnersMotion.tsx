
"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.06,
    },
  },
};

const ITEM: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

type MotionProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: MotionProps & {
  delay?: number;
}) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.div
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: 22,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.85,
        delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
}: MotionProps) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.div
      variants={GROUP}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: MotionProps) {
  return (
    <motion.div
      variants={ITEM}
      className={className}
    >
      {children}
    </motion.div>
  );
}
