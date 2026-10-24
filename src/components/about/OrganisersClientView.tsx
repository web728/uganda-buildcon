
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
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
      delayChildren: 0.08,
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
   ORGANISER CONTENT

   Names, URLs, logos and contacts are
   sourced from event.ts.

   No unsupported metrics added.
========================================== */

const ORGANISER_CONTENT = [
  {
    description:
      "Futurex Trade Fair & Events Pvt. Ltd. is an exhibition and events organiser based in New Delhi, India. Its work includes business-to-business trade exhibitions that connect manufacturers, suppliers, buyers and industry professionals across multiple sectors.",
    additional:
      "As a joint organiser of Uganda Buildcon, Futurex contributes its exhibition planning and industry networking experience to the building and construction trade platform.",
    location: "New Delhi, India",
  },
  {
    description:
      "Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL) is an exhibition organiser based in Navi Mumbai, India, working with businesses and trade exhibition partners across international markets.",
    additional:
      "Through Uganda Buildcon, ETSIPL supports opportunities for industry engagement between international suppliers, regional businesses and construction sector professionals in Uganda and East Africa.",
    location: "Navi Mumbai, India",
  },
] as const;

/* ==========================================
   ICONS
========================================== */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
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
      className="h-[18px] w-[18px]"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.1 10a16 16 0 0 0 6.9 6.9l1.5-1.9a2 2 0 0 1 1.8-.6l3 .5A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

/* ==========================================
   HEADING REVEAL
========================================== */

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

          {index < words.length - 1
            ? "\u00A0"
            : null}
        </span>
      ))}
    </span>
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
          light
            ? "text-white/65"
            : "text-[#1769A4]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   ORGANISER PROFILE
========================================== */

function OrganiserProfile({
  index,
}: {
  index: number;
}) {
  const organiser = event.organisers[index];
  const content = ORGANISER_CONTENT[index];

  if (!organiser || !content) return null;

  const isFuturex = index === 0;

  return (
    <motion.article
      variants={REVEAL}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E1E8EE] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_18px_45px_rgba(16,35,55,0.055)]"
    >
      {/* Logo area */}
      <div className="relative flex min-h-[150px] items-center justify-between gap-5 border-b border-[#E8EDF2] bg-[#FAFBFC] px-6 py-7 sm:px-8">
        <a
          href={organiser.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${organiser.name} official website`}
          className="relative block h-[85px] w-full max-w-[220px]"
        >
          <Image
            src={organiser.logo}
            alt={`${organiser.name} official logo`}
            fill
            sizes="220px"
            className="object-contain object-left"
          />
        </a>

        <span
          aria-hidden="true"
          className={`h-9 w-[3px] shrink-0 rounded-full ${
            isFuturex
              ? "bg-[#1769A4]"
              : "bg-[#28A45A]"
          }`}
        />
      </div>

      {/* Company information */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-[11px] font-semibold tracking-[0.03em] text-[#718294]">
          {content.location}
        </p>

        <h3 className="mt-3 font-heading text-[clamp(1.15rem,1.7vw,1.5rem)] font-bold leading-[1.35] tracking-[-0.025em] text-[#101214]">
          {organiser.name}
        </h3>

        <div className="mt-5 space-y-4">
          <p className="text-[13px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
            {content.description}
          </p>

          <p className="text-[13px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
            {content.additional}
          </p>
        </div>

        <div className="mt-auto pt-7">
          <div className="border-t border-[#E8EDF2] pt-5">
            <a
              href={organiser.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-[12px] font-bold text-[#1769A4] transition-colors hover:text-[#28A45A]"
            >
              Visit Official Website

              <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <ExternalIcon />
              </span>
            </a>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
          isFuturex
            ? "bg-[#1769A4]"
            : "bg-[#28A45A]"
        }`}
      />
    </motion.article>
  );
}

/* ==========================================
   CONTACT DESK
========================================== */

