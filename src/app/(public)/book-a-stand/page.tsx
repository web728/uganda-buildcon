import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";
import { PageHero } from "@/components/ui/PageHero";
import { BookStandClientView } from "@/components/exhibit/BookStandClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const PAGE_URL = `${BASE_URL}/book-a-stand`;
const EVENT_YEAR = event.dates.start.slice(0, 4);
const EVENT_NAME = event.name.includes(EVENT_YEAR)
  ? event.name
  : `${event.name} ${EVENT_YEAR}`;

const PAGE_TITLE = `Book a Stand at ${EVENT_NAME} | Exhibitor Enquiry`;
const PAGE_DESCRIPTION =
  `Enquire about exhibition stand space at ${EVENT_NAME}, ` +
  `${event.dates.display} at ${event.venue.fullLocation}. ` +
  `Request participation details, stand options and space availability ` +
  `for Uganda's building and construction exhibition.`;
const OG_IMAGE = `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  applicationName: event.shortName,
  keywords: [
    `${EVENT_NAME} stand booking`,
    "Book a Stand Uganda Buildcon",
    "Uganda Construction Expo Exhibitor Registration",
    "Uganda Buildcon Exhibitor Application",
    "Exhibition Stand Space Kampala",
    "Construction Exhibition Uganda",
    "Uganda Buildcon Booth Enquiry",
  ],
  alternates: { canonical: PAGE_URL },
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
        alt: `${EVENT_NAME} — Exhibitor Stand Enquiry`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#event` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
      potentialAction: {
        "@type": "CommunicateAction",
        name: "Submit an Exhibitor Enquiry",
        target: PAGE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Book a Stand", item: PAGE_URL },
      ],
    },
  ],
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function BookAStandPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageJsonLd) }}
      />

      <PageHero
        title="Reserve Your"
        highlightTitle="Exhibition Stand"
        intro={`Explore exhibition participation at ${EVENT_NAME}, ${event.dates.display} at ${event.venue.fullLocation}. Submit your stand enquiry to discuss available options with the organising team.`}
      />

      <BookStandClientView />
    </main>
  );
}
