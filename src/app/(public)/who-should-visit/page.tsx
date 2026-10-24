
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ugandabuildcon.com"
).replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}/who-should-visit`;

const PAGE_TITLE =
  "Who Should Visit Uganda Buildcon 2027 | Visitor Profile";

const PAGE_DESCRIPTION =
  `Discover who should visit ${event.name}: architects, ` +
  `engineers, contractors, developers, investors, importers, ` +
  `distributors and construction industry professionals. ` +
  `${event.dates.display}, Kampala.`;

const SOCIAL_IMAGE =
  `${SITE_URL}/images/gallery/conference-session.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Who Should Visit Uganda Buildcon",
    "Uganda Buildcon 2027 Visitor Profile",
    "Construction Expo Uganda Visitors",
    "Architects Engineers Contractors Uganda",
    "Uganda Construction Industry Trade Show",
    "Building Material Buyers Kampala",
    "Property Developers Uganda Exhibition",
    "Uganda Buildcon Visitor Registration",
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
        url: SOCIAL_IMAGE,
        alt:
          "Construction industry professionals at " +
          "Uganda Buildcon",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
};

/* ==========================================
   PAGE STRUCTURED DATA

   Assumes root layout defines matching
   #website and #event schema identifiers.
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
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#event`,
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
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Who Should Visit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function WhoShouldVisitPage() {
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
        title="The People Who Buy, Build,"
               highlightTitle="Specify & Source"
        intro={`Explore the visitor profiles at ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}. For professionals involved in construction projects, product specification, procurement and distribution.`}
        image={{
          src: "/images/gallery/conference-session.jpg",
          alt:
            "Construction industry professionals attending " +
            "a conference session at Uganda Buildcon",
        }}
      />

      <WhoShouldVisitClientView />
    </main>
  );
}
