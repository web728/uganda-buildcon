import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: `Essential travel, venue navigation, and visitor guidance for attending ${event.name} from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/plan-your-visit" },
};

export default function PlanYourVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Plan Your Visit to Kampala"
        intro="Practical visitor information, venue access and travel essentials for Uganda Buildcon International Expo 2027."
        image={{
          src: "/images/gallery/ribbon-cutting-opening.jpg",
          alt: "Opening ribbon-cutting at the Uganda Buildcon exhibition hall, Kampala",
        }}
      />

      <PlanYourVisitClientView />
    </main>
  );
}