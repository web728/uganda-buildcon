"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const WORD_GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.04 } },
};
const WORD: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.75, ease: EASE } },
};

const BENEFITS = [
  {
    title: "Meet Potential Buyers",
    body: "Introduce your products to contractors, developers, procurement teams and trade buyers involved in building and construction projects.",
  },
  {
    title: "Find Distribution Partners",
    body: "Meet importers, wholesalers and dealers to discuss supply and distribution opportunities.",
  },
  {
    title: "Understand Local Demand",
    body: "Speak with industry professionals about product needs, specifications and market requirements in Uganda.",
  },
  {
    title: "Discuss Business Enquiries",
    body: "Talk directly with prospective customers about pricing, product availability and project requirements.",
  },
  {
    title: "Meet Industry Specifiers",
    body: "Connect with architects, engineers and consultants involved in evaluating and selecting building systems and products.",
  },
  {
    title: "Showcase Your Products",
    body: "Display materials, machinery, architectural products, finishes and technologies to a relevant trade audience.",
  },
] as const;

const EXHIBITOR_PROFILES = [
  {
    title: "Manufacturers",
    desc: "Ugandan and international producers of building materials, components and industrial products.",
  },
  {
    title: "Exporters & International Suppliers",
    desc: "Companies supplying building and construction products to Uganda and East African markets.",
  },
  {
    title: "Importers & Distributors",
    desc: "Importers, wholesalers and dealers of building products, machinery and related equipment.",
  },
  {
    title: "Building Material Suppliers",
    desc: "Suppliers of cement, steel, roofing, insulation, waterproofing and finishing materials.",
  },
  {
    title: "Machinery & Equipment Companies",
    desc: "Suppliers of construction machinery, power tools, scaffolding and site equipment.",
  },
  {
    title: "Engineering Product Manufacturers",
    desc: "Manufacturers of structural components, electrical systems, pumps and mechanical equipment.",
  },
  {
    title: "Building Technology Providers",
    desc: "Businesses offering automation, HVAC, energy systems and construction software.",
  },
  {
    title: "Architectural & Building System Providers",
    desc: "Suppliers of doors, windows, glass, façades, prefabricated systems and interior products.",
  },
] as const;

const STAND_OPTIONS = [
  {
    title: "Shell Scheme Stand",
    desc: "A standard exhibition stand arrangement. Confirm fittings, services and specifications with the organisers.",
  },
  {
    title: "Bare Space",
    desc: "Unfurnished space for a custom-designed stand, subject to technical and venue requirements.",
  },
  {
    title: "International Pavilions",
    desc: "Group participation for trade associations, export bodies and delegations, subject to availability.",
  },
  {
    title: "Machinery & Equipment Displays",
    desc: "Display arrangements for larger equipment, subject to access, floor-load limits and prior approval.",
  },
] as const;

type SupportItemData = {
  title: string;
  desc: string;
  link?: { label: string; href: string; external?: boolean };
};

