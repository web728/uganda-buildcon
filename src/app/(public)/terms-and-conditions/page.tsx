
import type { Metadata } from "next";
import Link from "next/link";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Read the website terms and conditions for ${event.name}, including website use, exhibition enquiries and participation.`,
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <PageHero
        title="Terms &"
        highlightTitle="Conditions."
        intro="Read the terms covering the use of our website, exhibition enquiries and participation information."
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          {/* INTRODUCTION */}
          <div className="border-b border-[#E3E9EF] pb-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
              Website Terms
            </p>

            <h2 className="mt-4 font-heading text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[1.2] tracking-[-0.035em] text-[#111111]">
              About These Terms
            </h2>

            <p className="mt-4 text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              These Terms and Conditions apply to
              your use of this website, operated by{" "}
              <strong className="font-semibold text-[#111111]">
                {event.organisers[0].name}
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-[#111111]">
                {event.organisers[1].name}
              </strong>{" "}
              as joint organisers of{" "}
              <strong className="font-semibold text-[#111111]">
                {event.name}
              </strong>
              .
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              By using this website, you agree
              to comply with the terms outlined
              below.
            </p>
          </div>

          {/* WEBSITE USE */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Use of This Website
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              This website provides information
              about the exhibition, participation
              opportunities and related services.
              You agree to use it lawfully and
              not interfere with its operation
              or other visitors' access.
            </p>
          </div>

          {/* EXHIBITOR AND VISITOR REQUESTS */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Exhibitor &amp; Visitor Requests
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Submitting an exhibitor enquiry,
              stand booking request or visitor
              registration does not automatically
              confirm participation or entry
              to the exhibition.
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Participation is subject to
              confirmation by the organisers
              and any applicable registration,
              booking or exhibitor agreement terms.
            </p>
          </div>

          {/* INFORMATION ACCURACY */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Website Information
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              We aim to keep the information
              on this website accurate and
              up to date. However, exhibition
              details, participation options
              and other information may
              change.
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Please confirm important
              arrangements with the organising
              team before making bookings
              or travel plans.
            </p>
          </div>

          {/* INTELLECTUAL PROPERTY */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Intellectual Property
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Website content, including text,
              images, graphics, logos and other
              materials, belongs to the organisers
              or their respective owners.
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              You may not reproduce, distribute
              or use protected materials for
              commercial purposes without
              permission from the relevant
              rights holder.
            </p>
          </div>

          {/* THIRD-PARTY LINKS */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              External Websites
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Our website may contain links
              to third-party websites for
              additional information.
              We do not control their content,
              availability or privacy practices.
            </p>
          </div>

          {/* LIABILITY */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Limitation of Liability
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              While reasonable care is taken
              in maintaining this website,
              we cannot guarantee uninterrupted
              access or that all information
              will always be complete and
              error-free.
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              To the extent permitted by
              applicable law, the organisers
              are not responsible for losses
              arising from website interruptions
              or reliance on inaccurate
              information.
            </p>
          </div>

          {/* CHANGES TO TERMS */}
          <div className="pt-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Changes to These Terms
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              These terms may be updated
              when website practices or
              exhibition arrangements change.
              Revised terms will be
              published on this page.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-10 rounded-xl border border-[#E1E8EF] bg-[#F8FAFC] p-6 sm:p-8">
            <h2 className="font-heading text-[18px] font-bold text-[#111111]">
              Questions About These Terms?
            </h2>

            <p className="mt-2 max-w-[650px] text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]">
              For questions about website
              information, exhibition bookings
              or participation terms, please
              contact the organising team.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1769A4] px-5 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1769A4]"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
