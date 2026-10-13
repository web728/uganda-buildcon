import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

export const metadata: Metadata = {
  title: "Official Event Organisers | Futurex & ETSIPL",
  description: `${event.name} is jointly organised by Futurex Trade Fair & Events Pvt. Ltd. and Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL).`,
  alternates: { canonical: "/organisers" },
};

export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Jointly Organised By"
        intro="Futurex Trade Fair & Events and ETSIPL — the organisers behind the Buildcon series of building & construction trade shows."
        image={{
          src: "/images/gallery/inaugural-ceremony-address.jpg",
          alt: "Address at the Uganda Buildcon inaugural ceremony",
        }}
      />

      <OrganisersClientView />
    </main>
  );
}