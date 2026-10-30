
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";

import {
  marketFacts,
  marketSources,
  opportunityCategories,
} from "@/data/marketFacts";

const BLUE = "#1769A4";
const GREEN = "#28A45A";
const LIME = "#7ACB58";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
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

const WORD_GROUP: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.05,
    },
  },
};

/* ==========================================
   EXISTING STRATEGIC CONTENT
   No additional market statistics.
========================================== */


const STRATEGIC_PILLARS = [
  {
    title: "Economic Growth",
    body:
      "Uganda's economic activity and investment support opportunities for building products, construction services and related industries.",
    icon:
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Urban Development",
    body:
      "Urban growth brings continuing needs for housing, commercial buildings, utilities and building services.",
    icon:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5m-9 0h4",
  },
  {
    title: "Infrastructure Development",
    body:
      "National development plans include priorities for transport, energy, water and other essential infrastructure.",
    icon:
      "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Regional Trade",
    body:
      "Uganda's membership in the East African Community supports regional trade and connections between suppliers and businesses.",
    icon:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
] as const;


/* ==========================================
   SHARED COMPONENTS
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
          <motion.span variants={WORD} className="inline-block">
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

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

function PillarIcon({ path }: { path: string }) {
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

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
          light ? "text-white/65" : "text-[#1769A4]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   ORIGINAL UGANDA BUILDCON BRAND SVG

   Geometry matches your homepage SVG:
   - Upper blue fan
   - Green triangle
   - Lower green fan
   - Inner sectors
   - Centre circles

   Only subtle rotation/pulse is animated.
========================================== */

function UgandaBrandArtwork() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <defs>
        <radialGradient
          id="why-uganda-page-glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stopColor={BLUE}
            stopOpacity=".19"
          />
          <stop
            offset="100%"
            stopColor={BLUE}
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <circle
        cx="400"
        cy="400"
        r="365"
        fill="url(#why-uganda-page-glow)"
      />

      {/* Original outer orbit */}
      <motion.g
        initial={false}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      >
        <path
          d="M180,210 A320,320 0 0,1 620,210"
          stroke="white"
          strokeOpacity=".3"
          strokeWidth="1.25"
        />
        <circle cx="280" cy="140" r="6" fill={BLUE} />
        <circle cx="580" cy="170" r="8" fill={LIME} />

        <path
          d="M130,340 A320,320 0 0,1 360,90"
          stroke="white"
          strokeOpacity=".28"
        />
        <circle cx="160" cy="270" r="9" fill={LIME} />
        <circle cx="165" cy="400" r="8" fill={BLUE} />

        <path
          d="M480,680 A320,320 0 0,0 710,510"
          stroke="white"
          strokeOpacity=".27"
        />
        <circle cx="560" cy="620" r="8" fill={GREEN} />
      </motion.g>

      {/* Original reverse orbit */}
      <motion.g
        initial={false}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{
          duration: 75,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="345"
          stroke="white"
          strokeOpacity=".13"
          strokeDasharray="5 15"
        />
        <circle cx="400" cy="55" r="5" fill={GREEN} />
      </motion.g>

      {/* Original upper blue fan */}
      <motion.path
        d="M400,400 L275,100 A340,340 0 0,1 525,100 Z"
        fill={BLUE}
        opacity=".95"
        initial={false}
        animate={
          reduced ? undefined : { scale: [1, 1.02, 1] }
        }
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      />

      {/* Original green triangle */}
      <motion.polygon
        points="465,370 655,80 655,470"
        fill={GREEN}
        opacity=".94"
        initial={false}
        animate={
          reduced ? undefined : { scale: [1, 1.018, 1] }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      />

      {/* Original lower green fan */}
      <motion.path
        d="M400,400 L95,475 A330,330 0 0,0 270,710 Z"
        fill={GREEN}
        opacity=".89"
        initial={false}
        animate={
          reduced ? undefined : { scale: [1, 1.02, 1] }
        }
        transition={{
          duration: 6.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "400px 400px",
          transformBox: "view-box",
        }}
      />

      {/* Original inner sectors */}
      <path
        d="M400,400 L210,340 A205,205 0 0,0 280,560 Z"
        fill="#208749"
        opacity=".85"
      />

      <path
        d="M400,400 L510,480 A205,205 0 0,1 465,565 Z"
        fill={GREEN}
        opacity=".87"
      />

      {/* Central rings */}
      <circle
        cx="400"
        cy="400"
        r="140"
        stroke="white"
        strokeOpacity=".34"
        strokeWidth="1.5"
      />

      <circle
        cx="400"
        cy="400"
        r="125"
        stroke="white"
        strokeOpacity=".9"
        strokeWidth="3.5"
      />

      {/* Centre pulse */}
      <motion.circle
        cx="400"
        cy="400"
        r="105"
        fill={BLUE}
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                r: [105, 110, 105],
                fill: [BLUE, "#105685", BLUE],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==========================================
   STRATEGIC PILLAR
========================================== */

function StrategicPillar({
  pillar,
}: {
  pillar: (typeof STRATEGIC_PILLARS)[number];
}) {
  return (
    <motion.article
      variants={REVEAL}
      className="group flex min-w-0 items-start gap-4 border-b border-[#E2E8ED] py-5 sm:gap-5 sm:py-6"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.065] text-[#1769A4] transition-colors duration-300 group-hover:bg-[#1769A4] group-hover:text-white">
        <PillarIcon path={pillar.icon} />
      </div>

      <div className="min-w-0">
        <h3 className="font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#101214] sm:text-[18px]">
          {pillar.title}
        </h3>

        <p className="mt-2 max-w-[550px] text-[13px] leading-[1.8] tracking-[-0.005em] text-[#607083] sm:text-[14px]">
          {pillar.body}
        </p>
      </div>
    </motion.article>
  );
}

/* ==========================================
   MAIN CLIENT VIEW
========================================== */

export function WhyUgandaClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#101214]">
      {/* MARKET INDICATORS */}
      <section
        aria-labelledby="market-indicators-heading"
        className="py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-6 border-b border-[#E5EAF0] pb-7 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[730px]">
              <motion.div variants={REVEAL}>
              <SectionLabel>
  Market Indicators
</SectionLabel>
              </motion.div>

              <motion.h2
                variants={WORD_GROUP}
                id="market-indicators-heading"
                aria-label="Understanding Uganda's Construction Market"
                className="mt-5 font-heading text-[clamp(2rem,3.55vw,3.65rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
               <span aria-hidden="true">
  <AnimatedWords text="Uganda's" />
  {" "}
  <AnimatedWords
    text="Economic"
    className="text-[#1769A4]"
  />
  {" "}
  <AnimatedWords text="& Urban Development." />
</span>
              </motion.h2>

            <motion.p
  variants={REVEAL}
  className="mt-5 max-w-[640px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
>
  Key economic and development indicators
  that provide context for Uganda's building
  and construction market.
</motion.p>
            </div>

            <motion.div variants={REVEAL}>
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-lg bg-[#1769A4] px-6 py-2.5 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Facts directly from existing data */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {marketFacts.map((fact) => (
              <motion.div
                key={fact.id}
                variants={REVEAL}
                className="min-w-0"
              >
                <StatCard fact={fact} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* UGANDA ORIGINAL BRAND SVG + MARKET CONTEXT */}
      <section
        aria-labelledby="uganda-opportunity-heading"
        className="relative isolate overflow-hidden bg-[#080808] py-14 text-white sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -right-32 top-0 h-[440px] w-[440px] rounded-full bg-[#1769A4]/[0.08] blur-[100px]" />

          <div className="absolute -bottom-32 left-0 h-[350px] w-[350px] rounded-full bg-[#28A45A]/[0.055] blur-[90px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={REVEAL}>
             <SectionLabel light>
  Market Development
</SectionLabel>
              </motion.div>

              <motion.h2
                id="uganda-opportunity-heading"
                variants={WORD_GROUP}
                aria-label="A Market Shaped by Development and Opportunity"
                className="mt-5 max-w-[650px] font-heading text-[clamp(2rem,3.4vw,3.6rem)] font-extrabold leading-[1.12] tracking-[-0.045em] text-white"
              >
              <span aria-hidden="true">
  <AnimatedWords text="Building Needs" />
  {" "}
  <AnimatedWords text="Across" />
  {" "}
  <AnimatedWords
    text="Uganda."
    className="text-[#7DBBE8]"
  />
</span>
              </motion.h2>

             <motion.p
  variants={REVEAL}
  className="mt-6 max-w-[590px] text-[14px] leading-[1.9] text-white/70 sm:text-[15px]"
>
  Housing, commercial buildings, transport
  projects and urban infrastructure create
  demand for building materials, construction
  equipment and engineering services.
</motion.p>

             <motion.p
  variants={REVEAL}
  className="mt-4 max-w-[590px] text-[14px] leading-[1.9] text-white/70 sm:text-[15px]"
>
  {event.name} gives manufacturers, suppliers
  and industry professionals an opportunity
  to present products, meet potential buyers
  and establish business contacts.
</motion.p>

              <motion.div
                variants={REVEAL}
                className="mt-7"
              >
                <Link
                  href="/exhibition-profile"
                  className="group inline-flex items-center gap-3 border-b border-[#7ACB58]/50 pb-1.5 text-[13px] font-bold text-white transition-colors hover:text-[#7ACB58]"
                >
                  Explore Exhibition Profile

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Original brand artwork */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1.15,
                ease: EASE,
              }}
              className="relative mx-auto aspect-square w-full max-w-[410px] sm:max-w-[470px] lg:max-w-[520px]"
            >
              <UgandaBrandArtwork />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* STRATEGIC REASONS */}
      <section
        aria-labelledby="why-uganda-strategy-heading"
        className="py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={REVEAL}>
              <SectionLabel>
  Market Drivers
