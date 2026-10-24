
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";

import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";

import { supporters } from "@/data/previousEdition";

import {
  PartnersReveal,
  PartnersArtwork,
} from "./PartnersMotion";

/* =========================================================
   PARTNERS SECTION
   Premium Minimal / Editorial / Responsive

   Server component preserved for async data loading.
========================================================= */

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
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export async function PartnersSection() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  const hasPartners = partners.length > 0;

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative isolate overflow-hidden border-b border-[#E6EBEF] bg-white py-14 text-[#111111] sm:py-16 lg:py-20"
    >
      {/* =========================================
          CONTINUOUS ANIMATED SVG BACKGROUND
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -right-[240px] -top-[210px] h-[520px] w-[520px] opacity-[0.35] sm:-right-[180px] sm:h-[630px] sm:w-[630px] lg:opacity-[0.45]">
          <PartnersArtwork />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* =========================================
            SECTION HEADING
        ========================================= */}

        <PartnersReveal>
          <div className="flex flex-col gap-6 border-b border-[#E5EBEF] pb-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[740px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#28A45A]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1769A4]">
                  Our Partners
                </span>
              </div>

              <h2
                id="partners-heading"
                className="font-heading text-[clamp(1.9rem,2.9vw,2.95rem)] font-bold leading-[1.13] tracking-[-0.045em] text-[#111111]"
              >
                Organisers &{" "}
                <span className="text-[#1769A4]">
                  Partners.
                </span>
              </h2>

              <p className="mt-3 max-w-[580px] text-[13px] leading-[1.8] text-[#647385] sm:text-[14px]">
                Bringing together exhibition organisers,
                supporting associations and industry
                partners who contribute to Uganda
                Buildcon.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-3 self-start rounded-md border border-[#DCE4E9] bg-white px-5 py-2.5 text-[12px] font-bold text-[#111111] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#1769A4] hover:text-[#1769A4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#28A45A] motion-reduce:transform-none md:self-auto"
            >
              Partner With Us

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>
        </PartnersReveal>

        {/* =========================================
            OFFICIAL ORGANISERS
        ========================================= */}

        <PartnersReveal delay={0.08}>
          <div className="grid gap-6 border-b border-[#E5EBEF] py-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12 lg:py-11">
            {/* Left side */}
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28A45A]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1769A4]">
                  Official Joint Organisers
                </p>
              </div>

              <h3 className="max-w-[450px] font-heading text-[clamp(1.25rem,1.8vw,1.65rem)] font-bold leading-[1.35] tracking-[-0.035em] text-[#111111]">
                Futurex Trade Fair & Events
                <span className="mx-2 text-[#A1ADB6]">
                  /
                </span>
                ETSIPL
              </h3>

              <p className="mt-3 max-w-[440px] text-[12px] leading-[1.85] text-[#647385] sm:text-[13px]">
                International exhibition organisers
                behind the Buildcon series of building
                and construction trade shows across
                Africa and Asia.
              </p>
            </div>

            {/* Organisers logo area */}
            <div className="flex min-h-[140px] items-center justify-center border border-[#E7ECF0] bg-[#FAFBFC] px-5 py-7 sm:px-8 lg:min-h-[160px]">
              <div className="flex w-full items-center justify-center">
                <OrganiserLogos />
              </div>
            </div>
          </div>
        </PartnersReveal>

        {/* =========================================
            PARTNERS TITLE
        ========================================= */}

        <PartnersReveal delay={0.08}>
          <div className="mt-9 mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#28A45A]">
                Supporting Network
              </p>

              <h3 className="mt-1.5 font-heading text-[19px] font-bold tracking-[-0.035em] text-[#111111] sm:text-[22px]">
                Supporting Associations & Partners
              </h3>
            </div>

            <span className="text-[11px] font-medium text-[#8996A2]">
              Uganda Buildcon
            </span>
          </div>
        </PartnersReveal>

        {/* =========================================
            DYNAMIC PARTNERS GRID
        ========================================= */}

        {hasPartners ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {partners.map((partner, index) => (
              <PartnersReveal
                key={partner._id || partner.name}
                delay={Math.min(index * 0.055, 0.35)}
                className="h-full min-w-0"
              >
                <div className="group flex h-full min-h-[126px] items-center justify-center overflow-hidden border border-[#E5EBEF] bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1769A4]/35 hover:shadow-[0_12px_28px_rgba(0,0,0,0.045)] motion-reduce:transform-none sm:min-h-[140px]">
                  <div className="w-full">
                    <PartnerLogo partner={partner} />
                  </div>
                </div>
              </PartnersReveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {supporters.map((supporter, index) => (
              <PartnersReveal
                key={supporter.name}
                delay={Math.min(index * 0.055, 0.35)}
                className="h-full min-w-0"
              >
                <div className="group flex h-full min-h-[170px] flex-col items-center justify-between border border-[#E5EBEF] bg-white px-3 py-5 text-center transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1769A4]/35 hover:shadow-[0_12px_28px_rgba(0,0,0,0.045)] motion-reduce:transform-none">
                  {/* Logo */}
                  <div className="flex h-[76px] w-full items-center justify-center">
                    {supporter.logo ? (
                      <div className="relative h-[66px] w-full">
                        <Image
                          src={supporter.logo}
                          alt={`${supporter.name} logo`}
                          fill
                          sizes="(min-width: 1024px) 150px, (min-width: 640px) 30vw, 45vw"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-heading text-[13px] font-bold leading-[1.45] text-[#1769A4]">
                        {supporter.name}
                      </span>
                    )}
                  </div>

                  {/* Name & role */}
                  <div className="mt-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.11em] text-[#28A45A]">
                      {supporter.role}
                    </p>

                    <p className="mt-1.5 text-[11px] font-medium leading-[1.5] text-[#647385]">
                      {supporter.name}
                    </p>
                  </div>
                </div>
              </PartnersReveal>
            ))}
          </div>
        )}

        {/* =========================================
            CLEAN FOOTER
        ========================================= */}

        <PartnersReveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5EBEF] pt-6">
            <p className="max-w-[610px] text-[12px] leading-[1.75] text-[#718092]">
              Interested in supporting Uganda Buildcon
              as an industry or media partner?
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-[#1769A4]/35 pb-1 text-[12px] font-bold text-[#1769A4] transition-colors hover:border-[#28A45A] hover:text-[#28A45A]"
            >
              Explore Partnership Opportunities

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </PartnersReveal>
      </Container>
    </section>
  );
}
