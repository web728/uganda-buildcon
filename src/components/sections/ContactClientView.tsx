
"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const WORD: Variants = {
  hidden: {
    opacity: 0,
    y: "105%",
  },
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
   SINGLE SOURCE OF TRUTH

   Exactly three official representatives.
   No duplicate compatibility aliases.
========================================== */

const CONTACTS = [
  event.contact.futurex,
  event.contact.etsipl,
  event.contact.futurexSales,
] as const;

/* ==========================================
   SHARED ELEMENTS
========================================== */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-[2px] w-8 shrink-0 bg-[#28A45A]"
      />

      <span className="text-[11px] font-bold uppercase leading-[1.5] tracking-[0.12em] text-[#1769A4]">
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

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 012.09 4.18 2 2 0 014.08 2h3a2 2 0 012 1.72l.5 2.97a2 2 0 01-.57 1.79L7.1 10.4a16 16 0 006.5 6.5l1.92-1.91a2 2 0 011.79-.57l2.97.5A2 2 0 0122 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* ==========================================
   ORIGINAL ARCHITECTURAL GRID
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
          id="contact-premium-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            stroke="#1769A4"
            strokeOpacity=".13"
            strokeWidth=".8"
          />
        </pattern>
      </defs>

      <rect
        width="720"
        height="360"
        fill="url(#contact-premium-grid)"
      />

      <motion.path
        d="M0 280H185V210H340V125H720"
        stroke="#1769A4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
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
        fill="none"
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
   OFFICIAL CONTACT CARD
========================================== */

function ContactCard({
  contact,
}: {
  contact: (typeof CONTACTS)[number];
}) {
  const phoneHref = contact.phone.replace(
    /[^\d+]/g,
    ""
  );

  return (
    <motion.article
      variants={REVEAL}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E1E8EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_12px_30px_rgba(16,35,55,0.04)] sm:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[#28A45A] transition-transform duration-500 group-hover:scale-y-100"
      />

      <div className="min-w-0">
     
        <h3 className="mt-2 font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#172536] sm:text-[18px]">
          {contact.name}
        </h3>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-[#E9EEF2] pt-4">
        <a
          href={`tel:${phoneHref}`}
          aria-label={`Call ${contact.name} at ${contact.phone}`}
          className="group/link inline-flex min-h-8 min-w-0 items-center gap-2.5 text-[12px] font-medium leading-[1.5] text-[#607083] transition-colors hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769A4] sm:text-[13px]"
        >
          <span className="shrink-0 text-[#1769A4]">
            <PhoneIcon />
          </span>

          <span className="tabular-nums">
            {contact.phone}
          </span>
        </a>

        <a
          href={`mailto:${contact.email}`}
          aria-label={`Email ${contact.name} at ${contact.email}`}
          className="group/link inline-flex min-h-8 min-w-0 items-start gap-2.5 text-[12px] font-medium leading-[1.6] text-[#607083] transition-colors hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769A4]"
        >
          <span className="mt-0.5 shrink-0 text-[#1769A4]">
            <EmailIcon />
          </span>

          <span className="min-w-0 break-all">
            {contact.email}
          </span>
        </a>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function ContactClientView() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111820]">
      {/* CONTACT FORM SECTION */}
      <section
        aria-labelledby="contact-form-heading"
        className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-20 -z-10 h-[360px] w-[680px] opacity-40"
        >
          <ArchitecturalGrid />
        </div>

        <Container className="relative z-10">
          
{/* CONTACT FORM HEADER */}
<motion.div
  variants={GROUP}
  initial={initial}
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="mx-auto max-w-[850px] text-center"
>
  <motion.div
    variants={REVEAL}
    className="flex justify-center"
  >
    <SectionLabel>
      Send an Enquiry
    </SectionLabel>
  </motion.div>

  <motion.h2
    id="contact-form-heading"
    variants={WORD_GROUP}
    aria-label="How Can We Help?"
    className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.045em] text-[#111111]"
  >
    <span aria-hidden="true">
      <AnimatedWords text="How Can" />
      {" "}
      <AnimatedWords
        text="We Help?"
        className="text-[#1769A4]"
      />
    </span>
  </motion.h2>

  <motion.p
    variants={REVEAL}
    className="mx-auto mt-5 max-w-[620px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]"
  >
    Have a question about exhibiting,
    visiting or participating in the exhibition?
    Complete the enquiry form below to contact
    our organising team.
  </motion.p>
</motion.div>


          {/* EXISTING FUNCTIONAL FORM */}
          <motion.div
            initial={
              reduced
                ? false
                : { opacity: 0, y: 22 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.08,
            }}
            transition={{
              duration: 0.8,
              ease: EASE,
            }}
            className="mx-auto mt-9 max-w-[860px] rounded-xl border border-[#E1E8EF] bg-white p-5 shadow-[0_18px_50px_rgba(16,35,55,0.045)] sm:mt-11 sm:p-8 lg:p-10"
          >
            <ContactForm />
          </motion.div>
        </Container>
      </section>

      {/* OFFICIAL CONTACT DIRECTORY */}
      <section
        aria-labelledby="official-contacts-heading"
        className="border-t border-[#E5EAF0] bg-[#F8FAFB] py-12 sm:py-14 lg:py-16"
      >
        <Container>
          
{/* OFFICIAL CONTACTS HEADER */}
<motion.div
  variants={GROUP}
  initial={initial}
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="flex flex-col gap-4 border-b border-[#E1E8EF] pb-6 sm:flex-row sm:items-end sm:justify-between"
>
  <div>
    <motion.div variants={REVEAL}>
      <SectionLabel>
        Official Contacts
      </SectionLabel>
    </motion.div>

    <motion.h2
      id="official-contacts-heading"
      variants={REVEAL}
      className="mt-3 font-heading text-[clamp(1.6rem,2.6vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.035em] text-[#111111]"
    >
      Contact Our{" "}
      <span className="text-[#1769A4]">
        Representatives.
      </span>
    </motion.h2>
  </div>

  <motion.p
    variants={REVEAL}
    className="max-w-[340px] text-[12px] leading-[1.75] text-[#68788A] sm:text-[13px]"
  >
    Find the contact details for our
    organising companies and speak directly
    with the relevant representatives.
  </motion.p>
</motion.div>

          <motion.div
            variants={GROUP}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CONTACTS.map((contact) => (
              <ContactCard
                key={contact.email}
                contact={contact}
              />
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
