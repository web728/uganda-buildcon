
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   PREMIUM SCROLL ANIMATIONS
========================================= */

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
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
      duration: 0.8,
      ease: EASE,
    },
  },
};

const CARD: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

/* =========================================
   EXISTING OFFICIAL ICONS
========================================= */

const ICONS = {
  building:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  machinery:
    "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  steel: "M4 6h16M4 10h16M4 14h16M4 18h16",
  prefab:
    "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  window:
    "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12h16M12 4v16",
  tiles:
    "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  interiors:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  chemicals:
    "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  bath:
    "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  hvac:
    "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  bolt: "M13 10V3L4 14h7v7l9-11h-7z",
  sun:
    "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
};

/* =========================================
   OFFICIAL EXHIBIT GROUPS — UNCHANGED DATA
========================================= */

const sectorTabs = [
  {
    id: "structural",
    label: "Materials & Machinery",
    sectors: [
      {
        title: "Building Materials",
        items:
          "Cement & Steel, Concrete Blocks, Gypsum Boards, Lightweight Materials, Timber",
        icon: ICONS.building,
        color: "blue",
      },
      {
        title: "Construction Machinery",
        items:
          "Earthmoving, Demolition, Quarrying & Mining Equipment, Formwork & Scaffolding",
        icon: ICONS.machinery,
        color: "green",
      },
      {
        title: "Structural Engineering & Steel",
        items:
          "Structural Engineering, Steel Fabrication, Aluminium Extrusions, Surveying Equipment",
        icon: ICONS.steel,
        color: "blue",
      },
      {
        title: "Prefab & Modular",
        items:
          "Pre-fabricated Structures, Modular Construction Solutions, Roofing & Façade",
        icon: ICONS.prefab,
        color: "green",
      },
    ],
  },
  {
    id: "architectural",
    label: "Architecture & Interiors",
    sectors: [
      {
        title: "Doors, Windows & Glass",
        items:
          "Doors & Windows, Architectural Glass, Decorative Glass & Mirrors, PVC/UPVC Profiles",
        icon: ICONS.window,
        color: "blue",
      },
      {
        title: "Tiles, Marble & Flooring",
        items:
          "Tiles & Sanitary Ware, Marble & Stones, Flooring & Wall Coverings, Industrial Flooring",
        icon: ICONS.tiles,
        color: "green",
      },
      {
        title: "Interiors & Acoustics",
        items:
          "Interior Decorating Products, Acoustics & Soundproofing, Outdoor Furniture & Landscaping",
        icon: ICONS.interiors,
        color: "blue",
      },
      {
        title: "Chemicals, Paints & Coatings",
        items:
          "Construction Chemicals & Waterproofing, Adhesives & Sealants, Paints & Coatings",
        icon: ICONS.chemicals,
        color: "green",
      },
    ],
  },
  {
    id: "mep",
    label: "Building Services",
    sectors: [
      {
        title: "Kitchen, Bath & Plumbing",
        items:
          "Kitchen & Bathroom Solutions, Plumbing Fittings & Accessories",
        icon: ICONS.bath,
        color: "blue",
      },
      {
        title: "HVAC, Lifts & Automation",
        items:
          "Air Conditioning & HVAC, Lifts & Elevators, Building & Home Automation",
        icon: ICONS.hvac,
        color: "green",
      },
      {
        title: "Electrical & Lighting",
        items:
          "Electricals & Electronics, Wires & Cables, Switchgear, Lighting / LED, Batteries & Generators",
        icon: ICONS.bolt,
        color: "blue",
      },
      {
        title: "Fire, Safety & Security",
        items:
          "Fire Protection Systems, Passive Fire Protection, Safety & Security",
        icon: ICONS.shield,
        color: "green",
      },
    ],
  },
  {
    id: "energy",
    label: "Green Energy & Technology",
    sectors: [
      {
        title: "Renewable & Green Energy",
        items:
          "Renewable Energy Systems, Solar, Wind & Other Green Energy Products",
        icon: ICONS.sun,
        color: "blue",
      },
      {
        title: "Construction Technology",
        items:
          "Building Information Modeling (BIM) Software, Infrastructure Software",
        icon: ICONS.hvac,
        color: "green",
      },
      {
        title: "Sustainable Construction",
        items:
          "Construction Waste Management, Noise Control Products, Lightweight Materials",
        icon: ICONS.shield,
        color: "blue",
      },
    ],
  },
];

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, index, words) => (
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
      className="h-4 w-4"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* =========================================
   PREMIUM SECTOR CARD
========================================= */

type Sector = (typeof sectorTabs)[number]["sectors"][number];

function SectorCard({
  sector,
  index,
}: {
  sector: Sector;
  index: number;
}) {
  const isBlue = sector.color === "blue";

  return (
    <motion.article
      variants={CARD}
      className="group relative flex min-w-0 flex-col rounded-xl border border-[#E5EAF0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_12px_35px_rgba(15,23,42,0.055)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isBlue
              ? "bg-[#1769A4]/[0.075] text-[#1769A4]"
              : "bg-[#28A45A]/[0.075] text-[#28A45A]"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              d={sector.icon}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        
      </div>

      <h3 className="mt-5 font-heading text-[15px] font-bold leading-[1.4] tracking-[-0.02em] text-[#10243E] transition-colors duration-300 group-hover:text-[#1769A4]">
        {sector.title}
      </h3>

      <p className="mt-2 flex-1 text-[12px] leading-[1.85] text-[#647385] sm:text-[13px]">
        {sector.items}
      </p>

      <motion.div
        aria-hidden="true"
        className="mt-5 h-[2px] w-9 origin-left bg-[#28A45A]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: index * 0.08,
          ease: EASE,
        }}
      />
    </motion.article>
  );
}

