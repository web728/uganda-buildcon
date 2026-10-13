import type { Metadata } from "next";
import { event } from "@/config/event";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyUgandaSection } from "@/components/sections/home/WhyUgandaSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { ExhibitorDirectoryPreviewSection } from "@/components/sections/home/ExhibitorDirectoryPreviewSection";
import { PreviousEditionSection } from "@/components/sections/home/PreviousEditionSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";
import { getPublishedExhibitors, type ExhibitorSummary } from "@/lib/data/exhibitors";

export const dynamic = "force-dynamic";

const homeTitle = `${event.name} | Building & Construction Expo in Kampala`;
const homeDescription = `${event.name} (${event.editionLabel}) — Uganda's largest B2B trade show for building materials, construction machinery, architecture, interiors and engineering. ${event.dates.display} at ${event.venue.fullLocation}. Book a stand or register to visit free.`;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  keywords: [
    "Uganda Buildcon 2027",
    "Uganda Buildcon International Expo",
    "construction expo Uganda",
    "building materials exhibition Kampala",
    "construction machinery trade show Uganda",
    "UMA Show Grounds exhibition",
    "East Africa construction trade show",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: `Meet contractors, developers, architects and buyers at Uganda's largest building & construction B2B expo — ${event.dates.display}, ${event.venue.fullLocation}.`,
    url: "/",
    siteName: event.name,
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630, alt: `${event.name} — ${event.dates.display}, ${event.venue.fullLocation}` }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: `Uganda's largest building & construction B2B expo — ${event.dates.display}, ${event.venue.fullLocation}.`,
    images: ["/images/og/og-default.jpg"],
  },
};

export default async function HomePage() {
  let exhibitors: ExhibitorSummary[] = [];
  try {
    exhibitors = await getPublishedExhibitors();
  } catch {
    exhibitors = [];
  }

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <HeroSection />
      <HeroStatsSection />
      <IntroSection />
      <WhyUgandaSection />
      <ExhibitionProfileSection />
      <WhyExhibitSection />
      <WhoWillYouMeetSection />
      <PreviousEditionSection />
      <ExhibitorDirectoryPreviewSection exhibitors={exhibitors} />
      <VenueSection />
      <PartnersSection />
      <NewsSection />
      <FinalCtaSection />
    </main>
  );
}
