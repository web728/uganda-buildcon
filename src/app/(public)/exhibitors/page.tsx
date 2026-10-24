
import type { Metadata } from "next";
import Link from "next/link";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitorDirectory } from "@/components/sections/ExhibitorDirectory";
import { ExhibitorDirectoryWrapper } from "@/components/exhibit/ExhibitorDirectoryWrapper";

import {
  getPublishedExhibitors,
  type ExhibitorSummary,
} from "@/lib/data/exhibitors";

import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   SERVER DATA
========================================== */

export const dynamic = "force-dynamic";

/* ==========================================
   SEO CONFIG
========================================== */

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/exhibitors`;

const PAGE_TITLE =
  "Exhibitor Directory | Uganda Buildcon Expo 2027";

const PAGE_DESCRIPTION =
  `Explore the exhibitor directory for ${event.name}. ` +
  `Discover participating manufacturers, construction ` +
  `machinery suppliers, building material companies ` +
  `and industry brands at the Kampala exhibition.`;

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Uganda Buildcon Exhibitors",
    "Uganda Buildcon 2027 Exhibitor Directory",
    "Uganda Buildcon Participating Companies",
    "Construction Expo Uganda Exhibitors",
    "Building Materials Suppliers Uganda",
    "Construction Machinery Exhibitors Kampala",
    "Building and Construction Brands East Africa",
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
        alt: `Exhibitor directory of ${event.name}`,
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
   JSON-LD

   Do not duplicate WebSite / Event
   entities already defined in layout.

   Only published exhibitors are listed.
========================================== */

function buildPageJsonLd(exhibitors: ExhibitorSummary[]) {
  const graph: Record<string, unknown>[] = [
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
      ...(exhibitors.length > 0
        ? {
            mainEntity: {
              "@id": `${PAGE_URL}#exhibitor-list`,
            },
          }
        : {}),
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
          name: "Exhibitor Directory",
          item: PAGE_URL,
        },
      ],
    },
  ];

  if (exhibitors.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${PAGE_URL}#exhibitor-list`,
      name: "Published Uganda Buildcon Exhibitors",
      numberOfItems: exhibitors.length,
      itemListElement: exhibitors.map(
        (exhibitor, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Organization",
            name: exhibitor.companyName,
            ...(exhibitor.country
              ? {
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: exhibitor.country,
                  },
                }
              : {}),
          },
        })
      ),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/* ==========================================
   SERVER FETCH
========================================== */

async function loadPublishedExhibitors(): Promise<
  ExhibitorSummary[]
> {
  try {
    return await getPublishedExhibitors();
  } catch (error) {
    console.error(
      "[Uganda Buildcon Exhibitors] Fetch failed:",
      error
    );

    return [];
  }
}

/* ==========================================
   SHARED SECTION LABEL
========================================== */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-[#28A45A]" />
      <span className="text-[11px] font-bold uppercase leading-[1.5] tracking-[0.12em] text-[#1769A4]">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   MAIN PAGE
========================================== */

export default async function ExhibitorsPage() {
  const exhibitors = await loadPublishedExhibitors();

  const pageJsonLd = buildPageJsonLd(exhibitors);

  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(pageJsonLd),
        }}
      />

      {/* EXISTING HERO */}
      <PageHero
        title="Participating Exhibitors"
           highlightTitle="& Brands"
        intro={
          `Discover participating manufacturers, ` +
          `building material suppliers and construction ` +
          `technology companies at ${event.name}. ` +
          `Browse the published exhibitor directory.`
        }
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt:
            "Construction machinery and equipment " +
            "representing exhibitors at Uganda Buildcon",
        }}
      />

      {/* DIRECTORY CONTENT */}
      <section
        aria-labelledby="exhibitor-directory-heading"
        className="relative isolate overflow-hidden border-b border-[#E5EAF0] bg-white py-14 sm:py-16 lg:py-20"
      >
        {/* Subtle architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[430px] opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1769A4 1px, transparent 1px), linear-gradient(to bottom, #1769A4 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage:
              "linear-gradient(to bottom, black, transparent)",
          }}
        />

        <Container className="relative z-10">
          <div className="flex flex-col gap-6 border-b border-[#E5EAF0] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <SectionLabel>
                Exhibitor Directory
              </SectionLabel>

              <h2
                id="exhibitor-directory-heading"
                className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.045em] text-[#111820]"
              >
                Discover the{" "}
                <span className="text-[#1769A4]">
                  Exhibiting Companies.
                </span>
              </h2>

              <p className="mt-5 max-w-[680px] text-[14px] leading-[1.85] tracking-[-0.005em] text-[#607083] sm:text-[15px]">
                Explore published exhibitor profiles,
                product categories and participating
                brands from the building and construction
                industry at {event.name}.
              </p>
            </div>

            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg border border-[#DCE4EB] bg-white px-5 py-3 text-[13px] font-semibold text-[#1769A4] transition-colors hover:border-[#1769A4] hover:bg-[#F7FAFC]"
            >
              Explore Exhibition Sectors

              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>

          {exhibitors.length > 0 ? (
            <div className="mt-8">
              <ExhibitorDirectoryWrapper>
                <ExhibitorDirectory
                  exhibitors={exhibitors}
                />
              </ExhibitorDirectoryWrapper>
            </div>
          ) : (
            <div className="mt-10">
              {/* No fabricated exhibitor records */}
              <div className="rounded-xl border border-[#E1E8EF] bg-[#F8FAFB] px-6 py-10 text-center sm:px-10 sm:py-14">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#1769A4]/[0.08] text-[#1769A4]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M1 21h22M8 8h3m-3 4h3m2-4h3m-3 4h3M9 21v-5h6v5" />
                  </svg>
                </div>

                <h3 className="mt-5 font-heading text-[22px] font-bold leading-[1.3] tracking-[-0.03em] text-[#111820] sm:text-[25px]">
                  Exhibitor Listings Coming Soon
                </h3>

                <p className="mx-auto mt-3 max-w-[520px] text-[14px] leading-[1.85] text-[#607083]">
                  Published exhibitor profiles are not
                  currently available. Explore the
                  exhibition sectors to discover the
                  products, technologies and construction
                  solutions covered by Uganda Buildcon.
                </p>

                <Link
                  href="/exhibition-profile"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1769A4] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#105685]"
                >
                  View Exhibition Profile
                </Link>
              </div>

              {/* Existing sector data */}
              <section
                aria-labelledby="directory-sectors-heading"
                className="mt-12"
              >
                <div className="border-b border-[#E5EAF0] pb-5">
                  <SectionLabel>
                    Exhibition Scope
                  </SectionLabel>

                  <h3
                    id="directory-sectors-heading"
                    className="mt-3 font-heading text-[24px] font-bold leading-[1.25] tracking-[-0.035em] text-[#111820] sm:text-[28px]"
                  >
                    What&apos;s on Display?
                  </h3>

                  <p className="mt-3 max-w-[620px] text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">
                    Browse the exhibition sectors represented
                    in the Uganda Buildcon product profile.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {exhibitionSectors.map((sector) => (
                    <Link
                      key={sector.slug}
                      href={`/exhibition-profile#${sector.slug}`}
                      className="group flex min-w-0 items-center gap-3 rounded-lg border border-[#E2E8EF] bg-white px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/30 hover:shadow-[0_8px_22px_rgba(16,35,55,0.04)]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28A45A]" />

                      <span className="min-w-0 flex-1 text-[13px] font-semibold leading-[1.55] text-[#243548] transition-colors group-hover:text-[#1769A4]">
                        {sector.name}
                      </span>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 text-[#8A99A7] transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
