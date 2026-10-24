
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

import {
  previousEdition,
  satisfactionSurvey,
  exhibitorFeedback,
} from "@/data/previousEdition";

/* =========================================================
   PREMIUM PREVIOUS EDITION
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const PHOTOS = [
  {
    src: "/images/gallery/inauguration-2025-stage.jpg",
    alt: "Inaugural ceremony of the 4th Uganda Buildcon International Expo, 7 August 2025, UMA Show Grounds",
  },
  {
    src: "/images/gallery/exhibition-hall-walkthrough.jpg",
    alt: "Guests touring exhibitor stands in the Uganda Buildcon exhibition hall",
  },
  {
    src: "/images/gallery/roofing-exhibitor-stand.jpg",
    alt: "Exhibitor presenting roofing products to visitors at Uganda Buildcon",
  },
] as const;

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
      className="h-[17px] w-[17px] shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px] shrink-0"
    >
      <path d="M12 3v12m-4-4 4 4 4-4" />
      <path d="M5 16v4h14v-4" />
    </svg>
  );
}

/* =========================================================
   ANIMATED VALUE
   SSR starts from original display text until in view.
   Client-side counting uses useEffect.
========================================================= */

function CountUp({
  value,
}: {
  value: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -20px 0px",
  });

  const reduced = useReducedMotion() === true;

  const match = value.match(
    /-?\d[\d,]*(?:\.\d+)?/
  );

  const originalNumber = match?.[0] ?? "";
  const target = Number(
    originalNumber.replace(/,/g, "")
  );

  const precision =
    originalNumber.split(".")[1]?.length ?? 0;

  const prefix = match
    ? value.slice(0, match.index ?? 0)
    : "";

  const suffix = match
    ? value.slice(
        (match.index ?? 0) + originalNumber.length
      )
    : "";

  const valid =
    match !== null && Number.isFinite(target);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || !valid) return;

    if (reduced) {
      setCurrent(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.65,
      ease: EASE,
      onUpdate(latest) {
        setCurrent(latest);
      },
      onComplete() {
        setCurrent(target);
      },
    });

    return () => controls.stop();
  }, [inView, target, valid, reduced]);

  if (!valid) return <span>{value}</span>;

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return (
    <span
      ref={ref}
      className="tabular-nums"
      aria-label={value}
    >
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}

/* =========================================================
   PREMIUM ANIMATED CIRCULAR ACCENT
========================================================= */

