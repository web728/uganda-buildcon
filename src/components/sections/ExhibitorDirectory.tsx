
"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

const EASE = [0.22, 1, 0.36, 1] as const;

type ExhibitorDirectoryProps = {
  exhibitors: ExhibitorSummary[];
};

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

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ExhibitorDirectory({
  exhibitors,
}: ExhibitorDirectoryProps) {
  const [query, setQuery] = useState("");
  const reducedMotion = useReducedMotion() === true;

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return exhibitors;

    return exhibitors.filter((exhibitor) => {
      const searchableText = [
        exhibitor.companyName,
        exhibitor.country,
        exhibitor.category,
        ...(exhibitor.products ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [exhibitors, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="w-full min-w-0">
      {/* SEARCH PANEL */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.75,
          ease: EASE,
        }}
        className="rounded-xl border border-[#E1E8EF] bg-[#F8FAFB] p-4 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full min-w-0 sm:max-w-[620px]">
            <label
              htmlFor="exhibitor-search"
              className="mb-2.5 block text-[12px] font-semibold leading-[1.5] text-[#344456]"
            >
              Search Exhibitors
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8494A4]">
                <SearchIcon />
              </span>

              <input
                id="exhibitor-search"
                type="search"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search company, products or country..."
                autoComplete="off"
                className="h-12 w-full min-w-0 rounded-lg border border-[#DAE3EA] bg-white py-3 pl-12 pr-12 text-[13px] font-medium leading-[1.5] text-[#172536] outline-none transition-[border-color,box-shadow] placeholder:font-normal placeholder:text-[#96A3B0] focus:border-[#1769A4] focus:ring-[3px] focus:ring-[#1769A4]/10 sm:text-[14px]"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear exhibitor search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#8594A3] transition-colors hover:bg-[#EDF2F6] hover:text-[#172536] focus-visible:outline-2 focus-visible:outline-[#1769A4]"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="self-start text-[12px] font-bold text-[#1769A4] underline decoration-[#1769A4]/30 underline-offset-4 transition-colors hover:text-[#28A45A] sm:mb-3"
            >
              Reset Search
            </button>
          )}
        </div>
      </motion.div>

      {/* RESULTS HEADING */}
      <div className="mt-8 flex items-center gap-3 border-b border-[#E5EAF0] pb-4">
        <span
          aria-hidden="true"
          className="h-[2px] w-8 bg-[#28A45A]"
        />

        <h2 className="font-heading text-[15px] font-bold leading-[1.4] tracking-[-0.02em] text-[#172536] sm:text-[17px]">
          {hasQuery
            ? filtered.length > 0
              ? "Matching Exhibitors"
              : "No Matching Exhibitors"
            : "Participating Exhibitors"}
        </h2>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length === 0
          ? "No matching exhibitor profiles."
          : `${filtered.length} exhibitor profiles found.`}
      </p>

      {/* EXHIBITOR GRID */}
      <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {filtered.map((exhibitor, index) => (
            <motion.div
              key={exhibitor._id}
              layout={!reducedMotion}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 18 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, scale: 0.97 }
              }
              transition={{
                duration: 0.45,
                delay: reducedMotion
                  ? 0
                  : Math.min(index, 6) * 0.035,
                ease: EASE,
              }}
              className="min-w-0 [&>*]:h-full"
            >
              <ExhibitorCard exhibitor={exhibitor} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EMPTY SEARCH STATE */}
      {filtered.length === 0 && (
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 15 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-[#D8E2EA] bg-[#F9FBFC] px-6 py-12 text-center sm:py-16"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1769A4]/[0.08] text-[#1769A4]">
            <SearchIcon />
          </div>

          <h3 className="mt-5 font-heading text-[20px] font-bold leading-[1.3] tracking-[-0.03em] text-[#111820]">
            No Exhibitors Found
          </h3>

          <p className="mt-3 max-w-[430px] text-[13px] leading-[1.8] text-[#607083]">
            No published exhibitor profiles match
            your search. Try another company,
            product, category or country.
          </p>

          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685]"
          >
            Clear Search
          </button>
        </motion.div>
      )}
    </div>
  );
}
