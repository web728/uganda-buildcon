
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/venue`;

const TITLE =
  "Venue & Location | Uganda Buildcon Expo 2027";

const DESCRIPTION =
  `Find the official venue for ${event.name} at ` +
  `${event.venue.fullLocation}. View the Google Map, ` +
  `travel information and exhibition dates: ` +
  `${event.dates.display}.`;

const IMAGE =
  `${BASE_URL}/images/gallery/ribbon-cutting-opening.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },

  description: DESCRIPTION,

  applicationName: event.shortName,

  alternates: {
    canonical: PAGE_URL,
  },

  keywords: [
    "Uganda Buildcon venue",
    "Uganda Buildcon 2027 location",
    "UMA Show Grounds Kampala",
    "UMA Multi Purpose Hall",
    "Uganda Buildcon exhibition venue",
    "Construction Expo Kampala venue",
    "Lugogo Kampala exhibition",
  ],

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
    siteName: event.shortName,
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: IMAGE,
        alt: `Exhibition opening at ${event.venue.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-UG",

      isPartOf: {
        "@id": `${HOME_URL}#website`,
      },

      about: {
        "@id": `${HOME_URL}#event`,
      },

      mainEntity: {
        "@id": `${PAGE_URL}#venue`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },

    {
      "@type": "Place",
      "@id": `${PAGE_URL}#venue`,
      name: event.venue.name,

      description:
        `Exhibition venue for ${event.name}`,

      address: {
        "@type": "PostalAddress",
        streetAddress: "UMA Show Grounds, Lugogo",
        addressLocality: event.venue.city,
        addressCountry: event.venue.countryCode,
      },

      geo: {
        "@type": "GeoCoordinates",
        latitude: 0.3289738,
        longitude: 32.6101913,
      },

      hasMap: event.venue.mapLinkUrl,
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
          name: "Venue & Location",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <PageHero
        title="Official Exhibition"
            highlightTitle="Venue"
        intro={
          `${event.venue.fullLocation} · ` +
          `${event.dates.display}. ` +
          `Find the exhibition on Google Maps ` +
          `and plan your visit to Kampala.`
        }
        image={{
          src: "/images/gallery/ribbon-cutting-opening.jpg",
          alt:
            `Opening ceremony at ${event.venue.name}, ` +
            event.venue.city,
        }}
      />

      <VenueClientView />
    </main>
  );
}
