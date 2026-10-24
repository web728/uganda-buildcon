
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
    },
  },
};

const WORD: Variants = {
  hidden: { opacity: 0, y: "105%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

/* ==========================================
   INFORMATION FROM EVENT CONFIG
========================================== */

const VISIT_DETAILS = [
  {
    title: "Event Dates",
    value: event.dates.display,
    description: event.editionLabel,
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Exhibition Venue",
    value: event.venue.name,
    description: "UMA Show Grounds, Lugogo",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5",
  },
  {
    title: "Host City",
    value: `${event.venue.city}, ${event.venue.country}`,
    description: event.dates.timezone,
    icon: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0zM12 10h.01",
  },
  {
    title: "Visitor Registration",
    value: "Trade Visitor Registration",
    description: "Register online before attending",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
] as const;

/* ==========================================
   VISITOR FAQ
========================================== */

const FAQS = [
  {
    question:
      "How do I register to attend Uganda Buildcon?",
    answer:
      "Use the official visitor registration form to submit your details before attending. Follow the confirmation and badge collection instructions issued by the organisers.",
  },
  {
    question:
      "Do international visitors need a visa?",
    answer:
      "Entry requirements depend on nationality and travel documents. Check the official Uganda immigration portal before travelling. Contact the organisers if you require information about an invitation letter.",
  },
  {
    question:
      "What are the exhibition opening hours?",
    answer:
      `The exhibition is scheduled for ${event.dates.display}. Daily visitor opening and closing times have not yet been confirmed. Check official event communications before planning your arrival.`,
  },
  {
    question:
      "How do I travel to the venue from the airport?",
    answer:
      `International visitors arriving at Entebbe International Airport can arrange onward transport to ${event.venue.city}. The venue is ${event.venue.name}, at UMA Show Grounds, Lugogo. Confirm your journey and transport arrangements in advance.`,
  },
] as const;

/* ==========================================
   OFFICIAL THREE CONTACTS
========================================== */

const CONTACTS = [
  event.contact.futurex,
  event.contact.etsipl,
  event.contact.futurexSales,
] as const;

/* ==========================================
   SHARED COMPONENTS
========================================== */

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-[2px] w-8 shrink-0 bg-[#28A45A]"
      />
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
          light ? "text-white/60" : "text-[#1769A4]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function ArrowIcon({
  external = false,
}: {
  external?: boolean;
}) {
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
      {external ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(/\s+/);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span variants={WORD} className="inline-block">
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

/* ==========================================
   ARCHITECTURAL SVG
========================================== */

function ArchitecturalGrid() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 720 360"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <pattern
          id="plan-visit-premium-grid"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke="#1769A4"
            strokeOpacity=".14"
            strokeWidth=".8"
          />
        </pattern>
      </defs>

      <rect
        width="720"
        height="360"
        fill="url(#plan-visit-premium-grid)"
      />

      <motion.path
        d="M0 280H185V210H345V120H720"
        stroke="#1769A4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.6, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M75 355V260H275V180H510V85H720"
        stroke="#28A45A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.55, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   EVENT DETAIL CARD
========================================== */

function DetailCard({
  item,
  index,
}: {
  item: (typeof VISIT_DETAILS)[number];
  index: number;
}) {
  const blue = index % 2 === 0;

  return (
    <motion.article
      variants={REVEAL}
      className="group flex h-full min-w-0 flex-col rounded-xl border border-[#E2E8EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_12px_30px_rgba(16,35,55,0.04)] sm:p-6"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          blue
            ? "bg-[#1769A4]/[0.08] text-[#1769A4]"
            : "bg-[#28A45A]/[0.08] text-[#28A45A]"
        }`}
      >
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
          <path d={item.icon} />
        </svg>
      </div>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#7D8C9B]">
        {item.title}
      </p>

      <h3 className="mt-2 font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#172536] sm:text-[18px]">
        {item.value}
      </h3>

      <p className="mt-2 text-[12px] leading-[1.7] text-[#667789]">
        {item.description}
      </p>
    </motion.article>
  );
}

/* ==========================================
   COMPACT CONTACT HELPDESK
========================================== */

function VisitorHelpdesk() {
  return (
    <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.6fr] lg:gap-10">
      <div className="max-w-sm">
        <SectionLabel light>
          Visitor Assistance
        </SectionLabel>

        <h2
          id="visit-helpdesk-heading"
          className="mt-3 font-heading text-[23px] font-bold leading-[1.2] tracking-[-0.035em] text-white sm:text-[27px]"
        >
          Need Assistance?
        </h2>

        <p className="mt-2 text-[12px] leading-[1.7] text-white/55 sm:text-[13px]">
          For registration, travel guidance and
          delegation enquiries, contact the organisers.
        </p>

        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#7ACB58] hover:text-white"
        >
          Contact Organisers
          <ArrowIcon />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {CONTACTS.map((contact) => (
          <article
            key={contact.email}
            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-4"
          >
            <h3 className="text-[13px] font-bold leading-[1.4] text-white">
              {contact.name}
            </h3>

            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="mt-3 block text-[12px] font-medium tabular-nums text-white/75 hover:text-[#7ACB58]"
            >
              {contact.phone}
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="mt-1.5 block break-all text-[11px] leading-[1.6] text-white/55 hover:text-[#7ACB58]"
            >
              {contact.email}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   MAIN PAGE CONTENT
========================================== */

export function PlanYourVisitClientView() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* VISITOR ESSENTIALS */}
      <section
        aria-labelledby="visit-essentials-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-16 -z-10 h-[360px] w-[680px] opacity-35"
        >
          <ArchitecturalGrid />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col gap-6 border-b border-[#E5EAF0] pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[780px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Visitor Information
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="visit-essentials-heading"
                variants={WORD_GROUP}
                aria-label="Everything You Need to Plan Your Visit"
                className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.55rem)] font-extrabold leading-[1.13] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Everything You Need" />
                  {" "}
                  <AnimatedWords
                    text="to Plan Your Visit."
                    className="text-[#1769A4]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[680px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]"
              >
                Find key event details, venue directions
                and practical visitor guidance for{" "}
                {event.name} in {event.venue.city}.
              </motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#28A45A]"
              >
                Register to Visit
                <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VISIT_DETAILS.map((item, index) => (
              <DetailCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* VENUE AND MAP */}
      <section
        aria-labelledby="visit-venue-heading"
        className="border-y border-[#E5EAF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <motion.div
            initial={
              reduced ? false : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-[680px]">
              <SectionLabel>
                Venue & Directions
              </SectionLabel>

              <h2
                id="visit-venue-heading"
                className="mt-4 font-heading text-[clamp(1.85rem,3vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              >
                Find Your Way to{" "}
                <span className="text-[#1769A4]">
                  {event.venue.name}.
                </span>
              </h2>

              <p className="mt-3 text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">
                {event.venue.fullLocation}
              </p>
            </div>

            <a
              href={event.venue.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg border border-[#D8E2E9] bg-white px-5 py-3 text-[13px] font-semibold text-[#1769A4] transition-colors hover:border-[#1769A4]"
            >
              Open in Google Maps
              <ArrowIcon external />
            </a>
          </motion.div>

          <motion.div
            initial={
              reduced ? false : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-7 overflow-hidden rounded-xl border border-[#DFE7ED] bg-white"
          >
            <iframe
              title={`Location map of ${event.venue.name}, ${event.venue.city}`}
              src={event.venue.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full border-0 sm:h-[390px] lg:h-[430px]"
              allowFullScreen
            />
          </motion.div>
        </Container>
      </section>

      {/* VISITOR FAQ */}
      <section
        aria-labelledby="visit-faq-heading"
        className="bg-white py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="max-w-[760px]"
          >
            <motion.div variants={REVEAL}>
              <SectionLabel>
                Visitor Guidance
              </SectionLabel>
            </motion.div>

            <motion.h2
              id="visit-faq-heading"
              variants={REVEAL}
              className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-bold leading-[1.15] tracking-[-0.045em]"
            >
              Frequently Asked{" "}
              <span className="text-[#1769A4]">
                Questions.
              </span>
            </motion.h2>

            <motion.p
              variants={REVEAL}
              className="mt-4 text-[14px] leading-[1.8] text-[#607083]"
            >
              Useful information about visitor registration,
              travel requirements and exhibition access.
            </motion.p>
          </motion.div>

          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid gap-x-10 md:grid-cols-2"
          >
            {FAQS.map((faq) => (
              <motion.article
                key={faq.question}
                variants={REVEAL}
                className="border-b border-[#E2E9EF] py-6 first:pt-0"
              >
                <h3 className="font-heading text-[16px] font-bold leading-[1.4] tracking-[-0.02em] text-[#172536] sm:text-[17px]">
                  {faq.question}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.85] text-[#667789] sm:text-[14px]">
                  {faq.answer}
                </p>

                {faq.question.includes("visa") && (
                  <a
                    href="https://visas.immigration.go.ug/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-[#1769A4] hover:text-[#28A45A]"
                  >
                    Official Uganda e-Visa Portal
                    <ArrowIcon external />
                  </a>
                )}
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* COMPACT OFFICIAL HELPDESK */}
      <section
        aria-labelledby="visit-helpdesk-heading"
        className="relative bg-[#0B1423] py-9 text-white sm:py-11 lg:py-12"
      >
        <Container>
          <VisitorHelpdesk />
        </Container>
      </section>
    </div>
  );
}