function DecorativeOrbit({
  reduced,
}: {
  reduced: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 540 540"
      fill="none"
      className="h-full w-full"
    >
      {[160, 205, 250].map((r) => (
        <circle
          key={r}
          cx="270"
          cy="270"
          r={r}
          stroke="#1769A4"
          strokeOpacity=".10"
          strokeWidth="1"
        />
      ))}

      <motion.circle
        cx="270"
        cy="270"
        r="205"
        stroke="#1769A4"
        strokeWidth="2"
        strokeOpacity=".4"
        strokeDasharray="100 1288"
        animate={
          reduced
            ? undefined
            : { strokeDashoffset: [0, -1388] }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.circle
        cx="270"
        cy="270"
        r="160"
        stroke="#28A45A"
        strokeOpacity=".5"
        strokeWidth="2"
        strokeDasharray="60 1006"
        animate={
          reduced
            ? undefined
            : { strokeDashoffset: [0, 1066] }
        }
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}

/* =========================================================
   SURVEY METRIC
========================================================= */

function SurveyMetric({
  item,
}: {
  item: (typeof satisfactionSurvey)[number];
}) {
  return (
    <div className="border-b border-[#E4EAEE] py-5 first:pt-0 last:border-b-0 last:pb-0">
      <p className="font-heading text-[clamp(1.9rem,2.5vw,2.65rem)] font-extrabold leading-none tracking-[-0.055em] text-[#111111]">
        <CountUp value={item.value} />
      </p>

      <p className="mt-2 max-w-[220px] text-[11px] font-semibold uppercase leading-[1.65] tracking-[0.1em] text-[#58677B]">
        {item.label}
      </p>
    </div>
  );
}

/* =========================================================
   EXHIBITOR FEEDBACK BAR
========================================================= */

function FeedbackBar({
  item,
  index,
  reduced,
}: {
  item: (typeof exhibitorFeedback)[number];
  index: number;
  reduced: boolean;
}) {
  const percentage = Math.max(
    0,
    Math.min(100, Number.parseFloat(item.value))
  );

  return (
    <div className="border-b border-[#E7ECEF] py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-5">
        <p className="max-w-[390px] text-[13px] leading-[1.65] text-[#58677B]">
          of exhibitors{" "}
          <span className="font-semibold text-[#111111]">
            {item.label}
          </span>
        </p>

        <span className="shrink-0 font-heading text-[17px] font-bold tracking-[-0.03em] text-[#1769A4]">
          {item.value}
        </span>
      </div>

      <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-[#E8EEF2]">
        <motion.div
          className="h-full origin-left rounded-full bg-[#1769A4]"
          initial={{ scaleX: reduced ? 1 : 0 }}
          whileInView={{ scaleX: percentage / 100 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: reduced ? 0 : 1.2,
            delay: index * 0.11,
            ease: EASE,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function PreviousEditionSection() {
  const reduced = useReducedMotion() === true;

  return (
    <section
      aria-labelledby="previous-edition-heading"
      className="relative isolate overflow-hidden border-b border-[#E3E9EE] bg-white py-16 text-[#111111] sm:py-20 lg:py-24"
    >
      {/* Quiet animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-48 -top-64 h-[540px] w-[540px] opacity-40">
          <DecorativeOrbit reduced={reduced} />
        </div>
      </div>

      <Container className="relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          variants={GROUP}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="flex flex-col gap-6 border-b border-[#E3E9EE] pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[760px]">
            <motion.div
              variants={REVEAL}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-[3px] w-9 bg-[#28A45A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1769A4] sm:text-[11px]">
                {previousEdition.shortLabel} / Post Show Report
              </span>
            </motion.div>

            <motion.h2
              id="previous-edition-heading"
              variants={REVEAL}
              className="font-heading text-[clamp(2.15rem,3.6vw,3.75rem)] font-extrabold leading-[1.11] tracking-[-0.052em] text-[#111111]"
            >
              A Look Back at{" "}
              <span className="text-[#1769A4]">
                {previousEdition.shortLabel}.
              </span>
            </motion.h2>

            <motion.p
              variants={REVEAL}
              className="mt-4 max-w-[680px] text-[14px] leading-[1.8] text-[#58677B] sm:text-[15px]"
            >
              The {previousEdition.label} was inaugurated
              on {previousEdition.inaugurated} at{" "}
              {previousEdition.venue}. Explore the
              highlights and feedback from the
              previous exhibition.
            </motion.p>
          </div>

          <motion.div
            variants={REVEAL}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href={event.downloads.postShowReport}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#DCE5EA] bg-white px-5 py-3 text-[13px] font-bold text-[#111111] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#28A45A] hover:text-[#1769A4] motion-reduce:transform-none"
            >
              Post Show Report
              <DownloadIcon />
            </a>

            <Link
              href="/gallery"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] motion-reduce:transform-none"
            >
              View Gallery
              <ArrowIcon />
            </Link>
          </motion.div>
        </motion.div>

        {/* RESULTS & FEEDBACK */}
        <motion.div
          variants={GROUP}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14"
        >
          {/* Survey */}
          <motion.div variants={REVEAL}>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1769A4]">
              Satisfaction Survey
            </p>

            <div className="grid grid-cols-2 gap-x-6 border-t border-[#E4EAEE] pt-5">
              {satisfactionSurvey.map((item) => (
                <SurveyMetric
                  key={item.label}
                  item={item}
                />
              ))}
            </div>
          </motion.div>

          {/* Feedback */}
          <motion.div
            variants={REVEAL}
            className="border-t border-[#E4EAEE] pt-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1769A4]">
              Exhibitor Feedback
            </p>

            <div className="border-t border-[#E4EAEE]">
              {exhibitorFeedback.map((item, index) => (
                <FeedbackBar
                  key={item.label}
                  item={item}
                  index={index}
                  reduced={reduced}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* PHOTO GALLERY */}
        <motion.div
          variants={GROUP}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-11"
        >
          <motion.div
            variants={REVEAL}
            className="mb-5 flex items-center justify-between gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1769A4]">
              Moments from the Exhibition
            </p>

            <span className="hidden text-[11px] font-medium text-[#8794A0] sm:inline">
              {previousEdition.dates}
            </span>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3">
            {PHOTOS.map((photo, index) => (
              <motion.figure
                key={photo.src}
                variants={REVEAL}
                className={[
                  "group relative overflow-hidden bg-[#F0F3F5]",
                  "aspect-[4/3] sm:aspect-[1.1/1]",
                  index === 0 ? "sm:col-span-1" : "",
                ].join(" ")}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />

                {/* Fine bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
