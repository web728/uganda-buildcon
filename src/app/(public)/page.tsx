
import type { Metadata } from "next";
import Link from "next/link";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import {
  getPublishedExhibitors,
  type ExhibitorSummary,
} from "@/lib/data/exhibitors";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyUgandaSection } from "@/components/sections/home/WhyUgandaSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { ExhibitorDirectoryPreviewSection } from "@/components/sections/home/ExhibitorDirectoryPreviewSection";
import { PreviousEditionSection } from "@/components/sections/home/PreviousEditionSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";

/* ==========================================
   HOMEPAGE — SEO CONFIG
========================================== */

export const dynamic = "force-dynamic";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;

const EVENT_YEAR = event.dates.start.slice(0, 4);

const EVENT_NAME = event.name.includes(EVENT_YEAR)
  ? event.name
  : `${event.name} ${EVENT_YEAR}`;

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

const HOME_TITLE =
  `${EVENT_NAME} | ${event.editionLabel}`;

const HOME_DESCRIPTION =
  `Join ${EVENT_NAME}, ${event.dates.display} ` +
  `at ${event.venue.fullLocation}. ` +
  `Explore building materials, construction machinery, ` +
  `engineering solutions and B2B trade opportunities ` +
  `across Uganda and East Africa.`;

/* ==========================================
   HOMEPAGE METADATA
========================================== */

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },

  description: HOME_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Uganda Buildcon",
    `Uganda Buildcon ${EVENT_YEAR}`,
    EVENT_NAME,
    "Uganda Buildcon International Expo",
    "Construction Expo Uganda",
    "Building and Construction Expo Kampala",
    "Building Materials Exhibition Uganda",
    "Construction Machinery Exhibition Uganda",
    "Construction Trade Show Uganda",
    "Construction Equipment Expo East Africa",
  ],

  alternates: {
    canonical: HOME_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    url: HOME_URL,
    siteName: event.shortName,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt:
          `${EVENT_NAME} — ` +
          `${event.dates.display}, ` +
          event.venue.fullLocation,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
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
};

/* ==========================================
   PAGE-SPECIFIC STRUCTURED DATA

   Organization, WebSite, Event and Place
   already exist in root layout.

   Keep their IDs consistent.
========================================== */

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${HOME_URL}#webpage`,
  url: HOME_URL,
  name: HOME_TITLE,
  description: HOME_DESCRIPTION,
  inLanguage: "en-UG",
  isPartOf: {
    "@id": `${HOME_URL}#website`,
  },
  about: {
    "@id": `${HOME_URL}#event`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: OG_IMAGE,
  },
};

/* ==========================================
   SAFE JSON-LD
========================================== */

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/* ==========================================
   EXHIBITOR DATA

   Keep current server fetching behaviour.
========================================== */

async function loadHomepageExhibitors(): Promise<
  ExhibitorSummary[]
> {
  try {
    return await getPublishedExhibitors();
  } catch (error) {
    console.error(
      "[Uganda Buildcon Home] Exhibitor fetch failed:",
      error
    );
    return [];
  }
}

/* ==========================================
   MAIN HOMEPAGE
========================================== */

export default async function HomePage() {
  const exhibitors = await loadHomepageExhibitors();

  // Preserve for when directory preview is re-enabled.
  void exhibitors;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homepageJsonLd),
        }}
      />

      {/* 01. Hero: existing primary H1 */}
      <HeroSection />

      {/* 02. Statistics */}
      <div className="relative animate-premium-in">
        <HeroStatsSection />
      </div>

      {/* 03. Introduction */}
      <div className="relative animate-premium-up">
        <IntroSection />
      </div>

      {/* 04. Uganda Market */}
      <WhyUgandaSection />

      {/* 05. Exhibition Profile */}
      <ExhibitionProfileSection />

      {/* 06. Why Exhibit */}
      <WhyExhibitSection />

      {/* Optional sections — unchanged */}
      {/* <WhoWillYouMeetSection /> */}
      {/* <PreviousEditionSection /> */}
      {/*
      <ExhibitorDirectoryPreviewSection
        exhibitors={exhibitors}
      />
      */}

      {/* 07. Venue */}
      <VenueSection />

      {/* 08. Partners */}
      <PartnersSection />

      {/* <NewsSection /> */}

      {/* 09. Final CTA */}
      <div className="relative animate-premium-up">
        <FinalCtaSection />
      </div>

      {/* Existing-page internal links for Google navigation */}
      <nav
        aria-label="Explore Uganda Buildcon"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-7 gap-y-3 px-5 py-5">
          {[
            { href: "/about", label: "About the Expo" },
            {
              href: "/exhibition-profile",
              label: "Exhibitor Profile",
            },
            { href: "/exhibit", label: "Why Exhibit" },
            {
              href: "/plan-your-visit",
              label: "Plan Your Visit",
            },
            {
              href: event.cta.registerVisit,
              label: "Register to Visit",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-[#1769A4] transition-colors hover:text-[#28A45A]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
