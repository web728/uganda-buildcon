
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { clsx } from "@/lib/utils/clsx";

/* =========================================================
   PREMIUM SVG ICONS
========================================================= */

function ArrowUpRightIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRightIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ChevronDownIcon({
  open = false,
}: {
  open?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(
        "h-3.5 w-3.5 shrink-0",
        "transition-transform duration-300 ease-premium",
        open && "rotate-180"
      )}
    >
      <path d="m5 7 5 5 5-5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MenuIcon({
  open,
}: {
  open: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-5 w-6"
    >
      <span
        className={clsx(
          "absolute left-0 top-[3px] h-[2px] w-6 rounded-full bg-current",
          "transition-all duration-300 ease-premium",
          open && "top-[9px] rotate-45"
        )}
      />

      <span
        className={clsx(
          "absolute left-0 top-[9px] h-[2px] w-6 rounded-full bg-current",
          "transition-all duration-200 ease-premium",
          open && "scale-x-0 opacity-0"
        )}
      />

      <span
        className={clsx(
          "absolute left-0 top-[15px] h-[2px] w-6 rounded-full bg-current",
          "transition-all duration-300 ease-premium",
          open && "top-[9px] -rotate-45"
        )}
      />
    </span>
  );
}

/* =========================================================
   HEADER COMPONENT
========================================================= */

