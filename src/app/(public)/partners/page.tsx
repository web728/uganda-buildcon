
import type { Metadata } from "next";
import Image from "next/image";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";

import {
  supporters,
  supporters2025,
} from "@/data/previousEdition";

import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "./PartnersMotion";

/* ==========================================
   SERVER RENDERING
========================================== */

export const dynamic = "force-dynamic";

/* ==========================================
   PAGE SEO
========================================== */

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/partners`;

const PAGE_TITLE =
  "Partners & Supporters | Uganda Buildcon Expo 2027";

const PAGE_DESCRIPTION =
  `Explore the industry partners, supporting organisations ` +
  `and associations associated with ${event.name}. ` +
  `Discover partnership opportunities and submit an ` +
  `official partnership enquiry.`;

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Uganda Buildcon partners",
    "Uganda Buildcon 2027 supporters",
    "Uganda Construction Expo partners",
    "Uganda Building Industry Associations",
    "Construction Industry Partnerships Uganda",
    "Uganda Buildcon association partners",
    "Uganda Buildcon media partners",
    "Uganda Buildcon partnership enquiry",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    url: PAGE_URL,
    siteName: event.shortName,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Partners and supporters of ${event.shortName}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/* ==========================================
   PAGE-SPECIFIC STRUCTURED DATA

   Root layout owns WebSite, Event and
   Organization schemas.
========================================== */

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en-UG",
      isPartOf: {
        "@id": `${HOME_URL}#website`,
      },
      about: {
        "@id": `${HOME_URL}#event`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: HOME_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Partners & Supporters",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/* ==========================================
   EXISTING PARTNER CATEGORIES
========================================== */

const CATEGORIES = [
  "Supporting Organisation",
  "Association Partner",
  "Industry Partner",
  "Media Partner",
] as const;

/* ==========================================
   SECTION LABEL
========================================== */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   STATIC SUPPORTER CARD

   Used only when active partner records
   are unavailable or empty.
========================================== */

type Supporter = (typeof supporters)[number];

function SupporterCard({
  supporter,
}: {
  supporter: Supporter;
}) {
  return (
    <StaggerItem className="h-full">
      <article className="group flex h-full min-w-0 flex-col items-center justify-center gap-5 rounded-lg border border-[#E3E9EF] bg-white px-4 py-6 text-center transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_12px_30px_rgba(16,35,55,0.045)] sm:px-5 sm:py-7">
        {supporter.logo ? (
          <div className="relative h-[76px] w-full max-w-[165px]">
            <Image
              src={supporter.logo}
              alt={`${supporter.name} logo`}
              fill
              sizes="(max-width: 640px) 140px, 165px"
              className="object-contain"
            />
          </div>
        ) : null}

        <div className="min-w-0">
          <h3 className="text-[12px] font-semibold leading-[1.55] tracking-[-0.01em] text-[#152435] sm:text-[13px]">
            {supporter.name}
          </h3>

          <p className="mt-2 text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.07em] text-[#28A45A]">
            {supporter.role}
          </p>
        </div>
      </article>
    </StaggerItem>
  );
}

/* ==========================================
   SERVER DATA
========================================== */

async function loadPartners(): Promise<PartnerSummary[]> {
  try {
    return await getActivePartners();
  } catch (error) {
    console.error(
      "[Uganda Buildcon Partners] Fetch failed:",
      error
    );
    return [];
  }
}

/* ==========================================
   MAIN PAGE
========================================== */

export default async function PartnersPage() {
  const partners = await loadPartners();

  const byCategory = CATEGORIES.map((category) => ({
    category,
    items: partners.filter(
      (partner) => partner.category === category
    ),
  })).filter((group) => group.items.length > 0);

  const hasActivePartners = byCategory.length > 0;

  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(pageJsonLd),
        }}
      />

      {/* EXISTING PAGE HERO */}
      <PageHero
        title="Industry Partners"
                 highlightTitle="& Alliances"
        intro={`Explore the organisations, professional associations and industry partners supporting the Uganda Buildcon platform. ${event.name} takes place ${event.dates.display} in ${event.venue.city}.`}
        image={{
          src: "/images/gallery/inauguration-2025-guests.jpg",
          alt:
            "Industry representatives and guests at the " +
            "Uganda Buildcon exhibition opening",
        }}
      />

      {/* =====================================
          PARTNERS AND SUPPORTERS
      ===================================== */}
      <section
        aria-labelledby="partners-heading"
        className="border-b border-[#E6EBF0] bg-white py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <Reveal>
            <div className="max-w-[760px]">
              <SectionLabel>
                Industry Collaboration
              </SectionLabel>

              <h2
                id="partners-heading"
                className="mt-5 font-heading text-[clamp(1.9rem,3.3vw,3.25rem)] font-bold leading-[1.13] tracking-[-0.045em] text-[#111820]"
              >
                Building Stronger{" "}
                <span className="text-[#1769A4]">
                  Industry Connections.
                </span>
              </h2>

              <p className="mt-4 max-w-[690px] text-[14px] leading-[1.8] tracking-[-0.005em] text-[#607083] sm:text-[15px]">
                Uganda Buildcon brings together
                organisations and industry associations
                connected with the building and construction
                sector. Explore the current partner listings
                and supporters recognised in previous
                exhibition materials.
              </p>
            </div>
          </Reveal>

          {hasActivePartners ? (
            <div className="mt-10 space-y-12 sm:space-y-14">
              {byCategory.map((group) => (
                <section
                  key={group.category}
                  aria-label={group.category}
                >
                  <Reveal>
                    <div className="mb-6 flex items-center gap-4 border-b border-[#E5EAF0] pb-4">
                      <h3 className="font-heading text-[19px] font-bold leading-[1.3] tracking-[-0.025em] text-[#111820] sm:text-[22px]">
                        {group.category}
                        {group.items.length > 1 ? "s" : ""}
                      </h3>

                      <span className="h-[2px] flex-1 bg-[#E5EAF0]" />
                    </div>
                  </Reveal>

                  <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6">
                    {group.items.map((partner) => (
                      <StaggerItem
                        key={partner._id || partner.name}
                        className="h-full min-w-0"
                      >
                        <div className="h-full min-w-0 [&>*]:h-full">
                          <PartnerLogo partner={partner} />
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-10 space-y-12 sm:space-y-14">
              {/* EXISTING SUPPORTERS */}
              {supporters.length > 0 && (
                <section aria-labelledby="supporters-heading">
                  <Reveal>
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#E5EAF0] pb-4">
                      <h3
                        id="supporters-heading"
                        className="font-heading text-[19px] font-bold leading-[1.3] tracking-[-0.025em] text-[#111820] sm:text-[22px]"
                      >
                        Partners &amp; Supporting Associations
                      </h3>

                      <span className="text-[11px] text-[#8794A2]">
                        Listed in Uganda Buildcon materials
                      </span>
                    </div>
                  </Reveal>

                  <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6">
                    {supporters.map((supporter) => (
                      <SupporterCard
                        key={supporter.name}
                        supporter={supporter}
                      />
                    ))}
                  </Stagger>
                </section>
              )}

              {/* HISTORICAL SUPPORTERS — CLEARLY DATED */}
              {supporters2025.length > 0 && (
                <section aria-labelledby="supporters-2025-heading">
                  <Reveal>
                    <div className="mb-6 border-b border-[#E5EAF0] pb-4">
                      <h3
                        id="supporters-2025-heading"
                        className="font-heading text-[19px] font-bold leading-[1.3] tracking-[-0.025em] text-[#111820] sm:text-[22px]"
                      >
                        Supporting Organisations — 2025 Edition
                      </h3>

                      <p className="mt-2 text-[12px] leading-[1.75] text-[#718092]">
                        Historical supporters listed in the
                        Uganda Buildcon 2025 Post Show Report.
                      </p>
                    </div>
                  </Reveal>

                  <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {supporters2025.map((supporter) => (
                      <StaggerItem key={supporter.name}>
                        <article className="flex h-full min-w-0 items-start gap-3 rounded-lg border border-[#E5EAF0] bg-[#FAFBFC] px-5 py-4">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A]"
                          />

                          <div className="min-w-0">
                            <h4 className="text-[13px] font-semibold leading-[1.5] text-[#172535]">
                              {supporter.name}
                            </h4>

                            <p className="mt-1 text-[11px] leading-[1.6] text-[#788695]">
                              {supporter.role}
                            </p>
                          </div>
                        </article>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </section>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* =====================================
          PARTNERSHIP ENQUIRY
      ===================================== */}
      <section
        aria-labelledby="partnership-enquiry-heading"
        className="bg-[#F8FAFB] py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
            {/* EDITORIAL DESCRIPTION */}
            <Reveal>
              <div className="max-w-[480px]">
                <SectionLabel>
                  Partnership Enquiries
                </SectionLabel>

                <h2
                  id="partnership-enquiry-heading"
                  className="mt-5 font-heading text-[clamp(1.85rem,3vw,3rem)] font-bold leading-[1.15] tracking-[-0.045em] text-[#111820]"
                >
                  Explore a{" "}
                  <span className="text-[#1769A4]">
                    Partnership
                  </span>{" "}
                  with Buildcon.
                </h2>

                <p className="mt-5 text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083]">
                  Interested in participating as an
                  association, industry organisation
                  or media partner? Share your organisation
                  details and enquiry with the Uganda
                  Buildcon team.
                </p>

                <p className="mt-4 text-[13px] leading-[1.8] text-[#718092]">
                  All enquiries are reviewed by the
                  organising team. Submission does not
                  automatically confirm a partnership.
                </p>
              </div>
            </Reveal>

            {/* EXISTING FUNCTIONAL FORM */}
            <Reveal delay={0.12}>
              <div className="min-w-0 rounded-xl border border-[#DFE6ED] bg-white p-5 shadow-[0_16px_45px_rgba(18,38,58,0.04)] sm:p-8 lg:p-9">
                <PartnerEnquiryForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
