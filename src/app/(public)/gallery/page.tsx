import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getPublishedGalleryItems } from "@/lib/data/gallery";
import { galleryFallback } from "@/data/galleryFallback";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from previous editions of Uganda Buildcon International Expo at the UMA Show Grounds, Kampala — inaugural ceremonies, exhibitor stands and conference sessions.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const published = await getPublishedGalleryItems();
  const items = published.length > 0 ? published : galleryFallback;

  return (
    <>
      <PageHero
     

title="Exhibition"
highlightTitle="Gallery."
intro="Explore photos from previous editions of the exhibition, featuring exhibitors, building and construction products, and industry networking."

    image={{
          src: "/images/gallery/inauguration-2025-stage.jpg",
          alt: "Inaugural ceremony of Uganda Buildcon 2025",
        }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <GalleryGrid items={items} />
        </Container>
      </section>
    </>
  );
}
