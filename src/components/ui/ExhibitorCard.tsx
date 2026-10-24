
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import type { ExhibitorSummary } from "@/lib/data/exhibitors";

interface ExhibitorCardProps {
  exhibitor: ExhibitorSummary;
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

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
      className="h-4 w-4"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ExhibitorCard({
  exhibitor,
}: ExhibitorCardProps) {
  const reducedMotion = useReducedMotion() === true;

  return (
    <motion.article
      whileHover={
        reducedMotion ? undefined : { y: -4 }
      }
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="h-full min-w-0"
    >
      <Link
        href={`/exhibitors/${exhibitor.slug}`}
        aria-label={`View ${exhibitor.companyName} exhibitor profile`}
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E1E8EF] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_16px_38px_rgba(16,35,55,0.06)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]"
      >
        {/* TOP ACCENT */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#28A45A] transition-transform duration-500 group-hover:scale-x-100"
        />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* COUNTRY + STAND */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {exhibitor.country ? (
              <span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-semibold leading-[1.5] text-[#758596]">
                <LocationIcon />
                <span>{exhibitor.country}</span>
              </span>
            ) : (
              <span />
            )}

            {exhibitor.standNumber && (
              <span className="rounded-md bg-[#28A45A]/[0.08] px-2.5 py-1 text-[10px] font-bold leading-[1.5] text-[#208648]">
                Stand {exhibitor.standNumber}
              </span>
            )}
          </div>

          {/* COMPANY LOGO */}
          <div className="mt-5 flex h-[115px] w-full items-center justify-center rounded-lg border border-[#EBEFF3] bg-[#F9FBFC] p-4 transition-colors duration-300 group-hover:border-[#1769A4]/20 group-hover:bg-white">
            {exhibitor.logoUrl ? (
              <Image
                src={exhibitor.logoUrl}
                alt={`${exhibitor.companyName} logo`}
                width={200}
                height={90}
                sizes="(max-width: 640px) 180px, 200px"
                className="max-h-[85px] max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
              />
            ) : (
              <span className="max-w-full break-words text-center font-heading text-[15px] font-bold leading-[1.4] tracking-[-0.025em] text-[#344657]">
                {exhibitor.companyName}
              </span>
            )}
          </div>

          {/* COMPANY DETAILS */}
          <div className="mt-5">
            <h3 className="font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#172536] transition-colors duration-300 group-hover:text-[#1769A4] sm:text-[18px]">
              {exhibitor.companyName}
            </h3>

            {exhibitor.category && (
              <p className="mt-2 text-[12px] font-semibold leading-[1.6] text-[#28A45A]">
                {exhibitor.category}
              </p>
            )}
          </div>

          {/* FOOTER LINK */}
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between gap-3 border-t border-[#E9EEF2] pt-4">
              <span className="text-[12px] font-semibold text-[#1769A4]">
                View Exhibitor Profile
              </span>

              <span className="text-[#1769A4] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