export function Header() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<
    string | null
  >(null);

  const navRef = useRef<HTMLElement>(null);
  const previousPathname = useRef(pathname);

  /* -------------------------------------------------------
     SCROLL DETECTION
     Header remains fixed with constant height.
  ------------------------------------------------------- */

  useEffect(() => {
    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 16);
        animationFrame = 0;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  /* -------------------------------------------------------
     CLOSE MENUS AFTER NAVIGATION
  ------------------------------------------------------- */

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setMobileOpen(false);
      setOpenDropdown(null);
    }
  }, [pathname]);

  /* -------------------------------------------------------
     LOCK SCROLL FOR MOBILE MENU
  ------------------------------------------------------- */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* -------------------------------------------------------
     CLOSE DROPDOWNS / MOBILE MENU
  ------------------------------------------------------- */

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [closeMenus]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] w-full",
        "bg-white",
        "transition-shadow duration-300 ease-premium",
        isScrolled
          ? "shadow-[0_10px_35px_rgba(16,43,78,0.09)]"
          : "shadow-none"
      )}
    >
      {/* ===================================================
          01. PREMIUM BRAND BLUE TOP STRIP

          Matches Book a Stand primary button.
          Fixed height: 30px
      =================================================== */}

      <div
        className="
          relative
          flex
          h-[30px]
          items-center
          overflow-hidden
          border-b
          border-white/15
          bg-brand-blue
          text-white
        "
      >
        <Container
          className="
            flex
            w-full
            items-center
            justify-between
            gap-4
          "
        >
          {/* DATE + VENUE */}
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
              text-[10px]
              font-medium
              text-white
              sm:gap-4
              sm:text-[11px]
            "
          >
            <span className="inline-flex shrink-0 items-center gap-2">
              <CalendarIcon />
              <span>{event.dates.display}</span>
            </span>

            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-white/35 sm:block"
            />

            <span
              className="
                hidden
                min-w-0
                items-center
                gap-2
                sm:inline-flex
              "
            >
              <MapPinIcon />

              <span className="truncate">
                {event.venue.fullLocation}
              </span>
            </span>
          </div>

          {/* EDITION */}
          <div
            className="
              hidden
              shrink-0
              items-center
              gap-2
              lg:flex
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9F0C0]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white
              "
            >
              {event.editionLabel}
            </span>
          </div>
        </Container>
      </div>

      {/* ===================================================
          02. LIGHT MINIMAL NAVBAR

          Mobile: 64px
          Tablet/Desktop: 82px

          Total header height:
          Mobile 94px
          Tablet/Desktop 112px
      =================================================== */}

      <div
        className={clsx(
          "relative h-16 border-b sm:h-[82px]",
          "transition-[background-color,border-color] duration-300",
          isScrolled
            ? "border-brand-border bg-white/95 backdrop-blur-xl"
            : "border-[#E8EDF2] bg-white"
        )}
      >
        <Container
          className="
            relative
            flex
            h-full
            w-full
            items-center
            justify-between
            gap-3
          "
        >
          {/* ==============================================
              LOGO
          ============================================== */}

          <Link
            href="/"
            aria-label={`${event.name} — Home`}
            className="
              group
              relative
              z-10
              flex
              shrink-0
              items-center
              rounded-md
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-brand-green
            "
          >
            <Image
              src="/logos/uganda-buildcon-logo.png"
              alt={event.name}
              width={869}
              height={287}
              priority
              sizes="(min-width: 1280px) 185px, (min-width: 640px) 160px, 135px"
              className="
                h-auto
                w-[135px]
                object-contain
                object-left
                transition-transform
                duration-300
                ease-premium
                group-hover:scale-[1.025]
                motion-reduce:transform-none
                sm:w-[160px]
                lg:w-[145px]
                xl:w-[185px]
              "
            />
          </Link>

          {/* ==============================================
              DESKTOP NAVIGATION
              Plain text, no boxes or pill wrapper
          ============================================== */}

          <nav
            ref={navRef}
            aria-label="Primary navigation"
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center
              lg:flex
            "
          >
            <ul
              className="
                flex
                min-w-0
                items-center
                justify-center
                gap-0
                xl:gap-1.5
              "
            >
              {mainNav.map((item) => {
                const hasChildren = Boolean(
                  item.children?.length
                );

                const isParentActive =
                  pathname === item.href ||
                  (
                    item.href !== "/" &&
                    pathname?.startsWith(`${item.href}/`)
                  );

                const isChildActive = Boolean(
                  item.children?.some(
                    (child) =>
                      pathname === child.href ||
                      (
                        child.href !== "/" &&
                        pathname?.startsWith(
                          `${child.href}/`
                        )
                      )
                  )
                );

                const isActive =
                  isParentActive || isChildActive;

                const isOpen =
                  openDropdown === item.label;

                const dropdownId = `nav-dropdown-${
                  item.href
                    .replace(/[^a-zA-Z0-9]/g, "-")
                    .replace(/^-+|-+$/g, "") || "home"
                }`;

                return (
                  <li
                    key={item.href}
                    className="group relative shrink-0"
                    onMouseEnter={() => {
                      if (hasChildren) {
                        setOpenDropdown(item.label);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hasChildren) {
                        setOpenDropdown(null);
                      }
                    }}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget as Node | null
                        )
                      ) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    {/* PARENT NAV ITEM */}
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={
                          isActive ? "page" : undefined
                        }
                        onClick={() =>
                          setOpenDropdown(null)
                        }
                        className={clsx(
                          "relative inline-flex h-11 items-center",
                          "whitespace-nowrap px-1.5 py-2",
                          "font-sans text-[11px] font-semibold",
                          "tracking-[0.005em]",
                          "transition-colors duration-300 ease-premium",
                          "xl:px-2.5 xl:text-[12px]",
                          "focus-visible:outline-2",
                          "focus-visible:outline-brand-green",
                          isActive
                            ? "text-brand-blue"
                            : "text-brand-navy hover:text-brand-blue"
                        )}
                      >
                        {item.label}

                        {/* MINIMAL GREEN ACTIVE UNDERLINE */}
                        <span
                          aria-hidden="true"
                          className={clsx(
                            "absolute bottom-[4px] left-1.5 right-1.5",
                            "h-[2px] rounded-full bg-brand-green",
                            "origin-center transition-transform duration-300 ease-premium",
                            "xl:left-2.5 xl:right-2.5",
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          )}
                        />
                      </Link>

                      {/* DROPDOWN TOGGLE */}
                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={isOpen}
                          aria-controls={dropdownId}
                          aria-haspopup="true"
                          onClick={() => {
                            setOpenDropdown(
                              isOpen ? null : item.label
                            );
                          }}
                          className={clsx(
                            "mr-0.5 flex h-9 w-4 items-center justify-center",
                            "text-brand-body",
                            "transition-colors duration-300",
                            "hover:text-brand-blue",
                            "focus-visible:outline-2",
                            "focus-visible:outline-brand-green",
                            isOpen && "text-brand-blue"
                          )}
                        >
                          <ChevronDownIcon open={isOpen} />
                        </button>
                      )}
                    </div>

                    {/* ======================================
                        MINIMAL PREMIUM DROPDOWN
                    ====================================== */}

                    {hasChildren && (
                      <div
                        id={dropdownId}
                        aria-hidden={!isOpen}
                        className={clsx(
                          "absolute left-1/2 top-full z-50",
                          "w-[282px] -translate-x-1/2 pt-3",
                          "transition-[opacity,transform,visibility] duration-300 ease-premium",
                          "motion-reduce:transform-none",
                          isOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-2 opacity-0"
                        )}
                      >
                        <div
                          className="
                            overflow-hidden
                            rounded-xl
                            border
                            border-brand-border
                            bg-white
                            p-2
                            shadow-[0_22px_60px_rgba(16,43,78,0.13)]
                          "
                        >
                          {/* DROPDOWN HEADING */}
                          <div className="px-3 pb-3 pt-2">
                            <p
                              className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-brand-green
                              "
                            >
                              Explore
                            </p>

                            <p
                              className="
                                mt-1
                                font-heading
                                text-sm
                                font-semibold
                                text-brand-navy
                              "
                            >
                              {item.label}
                            </p>
                          </div>

                          <div className="mx-3 h-px bg-brand-border" />

                          {/* DROPDOWN LINKS */}
                          <div className="py-1">
                            {item.children?.map((child) => {
                              const childActive =
                                pathname === child.href ||
                                (
                                  child.href !== "/" &&
                                  pathname?.startsWith(
                                    `${child.href}/`
                                  )
                                );

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  tabIndex={
                                    isOpen ? 0 : -1
                                  }
                                  aria-current={
                                    childActive
                                      ? "page"
                                      : undefined
                                  }
                                  onClick={() =>
                                    setOpenDropdown(null)
                                  }
                                  className={clsx(
                                    "group/child flex items-center justify-between gap-3",
                                    "rounded-lg px-3 py-3",
                                    "transition-[background-color,color] duration-300",
                                    "focus-visible:outline-2",
                                    "focus-visible:outline-brand-green",
                                    childActive
                                      ? "bg-[#EFF6FB] text-brand-blue"
                                      : "text-brand-navy hover:bg-[#F6F9FC] hover:text-brand-blue"
                                  )}
                                >
                                  {/* LINK CONTENT */}
                                  <span className="min-w-0 flex-1">
                                    <span
                                      className="
                                        block
                                        text-[12px]
                                        font-semibold
                                        leading-5
                                      "
                                    >
                                      {child.label}
                                    </span>

                                    {child.description && (
                                      <span
                                        className="
                                          mt-1
                                          block
                                          text-[11px]
                                          leading-[1.6]
                                          text-brand-body
                                        "
                                      >
                                        {child.description}
                                      </span>
                                    )}
                                  </span>

                                  {/* SUBTLE SVG ARROW */}
                                  <span
                                    className={clsx(
                                      "shrink-0 text-brand-green",
                                      "transition-[opacity,transform] duration-300 ease-premium",
                                      "group-hover/child:translate-x-0.5",
                                      "group-focus-visible/child:opacity-100",
                                      childActive
                                        ? "opacity-100"
                                        : "opacity-0 group-hover/child:opacity-100"
                                    )}
                                  >
                                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ==============================================
              DESKTOP CTA BUTTONS
          ============================================== */}

          <div
            className="
              hidden
              shrink-0
              items-center
              gap-2
              lg:flex
            "
          >
            {/* PRIMARY CTA */}
            <Link
              href={event.cta.bookStand}
              className="
                group
                inline-flex
                min-h-10
                items-center
                justify-center
                gap-2
                whitespace-nowrap
                rounded-lg
                bg-brand-blue
                px-3
                py-2.5
                font-sans
                text-[10px]
                font-bold
                text-white
                shadow-[0_5px_16px_rgba(23,105,164,0.16)]
                transition-[background-color,transform,box-shadow]
                duration-300
                ease-premium
                hover:-translate-y-0.5
                hover:bg-brand-blue-dark
                hover:shadow-[0_12px_26px_rgba(23,105,164,0.2)]
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-brand-green
                motion-reduce:transform-none
                xl:px-4
                xl:text-[11px]
              "
            >
              Book a Stand

              <span
                className="
                  transition-transform
                  duration-300
                  ease-premium
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  motion-reduce:transform-none
                "
              >
                <ArrowUpRightIcon />
              </span>
            </Link>

            {/* SECONDARY CTA */}
            <Link
              href={event.cta.registerVisit}
              className="
                group
                inline-flex
                min-h-10
                items-center
                justify-center
                gap-2
                whitespace-nowrap
                rounded-lg
                border
                border-brand-border
                bg-white
                px-3
                py-2.5
                font-sans
                text-[10px]
                font-bold
                text-brand-navy
                transition-[border-color,color,transform,box-shadow]
                duration-300
                ease-premium
                hover:-translate-y-0.5
                hover:border-brand-green
                hover:text-brand-blue
                hover:shadow-[0_8px_22px_rgba(16,43,78,0.07)]
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-brand-green
                motion-reduce:transform-none
                xl:px-4
                xl:text-[11px]
              "
            >
              Register to Visit

              <span
                className="
                  transition-transform
                  duration-300
                  ease-premium
                  group-hover:translate-x-1
                  motion-reduce:transform-none
                "
              >
                <ArrowRightIcon />
              </span>
            </Link>
          </div>

          {/* ==============================================
              MOBILE / TABLET MENU TOGGLE
          ============================================== */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);
            }}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-brand-border
              bg-white
              text-brand-navy
              transition-[background-color,border-color,color]
              duration-300
              ease-premium
              hover:border-brand-blue/40
              hover:bg-brand-light
              hover:text-brand-blue
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-brand-green
              lg:hidden
            "
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </Container>
      </div>

      {/* ===================================================
          03. EXISTING MOBILE MENU

          Keep same props and current functionality.
      =================================================== */}

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
