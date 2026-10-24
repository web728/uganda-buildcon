
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/who-should-exhibit`;

const PAGE_TITLE =
  "Who Should Exhibit | Uganda Buildcon Expo 2027";

const PAGE_DESCRIPTION =
  `Discover who should exhibit at ${event.name}. ` +
  `Explore opportunities for construction material manufacturers, ` +
  `machinery suppliers, exporters, distributors, engineering ` +
  `companies and building technology providers.`;

const OG_IMAGE = `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Who Should Exhibit Uganda Buildcon",
    "Uganda Buildcon Exhibitor Profile",
    "Uganda Buildcon 2027 Exhibitors",
    "Construction Expo Uganda Exhibitors",
    "Construction Machinery Suppliers Uganda",
    "Building Materials Manufacturers Uganda",
    "Building Technology Exhibition Uganda",
    "East Africa Construction Trade Show",
    "Exhibit in Kampala",
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
        alt: `Exhibitor opportunities at ${event.name}`,
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

   Root layout already defines WebSite
   and Event entities.
========================================== */

const pageJsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
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

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
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
          name: "Who Should Exhibit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function WhoShouldExhibitPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <PageHero
        title="Who Should Exhibit"
            highlightTitle="at Uganda Buildcon"
        intro={`Explore exhibitor opportunities for manufacturers, exporters, construction machinery companies, building material suppliers and technology providers at ${event.name}, ${event.dates.display} in ${event.venue.city}.`}
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt: "Construction cranes and machinery representing equipment suppliers and exhibitors at Uganda Buildcon",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}
