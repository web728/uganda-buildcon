
import type { Metadata } from "next";
import Link from "next/link";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how cookies may be used on the official website of the 6th Uganda Buildcon International Expo 2027.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

const COOKIE_TYPES = [
  {
    title: "Essential Cookies",
    description:
      "These cookies support basic website functions, such as navigation, security and remembering necessary settings. Some features may not work properly without them.",
  },
  {
    title: "Analytics Cookies",
    description:
      "If enabled, analytics cookies help us understand how visitors use the website, including which pages are viewed and how the site performs.",
  },
  {
    title: "Marketing Cookies",
    description:
      "If enabled, marketing cookies may help measure advertising campaigns and show relevant promotional content on other platforms.",
  },
] as const;

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#1769A4] selection:text-white">
      <PageHero
        title="Cookie"
        highlightTitle="Policy."
        intro="Learn about cookies, how they may be used on our website and the choices available to you."
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          {/* INTRODUCTION */}
          <div className="border-b border-[#E3E9EF] pb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1769A4]">
              Website Information
            </p>

            <h2 className="mt-4 font-heading text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[1.2] tracking-[-0.035em] text-[#111111]">
              How We Use Cookies
            </h2>

            <p className="mt-4 max-w-[720px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              Cookies are small files that websites
              store on your device. They can help
              websites function properly, remember
              settings and provide information about
              how visitors use a site.
            </p>

            <p className="mt-4 max-w-[720px] text-[14px] leading-[1.85] text-[#607083] sm:text-[15px]">
              This policy explains the types of cookies
              that may be used on the website for{" "}
              <strong className="font-semibold text-[#111111]">
                {event.name}
              </strong>
              .
            </p>
          </div>

          {/* COOKIE CATEGORIES */}
          <div className="pt-9">
            <h2 className="font-heading text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold tracking-[-0.03em] text-[#111111]">
              Types of Cookies
            </h2>

            <p className="mt-3 max-w-[680px] text-[14px] leading-[1.8] text-[#607083]">
              Different cookies serve different
              purposes. The categories below explain
              how they are commonly used.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-[#E1E8EF] bg-white">
              {COOKIE_TYPES.map((cookie, index) => (
                <article
                  key={cookie.title}
                  className={`px-5 py-6 sm:px-7 ${
                    index > 0
                      ? "border-t border-[#E8EDF2]"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1769A4]"
                    />

                    <div>
                      <h3 className="font-heading text-[16px] font-bold leading-[1.4] text-[#111111]">
                        {cookie.title}
                      </h3>

                      <p className="mt-2 text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]">
                        {cookie.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* COOKIE SETTINGS */}
          <div className="mt-10 border-t border-[#E3E9EF] pt-9">
            <h2 className="font-heading text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold tracking-[-0.03em] text-[#111111]">
              Managing Cookies
            </h2>

            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.85] text-[#607083]">
              You can manage or delete cookies through
              your browser settings. Most browsers
              allow you to block certain cookies or
              clear cookies already stored on your
              device.
            </p>

            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.85] text-[#607083]">
              Disabling some cookies may affect
              certain website features or how
              the site functions.
            </p>
          </div>

          {/* POLICY UPDATES */}
          <div className="mt-10 border-t border-[#E3E9EF] pt-9">
            <h2 className="font-heading text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold tracking-[-0.03em] text-[#111111]">
              Policy Updates
            </h2>

            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.85] text-[#607083]">
              This policy may be updated if the
              website's cookie practices change.
              Any revised information will be
              published on this page.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-10 rounded-xl border border-[#E1E8EF] bg-[#F8FAFC] p-6 sm:p-8">
            <h2 className="font-heading text-[18px] font-bold text-[#111111]">
              Questions About This Policy?
            </h2>

            <p className="mt-2 max-w-[650px] text-[13px] leading-[1.85] text-[#607083] sm:text-[14px]">
              If you have questions about cookies
              or how information is handled on
              our website, please contact the
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
