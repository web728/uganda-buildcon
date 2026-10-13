"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";
import {
  previousEdition,
  satisfactionSurvey,
  exhibitorFeedback,
} from "@/data/previousEdition";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const PHOTOS = [
  { src: "/images/gallery/inauguration-2025-stage.jpg", alt: "Inaugural ceremony of the 4th Uganda Buildcon International Expo, 7 August 2025, UMA Show Grounds" },
  { src: "/images/gallery/exhibition-hall-walkthrough.jpg", alt: "Guests touring exhibitor stands in the Uganda Buildcon exhibition hall" },
  { src: "/images/gallery/roofing-exhibitor-stand.jpg", alt: "Exhibitor presenting roofing products to visitors at Uganda Buildcon" },
];

export function PreviousEditionSection() {
  return (
    <section
      aria-labelledby="previous-edition-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-24 text-slate-900 border-b border-slate-200/80"
    >
      {/* Modern Grid Blueprint Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 w-full">
        {/* Header Bar Layout */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/5 px-3.5 py-1">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green-dark">
                Post Show Report &bull; {previousEdition.dates}
              </span>
            </div>

            <h2
              id="previous-edition-heading"
              className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Results from the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-green">
                2025 Edition
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              The {previousEdition.label} was inaugurated on {previousEdition.inaugurated} at {previousEdition.venue}. Here is what exhibitors and visitors reported.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={event.downloads.postShowReport}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-md active:scale-95"
            >
              Post Show Report (PDF)
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:bg-brand-blue-dark active:scale-95"
            >
              View Gallery
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 grid gap-6 lg:grid-cols-12"
        >
          {/* Satisfaction survey tiles */}
          <motion.div variants={itemVariants} className="lg:col-span-5 grid grid-cols-2 gap-4">
            {satisfactionSurvey.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col justify-between rounded-2xl p-5 text-white shadow-sm ${
                  idx === 0 || idx === 3 ? "bg-brand-navy" : "bg-brand-green-dark"
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums">{item.value}</span>
                <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Exhibitor feedback list */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-7"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Exhibitor Feedback
            </span>
            <ul className="mt-4 space-y-3.5">
              {exhibitorFeedback.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="w-14 shrink-0 text-lg font-extrabold tabular-nums text-brand-blue-dark">
                    {item.value}
                  </span>
                  <div className="flex-1">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-600">of exhibitors {item.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Photo strip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-6 grid gap-4 sm:grid-cols-3"
        >
          {PHOTOS.map((photo) => (
            <motion.figure
              key={photo.src}
              variants={itemVariants}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
