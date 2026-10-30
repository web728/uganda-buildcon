import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";

export const metadata: Metadata = {
  title: "Register to Visit",
  description: `Register for free trade access to ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/register-to-visit" },
};

export default function RegisterToVisitPage() {
  return (

<>
  <PageHero
    title="Visitor"
    highlightTitle="Registration."
    intro={`Register your interest in visiting ${event.name}. Explore building and construction products, meet suppliers and connect with industry professionals.`}
  />

  <section className="bg-slate-50/50 py-12 sm:py-20 lg:py-24">
    <Container className="max-w-3xl">
      <div className="mx-auto rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
        <div className="mb-8 border-b border-slate-100 pb-6 text-center">
          <span className="inline-block rounded-full bg-[#1769A4]/[0.08] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1769A4]">
            Visitor Registration
          </span>

          <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
            Register to Visit
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-[1.8] text-[#607083] sm:text-[15px]">
            Complete the form below to submit your
            visitor registration for the exhibition.
            
          </p>
        </div>

        <VisitorRegistrationForm />
      </div>
    </Container>
  </section>
</>

  );
}