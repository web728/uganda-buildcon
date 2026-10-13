import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

export const metadata: Metadata = {
  title: "Who Should Exhibit",
  description:
    "Who should exhibit at Uganda Buildcon 2027 — construction material manufacturers, heavy machinery suppliers, green building, engineering, interiors and building technology companies.",
  alternates: { canonical: "/who-should-exhibit" },
};

export default function WhoShouldExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Who Should Exhibit at Uganda Buildcon"
        intro="Construction materials, heavy machinery, green building solutions, engineering services, architectural design, interior and exterior finishing, infrastructure software and building technologies."
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt: "Industrial machinery and construction equipment display",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}