const EXHIBITOR_SUPPORT: SupportItemData[] = [
  {
    title: "Travel & Invitation Letters",
    desc: "Check the visa requirements for your nationality before travelling. Confirmed exhibitors can enquire about organiser invitation letters if needed.",
    link: { label: "Official Uganda e-Visa Portal", href: "https://visas.immigration.go.ug/", external: true },
  },
  {
    title: "Freight & Customs",
    desc: "Contact the organising team for available guidance on shipping exhibition materials, customs procedures and handling arrangements.",
  },
  {
    title: "Stand Setup & Technical Guidance",
    desc: "Confirm stand construction rules, electrical needs, setup schedules and availability of technical exhibitor instructions.",
  },
  {
    title: "Venue Services & Accommodation",
    desc: "Check venue utilities and facilities with the organisers. Make travel and hotel arrangements according to your requirements.",
  },
];

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className={`h-[2px] w-8 shrink-0 ${light ? "bg-[#7DBBE8]" : "bg-[#1769A4]"}`} />
      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${light ? "text-white/70" : "text-[#1769A4]"}`}>
        {children}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function AnimatedWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.trim().split(/\s+/).map((word, index, words) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={WORD} className="inline-block">{word}</motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

function BlueprintArtwork({ dark = false }: { dark?: boolean }) {
  const reduced = useReducedMotion() === true;
  const id = useId().replace(/:/g, "");
  const gridId = `exhibit-grid-${id}`;
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 600 300" fill="none" className="h-full w-full">
      <defs>
        <pattern id={gridId} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" stroke={dark ? "#FFFFFF" : "#1769A4"} strokeOpacity={dark ? ".12" : ".10"} strokeWidth=".8" />
        </pattern>
      </defs>
      <rect width="600" height="300" fill={`url(#${gridId})`} />
      <path d="M-40 220C120 110 240 300 390 155S530 95 650 145" stroke={dark ? "#FFFFFF" : "#1769A4"} strokeOpacity=".18" strokeWidth="1.2" />
      <motion.path
        d="M-40 220C120 110 240 300 390 155S530 95 650 145"
        stroke={dark ? "#7DBBE8" : "#1769A4"}
        strokeOpacity=".65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="75 1500"
        initial={false}
        animate={reduced ? undefined : { strokeDashoffset: [0, -1575] }}
        transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function BenefitCard({ item }: { item: (typeof BENEFITS)[number] }) {
  return (
    <motion.article variants={REVEAL} className="group flex h-full min-w-0 flex-col rounded-xl border border-[#E2E8EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_12px_32px_rgba(16,35,55,0.055)] sm:p-6">
      <span aria-hidden="true" className="mb-5 h-[3px] w-9 bg-[#1769A4] transition-[width] duration-300 group-hover:w-14" />
      <h3 className="font-heading text-[17px] font-bold leading-[1.35] text-[#111111]">{item.title}</h3>
      <p className="mt-3 text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">{item.body}</p>
    </motion.article>
  );
}

function ProfileCard({ item, index }: { item: (typeof EXHIBITOR_PROFILES)[number]; index: number }) {
  return (
    <motion.li variants={REVEAL} className="group flex h-full min-w-0 items-start gap-4 rounded-xl border border-[#E2E8EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_10px_24px_rgba(16,35,55,0.04)]">
     
      <div className="min-w-0">
        <h3 className="font-heading text-[15px] font-bold leading-[1.4] text-[#111111]">{item.title}</h3>
        <p className="mt-2 text-[13px] leading-[1.7] text-[#607083]">{item.desc}</p>
      </div>
    </motion.li>
  );
}

function StandCard({ item }: { item: (typeof STAND_OPTIONS)[number] }) {
  return (
    <motion.article variants={REVEAL} className="flex h-full min-w-0 flex-col rounded-xl border border-white/15 bg-white/[0.05] p-5 transition-[background-color,border-color] duration-300 hover:border-[#7DBBE8]/50 hover:bg-white/[0.08] sm:p-6">
      <span aria-hidden="true" className="mb-5 h-[2px] w-9 bg-[#7DBBE8]" />
      <h3 className="font-heading text-[17px] font-bold leading-[1.35] text-white">{item.title}</h3>
      <p className="mt-3 text-[13px] leading-[1.8] text-white/70">{item.desc}</p>
    </motion.article>
  );
}

function SupportCard({ item }: { item: SupportItemData }) {
  return (
    <motion.article variants={REVEAL} className="flex h-full min-w-0 flex-col rounded-xl border border-[#E2E8EF] bg-white p-5 sm:p-6">
      <span aria-hidden="true" className="mb-4 h-[2px] w-8 bg-[#1769A4]" />
      <h3 className="font-heading text-[16px] font-bold leading-[1.4] text-[#111111]">{item.title}</h3>
      <p className="mt-3 text-[13px] leading-[1.8] text-[#607083]">{item.desc}</p>
     
    </motion.article>
  );
}

export function ExhibitClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#111111]">
      {/* Exhibitor benefits */}
      <section aria-labelledby="exhibitor-benefits-heading" className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-200px] top-[-80px] h-[300px] w-[600px] opacity-40">
          <BlueprintArtwork />
        </div>
        <Container className="relative z-10">
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="flex flex-col gap-6 border-b border-[#E5EAF0] pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[790px]">
              <motion.div variants={REVEAL}><SectionLabel>Exhibitor Benefits</SectionLabel></motion.div>
              <motion.h2 id="exhibitor-benefits-heading" variants={WORD_GROUP} aria-label="Benefits of Exhibiting" className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.65rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                <span aria-hidden="true"><AnimatedWords text="Benefits of" />{" "}<AnimatedWords text="Exhibiting." className="text-[#1769A4]" /></span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[670px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
                Present your building and construction products, meet potential buyers and make business contacts in Uganda and East Africa.
              </motion.p>
            </div>
            <motion.div variants={REVEAL}>
              <Link href={event.cta.bookStand} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769A4]">
                Book a Stand <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((item) => <BenefitCard key={item.title} item={item} />)}
          </motion.div>
        </Container>
      </section>

      {/* Exhibitor profiles */}
      <section aria-labelledby="who-should-exhibit-heading" className="border-y border-[#E5EBF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="max-w-[760px]">
            <motion.div variants={REVEAL}><SectionLabel>Exhibitor Profiles</SectionLabel></motion.div>
            <motion.h2 id="who-should-exhibit-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em]">
              Who Should <span className="text-[#1769A4]">Exhibit?</span>
            </motion.h2>
            <motion.p variants={REVEAL} className="mt-4 max-w-[650px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              The exhibition is relevant to manufacturers, exporters, suppliers and distributors serving the building and construction industries.
            </motion.p>
            <motion.div variants={REVEAL} className="mt-5">
              <Link href="/exhibition-profile" className="group inline-flex min-h-10 items-center gap-2 text-[13px] font-bold text-[#1769A4] hover:text-[#111111]">
                Explore Product Sectors <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.ul variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {EXHIBITOR_PROFILES.map((item, index) => <ProfileCard key={item.title} item={item} index={index} />)}
          </motion.ul>
        </Container>
      </section>

      {/* Stand options */}
      <section aria-labelledby="participation-options-heading" className="relative isolate overflow-hidden bg-[#080F1D] py-14 text-white sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -right-[180px] top-0 h-[300px] w-[600px]"><BlueprintArtwork dark /></div>
        </div>
        <Container className="relative z-10">
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="flex flex-col gap-6 border-b border-white/15 pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[740px]">
              <motion.div variants={REVEAL}><SectionLabel light>Exhibition Participation</SectionLabel></motion.div>
              <motion.h2 id="participation-options-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(1.9rem,3.25vw,3.25rem)] font-extrabold leading-[1.14] tracking-[-0.045em]">
                Stand <span className="text-[#7DBBE8]">Options.</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[640px] text-[14px] leading-[1.85] text-white/70 sm:text-[15px]">
                Find a stand format suited to your products and display needs. Availability and specifications are subject to organiser confirmation.
              </motion.p>
            </div>
            <motion.div variants={REVEAL}>
              <Link href={event.cta.bookStand} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7DBBE8]">
                Enquire About Stand Space <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAND_OPTIONS.map((item) => <StandCard key={item.title} item={item} />)}
          </motion.div>
        </Container>
      </section>

      {/* Exhibitor support */}
      <section aria-labelledby="exhibitor-support-heading" className="border-b border-[#E5EBF0] bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="max-w-[760px]">
            <motion.div variants={REVEAL}><SectionLabel>Exhibitor Support</SectionLabel></motion.div>
            <motion.h2 id="exhibitor-support-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em]">
              Practical Information <span className="text-[#1769A4]">for Exhibitors.</span>
            </motion.h2>
            <motion.p variants={REVEAL} className="mt-4 max-w-[680px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              Find guidance on travel, shipping, stand preparation and venue arrangements. Confirm requirements with the organising team before making plans.
            </motion.p>
          </motion.div>
          <motion.div variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {EXHIBITOR_SUPPORT.map((item) => <SupportCard key={item.title} item={item} />)}
          </motion.div>
        </Container>
      </section>

    
    </div>
  );
}
