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
  { title: "Legal & Desk", links: footerNav.legal },
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#06172a] text-white">
      {/* Your exact uploaded artwork is packaged as an SVG asset.
          Its original pixels are embedded to preserve the design precisely. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -right-36 top-0 h-[360px] w-[372px] opacity-25 sm:-right-10 sm:h-[460px] sm:w-[476px] lg:right-[3%] lg:top-[-20px] lg:h-[520px] lg:w-[538px] lg:opacity-40"
          style={{
            backgroundImage: 'url("/images/footer-artwork.svg")',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06172a] via-[#06172a]/80 to-[#06172a]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/80 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 h-[2px] bg-gradient-to-r from-[#28A45A] via-[#1769A4] to-transparent" />

      <Container className="relative z-10">
        {/* Brand + CTA: consistent vertical alignment, tighter spacing */}
        <div className="grid gap-x-10 gap-y-6 border-b border-white/10 py-7 md:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] md:items-center lg:py-9">
          <FooterReveal>
            <div className="min-w-0">
              <Link href="/" aria-label={`${event.name} homepage`} className="inline-flex items-center">
                <Image src="/logos/uganda-logo.png" alt={event.name} width={900} height={320}
                  sizes="(min-width: 768px) 270px, 230px"
                  className="block h-auto w-[230px] object-contain object-left md:w-[270px]" />
              </Link>
              <p className="mt-2 max-w-[440px] text-[12px] leading-[1.65] tracking-normal text-white/65 sm:text-[13px]">
                {event.descriptor}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] leading-5 tracking-normal text-white/75 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#72CE67]" />
                  {event.dates.display}
                </span>
                <span aria-hidden="true" className="hidden text-white/25 sm:inline">/</span>
                <span>{event.venue.name}, {event.venue.city}</span>
              </div>
            </div>
          </FooterReveal>
          <FooterReveal delay={0.08}>
            <div className="flex min-w-0 flex-col items-start md:items-end md:text-right">
              <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#83D46A]">
                Be part of the event
              </p>
              <h2 className="mt-1.5 max-w-[370px] font-heading text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-[24px] lg:text-[27px]">
                Explore opportunities. Build connections.
              </h2>
              <Link href="/contact"
                className="group mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#28A45A] px-5 py-2 text-[12px] font-semibold leading-5 tracking-normal text-white transition-colors hover:bg-[#22894d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Get in touch <ArrowUpRight />
              </Link>
            </div>
          </FooterReveal>
        </div>

        <FooterReveal>
          <nav aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-5 gap-y-5 border-b border-white/10 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-7 lg:py-7">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="font-heading text-[12px] font-semibold leading-5 tracking-normal text-white">
                  {group.title}
                </h3>
                <div aria-hidden="true" className="mt-1.5 h-[2px] w-5 bg-[#28A45A]" />
                <ul className="mt-2.5 space-y-1.5">
                  {group.links?.map((item) => (
                    <li key={item.href} className="leading-5">
                      <Link href={item.href}
                        className="inline-block text-[12px] leading-5 tracking-normal text-white/65 transition-colors hover:text-[#83D46A]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </FooterReveal>

        <FooterReveal>
          <div className="flex flex-col gap-3 border-b border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-[#83D46A]">
                Joint Event Organisers
              </p>
              <h3 className="mt-1 font-heading text-[12px] font-semibold leading-5 tracking-normal text-white sm:text-[13px]">
                Futurex Trade Fair &amp; Events Pvt. Ltd.
                <span className="mx-2 text-white/30">/</span>
                ETSIPL
              </h3>
              <p className="mt-0.5 text-[11px] leading-[1.5] text-white/55">
                Connecting businesses across India and East Africa.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a href="https://www.futurextrade.com/" target="_blank" rel="noopener noreferrer"
                aria-label="Futurex website" className="flex h-[43px] w-[112px] items-center justify-center rounded bg-white px-2 py-1 transition-transform hover:-translate-y-0.5 motion-reduce:transform-none">
                <div className="relative h-full w-full">
                  <Image src="/logos/futurex-logo.png" alt="Futurex Trade Fair & Events" fill sizes="112px" className="object-contain" />
                </div>
              </a>
              <a href="https://www.etsipl.in/" target="_blank" rel="noopener noreferrer"
                aria-label="ETSIPL website" className="flex h-[43px] w-[80px] items-center justify-center rounded bg-white p-1 transition-transform hover:-translate-y-0.5 motion-reduce:transform-none">
                <div className="relative h-full w-full">
                  <Image src="/logos/etsipl-logo.png" alt="ETSIPL" fill sizes="80px" className="object-contain" />
                </div>
              </a>
            </div>
          </div>
        </FooterReveal>

        <div className="flex flex-col gap-2.5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-[11px] leading-5 tracking-normal text-white/50">
            &copy; {new Date().getFullYear()} {event.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer"
                aria-label={social.label} title={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-[#28A45A] hover:bg-[#28A45A] hover:text-white">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
          <span className="text-[11px] leading-5 text-white/50">{event.websiteDisplay}</span>
        </div>
      </Container>
    </footer>
  );
}
