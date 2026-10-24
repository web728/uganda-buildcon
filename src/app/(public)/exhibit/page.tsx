
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/exhibit`;

const PAGE_TITLE =
  "Why Exhibit at Uganda Buildcon Expo 2027 | Exhibitor Benefits";

const PAGE_DESCRIPTION =
  `Explore why to exhibit at ${event.name}. ` +
  `Connect with contractors, architects, developers, ` +
  `importers and trade buyers. Discover exhibitor benefits ` +
  `and stand options for ${event.dates.display} in Kampala.`;

const OG_IMAGE = `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,
  applicationName: event.shortName,

  keywords: [
    "Why Exhibit Uganda Buildcon",
    "Uganda Buildcon 2027 Exhibitors",
    "Construction Expo Uganda Exhibitor Benefits",
    "Exhibit at Uganda Construction Expo",
    "Building Materials Exhibition Kampala",
    "Uganda Buildcon Stand Booking",
    "Construction Machinery Trade Show Uganda",
    "East Africa Construction Exhibition",
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
          name: "Why Exhibit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function ExhibitPage() {
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
        title={event.brandLines.exhibitor}
        intro={`Discover exhibitor benefits, industry buyers and stand participation options at ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`}
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Construction engineer reviewing architectural blueprints and building plans",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}
