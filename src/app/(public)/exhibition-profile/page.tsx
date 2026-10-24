
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";

import { exhibitionSectors } from "@/data/exhibitionProfile";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/exhibition-profile`;

const PAGE_TITLE =
  "Exhibition Profile | Uganda Buildcon Expo 2027";

const PAGE_DESCRIPTION =
  `Explore building materials, construction machinery, ` +
  `engineering products, interiors, HVAC, electrical systems ` +
  `and building technologies at ${event.name}, ` +
  `${event.dates.display} in Kampala.`;

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Uganda Buildcon Exhibition Profile",
    "Uganda Buildcon 2027 Products",
    "Construction Expo Uganda Sectors",
    "Building Materials Exhibition Uganda",
    "Construction Machinery Kampala",
    "Building Technology Trade Show",
    "HVAC Electrical Construction Products",
    "Engineering Products Exhibition Uganda",
    "Construction Equipment East Africa",
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
        alt: `Products and exhibit sectors at ${event.name}`,
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
      "@type": "CollectionPage",
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
      mainEntity: {
        "@id": `${PAGE_URL}#sectors`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#sectors`,
      name: "Uganda Buildcon Exhibition Sectors",
      itemListElement: exhibitionSectors.map(
        (sector, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: sector.name,
          url: `${PAGE_URL}#${sector.slug}`,
        })
      ),
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
          name: "Exhibition Profile",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function ExhibitionProfilePage() {
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
        title="Products, Machinery"
             highlightTitle="& Materials"
        intro={`Explore building materials, construction machinery, engineering products and technologies represented across the exhibition sectors of ${event.name}.`}
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt:
            "Construction cranes and machinery representing " +
            "exhibition sectors at Uganda Buildcon",
        }}
      />

      <section
        aria-labelledby="exhibition-profile-heading"
        className="border-t border-[#E5EAF0] bg-white py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </main>
  );
}