</SectionLabel>

              </motion.div>

            <motion.h2
  id="why-uganda-strategy-heading"
  variants={REVEAL}
  className="mt-5 font-heading text-[clamp(1.9rem,3vw,3.1rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-[#111111]"
>
  Factors Driving{" "}
  <span className="text-[#1769A4]">
    Market Demand.
  </span>
</motion.h2>

            <motion.p
  variants={REVEAL}
  className="mt-4 max-w-[420px] text-[14px] leading-[1.85] text-[#607083]"
>
  Economic activity, urban growth,
  infrastructure planning and regional trade
  influence Uganda's building and
  construction market.
</motion.p>
            </motion.div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="border-t border-[#E2E8ED]"
            >
              {STRATEGIC_PILLARS.map((pillar) => (
                <StrategicPillar
                  key={pillar.title}
                  pillar={pillar}
                />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* MARKET OPPORTUNITY CATEGORIES */}
      {/* <section
        aria-labelledby="uganda-sectors-heading"
        className="border-y border-[#E5EBF0] bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={REVEAL}>
              <SectionLabel>
                Industry Opportunities
              </SectionLabel>
            </motion.div>

         <motion.h2
  id="uganda-sectors-heading"
  variants={REVEAL}
  className="mt-4 max-w-[760px] font-heading text-[clamp(1.85rem,3vw,3rem)] font-extrabold leading-[1.14] tracking-[-0.045em] text-[#111111]"
>
  Key Building &{" "}
  <span className="text-[#1769A4]">
    Construction Segments.
  </span>
</motion.h2>

           <motion.p
  variants={REVEAL}
  className="mt-4 max-w-[640px] text-[14px] leading-[1.85] text-[#607083]"
>
  Explore the types of projects and
  developments that require building products,
  construction equipment and related services.
</motion.p>
          </motion.div>

          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {opportunityCategories.map((category) => (
              <motion.div
                key={category}
                variants={REVEAL}
                className="group flex min-w-0 items-center gap-3 border border-[#E2E8ED] bg-white px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_8px_24px_rgba(15,33,53,0.04)]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A]" />

                <span className="text-[13px] font-semibold leading-[1.55] tracking-[-0.01em] text-[#253548]">
                  {category}
                </span>
              </motion.div>
            ))}
          </motion.div>

       
        </Container>
      </section> */}

     
    </div>
  );
}
