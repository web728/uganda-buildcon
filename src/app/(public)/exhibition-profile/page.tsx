import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";

export const metadata: Metadata = {
  title: "Exhibition Profile | Products & Sectors on Display",
  description:
    "Building materials, construction machinery, structural steel, doors & windows, tiles, interiors, HVAC, electrical, fire safety, renewable energy and construction software on display at Uganda Buildcon International Expo 2027.",
  alternates: { canonical: "/exhibition-profile" },
};

export default function ExhibitionProfilePage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Products, Machinery & Materials"
        intro="Twelve exhibit sectors and more than fifty product categories covering the complete building and infrastructure supply chain."
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt: "Construction crane and machinery on a building site",
        }}
      />

      <section className="relative py-16 lg:py-24 border-t border-slate-200/80">
        <Container>
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </main>
  );
}