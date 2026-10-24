
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ugandabuildcon.com"
).replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}/visit`;

const PAGE_TITLE =
  "Why Visit Uganda Buildcon 2027 | Visitor Benefits";

const PAGE_DESCRIPTION =
  `Discover why construction professionals should visit ${event.name}. ` +
  `Explore building products, meet manufacturers and suppliers, ` +
  `and build industry connections, ${event.dates.display} in Kampala.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Why Visit Uganda Buildcon",
    "Uganda Buildcon 2027 Visitors",
    "Uganda Construction Exhibition Visitors",
    "Building Materials Trade Show Kampala",
    "Construction Products Uganda",
    "Uganda Buildcon Visitor Registration",
    "Construction Industry Networking Uganda",
    "East Africa Building Exhibition",
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
        url: `${SITE_URL}/images/gallery/exhibition-hall-walkthrough.jpg`,
        alt: "Trade visitors exploring the Uganda Buildcon exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      `${SITE_URL}/images/gallery/exhibition-hall-walkthrough.jpg`,
    ],
  },
};

const structuredData = {
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
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#event`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
      potentialAction: {
        "@type": "ViewAction",
        name: "Visitor Registration",
        target: `${SITE_URL}${event.cta.registerVisit}`,
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
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Why Visit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <PageHero
        title={event.brandLines.visitor}
        intro={`Discover building products, compare construction solutions and connect with suppliers at ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`}
        image={{
          src: "/images/gallery/exhibition-hall-walkthrough.jpg",
          alt: "Visitors exploring exhibition stands and construction products at Uganda Buildcon",
        }}
      />

      <VisitClientView />
    </main>
  );
}
