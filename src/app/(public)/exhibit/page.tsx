import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

export const metadata: Metadata = {
  title: "Why Exhibit",
  description:
    `Exhibit at ${event.name} and present your products to contractors, developers, architects, importers and government buyers — ${event.dates.display}, ${event.venue.fullLocation}.`,
  alternates: { canonical: "/exhibit" },
};

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title={event.brandLines.exhibitor}
        intro="Three business days connecting manufacturers, exporters and suppliers with the professionals who buy, specify and distribute building products across Uganda and East Africa."
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing construction blueprints on site",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}