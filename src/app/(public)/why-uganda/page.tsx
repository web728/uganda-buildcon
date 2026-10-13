import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhyUgandaClientView } from "@/components/about/WhyUgandaClientView";

export const metadata: Metadata = {
  title: "Why Uganda | Construction Market Opportunity",
  description:
    "Why exhibit in Uganda: projected 6.0% GDP growth, 26.77% urbanisation, Vision 2040 infrastructure investment and Uganda's strategic role in the East African Community.",
  alternates: { canonical: "/why-uganda" },
};

export default function WhyUgandaPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Uganda — A Construction Market on the Move"
        intro="Rapid urbanisation, Vision 2040 infrastructure investment and Uganda’s strategic role in the East African Community are driving demand for building materials, machinery and construction services."
        image={{
          src: "/images/home/skyline-construction.jpg",
          alt: "City skyline with buildings under construction",
        }}
      />

      <WhyUgandaClientView />
    </main>
  );
}
