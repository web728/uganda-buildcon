
import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

const POST_SHOW_REPORT_URL =
  "/downloads/5th_Uganda_Buildcon_International_Expo_2026_Post_Show_Report.pdf";

export const metadata: Metadata = {
  title: "Exhibition Downloads",
  description:
    "Request the exhibition brochure for the 6th Uganda Buildcon International Expo 2027 or view the 2026 Post Show Report.",
  alternates: {
    canonical: "/downloads",
  },
};

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Exhibition"
        highlightTitle="Downloads."
        intro="Get the exhibition brochure or view the previous edition's post show report."
      />

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          {/* Section Introduction */}
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1769A4]">
              Exhibition Documents
            </p>

            <h2 className="mt-4 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#111111]">
              Select a{" "}
              <span className="text-[#1769A4]">
                Document.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-[590px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              The brochure is available through the
              registration form. The post show report
              can be opened directly.
            </p>
          </div>

          {/* Two Documents — Equal Visibility */}
      
<div className="mx-auto mt-8 grid max-w-[960px] items-stretch gap-4 md:grid-cols-2">
  {/* EXHIBITION BROCHURE */}
  <article className="group flex min-w-0 flex-col rounded-xl border border-[#DFE7EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_12px_30px_rgba(16,35,55,0.045)] sm:p-6">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.08] text-[#1769A4]">
        <DocumentIcon />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1769A4]">
        Exhibition Brochure
      </span>
    </div>

    <div className="mt-5">
      <h3 className="font-heading text-[21px] font-bold leading-[1.3] tracking-[-0.03em] text-[#111111]">
        Get the Brochure
      </h3>

      <p className="mt-3 text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">
        Explore exhibition sectors, exhibitor
        and visitor profiles, and participation
        information.
      </p>

      <p className="mt-3 text-[12px] font-semibold leading-[1.6] text-[#34485C]">
        Fill out the form to download the brochure.
      </p>
    </div>

    <a
      href="#brochure-form"
      className="mt-6 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-[#1769A4] px-5 py-3 text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]"
    >
      Fill Form to Download
      <ArrowIcon />
    </a>
  </article>

  {/* POST SHOW REPORT */}
  <article className="group flex min-w-0 flex-col rounded-xl border border-[#DFE7EF] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#1769A4]/35 hover:shadow-[0_12px_30px_rgba(16,35,55,0.045)] sm:p-6">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1769A4]/[0.08] text-[#1769A4]">
        <DocumentIcon />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1769A4]">
        Previous Edition
      </span>
    </div>

    <div className="mt-5">
      <h3 className="font-heading text-[21px] font-bold leading-[1.3] tracking-[-0.03em] text-[#111111]">
        Post Show Report
      </h3>

      <p className="mt-3 text-[13px] leading-[1.8] text-[#607083] sm:text-[14px]">
        Look back at the previous edition,
        including exhibition highlights,
        exhibitor participation and visitor insights.
      </p>

    
<p className="mt-3 text-[12px] font-semibold leading-[1.6] text-[#34485C]">
  View the complete report from the previous edition.
</p>

    </div>

    <a
      href={POST_SHOW_REPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border border-[#1769A4] bg-white px-5 py-3 text-[13px] font-bold text-[#1769A4] transition-colors duration-300 hover:bg-[#1769A4] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]"
    >
      View Post Show Report
      <ArrowIcon />
    </a>
  </article>
</div>


          {/* BROCHURE DOWNLOAD FORM */}
          <div
            id="brochure-form"
            className="mx-auto mt-12 max-w-[760px] scroll-mt-28 sm:mt-16"
          >
            <div className="overflow-hidden rounded-xl border border-[#E1E8EF] bg-white shadow-[0_12px_40px_rgba(16,35,55,0.045)]">
              <div className="border-b border-[#E8EDF2] bg-[#F8FAFC] px-6 py-7 sm:px-9 sm:py-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
                  Brochure Download Form
                </p>

                <h2 className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold leading-[1.2] tracking-[-0.035em] text-[#111111]">
                  Download the Exhibition Brochure
                </h2>

              
              </div>

              <div className="p-6 sm:p-9">
                <BrochureDownloadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
