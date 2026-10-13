import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

export const metadata: Metadata = {
  title: "About the Expo",
  description: `About ${event.name} (${event.editionLabel}) — Uganda's largest B2B trade show for the building and construction industry, held ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Where Uganda’s Building & Construction Industry Meets"
        intro={`Uganda’s largest B2B tradeshow on the building & construction industry — now in its ${event.editionLabel.toLowerCase()} at ${event.venue.fullLocation}.`}
        image={{
          src: "/images/gallery/dignitaries-stand-visit.jpg",
          alt: "Guests visiting exhibitor stands at Uganda Buildcon International Expo",
        }}
      />

      <AboutClientView />
    </main>
  );
}