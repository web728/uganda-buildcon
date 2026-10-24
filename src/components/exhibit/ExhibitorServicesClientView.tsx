
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ==========================================
   ANIMATION SYSTEM
========================================== */

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
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
   EXHIBITOR SERVICES

   Existing service topics preserved.
   Pending details are not presented
   as already available.
========================================== */

type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  status: "guidance" | "pending";
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

const SERVICES: Service[] = [
  {
    id: "visa",
    title: "Visa Information & Entry Requirements",
    category: "International Travel",
    description:
      "International exhibitors and delegates should check the entry requirements applicable to their nationality and travel documents. Refer to Uganda's official immigration portal for visa information and application procedures.",
    status: "guidance",
    icon:
      "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
    action: {
      label: "Official Uganda e-Visa Portal",
      href: "https://visas.immigration.go.ug/",
      external: true,
    },
  },
  {
    id: "invitation-letter",
    title: "Official Visa Invitation Letters",
    category: "Exhibitor Assistance",
    description:
      "Confirmed exhibitors who require an organiser invitation letter for their visa application can contact the organising team after their stand booking is confirmed. Documentation requirements should be verified directly with the organisers.",
    status: "guidance",
    icon:
      "M8 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9m-5-6H8m0 0v6m0-6 7 6M8 13h8M8 17h5",
    action: {
      label: "Request an Invitation Letter",
      href: "/contact",
    },
  },
  {
    id: "stand-construction",
    title: "Stand Construction & Space Options",
    category: "Exhibition Setup",
    description:
      "Explore Shell Scheme and Raw Bare Space participation options. Standard fittings, custom stand construction, electrical requirements and technical specifications should be confirmed with the organising team.",
    status: "guidance",
    icon:
      "M3 21h18M5 21V7l7-4 7 4v14M9 11h2m2 0h2M9 15h2m2 0h2M9 21v-3h6v3",
    action: {
      label: "Explore Stand Options",
      href: "/exhibit",
    },
  },
  {
    id: "freight-logistics",
    title: "Customs Clearance & Freight Logistics",
    category: "Shipping & Handling",
    description:
      "Freight forwarding guidance, customs procedures for exhibition goods and on-site material handling arrangements will be communicated to confirmed exhibitors when the relevant details are available.",
    status: "pending",
    icon:
      "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  },
  {
    id: "hotels",
    title: "Hospitality & Hotel Information",
    category: "Accommodation",
    description:
      "Hotel recommendations and accommodation guidance for exhibitors travelling to Kampala will be shared when arrangements are confirmed. Visitors should make travel plans based on their individual requirements.",
    status: "pending",
    icon:
      "M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M3 21h18M7 8h3M7 12h3M14 8h3M14 12h3M9 21v-5h6v5",
  },
  {
    id: "exhibitor-manual",
    title: "Technical Exhibitor Manual",
    category: "Operational Documents",
    description:
      "The exhibitor manual is expected to contain installation guidance, move-in and move-out arrangements, electrical requirements, equipment handling instructions and venue operating procedures.",
    status: "pending",
    icon:
      "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2zM9 7h7M9 11h7",
  },
  {
    id: "on-site-services",
    title: "On-Site Hall Services & Utilities",
    category: "Venue Operations",
    description:
      "Further information about on-site power connections, internet access, equipment requirements and exhibition floor services will be provided through official exhibitor communications.",
    status: "pending",
    icon:
      "M13 2L4 13h7v9l9-11h-7V2z",
  },
];

/* ==========================================
   ICONS
========================================== */

function ArrowIcon({
  external = false,
}: {
  external?: boolean;
}) {
  return external ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ServiceIcon({ path }: { path: string }) {
  return (
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
      <path d={path} />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 012.09 4.18 2 2 0 014.08 2h3a2 2 0 012 1.72l.5 2.97a2 2 0 01-.57 1.79L7.1 10.4a16 16 0 006.5 6.5l1.92-1.91a2 2 0 011.79-.57l2.97.5A2 2 0 0122 16.92z" />
    </svg>
  );
}

/* ==========================================
   SMALL TYPOGRAPHIC COMPONENTS
========================================== */

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
        className={`text-[11px] font-bold uppercase leading-[1.5] tracking-[0.12em] ${
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
  return (
    <span className={className}>
      {text.trim().split(/\s+/).map((word, index, words) => (
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
   BLUEPRINT BACKGROUND SVG

   Preserves the original architectural
   grid concept with subtle traced lines.
========================================== */

function BlueprintArtwork() {
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
          id="exhibitor-services-grid"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke="#1769A4"
            strokeWidth=".8"
            strokeOpacity=".13"
          />
        </pattern>
      </defs>

      <rect
        width="720"
        height="360"
        fill="url(#exhibitor-services-grid)"
      />

      <motion.path
        d="M0 285H165V205H350V105H720"
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
          duration: 13,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M75 355V250H280V175H515V70H720"
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
                opacity: [0, 0.65, 0],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   SERVICE CARD
========================================== */

function ServiceCard({ service }: { service: Service }) {
  const hasAction = Boolean(service.action);

  return (
    <motion.article
      id={service.id}
      variants={REVEAL}
      className="group relative flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-xl border border-[#E1E8EF] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_14px_35px_rgba(16,35,55,0.05)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.08] text-[#1769A4] transition-colors duration-300 group-hover:bg-[#1769A4] group-hover:text-white">
          <ServiceIcon path={service.icon} />
        </div>
 
      </div>

      <p className="mt-6 text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.1em] text-[#28A45A]">
        {service.category}
      </p>

      <h3 className="mt-2 font-heading text-[18px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111820]">
        {service.title}
      </h3>

      <p className="mt-3 flex-1 text-[13px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
        {service.description}
      </p>

      {hasAction && service.action && (
        <div className="mt-6 border-t border-[#E9EEF2] pt-4">
          {service.action.external ? (
            <a
              href={service.action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-[12px] font-bold leading-[1.5] text-[#1769A4] transition-colors hover:text-[#28A45A]"
            >
              {service.action.label}

              <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <ArrowIcon external />
              </span>
            </a>
          ) : (
            <Link
              href={service.action.href}
              className="group/link inline-flex items-center gap-2 text-[12px] font-bold leading-[1.5] text-[#1769A4] transition-colors hover:text-[#28A45A]"
            >
              {service.action.label}

              <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          )}
        </div>
      )}

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#28A45A] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==========================================
   ORGANISER HELPDESK
========================================== */


/* ==========================================
   OFFICIAL ORGANISER HELPDESK
   All contacts from @/config/event
========================================== */


function Helpdesk() {
  const contacts = [
    event.contact.futurex,
    event.contact.etsipl,
    event.contact.futurexSales,
  ] as const;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.6fr] lg:gap-10">
      {/* Compact Heading */}
      <div className="max-w-sm">
        <SectionLabel light>
          Organiser Assistance
        </SectionLabel>

        <h2
          id="exhibitor-helpdesk-heading"
          className="mt-3 font-heading text-[23px] font-bold leading-[1.2] tracking-[-0.035em] text-white sm:text-[27px]"
        >
          Need Assistance?
        </h2>

        <p className="mt-2 text-[12px] leading-[1.7] text-white/55 sm:text-[13px]">
          For exhibitor services, logistics and
          technical enquiries, contact our team.
        </p>

        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#7ACB58] transition-colors hover:text-white"
        >
          Contact Organisers
          <ArrowIcon />
        </Link>
      </div>

      {/* Compact Contacts */}
      <div className="grid gap-2 sm:grid-cols-3">
        {contacts.map((contact) => (
          <div
            key={contact.email}
            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-4"
          >
            <h3 className="text-[13px] font-bold leading-[1.4] text-white">
              {contact.name}
            </h3>

            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="mt-3 block text-[12px] font-medium tabular-nums text-white/70 transition-colors hover:text-[#7ACB58]"
            >
              {contact.phone}
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="mt-1.5 block break-all text-[11px] leading-[1.6] text-white/55 transition-colors hover:text-[#7ACB58]"
            >
              {contact.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ==========================================
   MAIN COMPONENT
========================================== */

export function ExhibitorServicesClientView() {
  const reduced = useReducedMotion() === true;

  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* SERVICES INTRODUCTION */}
      <section
        aria-labelledby="exhibitor-services-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-20 -z-10 h-[340px] w-[680px] opacity-40"
        >
          <BlueprintArtwork />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={GROUP}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-6 border-b border-[#E5EBF0] pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[780px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Exhibitor Operations
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="exhibitor-services-heading"
                variants={WORD_GROUP}
                aria-label="Plan Your Exhibition Participation"
                className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.55rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Plan Your Exhibition" />
                  {" "}
                  <AnimatedWords
                    text="Participation."
                    className="text-[#1769A4]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[690px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                Prepare for {event.name} with guidance
                on international travel, invitation letters,
                stand arrangements, freight requirements
                and venue services. Find available resources
                and the relevant organiser contacts below.
              </motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] motion-reduce:transform-none"
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* SERVICES GRID */}
          <motion.div
            variants={GROUP}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-8 grid items-stretch gap-4 md:grid-cols-2"
          >
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </motion.div>

         
        </Container>
      </section>

      {/* ORGANISER SUPPORT */}
      <section
        aria-labelledby="exhibitor-helpdesk-heading"
        className="relative isolate overflow-hidden bg-[#0B1423] py-14 text-white sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "linear-gradient(to right, transparent, black)",
          }}
        />

        <Container>
          <Helpdesk />
        </Container>
      </section>
    </div>
  );
}
