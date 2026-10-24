
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

type ActiveTab = "reasons" | "who";

const BLUE = "#1769A4";
const GREEN = "#28A45A";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ==============================================
   ANIMATION CONFIG
============================================== */

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
    y: 20,
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

const TITLE_STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.095,
      delayChildren: 0.12,
    },
  },
};

const CARD: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

/* ==============================================
   EXISTING EXHIBIT DATA
============================================== */

const EXHIBIT_PILLARS = [
  {
    num: "01",
    title: "Maximise Your Presence",
    desc: "Showcase your brand and connect with key players in Uganda's building & construction sector.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "02",
    title: "Collaborate with Leaders",
    desc: "Engage architects, urban planners and developers from organisations such as the Uganda Society of Architects and the Ministry of Lands, Housing & Urban Development.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    num: "03",
    title: "Business Roundtables",
    desc: "Present your products & services in one-on-one meetings with decision-makers from major construction and energy companies.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "04",
    title: "Media & Promotion",
    desc: "Benefit from outdoor advertising, social media, print and broadcast campaigns that drive footfall and brand exposure.",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  },
  {
    num: "05",
    title: "International Exhibition",
    desc: "Link up with industry leaders and build a portfolio of clients across construction and energy in East Africa.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
] as const;

const EXHIBITOR_PROFILES = [
  "Construction Material Manufacturers",
  "International Suppliers",
  "Construction Machinery Companies",
  "Building Material Suppliers",
  "Green Building Solution Providers",
  "Infrastructure Software & Building Technology",
] as const;

/* ==============================================
   WORD-BY-WORD REVEAL
============================================== */

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

/* ==============================================
   ICONS
============================================== */

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function PillarIcon({
  path,
}: {
  path: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
    >
      <path d={path} />
    </svg>
  );
}

/* ==============================================
   ORIGINAL ARCHITECTURAL SVG

   Existing building geometry preserved.
   Improved motion on paths and nodes.
============================================== */

function ArchitectureArtwork() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 960 620"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="why-exhibit-trace"
          x1="0"
          y1="0"
          x2="960"
          y2="620"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={BLUE} />
          <stop offset=".65" stopColor={BLUE} />
          <stop offset="1" stopColor={GREEN} />
        </linearGradient>

        <radialGradient id="why-exhibit-glow">
          <stop
            stopColor={BLUE}
            stopOpacity=".12"
          />
          <stop
            offset="1"
            stopColor={BLUE}
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <circle
        cx="650"
        cy="290"
        r="300"
        fill="url(#why-exhibit-glow)"
      />

      {/* Technical grid */}
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={`vertical-${i}`}
          d={`M${i * 90} 0V620`}
          stroke={BLUE}
          strokeOpacity=".08"
        />
      ))}

      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={`horizontal-${i}`}
          d={`M0 ${i * 80}H960`}
          stroke={BLUE}
          strokeOpacity=".08"
        />
      ))}

      {/* Existing elevations */}
      <g
        stroke={BLUE}
        strokeOpacity=".28"
        strokeWidth="1.35"
      >
        <path d="M210 620V250L360 185V620" />
        <path d="M375 620V125L590 42V620" />
        <path d="M607 620V222L775 148V620" />
        <path d="M790 620V325L900 270V620" />

        <path d="M375 195H590M375 267H590M375 339H590M375 411H590M375 483H590M375 555H590" />
        <path d="M435 104V620M510 74V620" />
        <path d="M607 310H775M607 400H775M607 490H775M607 580H775" />
      </g>

      {/* Subtle continuous travelling traces */}
      <motion.path
        d="M375 620V125L590 42V620"
        stroke="url(#why-exhibit-trace)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="110 1600"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                strokeDashoffset: [0, -1710],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.path
        d="M210 620V250L360 185V620"
        stroke={GREEN}
        strokeOpacity=".65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="70 1300"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                strokeDashoffset: [0, -1370],
              }
        }
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Original orbit geometry */}
      <circle
        cx="718"
        cy="166"
        r="145"
        stroke={BLUE}
        strokeOpacity=".14"
      />

      <circle
        cx="718"
        cy="166"
        r="104"
        stroke={GREEN}
        strokeOpacity=".22"
      />

      <motion.g
        initial={false}
        animate={
          reduced
            ? undefined
            : { rotate: 360 }
        }
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "718px 166px",
          transformBox: "view-box",
        }}
      >
        <path
          d="M573 166A145 145 0 0 1 863 166"
          stroke={BLUE}
          strokeOpacity=".55"
          strokeWidth="2"
        />

        <circle
          cx="718"
          cy="21"
          r="5"
          fill={GREEN}
        />

        <circle
          cx="863"
          cy="166"
          r="3"
          fill={BLUE}
        />
      </motion.g>

      <motion.g
        initial={false}
        animate={
          reduced
            ? undefined
            : { rotate: -360 }
        }
        transition={{
          duration: 58,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "718px 166px",
          transformBox: "view-box",
        }}
      >
        <path
          d="M718 62A104 104 0 0 1 718 270"
          stroke={GREEN}
          strokeOpacity=".65"
          strokeWidth="2"
          strokeDasharray="6 11"
        />
      </motion.g>

      <motion.circle
        cx="590"
        cy="42"
        r="5"
        fill={GREEN}
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.35, 1, 0.35],
                r: [4, 6, 4],
              }
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ==============================================
   0 TO TARGET COUNT UP
   Both server/client initially render 0.
