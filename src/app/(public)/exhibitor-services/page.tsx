
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/exhibitor-services`;

const PAGE_TITLE =
  "Exhibitor Services & Logistics | Uganda Buildcon 2027";

const PAGE_DESCRIPTION =
  `Plan your participation at ${event.name} with ` +
  `information on Uganda visa requirements, invitation ` +
  `letters, stand construction, freight logistics, ` +
  `accommodation and exhibitor support in Kampala.`;

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Uganda Buildcon exhibitor services",
    "Uganda Buildcon 2027 logistics",
    "Uganda Buildcon exhibitor manual",
    "Uganda exhibition visa invitation letter",
    "Exhibition stand construction Kampala",
    "Uganda trade show freight logistics",
    "UMA Show Grounds exhibitor information",
    "Uganda Buildcon stand setup",
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
        alt: `Exhibitor services for ${event.name}`,
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
          name: "Exhibitor Services & Logistics",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function ExhibitorServicesPage() {
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
        title="Exhibitor Services"
            highlightTitle="& Logistics"
        intro={`Find guidance on exhibition preparation, visa information, stand setup and logistics support for ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`}
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing technical construction drawings and exhibition specifications",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}
