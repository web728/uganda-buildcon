import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VisitorProfileClientView } from "@/components/visit/VisitorProfileClientView";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ugandabuildcon.com"
).replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}/visitor-profile`;
const PAGE_TITLE = "Visitor Profile | 6th Uganda Buildcon International Expo 2027";
const PAGE_DESCRIPTION =
  `Explore the visitor profile for ${event.name}. ` +
  "See the architects, engineers, contractors, developers, trade buyers, " +
  "distributors and other professionals the exhibition is relevant to.";
const SOCIAL_IMAGE = `${SITE_URL}/images/gallery/conference-session.jpg`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "Uganda Buildcon International Expo 2027 visitor profile",
    "building and construction exhibition Uganda",
    "architects and engineers Kampala",
    "contractors and developers Uganda",
    "building materials buyers East Africa",
    "construction trade buyers Uganda",
    "visitor registration Kampala exhibition",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: PAGE_URL,
    siteName: event.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{
      url: SOCIAL_IMAGE,
      alt: "Building and construction industry professionals at an exhibition",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
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
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#event` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Visitor Profile", item: PAGE_URL },
      ],
    },
  ],
};

export default function VisitorProfilePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        title="Visitor"
        highlightTitle="Profile."
        intro={`Explore the visitor profiles for ${event.name}, including professionals involved in building design, construction, procurement, property development and distribution.`}
        image={{
          src: "/images/gallery/conference-session.jpg",
          alt: "Industry professionals attending an exhibition session",
        }}
      />

      <VisitorProfileClientView />
    </main>
  );
}