============================================== */

function CountUp({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration: 2.8,
      ease: "linear",
      onUpdate: setNumber,
      onComplete: () => setNumber(value),
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      aria-label={`${value.toFixed(decimals)}%`}
    >
      <span aria-hidden="true">
        {number.toFixed(decimals)}%
      </span>
    </span>
  );
}

/* ==============================================
   PILLAR CARD
============================================== */

function PillarCard({
  item,
  index,
}: {
  item: (typeof EXHIBIT_PILLARS)[number];
  index: number;
}) {
  return (
    <motion.article
      variants={CARD}
      className={[
        "group relative flex min-w-0 flex-col",
        "border border-[#E1E7EB] bg-white",
        "p-5 sm:p-6",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-[#1769A4]/35",
        "hover:shadow-[0_12px_30px_rgba(0,0,0,0.045)]",
        index < 2
          ? "lg:col-span-3"
          : "lg:col-span-2",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="text-[#28A45A]">
          <PillarIcon path={item.icon} />
        </span>

        
      </div>

      <h3 className="mt-5 font-heading text-[16px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[17px]">
        {item.title}
      </h3>

      <p className="mt-2 flex-1 text-[12px] leading-[1.8] text-[#58677B] sm:text-[13px]">
        {item.desc}
      </p>

      <Link
        href="/exhibit"
        className="mt-5 inline-flex w-fit items-center gap-2 border-b border-[#1769A4]/25 pb-1 text-[12px] font-bold text-[#1769A4] transition-colors hover:border-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A]"
      >
        Why Exhibit

        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
          <ArrowUpRight />
        </span>
      </Link>

      {/* Drawn underline on hover */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#28A45A] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==============================================
   EXHIBITOR PROFILE
============================================== */

function ProfileItem({
  profile,
  index,
}: {
  profile: string;
  index: number;
}) {
  return (
    <motion.div
      variants={CARD}
      className="group flex min-w-0 items-center gap-4 border-b border-[#E2E8EC] py-4"
    >
     

      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-[14px] font-semibold leading-[1.4] tracking-[-0.02em] text-[#111111] sm:text-[15px]">
          {profile}
        </h3>

        <p className="mt-1 text-[12px] leading-[1.6] text-[#58677B]">
          Connect with buyers and professionals from
          Uganda&apos;s construction sector.
        </p>
      </div>

      <span className="shrink-0 text-[#1769A4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        <ArrowUpRight />
      </span>
    </motion.div>
  );
}

/* ==============================================
   MAIN SECTION
============================================== */

export function WhyExhibitSection() {
  const [activeTab, setActiveTab] =
    useState<ActiveTab>("reasons");

  return (
    <section
      aria-labelledby="why-exhibit-heading"
      className="relative isolate overflow-hidden border-b border-[#E2E8EC] bg-[#F8F9FA] py-14 text-[#111111] sm:py-16 lg:py-20"
    >
      {/* Background artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -right-[260px] -top-[130px] h-[550px] w-[800px] opacity-[0.32] sm:-right-[150px] sm:h-[650px] sm:w-[900px] lg:-right-[140px] lg:-top-[150px] lg:h-[760px] lg:w-[1100px]">
          <ArchitectureArtwork />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/90 to-[#F8F9FA]/25" />
      </div>

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div className="max-w-[760px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-[#28A45A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1769A4]">
                For Exhibitors
              </span>
            </motion.div>

            {/* Word-by-word heading */}
            <motion.h2
              id="why-exhibit-heading"
              aria-label="Your Next Market. Your Next Opportunity."
              variants={TITLE_STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
              }}
              className="max-w-[730px] font-heading text-[clamp(2rem,3.45vw,3.55rem)] font-extrabold leading-[1.1] tracking-[-0.055em]"
            >
              <span
                aria-hidden="true"
                className="block text-[#111111]"
              >
                <AnimatedWords text="Your Next Market." />
              </span>

              <span
                aria-hidden="true"
                className="block"
              >
                <AnimatedWords
                  text="Your Next"
                  className="text-[#1769A4]"
                />{" "}
                <AnimatedWords
                  text="Opportunity."
                  className="text-[#28A45A]"
                />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: EASE,
              }}
              className="mt-5 max-w-[630px] text-[14px] leading-[1.85] text-[#58677B] sm:text-[15px]"
            >
              Build meaningful business relationships,
              showcase your solutions and connect with
              contractors, developers, architects and
              procurement leaders across Uganda and
              East Africa.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: EASE,
            }}
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-11 items-center justify-center gap-4 rounded-lg bg-[#1769A4] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_24px_rgba(23,105,164,0.13)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#105685] hover:shadow-[0_14px_28px_rgba(23,105,164,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none"
            >
              Book a Stand
              <ArrowUpRight />
            </Link>
          </motion.div>
        </div>

        {/* TABS */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            ease: EASE,
          }}
          className="mt-9 border-b border-[#DCE3E8]"
        >
          <div
            role="tablist"
            aria-label="Exhibitor information"
            className="flex flex-wrap items-center gap-x-8 gap-y-2"
          >
            {(
              [
                {
                  id: "reasons",
                  label: "Why Exhibit",
                  count: "05",
                },
                {
                  id: "who",
                  label: "Who Should Exhibit",
                  count: "06",
                },
              ] as const
            ).map((tab) => {
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`why-exhibit-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="why-exhibit-content"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "relative pb-4 pt-2 text-left",
                    "font-heading text-[13px] font-bold",
                    "transition-colors duration-300",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28A45A]",
                    active
                      ? "text-[#111111]"
                      : "text-[#82909C] hover:text-[#1769A4]",
                  ].join(" ")}
                >
                  {tab.label}

                  

                  {active && (
                    <motion.span
                      layoutId="why-exhibit-active-tab"
                      className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#1769A4]"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 34,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ANIMATED TAB CONTENT */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "reasons" ? (
            <motion.div
              key="reasons"
              id="why-exhibit-content"
              role="tabpanel"
              aria-labelledby="why-exhibit-tab-reasons"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
                ease: EASE,
              }}
            >
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4"
              >
                {EXHIBIT_PILLARS.map(
                  (item, index) => (
                    <PillarCard
                      key={item.num}
                      item={item}
                      index={index}
                    />
                  )
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="who"
              id="why-exhibit-content"
              role="tabpanel"
              aria-labelledby="why-exhibit-tab-who"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
                ease: EASE,
              }}
            >
              <motion.div
                variants={STAGGER}
                initial="hidden"
                animate="visible"
                className="mt-3 grid gap-x-10 sm:grid-cols-2"
              >
                {EXHIBITOR_PROFILES.map(
                  (profile, index) => (
                    <ProfileItem
                      key={profile}
                      profile={profile}
                      index={index}
                    />
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
 
      </Container>
    </section>
  );
}
