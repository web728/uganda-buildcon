import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";
import { siteUrl } from "@/lib/utils/siteUrl";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = `${event.name} | ${event.dates.display}, ${event.venue.city}`;
const defaultDescription = `${event.descriptor}. ${event.editionLabel}, ${event.dates.display} at ${event.venue.fullLocation} — building materials, construction machinery, architecture, interiors and engineering solutions.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // Google Search Console verification for the Uganda property (set in env)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),

  title: {
    default: defaultTitle,
    template: `%s | ${event.shortName} 2027`,
  },
  description: defaultDescription,
  applicationName: event.name,
  authors: [{ name: "Futurex Trade Fair & Events Pvt. Ltd." }, { name: "ETSIPL" }],

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

  keywords: [
    "Uganda Buildcon",
    "Uganda Buildcon International Expo",
    "construction exhibition Uganda",
    "building materials exhibition Kampala",
    "construction expo Kampala",
    "construction machinery expo Uganda",
    "UMA Show Grounds exhibition",
    "East Africa construction trade show",
  ],

  openGraph: {
    type: "website",
    siteName: event.name,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    locale: "en_UG",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${event.name} — ${event.dates.display}, ${event.venue.fullLocation}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og/og-default.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sameAs = Object.values(event.social).filter(Boolean);

  // Site-wide structured data: Organization + WebSite + ExhibitionEvent
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: event.name,
        alternateName: event.shortName,
        url: siteUrl,
        logo: `${siteUrl}/logos/uganda-buildcon-logo.png`,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: event.name,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "ExhibitionEvent",
        "@id": `${siteUrl}/#event`,
        name: event.name,
        alternateName: `${event.editionLabel} ${event.shortName}`,
        description: event.descriptor,
        startDate: event.dates.start,
        endDate: event.dates.end,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        url: siteUrl,
        image: [`${siteUrl}/images/og/og-default.jpg`],
        location: {
          "@type": "Place",
          name: event.venue.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.venue.city,
            addressCountry: event.venue.countryCode,
          },
        },
        organizer: event.organisers.map((o) => ({
          "@type": "Organization",
          name: o.name,
          url: o.url,
        })),
        offers: {
          "@type": "Offer",
          name: "Trade Visitor Registration",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}${event.cta.registerVisit}`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-brand-dark font-sans"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Initial First-Load Experience Preloader */}
        <InitialSiteLoader />

        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
