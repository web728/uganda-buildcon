"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const WORDS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const WORD: Variants = {
  hidden: { opacity: 0, y: "105%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.8, ease: EASE },
  },
};

const VISIT_BENEFITS = [
  {
    title: "Discover New Products",
    description:
      "Explore building materials, construction machinery, architectural products and building technologies presented by exhibitors.",
  },
  {
    title: "Compare Suppliers",
    description:
      "Review product options, discuss specifications and speak with different manufacturers and suppliers.",
  },
  {
    title: "Meet Industry Professionals",
    description:
      "Connect with manufacturers, distributors, contractors, architects, engineers and other industry professionals.",
  },
  {
    title: "Find Project Solutions",
    description:
      "Discuss materials, equipment and building systems relevant to your projects and technical requirements.",
  },
  {
    title: "Explore Business Opportunities",
    description:
      "Meet potential suppliers and business partners to discuss sourcing, distribution and collaboration.",
  },
  {
    title: "Build Supplier Relationships",
    description:
      "Reconnect with existing contacts and establish new relationships for future purchasing and projects.",
  },
] as const;

const FAQS = [
  {
    question: "Who can visit the exhibition?",
    answer:
      "The exhibition is intended for professionals and businesses involved in building, construction, architecture, engineering, property development, procurement and related industries. See the Visitor Profile page for a detailed list.",
    link: { label: "View Visitor Profile", href: "/visitor-profile" },
  },
  {
    question: "What can I expect at the exhibition?",
    answer:
      "You can explore building and construction products, review equipment and technical solutions, and speak with participating manufacturers and suppliers.",
  },
  {
    question: "When and where will the exhibition take place?",
    answer: `${event.name} is scheduled for ${event.dates.display} at ${event.venue.fullLocation}.`,
    link: { label: "Venue Information", href: "/venue" },
  },
  {
  question: "What are the exhibition opening hours?",
  answer:
    "The exhibition will be open daily from 10:00 AM to 6:00 PM, from 4–6 August 2027.",
},
{
  question: "Is entry to the exhibition free?",
  answer:
    "Yes, entry is completely free for all visitors. You can register online before the exhibition or at the venue during opening hours.",
},
  {
    question: "How can I register to visit?",
    answer:
      "Complete the visitor registration form on the website. Follow any confirmation or entry instructions provided by the organising team.",
    link: { label: "Register to Visit", href: event.cta.registerVisit },
  },


{
  question: "Can I register directly at the venue?",
  answer:
    "Yes, on-site registration will be available at the exhibition venue from 10:00 AM to 6:00 PM on all three exhibition days. You can also register online in advance.",
},
{
  question: "Is the exhibition open to the general public?",
  answer:
    "Yes, the exhibition is open to everyone, including industry professionals, businesses, students and the general public. Entry is free for all visitors.",
},

  {
    question: "Can I meet manufacturers and suppliers?",
    answer:
      "Yes. Meeting manufacturers, suppliers and other building and construction businesses is one of the main reasons to attend. Individual company participation may vary.",
  },
  {
    question: "Will international exhibitors participate?",
    answer:
      "The exhibition welcomes international participation. Details of confirmed companies will be available through official exhibitor updates.",
    link: { label: "Exhibitor Directory", href: "/exhibitors" },
  },
  {
    question: "Will there be product demonstrations?",
    answer:
      "Exhibitors may present products and equipment at their stands. Live demonstrations depend on individual exhibitors and venue arrangements and are not guaranteed.",
  },
  {
    question: "How can I reach the exhibition venue?",
    answer:
      "The exhibition is scheduled to take place at UMA Multi Purpose Hall, UMA Show Grounds, Kampala. Refer to the Venue & Location page for the map and travel information.",
    link: { label: "View Venue & Map", href: "/venue" },
  },
] as const;

type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#1769A4]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
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

