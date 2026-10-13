import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

export const metadata: Metadata = {
  title: "Why Visit",
  description:
    `Discover innovations, gain insights, network with industry leaders and source building products at ${event.name}, ${event.dates.display}, ${event.venue.fullLocation}. Free trade registration.`,
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Source Products. Meet Suppliers. Develop Business."
        intro="Three exhibition days connecting architects, contractors, developers and trade buyers with local and international building material manufacturers and service providers."
        image={{
          src: "/images/gallery/exhibition-hall-walkthrough.jpg",
          alt: "Visitors touring exhibitor stands at Uganda Buildcon in Kampala",
        }}
      />

      <VisitClientView />
    </main>
  );
}