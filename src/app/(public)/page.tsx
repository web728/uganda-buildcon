
import type { Metadata } from "next";

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

/**
 * Homepage rendering
 *
 * Keep dynamic rendering if the published exhibitor
 * directory must reflect database changes immediately.
 *
 * For better caching, consider ISR after confirming
 * getPublishedExhibitors() supports caching safely.
 */
export const dynamic = "force-dynamic";

/**
 * Canonical website configuration
 */
const BASE_URL = siteUrl.replace(/\/+$/, "");

const EVENT_YEAR = event.dates.start.slice(0, 4);

const HOME_URL = `${BASE_URL}/`;

const OG_IMAGE = `${BASE_URL}/images/og/og-default.jpg`;

const HOME_TITLE =
  `Uganda Buildcon ${EVENT_YEAR} | ` +
  `Building & Construction Expo Uganda`;

const HOME_DESCRIPTION =
  `Explore Uganda Buildcon ${EVENT_YEAR}, a leading ` +
  `building and construction B2B trade exhibition ` +
  `in Kampala. ${event.dates.display} at ` +
  `${event.venue.fullLocation}. Discover building ` +
  `materials, machinery, architecture, interiors ` +
  `and engineering solutions. Register to visit.`;

/**
 * Homepage SEO metadata
 *
 * Global robots, verification, fonts and site-wide
 * organization/event schema come from RootLayout.
 */
export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },

  description: HOME_DESCRIPTION,

  keywords: [
    "Uganda Buildcon",
    `Uganda Buildcon ${EVENT_YEAR}`,
    `Uganda Buildcon International Expo ${EVENT_YEAR}`,
    "Uganda construction expo",
    "Construction exhibition Uganda",
    "Construction expo Kampala",
    "Building materials exhibition Uganda",
    "Construction machinery exhibition",
    "Building and construction trade show",
    "East Africa construction expo",
    "Architecture exhibition Uganda",
    "Interior design exhibition Kampala",
    "Construction equipment trade fair",
    "UMA Show Grounds Kampala",
    "Uganda building industry exhibition",
  ],

  alternates: {
    canonical: HOME_URL,
    languages: {
      "en-UG": HOME_URL,
      "x-default": HOME_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    url: HOME_URL,
    siteName: event.name,

    title: HOME_TITLE,
    description: HOME_DESCRIPTION,

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt:
          `${event.name} ${EVENT_YEAR} — ` +
          `${event.dates.display}, ${event.venue.fullLocation}`,
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "geo.region": "UG-102",
    "geo.placename": "Kampala, Uganda",
  },
};

/**
 * Homepage
 *
 * Server Component:
 * - SEO-friendly server-rendered structure
 * - Dynamic published exhibitor data
 * - No unnecessary client-side JavaScript
 * - Preserves all existing homepage sections
 */
export default async function HomePage() {
  let exhibitors: ExhibitorSummary[] = [];

  try {
    exhibitors = await getPublishedExhibitors();
  } catch (error) {
    console.error(
      "[HomePage] Failed to fetch published exhibitors:",
      error
    );
  }

  return (
    <>
      {/* 01 — Hero / Primary H1 */}
      <HeroSection />

      {/* 02 — Previous edition statistics */}
      <HeroStatsSection />

      {/* 03 — Event introduction */}
      <IntroSection />

      {/* 04 — Uganda construction market */}
      <WhyUgandaSection />

      {/* 05 — Exhibition sectors */}
      <ExhibitionProfileSection />

      {/* 06 — Exhibitor benefits */}
      <WhyExhibitSection />

      {/* 07 — Visitors and decision-makers */}
      <WhoWillYouMeetSection />

      {/* 08 — Previous edition highlights */}
      <PreviousEditionSection />

      {/* 09 — Published exhibitor directory */}
      <ExhibitorDirectoryPreviewSection
        exhibitors={exhibitors}
      />

      {/* 10 — Venue and location */}
      <VenueSection />

      {/* 11 — Organisers and partners */}
      <PartnersSection />

      {/* 12 — Latest expo news */}
      <NewsSection />

      {/* 13 — Final conversion CTA */}
      <FinalCtaSection />
    </>
  );
}
