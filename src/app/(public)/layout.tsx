
import type {
  CSSProperties,
  ReactNode,
} from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

const headerStyles = {
  "--header-offset-mobile": "94px",
  "--header-offset-tablet": "112px",
  "--header-offset-desktop": "112px",
} as CSSProperties;

export default function PublicLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        min-w-0
        flex-col
        bg-white
        font-sans
        text-brand-dark
        antialiased
      "
      style={headerStyles}
    >
      {/* ======================================
          GLOBAL HEADER
      ====================================== */}
      <Header />

      {/* ======================================
          MAIN PAGE CONTENT
      ====================================== */}
      <main
        id="main-content"
        tabIndex={-1}
        className="
          relative
          flex
          min-w-0
          flex-1
          flex-col
          bg-white
          outline-none

          pt-[var(--header-offset-mobile)]
          sm:pt-[var(--header-offset-tablet)]
          lg:pt-[var(--header-offset-desktop)]
        "
      >
        {children}
      </main>

      {/* ======================================
          GLOBAL FOOTER
      ====================================== */}
      <Footer />
    </div>
  );
}