function ContactDesk({
  company,
  name,
  phone,
  email,
}: {
  company: string;
  name: string;
  phone: string;
  email: string;
}) {
  const cleanPhone = phone.replace(/[^+\d]/g, "");

  return (
    <motion.article
      variants={REVEAL}
      className="group min-w-0 border-b border-[#E2E8EE] py-6 first:pt-0 last:border-b-0 last:pb-0 sm:py-7"
    >
   

      <h3 className="mt-2 font-heading text-[19px] font-bold leading-[1.35] tracking-[-0.025em] text-[#101214]">
        {name}
      </h3>

      <div className="mt-4 flex flex-col gap-3">
        <a
          href={`tel:${cleanPhone}`}
          className="group/link flex w-fit min-w-0 items-center gap-3 text-[13px] font-medium text-[#526477] transition-colors hover:text-[#1769A4]"
        >
          <span className="shrink-0 text-[#28A45A]">
            <PhoneIcon />
          </span>

          <span className="tabular-nums">
            {phone}
          </span>
        </a>

        <a
          href={`mailto:${email}`}
          className="group/link flex w-fit min-w-0 items-center gap-3 text-[13px] font-medium text-[#526477] transition-colors hover:text-[#1769A4]"
        >
          <span className="shrink-0 text-[#1769A4]">
            <MailIcon />
          </span>

          <span className="break-all">
            {email}
          </span>
        </a>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN ORGANISERS VIEW
========================================== */

export function OrganisersClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#101214]">
      {/* INTRODUCTION */}
      <section
        aria-labelledby="organisers-intro-heading"
        className="py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="flex flex-col gap-6 border-b border-[#E3E9EF] pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[760px]">
              <motion.div variants={REVEAL}>
                <SectionLabel>
                  Joint Event Organisers
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="organisers-intro-heading"
                variants={WORD_GROUP}
                aria-label="The People Behind Uganda Buildcon"
                className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.6rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="The People Behind" />
                  {" "}
                  <AnimatedWords
                    text="Uganda"
                    className="text-[#1769A4]"
                  />
                  {" "}
                  <AnimatedWords
                    text="Buildcon."
                    className="text-[#28A45A]"
                  />
                </span>
              </motion.h2>

              <motion.p
                variants={REVEAL}
                className="mt-5 max-w-[710px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
              >
                {event.name} is jointly organised by
                Futurex Trade Fair &amp; Events Pvt. Ltd.
                and Exhibitions &amp; Trade Services
                India Pvt. Ltd. (ETSIPL). Both organisations
                contribute exhibition experience and
                industry connections to the Uganda
                building and construction trade platform.
              </motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Company showcase */}
          <motion.div
            variants={GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-8 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6"
          >
            {event.organisers.map((organiser, index) => (
              <OrganiserProfile
                key={organiser.name}
                index={index}
              />
            ))}
          </motion.div>
        </Container>
      </section>

   
{/* ==========================================
    OFFICIAL CONTACTS
========================================== */}
<section
  aria-labelledby="organisers-contact-heading"
  className="border-t border-[#E4EAF0] bg-[#F8FAFB] py-12 sm:py-14 lg:py-16"
>
  <Container>
    {/* Section heading */}
    <motion.div
      variants={GROUP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col gap-4 border-b border-[#E0E7ED] pb-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-[680px]">
        <motion.div variants={REVEAL}>
          <SectionLabel>Official Contacts</SectionLabel>
        </motion.div>

        <motion.h2
          id="organisers-contact-heading"
          variants={REVEAL}
          className="mt-4 font-heading text-[clamp(1.8rem,2.8vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#101214]"
        >
          Connect with the{" "}
          <span className="text-[#1769A4]">
            Organising Team.
          </span>
        </motion.h2>

        <motion.p
          variants={REVEAL}
          className="mt-3 max-w-[610px] text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]"
        >
          For exhibition participation, stand bookings,
          international enquiries and visitor assistance,
          reach our official representatives directly.
        </motion.p>
      </div>

      <motion.div variants={REVEAL}>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#1769A4] transition-colors hover:text-[#28A45A]"
        >
          Contact Us
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </motion.div>
    </motion.div>

    {/* Three evenly aligned contact cards */}
    <motion.div
      variants={GROUP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {[
        event.contact.futurex,
        event.contact.etsipl,
        event.contact.futurexSales,
      ].map((contact) => (
        <motion.article
          key={contact.email}
          variants={REVEAL}
          className="group flex h-full min-w-0 flex-col rounded-xl border border-[#E0E7ED] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_12px_30px_rgba(15,33,53,0.045)] sm:p-6"
        >
          {/* Company and name */}
          <div className="min-w-0">
           

            <h3 className="mt-2 font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#101214] sm:text-[18px]">
              {contact.name}
            </h3>
          </div>

          {/* Contact details aligned consistently */}
          <div className="mt-auto flex flex-col gap-3 border-t border-[#E8EDF2] pt-4 [margin-top:20px]">
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="flex min-h-8 min-w-0 items-center gap-2.5 text-[12px] font-medium text-[#526477] transition-colors hover:text-[#1769A4] sm:text-[13px]"
            >
              <span className="shrink-0 text-[#28A45A]">
                <PhoneIcon />
              </span>
              <span className="tabular-nums">
                {contact.phone}
              </span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex min-h-8 min-w-0 items-start gap-2.5 text-[12px] font-medium leading-[1.6] text-[#526477] transition-colors hover:text-[#1769A4]"
            >
              <span className="mt-0.5 shrink-0 text-[#1769A4]">
                <MailIcon />
              </span>
              <span className="min-w-0 break-all">
                {contact.email}
              </span>
            </a>
          </div>
        </motion.article>
      ))}
    </motion.div>
  </Container>
</section>

    </div>
  );
}
