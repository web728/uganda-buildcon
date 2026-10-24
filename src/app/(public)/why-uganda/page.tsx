
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { WhyUgandaClientView } from "@/components/about/WhyUgandaClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/why-uganda`;

const PAGE_TITLE =
  "Why Uganda? | Construction Market Opportunities";

const PAGE_DESCRIPTION =
  "Explore Uganda's construction market, infrastructure " +
  "development, urbanisation and opportunities for building " +
  "materials, machinery and suppliers at Uganda Buildcon 2027.";

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Why Uganda",
    "Uganda Construction Market",
    "Uganda Construction Industry",
    "Construction Opportunities Uganda",
    "Uganda Infrastructure Development",
    "Building Materials Market Uganda",
    "Uganda Construction Machinery",
    "Uganda Vision 2040 Infrastructure",
    "Uganda Urbanisation",
    "East Africa Construction Market",
    "Uganda Buildcon 2027",
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
    url: PAGE_URL,
    locale: "en_UG",
    siteName: event.shortName,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Uganda Buildcon construction market opportunities",
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
          name: "Why Uganda",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function WhyUgandaPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] selection:bg-[#1769A4] selection:text-white">
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
        title="Uganda — A Construction Market"
         highlightTitle="on the Move"
        intro="Explore Uganda's construction market, infrastructure development and business opportunities across the building and construction supply chain."
        image={{
          src: "/images/home/skyline-construction.jpg",
          alt: "Urban construction and building development in Uganda",
        }}
      />

      <WhyUgandaClientView />
    </main>
  );
}
