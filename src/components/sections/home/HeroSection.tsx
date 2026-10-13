
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { event } from "@/config/event";

const year = event.dates.start.slice(0, 4);

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroSection() {
  const reduced = useReducedMotion() === true;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[550px] items-center overflow-hidden bg-[#0c203d] text-white sm:min-h-[580px] lg:min-h-[600px]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,#164b73_0%,#0c203d_55%,#08172e_100%)]" />

        <motion.svg
          viewBox="0 0 1400 650"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="minimal-hero-wave"
              x1="0"
              y1="0"
              x2="1400"
              y2="600"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1f6fae" stopOpacity="0" />
              <stop
                offset=".55"
                stopColor="#69b5e4"
                stopOpacity=".35"
              />
              <stop
                offset=".85"
                stopColor="#72c448"
                stopOpacity=".55"
              />
              <stop
                offset="1"
                stopColor="#72c448"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Flowing curves */}
          {Array.from({ length: 5 }, (_, i) => (
            <motion.path
              key={i}
              d={`M-100 ${420 + i * 24} C300 ${
                230 + i * 20
              } 570 ${620 + i * 8} 920 ${
                350 + i * 20
              } S1300 ${300 + i * 18} 1550 ${
                420 + i * 22
              }`}
              stroke="url(#minimal-hero-wave)"
              strokeWidth="1"
              opacity={0.35 + i * 0.07}
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.8,
                delay: 0.3 + i * 0.1,
              }}
            />
          ))}

          {/* Minimal orbit */}
          <motion.g
            style={{ transformOrigin: "1210px 280px" }}
            animate={reduced ? {} : { rotate: 360 }}
            transition={{
              duration: 65,
              ease: "linear",
              repeat: Infinity,
            }}
            opacity=".35"
          >
            <circle
              cx="1210"
              cy="280"
              r="185"
              stroke="#72c448"
              strokeDasharray="5 13"
            />
            <circle
              cx="1210"
              cy="280"
              r="240"
              stroke="#69b5e4"
              strokeWidth=".6"
            />
            <path
              d="M1025 280A185 185 0 0 1 1210 95"
              stroke="#72c448"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.svg>

        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-green/10 blur-[110px]" />
      </div>

      {/* Compact two-column layout */}
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-9 px-5 pt-27 pb-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12 lg:pt-30 lg:pb-14">
        {/* Content */}
        <motion.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          animate="show"
          className="relative z-10"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 flex items-center gap-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-brand-lime">
              {event.editionLabel} · International B2B Expo
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-heading text-[clamp(2.5rem,4.7vw,4.5rem)] leading-[1.08] font-extrabold tracking-[-0.05em]"
          >
            Uganda <span className="text-brand-lime">Buildcon</span>

            <span className="mt-1 block text-[0.53em] font-bold tracking-[-0.035em] text-[#a9d5f2]">
              International Expo {year}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[530px] text-sm leading-7 text-slate-200 sm:text-[15px]"
          >
            {event.descriptor}
          </motion.p>

          {/* Event info */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-3"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-white/85 sm:text-sm">
              <CalendarDays
                size={16}
                className="text-brand-lime"
              />
              <time dateTime={event.dates.start}>
                {event.dates.display}
              </time>
            </span>

            <span className="inline-flex items-center gap-2 text-xs font-medium text-white/85 sm:text-sm">
              <MapPin
                size={16}
                className="text-brand-lime"
              />
              {event.venue.name}, {event.venue.city}
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-brand-green px-6 py-3 text-xs font-bold text-white shadow-[0_10px_25px_rgba(60,180,78,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lime motion-reduce:transform-none"
            >
              Book Your Stand
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none"
            >
              Register to Visit
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Compact image visual */}
        <motion.div
          initial={
            reduced
              ? false
              : { opacity: 0, x: 28, scale: 0.97 }
          }
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
        >
          <div className="relative aspect-[5/3.65] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_65px_rgba(0,0,0,0.25)] lg:aspect-[5/4]">
            <Image
              src="/images/home/skyline-construction.jpg"
              alt="Construction and architectural development representing the Uganda Buildcon exhibition"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#08182f]/80 via-transparent to-transparent" />

            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-3">
              <div>
                <div className="mb-2 h-0.5 w-8 bg-brand-lime" />
                <p className="font-heading text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  Innovate. Connect. Build.
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                {event.editionLabel}
              </span>
            </div>
          </div>

          {/* Subtle decorative accent */}
          <motion.div
            aria-hidden="true"
            className="absolute -right-2 -bottom-2 -z-10 h-20 w-20 rounded-br-2xl border-r-2 border-b-2 border-brand-lime/70"
            animate={
              reduced ? {} : { opacity: [0.4, 1, 0.4] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
