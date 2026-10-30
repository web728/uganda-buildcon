import Image from "next/image";
import Link from "next/link";

import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { FooterReveal } from "./FooterMotion";

const NAV_GROUPS = [
  { title: "Event", links: footerNav.event },
  { title: "Exhibit", links: footerNav.exhibit },
  { title: "Visit", links: footerNav.visit },
  { title: "Information", links: footerNav.information },
  { title: "Legal", links: footerNav.legal },
] as const;

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
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0B0C11] text-white">
      {/* Retain the existing footer illustration, but keep it subtle. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -right-36 top-0 h-[360px] w-[372px] opacity-[0.12] sm:-right-12 sm:h-[440px] sm:w-[456px] lg:right-[3%] lg:-top-8 lg:h-[520px] lg:w-[538px] lg:opacity-[0.16]"
          style={{
            backgroundImage: 'url("/images/footer-artwork.svg")',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-[#1769A4] via-[#1769A4]/40 to-transparent" />

      <Container className="relative z-10">
        {/* Brand and primary action */}
        <div className="grid gap-8 border-b border-white/[0.12] py-9 md:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] md:items-center lg:py-11">
          <FooterReveal>
            <div className="min-w-0">
              <Link href="/" aria-label={`${event.name} homepage`} className="inline-flex items-center">
                <Image
                  src="/logos/uganda-logo.png"
                  alt={event.name}
                  width={900}
                  height={320}
                  sizes="(min-width: 768px) 260px, 215px"
                  className="h-auto w-[215px] object-contain object-left md:w-[260px]"
                />
              </Link>

              <p className="mt-3 max-w-[480px] text-[13px] leading-[1.75] text-white/60">
                An international B2B exhibition connecting manufacturers, suppliers,
                buyers and professionals across the building and construction industries.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] leading-5 text-white/75">
                <span>{event.dates.display}</span>
                <span aria-hidden="true" className="text-white/25">/</span>
                <span>{event.venue.city}, {event.venue.country}</span>
              </div>
            </div>
          </FooterReveal>

          <FooterReveal delay={0.08}>
            <div className="flex flex-col items-start md:items-end md:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7DBBE8]">
                Exhibition Enquiries
              </p>
              <h2 className="mt-2 max-w-[345px] font-heading text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold leading-[1.3] tracking-[-0.025em] text-white">
                Interested in participating?
              </h2>
              <Link
                href="/contact"
                className="group mt-4 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-[#1769A4] px-5 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#105685] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7DBBE8]"
              >
                Contact the Organisers
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">
                  <ArrowUpRight />
                </span>
              </Link>
            </div>
          </FooterReveal>
        </div>

        {/* Navigation */}
        <FooterReveal>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-7 gap-y-7 border-b border-white/[0.12] py-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-9 lg:py-10"
          >
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block text-[12px] leading-[1.6] text-white/55 transition-colors hover:text-[#7DBBE8] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7DBBE8]"
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

        {/* Joint organisers */}
        <FooterReveal>
          <div className="flex flex-col gap-5 border-b border-white/[0.12] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7DBBE8]">
                Joint Organisers
              </p>
              <p className="mt-2 max-w-[490px] text-[12px] leading-[1.7] text-white/65">
                {event.organisers.map((organiser) => organiser.name).join(" and ")}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {event.organisers.map((organiser) => (
                <a
                  key={organiser.name}
                  href={organiser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${organiser.name} website`}
                  className="flex h-[54px] w-[136px] items-center justify-center rounded-md border border-white/10 bg-white px-3 py-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] motion-reduce:transform-none sm:w-[148px]"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={organiser.logo}
                      alt={`${organiser.name} logo`}
                      fill
                      sizes="148px"
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FooterReveal>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] leading-5 text-white/45">
            &copy; {new Date().getFullYear()} {event.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2" aria-label="Social media">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/60 transition-[border-color,color,background-color] hover:border-[#1769A4] hover:bg-[#1769A4] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DBBE8]"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
            <span className="text-[11px] text-white/45">{event.websiteDisplay}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
