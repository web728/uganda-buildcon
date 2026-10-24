
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";


import { DM_Sans, Sora } from "next/font/google";

import "./globals.css";

import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";
import { siteUrl } from "@/lib/utils/siteUrl";

/* ==========================================
   PREMIUM NEXT.JS FONTS
========================================== */

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

/* ==========================================
   CENTRAL SEO CONFIGURATION
========================================== */

const SITE_URL = siteUrl.replace(/\/+$/, "");

const SITE_NAME = event.name;
const SHORT_NAME = event.shortName;

const EVENT_YEAR = event.dates.start.slice(0, 4);

const EVENT_NAME =
  SITE_NAME.includes(EVENT_YEAR)
    ? SITE_NAME
    : `${SITE_NAME} ${EVENT_YEAR}`;

const PAGE_TITLE =
  `Uganda Buildcon ${EVENT_YEAR} | ` +
  "Building & Construction Expo Kampala";

const PAGE_DESCRIPTION =
  `Explore ${EVENT_NAME}, ` +
  `${event.dates.display} at ${event.venue.fullLocation}. ` +
  "Discover building materials, construction machinery, " +
  "architecture, engineering and industry networking " +
  "opportunities in Uganda and East Africa.";

const OG_IMAGE =
  `${SITE_URL}/images/og/og-default.jpg`;

const LOGO_URL =
  `${SITE_URL}/logos/uganda-buildcon-logo.png`;

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const EVENT_ID =
  `${SITE_URL}/#event`;

const VENUE_ID =
  `${SITE_URL}/#venue`;

/* ==========================================
   URL HELPERS
========================================== */

function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

function isValidExternalUrl(
  value: unknown
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

/* ==========================================
   VIEWPORT
========================================== */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#102b4e",
  colorScheme: "light",
};

/* ==========================================
   GLOBAL SEO METADATA
========================================== */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: PAGE_TITLE,
    template: `%s | ${SHORT_NAME}`,
  },

  description: PAGE_DESCRIPTION,

  applicationName: SITE_NAME,

  category: "Business & Trade Exhibitions",

  keywords: [
    "Uganda Buildcon",
    `Uganda Buildcon ${EVENT_YEAR}`,
    "Uganda Buildcon International Expo",
    `Construction Expo Uganda ${EVENT_YEAR}`,
    "Building and Construction Expo Kampala",
    "Building Materials Exhibition Uganda",
    "Construction Machinery Expo Uganda",
    "Construction Equipment Exhibition Uganda",
    "Building Industry Trade Show Uganda",
    "Construction Trade Fair East Africa",
    "Architecture Exhibition Uganda",
    "Engineering Exhibition Kampala",
    "Infrastructure Industry Exhibition Uganda",
    "B2B Construction Exhibition Africa",
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: SITE_NAME,

    url: SITE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt:
          `${EVENT_NAME} — ` +
          `${event.dates.display}, ` +
          event.venue.fullLocation,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          google:
            process.env
              .NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }
      : {}),

    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01":
              process.env
                .NEXT_PUBLIC_BING_SITE_VERIFICATION,
          },
        }
      : {}),

    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? {
          yandex:
            process.env
              .NEXT_PUBLIC_YANDEX_VERIFICATION,
        }
      : {}),
  },
};

/* ==========================================
   STRUCTURED DATA
========================================== */

function getStructuredData() {
  const socialLinks = Array.from(
    new Set(
      Object.values(event.social).filter(
        isValidExternalUrl
      )
    )
  );

  const organizers = event.organisers.map(
    (organizer) => ({
      "@type": "Organization" as const,
      name: organizer.name,

      ...(isValidExternalUrl(organizer.url)
        ? {
            url: organizer.url,
          }
        : {}),
    })
  );

  return {
    "@context": "https://schema.org",

    "@graph": [
      /* ORGANIZATION */
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,

        name: SITE_NAME,
        alternateName: SHORT_NAME,
        url: SITE_URL,

        description:
          "Uganda Buildcon International Expo connects " +
          "building and construction industry professionals, " +
          "manufacturers, suppliers and businesses in Uganda " +
          "and East Africa.",

        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: LOGO_URL,
          contentUrl: LOGO_URL,
          caption: SITE_NAME,
        },

        ...(socialLinks.length > 0
          ? {
              sameAs: socialLinks,
            }
          : {}),
      },

      /* WEBSITE */
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,

        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SHORT_NAME,
        description: PAGE_DESCRIPTION,
        inLanguage: "en-UG",

        publisher: {
          "@id": ORGANIZATION_ID,
        },
      },

      /* VENUE */
      {
        "@type": "Place",
        "@id": VENUE_ID,

        name: event.venue.name,

        address: {
          "@type": "PostalAddress",
          addressLocality: event.venue.city,
          addressCountry: event.venue.countryCode,
        },
      },

      /* EXHIBITION EVENT */
      {
        "@type": "Event",
        "@id": EVENT_ID,

        name: EVENT_NAME,

        alternateName:
          `${event.editionLabel} ${SHORT_NAME}`,

        description: PAGE_DESCRIPTION,

        startDate: event.dates.start,
        endDate: event.dates.end,

        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",

        eventStatus:
          "https://schema.org/EventScheduled",

        url: SITE_URL,
        image: [OG_IMAGE],

        inLanguage: "en-UG",

        location: {
          "@id": VENUE_ID,
        },

        organizer: organizers,

        potentialAction: {
          "@type": "RegisterAction",
          target: absoluteUrl(
            event.cta.registerVisit
          ),
          name: "Visitor Registration",
        },
      },
    ],
  };
}

/* ==========================================
   SAFE JSON-LD
========================================== */

function serializeJsonLd(
  data: ReturnType<typeof getStructuredData>
): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/* ==========================================
   ROOT LAYOUT
========================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en-UG"
      className={[
        dmSans.variable,
        sora.variable,
        "h-full",
        "antialiased",
      ].join(" ")}
      suppressHydrationWarning
    >
      <body
        className={[
          "flex",
          "min-h-screen",
          "flex-col",
          "overflow-x-clip",
          "bg-white",
          "font-sans",
          "text-brand-dark",
          "selection:bg-brand-blue",
          "selection:text-white",
        ].join(" ")}
        suppressHydrationWarning
      >
        {/* Search-engine structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              getStructuredData()
            ),
          }}
        />

        {/* Accessible skip link */}
        <a
          href="#main-content"
          className={[
            "sr-only",
            "fixed",
            "left-4",
            "top-4",
            "z-[9999]",
            "rounded-lg",
            "bg-brand-navy",
            "px-5",
            "py-3",
            "text-sm",
            "font-semibold",
            "text-white",
            "shadow-xl",
            "focus:not-sr-only",
          ].join(" ")}
        >
          Skip to main content
        </a>

        {/* Existing site loader */}
        <InitialSiteLoader />

        {/* Existing page content */}
        {children}

        {/* Existing cookie consent */}
        <CookieConsent />

        {/* Existing analytics */}
        <Analytics />
      </body>
    </html>
  );
}