function ArchitecturalGrid() {
  const reduced = useReducedMotion() === true;
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 720 360" fill="none" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <pattern id="why-visit-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" stroke="#1769A4" strokeWidth=".8" strokeOpacity=".14" />
        </pattern>
      </defs>
      <rect width="720" height="360" fill="url(#why-visit-grid)" />
      <motion.path d="M0 270H165V215H330V115H720" stroke="#1769A4" strokeWidth="1.5" initial={false}
        animate={reduced ? undefined : { pathLength: [0, 1, 1], opacity: [0, 0.55, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }} />
      <motion.path d="M60 355V280H275V190H490V90H720" stroke="#111111" strokeWidth="1.5" initial={false}
        animate={reduced ? undefined : { pathLength: [0, 1, 1], opacity: [0, 0.4, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }} />
    </svg>
  );
}

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <motion.article variants={REVEAL} className="group flex h-full min-w-0 flex-col rounded-xl border border-[#E2E8EF] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_14px_34px_rgba(16,35,55,0.05)] sm:p-7">
      <span aria-hidden="true" className="mb-5 h-[3px] w-9 bg-[#1769A4] transition-[width] duration-300 group-hover:w-16" />
      <h3 className="font-heading text-[18px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111111]">{title}</h3>
      <p className="mt-3 text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]">{description}</p>
    </motion.article>
  );
}

function FAQRow({ item, index }: { item: FaqItem; index: number }) {
  return (
    <motion.div variants={REVEAL} className="border-b border-[#E3E9EF] last:border-b-0">
      <details className="group/faq">
        <summary className="flex cursor-pointer list-none items-start gap-4 py-5 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769A4] [&::-webkit-details-marker]:hidden sm:gap-5 sm:py-6">
          <span aria-hidden="true" className="mt-0.5 w-7 shrink-0 font-heading text-[12px] font-semibold tabular-nums text-[#8C9AAA]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 flex-1 font-heading text-[15px] font-semibold leading-[1.5] text-[#111111] transition-colors group-hover/faq:text-[#1769A4] sm:text-[17px]">
            {item.question}
          </span>
          <span aria-hidden="true" className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#DDE6EE] text-[#1769A4]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-3.5 w-3.5 transition-transform duration-200 group-open/faq:rotate-45">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </summary>
        <div className="pb-6 pl-11 pr-10 sm:pl-12">
          <p className="max-w-[740px] text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]">{item.answer}</p>
          {item.link && (
            <Link href={item.link.href} className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1769A4] hover:text-[#105685]">
              {item.link.label}<ArrowIcon />
            </Link>
          )}
        </div>
      </details>
    </motion.div>
  );
}

export function VisitClientView() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111111]">
      {/* VISITOR BENEFITS */}
      <section aria-labelledby="why-visit-heading" className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-20 -z-10 h-[360px] w-[680px] opacity-40">
          <ArchitecturalGrid />
        </div>
        <Container className="relative z-10">
          <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col gap-7 border-b border-[#E5EBF0] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[780px]">
              <motion.div variants={REVEAL}><SectionLabel>Visitor Benefits</SectionLabel></motion.div>
              <motion.h2 id="why-visit-heading" variants={WORDS} aria-label="Explore Products. Meet Suppliers."
                className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.55rem)] font-extrabold leading-[1.13] tracking-[-0.045em]">
                <span aria-hidden="true"><AnimatedWords text="Explore Products." />{" "}<AnimatedWords text="Meet Suppliers." className="text-[#1769A4]" /></span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[680px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
                Discover building materials, construction equipment, architectural products and modern building systems. Compare options, speak with suppliers and find products relevant to your business or projects.
              </motion.p>
            </div>
            <motion.div variants={REVEAL}>
              <Link href={event.cta.registerVisit} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]">
                Register to Visit <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.08 }} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISIT_BENEFITS.map((benefit) => <BenefitItem key={benefit.title} {...benefit} />)}
          </motion.div>
        </Container>
      </section>

      {/* VISITOR FAQ */}
      <section aria-labelledby="visit-faq-heading" className="border-t border-[#E5EBF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="max-w-[760px]">
            <motion.div variants={REVEAL}><SectionLabel>Visitor Information</SectionLabel></motion.div>
            <motion.h2 id="visit-faq-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(1.9rem,3vw,3rem)] font-bold leading-[1.15] tracking-[-0.045em] text-[#111111]">
              Frequently Asked <span className="text-[#1769A4]">Questions.</span>
            </motion.h2>
            <motion.p variants={REVEAL} className="mt-4 max-w-[650px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              Find answers about visitor registration, exhibition access, products and planning your visit.
            </motion.p>
          </motion.div>

          <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.06 }} className="mt-8 overflow-hidden rounded-xl border border-[#E1E8EF] bg-white px-5 sm:px-8 lg:px-10">
            {FAQS.map((item, index) => <FAQRow key={item.question} item={item} index={index} />)}
          </motion.div>
 
        </Container>
      </section>
    </div>
  );
}
