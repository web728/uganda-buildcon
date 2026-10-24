
import Image from "next/image";
import Link from "next/link";

import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

import {
  FooterReveal,
  FooterArtwork,
} from "./FooterMotion";

const NAV_GROUPS = [
  { title: "Event", links: footerNav.event },
  { title: "Exhibit", links: footerNav.exhibit },
  { title: "Visit", links: footerNav.visit },
  { title: "Information", links: footerNav.information },
  { title: "Legal & Desk", links: footerNav.legal },
] as const;

const CONTACTS = [
  {
    company: "Futurex Group",
    name: event.contact.futurex.name,
    phone: event.contact.futurex.phone,
    email: event.contact.futurex.email,
  },
  {
    company: "ETSIPL",
    name: event.contact.etsipl.name,
    phone: event.contact.etsipl.phone,
    email: event.contact.etsipl.email,
  },
  
];

const SOCIAL_LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: event.social.linkedin,
    path: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14H7v-7h3v7ZM8.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18 17h-3v-3.7c0-1.4-1.7-1.5-1.7 0-.1.5 0 3.7 0 3.7h-3v-7h3v1c1.1-1.8 4.7-1.9 4.7 1.8V17Z",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: event.social.facebook,
    path: "M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12.06c0-5.53-4.5-10.02-10-10.02Z",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: event.social.instagram,
    path: "M12 2.16c3.2 0 3.58.02 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.22 1.66-4.77 4.92-4.92 1.27-.05 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    key: "twitter",
    label: "X",
    href: event.social.twitter,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
  },
].filter((item) => Boolean(item.href));

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ContactDetails({
  contact,
}: {
  contact: (typeof CONTACTS)[number];
}) {
  const cleanPhone = contact.phone.replace(
    /[^0-9+]/g,
    ""
  );

  return (
    <div className="min-w-0">
     

      <p className="mt-1.5 text-[12px] font-semibold leading-snug text-[#7ACB58]">
        {contact.name}
      </p>

      <div className="mt-2 space-y-1.5">
        <a
          href={`tel:${cleanPhone}`}
          className="block w-fit text-[11px] text-white/60 transition-colors hover:text-white"
        >
          {contact.phone}
        </a>

        <a
          href={`mailto:${contact.email}`}
          className="block break-all text-[11px] text-white/60 transition-colors hover:text-[#7ACB58]"
        >
          {contact.email}
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#080808] text-white">
      {/* Subtle SVG — unchanged animation logic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -right-[200px] -top-[160px] h-[400px] w-[560px] opacity-[0.28] lg:-right-[100px]">
          <FooterArtwork />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-[#080808]/50" />
      </div>

      <div className="relative z-10 h-[2px] bg-white/10">
        <div className="h-full w-24 bg-[#28A45A]" />
      </div>

      <Container className="relative z-10">
        {/* TOP: BRAND + CONTACTS */}
        <div className="grid gap-8 border-b border-white/10 py-8 sm:grid-cols-[0.95fr_1.05fr] sm:gap-10 lg:py-9">
          <FooterReveal>
            <div className="max-w-[400px]">
              <Link
                href="/"
                aria-label={`${event.name} homepage`}
                className="inline-flex"
              >
            <Image
  src="/logos/uganda-logo.png"
  alt={event.name}
  width={900}
  height={320}
  sizes="(min-width: 740px) 320px, 260px"
  className="h-auto w-[260px] object-contain object-left sm:w-[280px] md:w-[320px]"
/>
              </Link>

              <p className="mt-3 max-w-[370px] text-[12px] leading-[1.7] text-white/60">
                {event.descriptor}
              </p>

              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-white/70">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28A45A]" />
                  {event.dates.display}
                </span>

                <span className="hidden text-white/30 sm:inline">
                  /
                </span>

                <span>
                  {event.venue.name}, {event.venue.city}
                </span>
              </p>
            </div>
          </FooterReveal>

          <FooterReveal delay={0.08}>
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
                Event Enquiries
              </p>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                {CONTACTS.map((contact) => (
                  <ContactDetails
                    key={contact.company}
                    contact={contact}
                  />
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80 transition-colors hover:text-[#7ACB58]"
              >
                Contact Our Team
                <ArrowUpRight />
              </Link>
            </div>
          </FooterReveal>
        </div>

        {/* NAVIGATION — reduced vertical spacing */}
        <FooterReveal>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-5 gap-y-6 border-b border-white/10 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-7"
          >
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="font-heading text-[11px] font-bold text-white">
                  {group.title}
                </h3>

                <div className="mt-2 h-[2px] w-5 bg-[#1769A4]" />

                <ul className="mt-3 space-y-2">
                  {group.links?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block text-[11px] leading-[1.5] text-white/55 transition-colors hover:text-white sm:text-[12px]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </FooterReveal>

        {/* ORGANISERS — compact one-row layout */}
        <FooterReveal>
          <div className="flex flex-col gap-4 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7ACB58]">
                Joint Event Organisers
              </p>

              <h3 className="mt-1.5 font-heading text-[12px] font-semibold leading-snug text-white">
                Futurex Trade Fair & Events Pvt. Ltd.
                <span className="mx-2 text-white/30">/</span>
                ETSIPL
              </h3>

              <p className="mt-1 text-[11px] text-white/45">
                Connecting businesses across India and East Africa.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              <a
                href="https://www.futurextrade.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Futurex website"
                className="flex h-[48px] w-[125px] items-center justify-center rounded bg-white px-2.5 py-1.5 transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/logos/futurex-logo.png"
                    alt="Futurex Trade Fair & Events"
                    fill
                    sizes="125px"
                    className="object-contain"
                  />
                </div>
              </a>

              <a
                href="https://www.etsipl.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ETSIPL website"
                className="flex h-[48px] w-[89px] items-center justify-center rounded bg-white p-1.5 transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/logos/etsipl-logo.png"
                    alt="ETSIPL"
                    fill
                    sizes="89px"
                    className="object-contain"
                  />
                </div>
              </a>
            </div>
          </div>
        </FooterReveal>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-relaxed text-white/45">
            &copy; {new Date().getFullYear()} {event.name}.
            {" "}All rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-white/65 transition-[background-color,border-color,color] duration-300 hover:border-[#1769A4] hover:bg-[#1769A4] hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[14px] w-[14px]"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          <span className="text-[10px] font-medium text-white/45">
            {event.websiteDisplay}
          </span>
        </div>
      </Container>
    </footer>
  );
}
