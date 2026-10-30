
import type { Metadata } from "next";
import Link from "next/link";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Learn how personal information is collected, used and handled through the official website of ${event.name}.`,
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <PageHero
        title="Privacy"
        highlightTitle="Policy."
        intro="Learn how we collect, use and handle personal information submitted through our website."
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          {/* INTRODUCTION */}
          <div className="border-b border-[#E3E9EF] pb-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
              Website Privacy
            </p>

            <h2 className="mt-4 font-heading text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[1.2] tracking-[-0.035em] text-[#111111]">
              How We Handle Your Information
            </h2>

            <p className="mt-4 text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              This Privacy Policy explains how{" "}
              <strong className="font-semibold text-[#111111]">
                {event.organisers[0].name}
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-[#111111]">
                {event.organisers[1].name}
              </strong>{" "}
              collect and use personal information
              submitted through the website of{" "}
              <strong className="font-semibold text-[#111111]">
                {event.name}
              </strong>
              .
            </p>
          </div>

          {/* INFORMATION COLLECTED */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Information We Collect
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              When you submit an enquiry, register
              to visit, request a brochure or apply
              to exhibit, we may collect information
              such as your name, company, job title,
              country, email address and phone number.
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              We may also collect technical information,
              such as your IP address, browser type
              and website usage information, to support
              website security and operation.
            </p>
          </div>

          {/* USE OF INFORMATION */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              How We Use Your Information
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              We use the information you provide
              to manage exhibition-related enquiries
              and communications, including:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-[1.8] text-[#607083] marker:text-[#1769A4]">
              <li>
                Responding to enquiries and requests.
              </li>
              <li>
                Processing exhibitor and visitor registrations.
              </li>
              <li>
                Providing event information and registration updates.
              </li>
              <li>
                Managing exhibition participation and related arrangements.
              </li>
              <li>
                Maintaining records and improving website services.
              </li>
            </ul>
          </div>

          {/* DATA STORAGE AND SHARING */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Data Storage &amp; Sharing
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Information submitted through our website
              may be stored in databases and internal
              systems used by the organising team.
              Authorised service providers may process
              information where necessary to support
              website operations and event administration.
            </p>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              We do not sell personal information
              to third parties.
            </p>
          </div>

          {/* DATA SECURITY AND RETENTION */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Data Security &amp; Retention
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              We take reasonable steps to protect
              personal information against unauthorised
              access, loss and misuse.
              Information is retained as needed for
              exhibition administration, record-keeping
              and applicable legal requirements.
            </p>
          </div>

          {/* COOKIES */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Cookies
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              Our website may use cookies for essential
              functionality and other purposes described
              in our{" "}
              <Link
                href="/cookie-policy"
                className="font-semibold text-[#1769A4] underline underline-offset-4 hover:text-[#105685]"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          {/* YOUR RIGHTS */}
          <div className="border-b border-[#E3E9EF] py-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Your Information &amp; Requests
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              You may contact us to request access
              to your personal information, ask
              for corrections or request deletion,
              subject to applicable legal requirements.
            </p>
          </div>

          {/* POLICY UPDATES */}
          <div className="pt-9">
            <h2 className="font-heading text-[20px] font-bold tracking-[-0.025em] text-[#111111]">
              Policy Updates
            </h2>

            <p className="mt-3 text-[14px] leading-[1.85] text-[#607083]">
              We may update this policy when our
              information-handling practices change.
              The latest version will be available
              on this page.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-10 rounded-xl border border-[#E1E8EF] bg-[#F8FAFC] p-6 sm:p-8">
            <h2 className="font-heading text-[18px] font-bold text-[#111111]">
              Privacy Enquiries
            </h2>

            <p className="mt-2 max-w-[650px] text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]">
              For questions about this policy
              or requests concerning your personal
              information, please contact the
              organising team.
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
