
import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";

import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";
import { siteUrl } from "@/lib/utils/siteUrl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const SITE_URL = siteUrl.replace(/\/+$/, "");
const SITE_NAME = event.name;
const EVENT_YEAR = event.dates.start.slice(0, 4);

const pageTitle =
  `${SITE_NAME} ${EVENT_YEAR} | ` +
  `Construction Expo in Kampala`;

const pageDescription =
  `Discover Uganda Buildcon International Expo ${EVENT_YEAR}, ` +
  `taking place ${event.dates.display} at ` +
  `${event.venue.fullLocation}. Explore construction ` +
  `machinery, building materials, architecture, ` +
  `interiors, engineering solutions and B2B networking.`;

const ogImage = `${SITE_URL}/images/og/og-default.jpg`;
const logoUrl = `${SITE_URL}/logos/uganda-buildcon-logo.png`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#123472",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: pageTitle,
    template: `%s | ${event.shortName} ${EVENT_YEAR}`,
  },

  description: pageDescription,

  applicationName: SITE_NAME,

  keywords: [
    "Uganda Buildcon",
    `Uganda Buildcon ${EVENT_YEAR}`,
    `Uganda Buildcon International Expo ${EVENT_YEAR}`,
    `Uganda construction expo ${EVENT_YEAR}`,
    "Construction exhibition Uganda",
    "Construction expo Kampala",
    "Building materials exhibition Uganda",
    "Construction machinery exhibition Uganda",
    "Building and construction trade show",
    "East Africa construction exhibition",
    "Architecture and interior design expo Uganda",
    "Engineering exhibition East Africa",
    "UMA Show Grounds Kampala",
    "Construction trade fair Uganda",
    "Uganda building industry exhibition",
  ],

  authors: [
    { name: "Futurex Trade Fair & Events Pvt. Ltd." },
    { name: "Exhibitions & Trade Services India Pvt. Ltd." },
  ],

  creator: "Uganda Buildcon International Expo",
  publisher: "Uganda Buildcon International Expo",

  category: "Business and Trade Exhibitions",

  alternates: {
    canonical: "/",
    languages: {
      "en-UG": "/",
      "x-default": "/",
    },
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

  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          google:
            process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }
      : {}),

    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01":
              process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
          },
        }
      : {}),

    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? {
          yandex:
            process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
        }
      : {}),
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt:
          `${SITE_NAME} ${EVENT_YEAR} — ` +
          `${event.dates.display}, ${event.venue.fullLocation}`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
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
};

function getStructuredData() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const eventId = `${SITE_URL}/#event`;

  const socialLinks = Object.values(event.social).filter(
    (url): url is string =>
      typeof url === "string" &&
      /^https?:\/\//.test(url)
  );

  return {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        alternateName: event.shortName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          contentUrl: logoUrl,
        },
        ...(socialLinks.length > 0
          ? { sameAs: socialLinks }
          : {}),
      },

      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: pageDescription,
        inLanguage: "en-UG",
        publisher: {
          "@id": organizationId,
        },
      },

      {
        "@type": "Event",
        "@id": eventId,

        name: `${SITE_NAME} ${EVENT_YEAR}`,

        alternateName:
          `${event.editionLabel} ${event.shortName}`,

        description: pageDescription,

        startDate: event.dates.start,
        endDate: event.dates.end,

        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",

        eventStatus:
          "https://schema.org/EventScheduled",

        url: SITE_URL,

        image: [ogImage],

        location: {
          "@type": "Place",
          name: event.venue.name,

          address: {
            "@type": "PostalAddress",
            addressLocality: event.venue.city,
            addressCountry: event.venue.countryCode,
          },
        },

        organizer: event.organisers.map((organizer) => ({
          "@type": "Organization",
          name: organizer.name,
          url: organizer.url,
        })),

        isAccessibleForFree: true,

        offers: {
          "@type": "Offer",
          name: "Free Trade Visitor Registration",
          price: 0,
          priceCurrency: "USD",
          url: new URL(
            event.cta.registerVisit,
            SITE_URL
          ).toString(),
        },
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = JSON.stringify(
    getStructuredData()
  ).replace(/</g, "\\u003c");

  return (
    <html
      lang="en-UG"
      className={`${inter.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-screen flex-col overflow-x-clip bg-white font-sans text-brand-dark selection:bg-brand-blue selection:text-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />

        <a
          href="#main-content"
          className="sr-only fixed top-3 left-3 z-[9999] rounded-lg bg-brand-navy px-5 py-3 font-semibold text-white shadow-xl focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
        >
          Skip to main content
        </a>

        <InitialSiteLoader />

        {children}

        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
