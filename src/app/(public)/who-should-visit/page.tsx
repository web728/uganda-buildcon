import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

export const metadata: Metadata = {
  title: "Who Should Visit",
  description:
    "Who should visit Uganda Buildcon 2027 — architects, engineers, contractors, developers, investors, importers, distributors, government agencies and facility managers.",
  alternates: { canonical: "/who-should-visit" },
};

export default function WhoShouldVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="The People Who Buy, Build, Specify & Source"
        intro="For B2B and B2C visitors — real estate developers, architects, project managers, purchasing managers, government officials and key industry stakeholders."
        image={{
          src: "/images/gallery/conference-session.jpg",
          alt: "Industry professionals attending a Uganda Buildcon conference session",
        }}
      />

      <WhoShouldVisitClientView />
    </main>
  );
}