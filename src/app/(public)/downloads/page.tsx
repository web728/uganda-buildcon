import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";
import { event } from "@/config/event";
import { previousEdition } from "@/data/previousEdition";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download the Uganda Buildcon International Expo brochure and the 2025 Post Show Report — exhibitor profile, visitor profile and previous-edition results.",
  alternates: { canonical: "/downloads" },
};

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();

  // Resources that are always available, followed by anything added via the admin panel.
  const resources = [
    {
      _id: "post-show-report-2025",
      title: "Post Show Report — 2025 Edition",
      description: `Results of the ${previousEdition.label}: visitor reasons, exhibitor feedback and satisfaction survey.`,
      fileUrl: event.downloads.postShowReport,
    },
    ...downloads.filter((d) => d.fileUrl !== event.downloads.postShowReport),
  ];

  return (
    <>
      <PageHero title="Downloads" intro="Event brochure, post show report and other Uganda Buildcon resources." />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl rounded-xl border border-brand-border p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">Exhibition Brochure</p>
            <h2 className="mt-1 text-2xl font-bold text-brand-dark">Get the Brochure</h2>
            <p className="mt-2 text-sm text-brand-body">
              Fill in your details below and the brochure — with the full exhibitor and visitor profile — will download automatically.
            </p>
            <div className="mt-6">
              <BrochureDownloadForm />
            </div>
          </div>

          <div className="flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border">
            {resources.map((d) => (
              <a
                key={d._id}
                href={d.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-6 hover:bg-brand-light"
              >
                <div>
                  <p className="text-base font-bold text-brand-dark">{d.title}</p>
                  {d.description ? <p className="mt-1 text-sm text-brand-body">{d.description}</p> : null}
                </div>
                <span className="flex-shrink-0 text-sm font-semibold text-brand-blue">Download →</span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
