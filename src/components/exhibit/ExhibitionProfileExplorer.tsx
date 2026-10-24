
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { sectorIconMap } from "@/components/icons/SectorIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="h-5 w-5"
    >
      <circle cx="10.8" cy="10.8" r="7.3" />
      <path d="m16.2 16.2 5 5" />
    </svg>
  );
}

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

/* ==========================================
   ORIGINAL ARCHITECTURAL SVG GRID
========================================== */

function ArchitecturalGrid() {
  const reduced = useReducedMotion() === true;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 310"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <pattern
          id="exhibition-profile-grid"
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
        height="310"
        fill="url(#exhibition-profile-grid)"
      />

      <motion.path
        d="M0 250H210V185H390V100H720"
        stroke="#1769A4"
        strokeOpacity=".5"
        strokeWidth="1.5"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.7, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M35 300V225H265V155H510V55H720"
        stroke="#28A45A"
        strokeOpacity=".5"
        strokeWidth="1.5"
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                pathLength: [0, 1, 1],
                opacity: [0, 0.7, 0],
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
   EXHIBITION PROFILE EXPLORER
========================================== */

export function ExhibitionProfileExplorer() {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<
    string | null
  >(null);

  const reduced = useReducedMotion() === true;

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return exhibitionSectors.flatMap((sector) => {
      if (
        activeSlug &&
        sector.slug !== activeSlug
      ) {
        return [];
      }

      if (!search) {
        return [sector];
      }

      if (sector.name.toLowerCase().includes(search)) {
        return [sector];
      }

      const matchingSubcategories =
        sector.subcategories.filter((subcategory) =>
          subcategory.toLowerCase().includes(search)
        );

      if (matchingSubcategories.length === 0) {
        return [];
      }

      return [
        {
          ...sector,
          subcategories: matchingSubcategories,
        },
      ];
    });
  }, [query, activeSlug]);

  const hasFilters = Boolean(query || activeSlug);

  function resetFilters() {
    setQuery("");
    setActiveSlug(null);
  }

  return (
    <div className="relative isolate w-full">
      {/* =====================================
          EDITORIAL HEADING
      ===================================== */}
      <div className="relative overflow-hidden border-b border-[#E4EAF0] pb-8 sm:pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 -z-10 h-[310px] w-[620px] opacity-35"
        >
          <ArchitecturalGrid />
        </div>

        <motion.div
          initial={
            reduced ? false : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="h-[2px] w-8 bg-[#28A45A]" />

          <span className="text-[11px] font-bold uppercase leading-[1.5] tracking-[0.13em] text-[#1769A4]">
            Exhibition Sectors
          </span>
        </motion.div>

        <motion.h2
          id="exhibition-profile-heading"
          initial={
            reduced ? false : { opacity: 0, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            delay: 0.08,
            ease: EASE,
          }}
          className="mt-5 max-w-[780px] font-heading text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold leading-[1.13] tracking-[-0.045em] text-[#111820]"
        >
          Explore the{" "}
          <span className="text-[#1769A4]">
            Exhibition Profile.
          </span>
        </motion.h2>

        <motion.p
          initial={
            reduced ? false : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            delay: 0.13,
            ease: EASE,
          }}
          className="mt-5 max-w-[700px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]"
        >
          Discover the building materials, construction
          machinery, engineering solutions, architectural
          products and technologies represented at{" "}
          {event.name}. Search by product or browse
          the sectors below.
        </motion.p>
      </div>

      {/* =====================================
          SEARCH AND SECTOR FILTERS
      ===================================== */}
      <div className="mt-8 rounded-xl border border-[#E1E8EF] bg-[#F9FBFC] p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[590px]">
            <label
              htmlFor="sector-search"
              className="sr-only"
            >
              Search exhibition sectors and products
            </label>

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8191A1]">
              <SearchIcon />
            </span>

            <input
              id="sector-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveSlug(null);
              }}
              placeholder="Search materials, machinery, products..."
              className="h-12 w-full min-w-0 rounded-lg border border-[#DFE6EC] bg-white py-3 pl-12 pr-11 text-[13px] font-medium text-[#172536] outline-none transition-[border-color,box-shadow] placeholder:font-normal placeholder:text-[#9AA6B2] focus:border-[#1769A4] focus:ring-[3px] focus:ring-[#1769A4]/10 sm:text-[14px]"
            />

            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#8291A0] hover:bg-[#F0F4F7] hover:text-[#172536] focus-visible:outline-2 focus-visible:outline-[#1769A4]"
              >
                <span aria-hidden="true">×</span>
              </button>
            )}
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-[12px] font-bold text-[#1769A4] underline decoration-[#1769A4]/30 underline-offset-4 hover:text-[#28A45A] sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Filter exhibition sectors"
          className="mt-5 flex gap-2 overflow-x-auto border-t border-[#E5EAF0] pb-2 pt-5"
        >
          <button
            type="button"
            aria-pressed={!activeSlug && !query}
            onClick={resetFilters}
            className={`min-h-10 shrink-0 whitespace-nowrap rounded-lg px-4 py-2.5 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769A4] ${
              !activeSlug && !query
                ? "bg-[#1769A4] text-white"
                : "border border-[#DFE6EC] bg-white text-[#526376] hover:border-[#1769A4]/40 hover:text-[#1769A4]"
            }`}
          >
            All Sectors
          </button>

          {exhibitionSectors.map((sector) => {
            const selected = activeSlug === sector.slug;

            return (
              <button
                key={sector.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setQuery("");
                  setActiveSlug(
                    selected ? null : sector.slug
                  );
                }}
                className={`min-h-10 shrink-0 whitespace-nowrap rounded-lg px-4 py-2.5 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769A4] ${
                  selected
                    ? "bg-[#1769A4] text-white"
                    : "border border-[#DFE6EC] bg-white text-[#526376] hover:border-[#1769A4]/40 hover:text-[#1769A4]"
                }`}
              >
                {sector.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================
          PRODUCT SECTOR GRID
      ===================================== */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {filtered.length === 0
          ? "No matching exhibition sectors."
          : `Showing ${filtered.length} exhibition sectors.`}
      </div>

      <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty-search"
              initial={
                reduced ? false : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="col-span-full rounded-xl border border-dashed border-[#D9E3EB] bg-[#F9FBFC] px-6 py-12 text-center sm:py-16"
            >
              <h3 className="font-heading text-[19px] font-bold tracking-[-0.025em] text-[#111820]">
                No matching sectors found
              </h3>

              <p className="mx-auto mt-3 max-w-[400px] text-[13px] leading-[1.75] text-[#637486]">
                Try another material, machinery or product
                name, or browse the full exhibition profile.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1769A4] px-5 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#105685]"
              >
                View All Sectors
              </button>
            </motion.div>
          ) : (
            filtered.map((sector, index) => {
              const Icon = sectorIconMap[sector.slug];

              return (
                <motion.article
                  layout={!reduced}
                  key={sector.slug}
                  id={sector.slug}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, y: 18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduced
                      ? undefined
                      : { opacity: 0, scale: 0.97 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: reduced
                      ? 0
                      : Math.min(index, 8) * 0.035,
                    ease: EASE,
                  }}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E1E8EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_14px_34px_rgba(16,35,55,0.055)] sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1769A4]/[0.075] text-[#1769A4] transition-colors duration-300 group-hover:bg-[#1769A4] group-hover:text-white">
                      {Icon ? (
                        <Icon className="h-6 w-6" />
                      ) : (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.7}
                          className="h-6 w-6"
                        >
                          <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M9 8h2M9 12h2M15 8h1M15 12h1M9 21v-5h6v5" />
                        </svg>
                      )}
                    </div>

                    <span
                      aria-hidden="true"
                      className="h-[2px] w-9 bg-[#28A45A]"
                    />
                  </div>

                  <h3 className="mt-6 font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#111820] transition-colors group-hover:text-[#1769A4] sm:text-[18px]">
                    {sector.name}
                  </h3>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {sector.subcategories.map(
                      (subcategory) => (
                        <li
                          key={subcategory}
                          className="rounded-md border border-[#E8EDF2] bg-[#F8FAFB] px-3 py-1.5 text-[12px] font-medium leading-[1.55] text-[#617184]"
                        >
                          {subcategory}
                        </li>
                      )
                    )}
                  </ul>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#28A45A] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* =====================================
          SINGLE PARTICIPATION CTA
      ===================================== */}
      <motion.div
        initial={
          reduced ? false : { opacity: 0, y: 20 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-12 flex flex-col gap-6 border-t border-[#E3E9EF] pt-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-[710px]">
          <h2 className="font-heading text-[clamp(1.65rem,2.6vw,2.5rem)] font-bold leading-[1.18] tracking-[-0.04em] text-[#111820]">
            Showcase Your Products at{" "}
            <span className="text-[#1769A4]">
              Uganda Buildcon.
            </span>
          </h2>

          <p className="mt-3 max-w-[620px] text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">
            Explore exhibition participation for{" "}
            {event.name}, {event.dates.display} at{" "}
            {event.venue.fullLocation}.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/who-should-exhibit"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#DCE4EB] bg-white px-5 py-3 text-[13px] font-semibold text-[#1769A4] transition-colors hover:border-[#1769A4]"
          >
            Who Should Exhibit
          </Link>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685]"
          >
            Book a Stand
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
