import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

export const metadata: Metadata = {
  title: "Venue & Location | UMA Show Grounds, Kampala",
  description: `${event.venue.fullLocation} hosts ${event.name} from ${event.dates.display}. Venue location, map and travel information.`,
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Official Exhibition Venue"
        intro={`${event.venue.name} · ${event.venue.city}, ${event.venue.country} · ${event.dates.display}`}
        image={{
          src: "/images/gallery/ribbon-cutting-opening.jpg",
          alt: `Opening ceremony outside the exhibition hall at ${event.venue.name}, ${event.venue.city}`,
        }}
      />

      <VenueClientView/>
    </main>
  );
}