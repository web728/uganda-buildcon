
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  event.website
).replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}/contact`;

const PAGE_TITLE =
  "Contact Uganda Buildcon 2027 | Exhibitor & Visitor Enquiries";

const PAGE_DESCRIPTION =
  `Contact the organising team for ${event.name}. ` +
  `Enquire about exhibition stand bookings, sponsorship, ` +
  `partnerships, international participation and visitor ` +
  `assistance for ${event.dates.display} in Kampala.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Uganda Buildcon Contact",
    "Uganda Buildcon 2027 Contact Details",
    "Uganda Buildcon Stand Booking Enquiry",
    "Uganda Buildcon Organisers",
    "Uganda Buildcon Sponsorship Enquiry",
    "Construction Expo Kampala Contact",
    "Uganda Buildcon Visitor Assistance",
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
        url: `${SITE_URL}/images/venue/building-exterior.jpg`,
        alt: `Contact the organising team of ${event.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      `${SITE_URL}/images/venue/building-exterior.jpg`,
    ],
  },
};

const officialContacts = [
  event.contact.futurex,
  event.contact.etsipl,
  event.contact.futurexSales,
] as const;

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
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
      mainEntity: {
        "@id": `${PAGE_URL}#contact-directory`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#contact-directory`,
      name: "Uganda Buildcon Official Contacts",
      itemListElement: officialContacts.map(
        (contact, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: contact.name,
            email: contact.email,
            telephone: contact.phone,
            worksFor: {
              "@type": "Organization",
              name: contact.company,
            },
          },
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
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function ContactPage() {
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
    
title="Contact"
highlightTitle="Us."
intro={`Get in touch with the organising team of ${event.name} for exhibitor enquiries, stand bookings, partnerships, sponsorships and visitor information.`}
       image={{
          src: "/images/venue/building-exterior.jpg",
          alt: "Modern building exterior representing the building and construction industry",
        }}
      />

      <ContactClientView />
    </main>
  );
}
