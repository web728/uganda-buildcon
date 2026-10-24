
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

/* ==========================================
   SEO CONFIGURATION
========================================== */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ugandabuildcon.com"
).replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}/plan-your-visit`;

const PAGE_TITLE =
  "Plan Your Visit to Uganda Buildcon 2027 | Venue & Travel";

const PAGE_DESCRIPTION =
  `Plan your visit to ${event.name}, ` +
  `${event.dates.display} at ${event.venue.fullLocation}. ` +
  `Find venue directions, visitor registration, ` +
  `travel guidance and organiser contacts.`;

const SOCIAL_IMAGE =
  `${SITE_URL}/images/gallery/ribbon-cutting-opening.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Plan Your Visit Uganda Buildcon",
    "Uganda Buildcon 2027 Venue",
    "Uganda Buildcon Visitor Information",
    "UMA Multi Purpose Hall Kampala",
    "UMA Show Grounds Lugogo",
    "Uganda Construction Expo Directions",
    "Uganda Buildcon Travel Guide",
    "Construction Expo Kampala Visitor Registration",
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
        alt: "Opening ceremony at Uganda Buildcon in Kampala",
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
   PAGE-SPECIFIC STRUCTURED DATA
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
      mentions: {
        "@id": `${PAGE_URL}#venue`,
      },
    },
    {
      "@type": "Place",
      "@id": `${PAGE_URL}#venue`,
      name: event.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "UMA Show Grounds, Lugogo",
        addressLocality: event.venue.city,
        addressCountry: event.venue.countryCode,
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
          name: "Plan Your Visit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function PlanYourVisitPage() {
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
        title="Plan Your Visit"
                highlightTitle="to Kampala"
        intro={`Find essential visitor information, exhibition venue directions and practical travel guidance for ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`}
        image={{
          src: "/images/gallery/ribbon-cutting-opening.jpg",
          alt: "Opening ribbon-cutting ceremony at the Uganda Buildcon exhibition in Kampala",
        }}
      />

      <PlanYourVisitClientView />
    </main>
  );
}
