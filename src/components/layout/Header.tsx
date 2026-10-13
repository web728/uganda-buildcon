
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { clsx } from "@/lib/utils/clsx";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const previousPathname = useRef(pathname);
  const reduceMotion = useReducedMotion();

  // Header always remains visible, even when scrolling down.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus when the route changes.
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setMobileOpen(false);
      setOpenDropdown(null);
    }
  }, [pathname]);

  // Lock page scrolling while mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMobileOpen(false);
      setOpenDropdown(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleKeyDown]);

  const marqueeItems = [
    {
      badge: "EVENT DATES",
      text: event.dates.display,
      dot: "bg-sky-400",
    },
    {
      badge: "EXPO VENUE",
      text: event.venue.fullLocation,
      dot: "bg-emerald-400",
    },
    {
      badge: "SPACE ALLOCATION",
      text: `${event.editionLabel} · Stand Bookings Open`,
      dot: "bg-cyan-400",
    },
  ];

  const marqueeContent = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {marqueeItems.map((item) => (
        <div
          key={item.badge}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap"
        >
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full",
              "shadow-[0_0_10px_currentColor]",
              item.dot
            )}
          />

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300 sm:text-[11px]">
            {item.badge}
          </span>

          <span className="text-[11px] font-semibold tracking-wide text-white sm:text-xs">
            {item.text}
          </span>

          <span className="ml-5 text-sm text-white/25">
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] w-full",
        "translate-y-0",
        "isolate",
        "transition-[box-shadow,background-color] duration-300",
        isScrolled && "shadow-[0_16px_45px_rgba(0,0,0,0.28)]"
      )}
    >
      {/* Premium announcement ribbon */}
      <div
        className={clsx(
          "relative overflow-hidden",
          "border-b border-white/10",
          "bg-[#061329] text-white",
          "py-2.5",
          "select-none"
        )}
      >
        {/* Decorative top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#061329] to-transparent sm:w-28" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#061329] to-transparent sm:w-28" />

        {/* Continuous marquee */}
        <div className="group flex overflow-hidden">
          <motion.div
            className="flex w-max shrink-0 items-center"
            animate={
              reduceMotion
                ? undefined
                : { x: ["0%", "-50%"] }
            }
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              willChange: reduceMotion ? "auto" : "transform",
            }}
          >
            <div className="flex shrink-0">
              {marqueeContent}
              {marqueeContent}
            </div>

            <div aria-hidden="true" className="flex shrink-0">
              {marqueeContent}
              {marqueeContent}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main glass navigation */}
      <div
        className={clsx(
          "relative w-full",
          "border-b border-white/10",
          "backdrop-blur-2xl",
          "transition-all duration-300",
          isScrolled
            ? "bg-[#081a36]/95 py-2 shadow-[0_12px_36px_rgba(2,8,23,0.22)]"
            : "bg-[#081a36]/90 py-3 sm:py-3.5"
        )}
      >
        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-28 left-1/4 h-44 w-72 rounded-full bg-sky-500/[0.08] blur-3xl" />
          <div className="absolute -top-24 right-1/4 h-40 w-64 rounded-full bg-blue-500/[0.07] blur-3xl" />
        </div>

        <Container className="relative z-10 flex max-w-7xl items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${event.name} home`}
            className={clsx(
              "group relative z-10 flex shrink-0 items-center",
              "rounded-lg",
              "transition-transform duration-300",
              "hover:scale-[1.02]",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-sky-400"
            )}
          >
            <Image
              src="/logos/logo.png"
              alt={event.name}
              width={869}
              height={287}
              priority
              className={clsx(
                "w-auto object-contain object-left",
                "transition-all duration-300",
                isScrolled
                  ? "h-10 sm:h-11 lg:h-14"
                  : "h-11 sm:h-12 lg:h-16"
              )}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            ref={navRef}
            aria-label="Primary Navigation"
            className="hidden min-w-0 items-center justify-center lg:flex"
          >
            <ul
              className={clsx(
                "flex items-center gap-0.5 xl:gap-1",
                "rounded-full",
                "border border-white/[0.14]",
                "bg-white/[0.055]",
                "p-1.5",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_25px_rgba(0,0,0,0.14)]",
                "backdrop-blur-2xl",
                "transition-colors duration-300",
                "hover:border-white/25"
              )}
            >
              {mainNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (
                    item.href !== "/" &&
                    pathname?.startsWith(`${item.href}/`)
                  );

                const hasChildren = Boolean(item.children?.length);
                const isDropdownOpen = openDropdown === item.label;

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
                    onBlur={(e) => {
                      if (
                        !e.currentTarget.contains(
                          e.relatedTarget as Node | null
                        )
                      ) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={clsx(
                          "relative inline-flex items-center",
                          "rounded-full",
                          "px-2.5 py-2 xl:px-3.5",
                          "text-[11px] font-semibold xl:text-xs",
                          "tracking-wide whitespace-nowrap",
                          "transition-all duration-200",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2 focus-visible:ring-sky-400",
                          isActive
                            ? "bg-gradient-to-b from-white/20 to-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                            : "text-slate-200 hover:bg-white/[0.09] hover:text-white"
                        )}
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="true"
                          onClick={() => {
                            setOpenDropdown(
                              isDropdownOpen ? null : item.label
                            );
                          }}
                          className={clsx(
                            "mr-1 flex h-7 w-5 items-center justify-center rounded-full",
                            "text-slate-300 transition-all duration-200",
                            "hover:bg-white/10 hover:text-white",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                            isDropdownOpen && "text-sky-300"
                          )}
                        >
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            className={clsx(
                              "h-3 w-3 transition-transform duration-200",
                              isDropdownOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                          >
                            <path
                              d="M2.5 4.5L6 8L9.5 4.5"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Premium dropdown */}
                    {hasChildren && (
                      <div
                        className={clsx(
                          "absolute left-1/2 top-full z-50",
                          "w-64 -translate-x-1/2 pt-3",
                          "transition-[opacity,transform,visibility] duration-200",
                          isDropdownOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-2 opacity-0"
                        )}
                      >
                        <div
                          className={clsx(
                            "overflow-hidden rounded-2xl",
                            "border border-white/15",
                            "bg-[#091b37]/98",
                            "p-2",
                            "shadow-[0_25px_60px_rgba(0,0,0,0.38)]",
                            "backdrop-blur-2xl"
                          )}
                        >
                          <div className="mb-1 h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

                          {item.children?.map((child) => {
                            const isChildActive =
                              pathname === child.href;

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                aria-current={
                                  isChildActive ? "page" : undefined
                                }
                                className={clsx(
                                  "group/child flex flex-col",
                                  "rounded-xl px-3 py-2.5",
                                  "transition-colors duration-200",
                                  "focus-visible:outline-none",
                                  "focus-visible:ring-2 focus-visible:ring-sky-400",
                                  isChildActive
                                    ? "bg-sky-500/15 text-white"
                                    : "text-slate-200 hover:bg-white/[0.08]"
                                )}
                              >
                                <span
                                  className={clsx(
                                    "text-xs font-semibold tracking-wide",
                                    "transition-colors duration-200",
                                    isChildActive
                                      ? "text-sky-300"
                                      : "text-white group-hover/child:text-sky-300"
                                  )}
                                >
                                  {child.label}
                                </span>

                                {child.description && (
                                  <span className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-400 group-hover/child:text-slate-300">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
            <Button
              href={event.cta.bookStand}
              className={clsx(
                "inline-flex items-center justify-center",
                "rounded-full",
                "bg-gradient-to-r from-[#1674c8] via-[#218de0] to-[#38a5eb]",
                "px-3.5 py-2.5 xl:px-5",
                "text-[10px] font-bold uppercase xl:text-[11px]",
                "tracking-wide whitespace-nowrap text-white",
                "shadow-[0_4px_18px_rgba(28,125,207,0.3)]",
                "transition-all duration-300",
                "hover:-translate-y-0.5",
                "hover:shadow-[0_8px_28px_rgba(28,125,207,0.48)]",
                "active:translate-y-0"
              )}
            >
              Book a Stand
            </Button>

            <Button
              href={event.cta.registerVisit}
              variant="secondary"
              className={clsx(
                "inline-flex items-center justify-center",
                "rounded-full",
                "border border-white/20",
                "bg-white/[0.08]",
                "px-3.5 py-2.5 xl:px-5",
                "text-[10px] font-bold uppercase xl:text-[11px]",
                "tracking-wide whitespace-nowrap text-white",
                "backdrop-blur-xl",
                "transition-all duration-300",
                "hover:-translate-y-0.5",
                "hover:border-emerald-400/50",
                "hover:bg-white/[0.14]",
                "hover:shadow-[0_8px_24px_rgba(16,185,129,0.18)]",
                "active:translate-y-0"
              )}
            >
              Register to Visit
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={clsx(
              "relative flex h-11 w-11 shrink-0 items-center justify-center",
              "rounded-xl",
              "border border-white/20",
              "bg-white/[0.08]",
              "text-white",
              "backdrop-blur-xl",
              "transition-all duration-200",
              "hover:border-white/30 hover:bg-white/[0.14]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
              "lg:hidden"
            )}
          >
            <span className="relative block h-4 w-5">
              <span
                className={clsx(
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white",
                  "transition-all duration-300",
                  mobileOpen && "top-[7px] rotate-45"
                )}
              />

              <span
                className={clsx(
                  "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-white",
                  "transition-all duration-200",
                  mobileOpen && "scale-x-0 opacity-0"
                )}
              />

              <span
                className={clsx(
                  "absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-white",
                  "transition-all duration-300",
                  mobileOpen && "top-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </Container>
      </div>

      {/* Existing mobile menu component */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
