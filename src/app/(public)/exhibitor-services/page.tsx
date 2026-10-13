import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

export const metadata: Metadata = {
  title: "Exhibitor Services & Logistics",
  description:
    `Guidance for international and local exhibitors at ${event.name} — invitation letters, stand construction, freight and on-site support at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/exhibitor-services" },
};

export default function ExhibitorServicesPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Exhibitor Services & Logistics"
        intro={`Operational guidance and logistics support for a smooth exhibition experience at ${event.venue.fullLocation}.`}
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing technical exhibition specifications",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}