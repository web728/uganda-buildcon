
import type { ReactNode } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Premium Fixed Header */}
      <Header />

      {/* Main Content - Offset for Fixed Header */}
      <main
        id="main-content"
        className="
          relative
          isolate
          flex
          min-w-0
          flex-1
          flex-col
          overflow-x-clip

          pt-[94px]
          sm:pt-[112px]
          lg:pt-[50px]
        "
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
