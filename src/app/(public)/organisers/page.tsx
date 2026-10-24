
import type { Metadata } from "next";

import { event } from "@/config/event";
import { siteUrl } from "@/lib/utils/siteUrl";

import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

const BASE_URL = siteUrl.replace(/\/+$/, "");
const HOME_URL = `${BASE_URL}/`;
const PAGE_URL = `${BASE_URL}/organisers`;

const PAGE_TITLE =
  "Official Organisers | Uganda Buildcon Expo 2027";

const PAGE_DESCRIPTION =
  `Meet the official joint organisers of ${event.name}: ` +
  `${event.organisers.map((org) => org.name).join(" and ")}. ` +
  `Find organiser profiles and official exhibition contact details.`;

const OG_IMAGE =
  `${BASE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: event.shortName,

  keywords: [
    "Uganda Buildcon organisers",
    "Uganda Buildcon 2027 organisers",
    "Futurex Trade Fair and Events",
    "ETSIPL",
    "Uganda Buildcon exhibition management",
    "Uganda Construction Expo organisers",
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
        alt: `Official organisers of ${event.name}`,
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

const organiserIds = event.organisers.map(
  (_, index) => `${PAGE_URL}#organiser-${index + 1}`
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
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
      mainEntity: {
        "@type": "ItemList",
        itemListElement: organiserIds.map(
          (id, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@id": id,
            },
          })
        ),
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },

    ...event.organisers.map((organiser, index) => ({
      "@type": "Organization",
      "@id": organiserIds[index],
      name: organiser.name,
      url: organiser.url,
      logo: `${BASE_URL}${organiser.logo}`,
    })),

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
          name: "Official Organisers",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function OrganisersPage() {
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
        title="The Organisers Behind"
            highlightTitle="Uganda Buildcon"
        intro={`${event.name} is jointly organised by ${event.organisers.map((org) => org.name).join(" and ")}. Discover the organising companies and their official contacts.`}
        image={{
          src: "/images/gallery/inaugural-ceremony-address.jpg",
          alt: "Address at the Uganda Buildcon International Expo inaugural ceremony",
        }}
      />

      <OrganisersClientView />
    </main>
  );
}
