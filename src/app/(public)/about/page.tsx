
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

/* ==========================================
   ABOUT PAGE — SEO CONFIG
========================================== */

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const ABOUT_URL = `${BASE_URL}/about`;

const EVENT_YEAR = event.dates.start.slice(0, 4);

const ABOUT_TITLE =
  `About the Expo | Uganda Buildcon ${EVENT_YEAR}`;

const ABOUT_DESCRIPTION =
  `Discover ${event.name}, ${event.editionLabel}, ` +
  `taking place ${event.dates.display} at ` +
  `${event.venue.fullLocation}. ` +
  `Learn about the exhibition, building and construction ` +
  `industry sectors, networking and business opportunities.`;

const ABOUT_IMAGE =
  `${BASE_URL}/images/gallery/dignitaries-stand-visit.jpg`;

/* ==========================================
   SEO METADATA
========================================== */

export const metadata: Metadata = {
  title: {
    absolute: ABOUT_TITLE,
  },

  description: ABOUT_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "About Uganda Buildcon",
    `Uganda Buildcon ${EVENT_YEAR}`,
    event.name,
    "About Uganda Buildcon Expo",
    "Uganda Construction Exhibition",
    "Building Materials Expo Kampala",
    "Construction Trade Fair Uganda",
    "Uganda Building Industry Exhibition",
    "Construction Networking East Africa",
  ],

  alternates: {
    canonical: ABOUT_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    url: ABOUT_URL,
    siteName: event.shortName,
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [
      {
        url: ABOUT_IMAGE,
        alt:
          `Exhibitors and industry guests at ` +
          event.shortName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [ABOUT_IMAGE],
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
   PAGE-SPECIFIC JSON-LD

   References globally defined WebSite/Event.
========================================== */

const aboutJsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${ABOUT_URL}#webpage`,
      url: ABOUT_URL,
      name: ABOUT_TITLE,
      description: ABOUT_DESCRIPTION,
      inLanguage: "en-UG",

      isPartOf: {
        "@id": `${HOME_URL}#website`,
      },

      about: {
        "@id": `${HOME_URL}#event`,
      },

      mainEntity: {
        "@id": `${HOME_URL}#event`,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ABOUT_IMAGE,
      },

      breadcrumb: {
        "@id": `${ABOUT_URL}#breadcrumb`,
      },
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${ABOUT_URL}#breadcrumb`,

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
          name: "About the Expo",
          item: ABOUT_URL,
        },
      ],
    },
  ],
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/* ==========================================
   ABOUT PAGE
========================================== */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(aboutJsonLd),
        }}
      />

      {/* Existing animated hero */}
      <PageHero
        title="Where Uganda’s Building"
        highlightTitle="& Construction Industry Meets"
        intro={
          `${event.name} — ${event.editionLabel}, ` +
          `${event.dates.display} at ` +
          `${event.venue.fullLocation}. ` +
          `Discover the exhibition, industry ` +
          `opportunities and professional networking ` +
          `across Uganda and East Africa.`
        }
        image={{
          src: "/images/gallery/dignitaries-stand-visit.jpg",
          alt:
            "Industry guests visiting exhibitor stands " +
            "at Uganda Buildcon International Expo",
        }}
      />

      {/* Existing premium animated About content */}
      <AboutClientView />
    </main>
  );
}
