
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.06,
    },
  },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.05,
    },
  },
};

const WORD: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
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

/* ==========================================
   VENUE CONTENT
========================================== */

const ADVANTAGES = [
  {
    title: "Central Kampala Location",
    description:
      "Kampala is Uganda's capital and commercial centre, bringing together construction companies, developers, consultants and industry professionals.",
    icon: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0zM12 10h.01",
  },
  {
    title: "Established Exhibition Grounds",
    description:
      "UMA Show Grounds have hosted previous editions of Uganda Buildcon, including the 2025 exhibition at the Multi Purpose Hall.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M3 21h18M9 8h2M9 12h2M9 16h2M15 8h.01M15 12h.01M15 16h.01",
  },
  {
    title: "East African Business Connections",
    description:
      "Uganda's position within the East African Community supports engagement between regional suppliers, manufacturers and construction industry buyers.",
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  },
  {
    title: "International Travel Access",
    description:
      "International visitors can arrive through Entebbe International Airport and continue to Kampala by road.",
    icon: "M22 2 9.5 14.5M22 2l-7 20-4.5-8.5L2 9z",
  },
] as const;

/* ==========================================
   SHARED UI
========================================== */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
          light ? "text-white/60" : "text-[#1769A4]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

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

/* ==========================================
   VENUE ADVANTAGE ROW
========================================== */

function AdvantageRow({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="group flex min-w-0 items-start gap-4 border-b border-[#E4E9EE] py-5 sm:gap-5 sm:py-6"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.07] text-[#1769A4] transition-colors duration-300 group-hover:bg-[#1769A4] group-hover:text-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d={icon} />
        </svg>
      </div>

      <div className="min-w-0">
        <h3 className="font-heading text-[16px] font-bold leading-[1.4] tracking-[-0.025em] text-[#101214] sm:text-[18px]">
          {title}
        </h3>

        <p className="mt-2 max-w-[650px] text-[13px] leading-[1.8] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

/* ==========================================
   VENUE MAP
========================================== */

function VenueMap() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.16,
      }}
      transition={{
        duration: 0.9,
        ease: EASE,
      }}
      className="min-w-0"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1769A4]">
          Official Venue Map
        </span>

        <span className="text-[11px] text-[#7B8795]">
          {event.venue.city}, {event.venue.country}
        </span>
      </div>

      <div className="relative h-[330px] overflow-hidden rounded-xl border border-[#DFE6EC] bg-[#EDF2F6] sm:h-[410px] lg:h-[470px]">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.2,
            ease: EASE,
          }}
          className="absolute inset-0"
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          <iframe
            title={`Location of ${event.venue.name}, ${event.venue.city}`}
            src={event.venue.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </motion.div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12px] leading-[1.65] text-[#647385]">
          {event.venue.fullLocation}
        </p>

        <a
          href={event.venue.mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b border-[#1769A4]/40 pb-1 text-[12px] font-bold text-[#1769A4] transition-colors hover:border-[#28A45A] hover:text-[#28A45A]"
        >
          Open in Google Maps

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </motion.div>
  );
}

/* ==========================================
   MAIN VENUE PAGE CONTENT
========================================== */

export function VenueClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#101214]">
      {/* INTRODUCTION + MAP */}
      <section
        aria-labelledby="venue-overview-heading"
        className="py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
            <motion.div
              variants={GROUP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="min-w-0"
            >
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Exhibition Location
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="venue-overview-heading"
                variants={WORD_GROUP}
                aria-label={event.venue.fullLocation}
                className="mt-5 max-w-[570px] font-heading text-[clamp(2.05rem,3.4vw,3.5rem)] font-extrabold leading-[1.13] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text={event.venue.name} />

                  <span className="block text-[#1769A4]">
                    <AnimatedWords
                      text={`${event.venue.city}, ${event.venue.country}.`}
                    />
                  </span>
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-6 max-w-[550px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                {event.name} takes place at{" "}
                <strong className="font-semibold text-[#101214]">
                  {event.venue.fullLocation}
                </strong>
                . The venue is situated in Kampala,
                Uganda&apos;s capital and commercial centre,
                providing a meeting point for professionals
                from the building and construction industry.
              </motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-7 border-t border-[#E4E9EE]"
              >
                <div className="flex items-start gap-4 border-b border-[#E4E9EE] py-5">
                  <span className="mt-0.5 shrink-0 text-[#1769A4]">
                    <LocationIcon />
                  </span>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8793A0]">
                      Venue Location
                    </p>

                    <p className="mt-1.5 text-[14px] font-semibold leading-[1.65] text-[#101214]">
                      {event.venue.fullLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-[#E4E9EE] py-5">
                  <span className="mt-0.5 shrink-0 text-[#1769A4]">
                    <CalendarIcon />
                  </span>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8793A0]">
                      Exhibition Dates
                    </p>

                    <p className="mt-1.5 text-[14px] font-semibold leading-[1.65] text-[#101214]">
                      {event.dates.display}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={REVEAL}
                className="mt-7 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/plan-your-visit"
                  className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] motion-reduce:transform-none"
                >
                  Plan Your Visit

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>

                <a
                  href={event.venue.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#1769A4] transition-colors hover:text-[#28A45A]"
                >
                  Get Directions

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </motion.div>
            </motion.div>

            <VenueMap />
          </div>
        </Container>
      </section>

      {/* VENUE ADVANTAGES */}
      <section
        aria-labelledby="venue-advantages-heading"
        className="border-y border-[#E5EBF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
            <motion.div
              variants={GROUP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Infrastructure &amp; Access
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="venue-advantages-heading"
                variants={REVEAL}
                className="mt-5 max-w-[430px] font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                A Strategic{" "}
                <span className="text-[#1769A4]">
                  Exhibition Location.
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-4 max-w-[425px] text-[14px] leading-[1.85] text-[#607083]"
              >
                Discover the location advantages and
                travel connections relevant to visitors,
                exhibitors and businesses attending
                Uganda Buildcon.
              </motion.p>
            </motion.div>

            <motion.div
              variants={GROUP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="border-t border-[#E4E9EE]"
            >
              {ADVANTAGES.map((item) => (
                <AdvantageRow
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* EVENT INFORMATION */}
      <section
        aria-labelledby="venue-information-heading"
        className="py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16"
          >
            <div>
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Event Details
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="venue-information-heading"
                variants={REVEAL}
                className="mt-5 font-heading text-[clamp(1.85rem,2.8vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                Everything You Need{" "}
                <span className="text-[#1769A4]">
                  to Know.
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-4 max-w-[390px] text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]"
              >
                Essential venue and event information
                for planning your participation at
                {` ${event.shortName}`}.
              </motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-6"
              >
                <Link
                  href={event.cta.bookStand}
                  className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#1769A4] hover:text-[#28A45A]"
                >
                  Book a Stand

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.dl
              variants={GROUP}
              className="border-t border-[#E4E9EE]"
            >
              {[
                {
                  label: "Exhibition",
                  value: event.name,
                },
                {
                  label: "Dates",
                  value: event.dates.display,
                },
                {
                  label: "Venue",
                  value: event.venue.fullLocation,
                },
                {
                  label: "Event Format",
                  value: event.format,
                },
                {
                  label: "Nearest International Airport",
                  value: "Entebbe International Airport",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={REVEAL}
                  className="grid gap-2 border-b border-[#E4E9EE] py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#83919E]">
                    {item.label}
                  </dt>

                  <dd className="font-heading text-[14px] font-semibold leading-[1.6] tracking-[-0.015em] text-[#101214] sm:text-[15px]">
                    {item.value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
