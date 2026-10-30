"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  title: string;
  highlightTitle?: string;
  intro?: string;
  badgeText?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const TITLE_STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const WORD: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.72, ease: EASE } },
};

function AnimatedWords({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <>{text}</>;

  return (
    <motion.span variants={TITLE_STAGGER} className="inline" aria-hidden="true">
      {text.trim().split(/\s+/).map((word, index, words) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={WORD} className="inline-block">
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.span>
  );
}

const LINES = [
  "M-60 390 C180 210 335 440 545 285 S920 135 1180 290 S1500 440 1630 230",
  "M-60 420 C180 240 335 470 545 315 S920 165 1180 320 S1500 470 1630 260",
  "M-60 450 C180 270 335 500 545 345 S920 195 1180 350 S1500 500 1630 290",
  "M-60 480 C180 300 335 530 545 375 S920 225 1180 380 S1500 530 1630 320",
  "M-60 510 C180 330 335 560 545 405 S920 255 1180 410 S1500 560 1630 350",
] as const;

function HeroBackground({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0B0C11]" />
      
      <div className="absolute -bottom-48 right-[-90px] h-[490px] w-[570px] rounded-full bg-[#1769A4]/[0.07] blur-[115px]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="uganda-hero-lines" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#1769A4" stopOpacity="0" />
            <stop offset="50%" stopColor="#7DBBE8" stopOpacity=".45" />
            <stop offset="100%" stopColor="#1769A4" stopOpacity=".07" />
          </linearGradient>
        </defs>
        <g opacity=".42">
          {LINES.map((path, i) => (
            <path key={i} d={path} stroke="url(#uganda-hero-lines)" strokeWidth="1" />
          ))}
        </g>
        {!reduced && (
          <>
            <motion.path
              d={LINES[1]}
              stroke="#7DBBE8"
              strokeOpacity=".7"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="115 2100"
              animate={{ strokeDashoffset: [0, -2215] }}
              transition={{ duration: 21, ease: "linear", repeat: Infinity }}
            />
            <motion.path
              d={LINES[3]}
              stroke="#1769A4"
              strokeOpacity=".8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="85 2100"
              animate={{ strokeDashoffset: [0, -2185] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity, delay: 1.5 }}
            />
          </>
        )}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C11]/55 via-[#0B0C11]/15 to-transparent" />
    </div>
  );
}

function ArchitecturalOrbital({ reduced }: { reduced: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 520 520" fill="none" className="h-full w-full">
      <defs>
        <radialGradient id="uganda-orbital-glow">
          <stop stopColor="#1769A4" stopOpacity=".30" />
          <stop offset="1" stopColor="#1769A4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="uganda-orbital-fill" x1="80" y1="80" x2="430" y2="445" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7DBBE8" stopOpacity=".78" />
          <stop offset="1" stopColor="#1769A4" stopOpacity=".48" />
        </linearGradient>
      </defs>
      <circle cx="260" cy="260" r="252" fill="url(#uganda-orbital-glow)" />
      <motion.g
        style={{ transformOrigin: "260px 260px" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 110, ease: "linear", repeat: Infinity }}
      >
        <circle cx="260" cy="260" r="228" stroke="#B6C8D9" strokeOpacity=".3" strokeWidth="1" strokeDasharray="3 13" />
        <circle cx="260" cy="260" r="204" stroke="#7DBBE8" strokeOpacity=".25" strokeWidth="1" strokeDasharray="185 115 52 930" />
        <circle cx="260" cy="32" r="3" fill="#7DBBE8" />
        <circle cx="455" cy="377" r="4" fill="#1769A4" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "260px 260px" }}
        animate={reduced ? undefined : { rotate: [0, 7, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      >
        <path d="M260 63 355 140 333 244 260 208Z" fill="url(#uganda-orbital-fill)" />
        <path d="M438 230 403 342 312 361 331 277Z" fill="#1769A4" fillOpacity=".84" />
        <path d="M270 452 166 415 148 309 229 331Z" fill="#7DBBE8" fillOpacity=".52" />
        <path d="M84 220 154 132 235 170 209 248Z" fill="#1769A4" fillOpacity=".50" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "260px 260px" }}
        animate={reduced ? undefined : { rotate: [0, -9, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      >
        <circle cx="260" cy="260" r="123" stroke="#FFFFFF" strokeOpacity=".32" strokeWidth="1.1" />
        <circle cx="260" cy="260" r="111" stroke="#7DBBE8" strokeOpacity=".8" strokeWidth="1.8" strokeDasharray="440 45 68 145" />
      </motion.g>
      <circle cx="260" cy="260" r="93" fill="#0F2943" stroke="#7DBBE8" strokeOpacity=".5" strokeWidth="1.5" />
      <circle cx="260" cy="260" r="68" fill="#1769A4" fillOpacity=".78" />
      <path d="M218 286V241L260 219 302 241V286L260 309 218 286Z" stroke="#FFFFFF" strokeOpacity=".84" strokeWidth="2" />
      <path d="M260 219V266M218 241 260 266 302 241M260 266V309" stroke="#FFFFFF" strokeOpacity=".78" strokeWidth="2" />
    </svg>
  );
}

export function PageHero({
  title,
  highlightTitle,
  intro,
  badgeText = event.name,
  image,
  children,
}: PageHeroProps) {
  const reduced = useReducedMotion() === true;
  const fullTitle = [title, highlightTitle].filter(Boolean).join(" ");

  return (
    <section
      aria-label={fullTitle}
      className="relative isolate flex min-h-[410px] w-full items-center overflow-hidden bg-[#0B0C11] pb-12 pt-28 sm:min-h-[450px] sm:pb-14 sm:pt-32 lg:min-h-[495px] lg:py-24"
    >
      <HeroBackground reduced={reduced} />
      {/* Faded right-side background image — no card, frame or hard edge. */}
      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-full overflow-hidden lg:w-[64%]"
      >
        {image ? (
          <div className="absolute inset-0 lg:left-[5%]">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="object-cover object-center opacity-65 blur-[1.5px] sm:opacity-70 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,.2)_20%,black_60%)]"
            />
          </div>
        ) : (
          <div className="absolute -right-28 top-1/2 h-[400px] w-[400px] -translate-y-1/2 opacity-40 blur-[1px] sm:-right-16 sm:h-[490px] sm:w-[490px] lg:right-[0%] lg:h-[570px] lg:w-[570px]">
            <ArchitecturalOrbital reduced={reduced} />
          </div>
        )}

        {/* Reference-style dark fade: keeps left copy readable. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B0C11_0%,rgba(11,12,17,0.97)_12%,rgba(11,12,17,0.72)_39%,rgba(11,12,17,0.30)_72%,rgba(11,12,17,0.42)_100%)] lg:bg-[linear-gradient(90deg,#0B0C11_0%,rgba(11,12,17,0.9)_22%,rgba(11,12,17,0.34)_66%,rgba(11,12,17,0.35)_100%)]" />

        {/* Blue atmospheric fog; intentionally subtle, not a solid overlay. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(23,105,164,0.20)_0%,rgba(23,105,164,0.08)_32%,transparent_70%)]" />
        <div className="absolute -right-24 top-[8%] h-[310px] w-[390px] rounded-full bg-[#1769A4]/15 blur-[105px] sm:h-[430px] sm:w-[530px]" />

        {/* Blend top / bottom so image feels built into the hero. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C11]/25 via-transparent to-[#0B0C11]/45" />
      </motion.div>

      <Container className="relative z-10 w-full">
        <motion.div
          variants={STAGGER}
          initial={reduced ? false : "hidden"}
          animate="visible"
          className="relative max-w-[750px]"
        >
          {badgeText && (
            <motion.div variants={FADE_UP} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#7DBBE8]" />
              <span className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.13em] text-[#A9D8F6] sm:text-[11px]">
                {badgeText}
              </span>
            </motion.div>
          )}

          <motion.h1
            variants={FADE_UP}
            aria-label={fullTitle}
            className="mt-5 font-heading text-[clamp(2.1rem,4.4vw,4.45rem)] font-extrabold leading-[1.11] tracking-[-0.045em] [text-wrap:balance]"
          >
            <span className="block text-white">
              <AnimatedWords text={title} reduced={reduced} />
            </span>
            {highlightTitle && (
              <span className="mt-1 block text-[#7DBBE8]">
                <AnimatedWords text={highlightTitle} reduced={reduced} />
              </span>
            )}
          </motion.h1>

          {intro && (
            <motion.p
              variants={FADE_UP}
              className="mt-5 max-w-[620px] text-[14px] leading-[1.85] text-[#C2CDD9] sm:text-[15px]"
            >
              {intro}
            </motion.p>
          )}

          {children && (
            <motion.div variants={FADE_UP} className="mt-7 flex flex-wrap items-center gap-3">
              {children}
            </motion.div>
          )}

          <motion.div variants={FADE_UP} aria-hidden="true" className="mt-8 h-[2px] w-20 bg-gradient-to-r from-[#7DBBE8] to-[#1769A4]/20" />
        </motion.div>
      </Container>
    </section>
  );
}