/* =========================================
   MAIN SECTION
========================================= */

export function ExhibitionProfileSection() {
  const [activeTab, setActiveTab] = useState(
    sectorTabs[0].id
  );

  const currentGroup =
    sectorTabs.find((tab) => tab.id === activeTab) ??
    sectorTabs[0];

  return (
    <section
      aria-labelledby="exhibition-profile-heading"
      className="relative overflow-hidden border-b border-[#E7EBF0] bg-[#FAFBFC] py-14 text-[#10243E] sm:py-16 lg:py-20"
    >
      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-5 border-b border-[#E1E7ED] pb-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[760px]">
            <motion.div
              variants={REVEAL}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-[#28A45A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1769A4]">
                What&apos;s On Display · Industry Sectors
              </span>
            </motion.div>

            <h2
              id="exhibition-profile-heading"
              aria-label="Products, Machinery & Materials on Display"
              className="font-heading text-[clamp(1.9rem,3vw,3.25rem)] font-extrabold leading-[1.15] tracking-[-0.05em] text-[#10243E]"
            >
              <span
                aria-hidden="true"
                className="block"
              >
                <AnimatedWords text="Products, Machinery &" />
              </span>

              <span
                aria-hidden="true"
                className="block text-[#1769A4]"
              >
                <AnimatedWords text="Materials on Display" />
              </span>
            </h2>

            <motion.p
              variants={REVEAL}
              className="mt-4 max-w-[670px] text-[13px] leading-[1.8] text-[#647385] sm:text-[14px]"
            >
              Covering the entire building supply chain
              across all official exhibit categories with
              live product showcases and working machinery
              displays.
            </motion.p>
          </div>

          <motion.div variants={REVEAL}>
            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-10 items-center gap-2 border-b border-[#1769A4]/35 pb-1 text-[12px] font-bold text-[#1769A4] transition-colors duration-300 hover:border-[#1769A4]"
            >
              All Sectors Page

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* CATEGORY TABS */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          role="tablist"
          aria-label="Exhibition sectors"
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#E1E7ED]"
        >
          {sectorTabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`exhibit-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="exhibit-sectors-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`relative whitespace-nowrap pb-3 pt-2 text-left text-[12px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28A45A] sm:text-[13px] ${
                  active
                    ? "text-[#1769A4]"
                    : "text-[#788595] hover:text-[#10243E]"
                }`}
              >
                {tab.label}

                {active && (
                  <motion.span
                    layoutId="exhibit-active-underline"
                    className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#28A45A]"
                    transition={{
                      type: "spring",
                      stiffness: 330,
                      damping: 34,
                    }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ACTIVE CATEGORY CARDS */}
        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              id="exhibit-sectors-panel"
              role="tabpanel"
              aria-labelledby={`exhibit-tab-${activeTab}`}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.45,
                    ease: EASE,
                    staggerChildren: 0.095,
                  },
                },
                exit: {
                  opacity: 0,
                  y: -8,
                  transition: {
                    duration: 0.18,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {currentGroup.sectors.map(
                (sector, index) => (
                  <SectorCard
                    key={sector.title}
                    sector={sector}
                    index={index}
                  />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* EXISTING BOOKING NOTE — COMPACT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mt-7 flex flex-col gap-3 border-t border-[#E1E7ED] pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-start gap-3 text-[12px] leading-[1.7] text-[#647385] sm:items-center">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A] sm:mt-0" />

            <span>
              Stand bookings for the 6th edition are
              open for local and international
              manufacturers &amp; suppliers.
            </span>
          </p>

          <Link
            href="/book-a-stand"
            className="group inline-flex shrink-0 items-center gap-2 text-[12px] font-bold text-[#1769A4] transition-colors hover:text-[#105685]"
          >
            Reserve Your Space

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
