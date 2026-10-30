
import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils/siteUrl";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { getPublishedNews } from "@/lib/data/news";

/**
 * Refresh sitemap data every hour.
 * Avoid rebuilding it on every request.
 */
export const revalidate = 3600;

/**
 * Canonical website origin.
 * Prevents double slashes in generated URLs.
 */
const BASE_URL = String(siteUrl).replace(/\/+$/, "");

const absoluteUrl = (path: string): string => {
  if (path === "/") return `${BASE_URL}/`;

  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

/**
 * Static public pages.
 *
 * Only include routes that actually exist,
 * are indexable, and use these canonical URLs.
 */
const STATIC_ROUTES = [
  // Main pages
  "/",
  "/about",
  "/why-uganda",
  "/venue",
  "/organisers",
  "/partners",

  // Exhibitor pages
  "/exhibit",
  "/exhibition-profile",
  "/exhibitors",
  "/book-a-stand",

  // Visitor pages
  "/visit",
  "/visitor-profile",
  "/register-to-visit",

  // Media and resources
  "/news",
  "/gallery",
  "/downloads",

  // Contact
  "/contact",

  // Legal pages
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
] as const;

/**
 * Safely convert a real content timestamp
 * into a valid Date.
 *
 * Never substitute the current time when a
 * modification date is unknown.
 */
function parseDate(value: unknown): Date | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (
    typeof value !== "string" &&
    typeof value !== "number" &&
    !(value instanceof Date)
  ) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  // Avoid publishing future last-modified dates.
  if (date.getTime() > Date.now()) {
    return undefined;
  }

  return date;
}

/**
 * Validate dynamic route segments before
 * adding them to the sitemap.
 */
function isValidSlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value !== "." &&
    value !== ".." &&
    !value.includes("/") &&
    !value.includes("\\") &&
    !value.includes("?") &&
    !value.includes("#")
  );
}

/**
 * Remove duplicate URLs.
 */
function uniqueEntries(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * Fetch only published exhibitors and news.
   * If one query fails, the other can still work.
   */
  const [exhibitorResult, newsResult] = await Promise.allSettled([
    getPublishedExhibitors(),
    getPublishedNews(),
  ]);

  const exhibitors =
    exhibitorResult.status === "fulfilled"
      ? exhibitorResult.value
      : [];

  const news =
    newsResult.status === "fulfilled"
      ? newsResult.value
      : [];

  /**
   * 1. Static pages
   *
   * Omit lastModified until a reliable
   * modification date is available.
   */
  const staticEntries: MetadataRoute.Sitemap =
    STATIC_ROUTES.map((path) => ({
      url: absoluteUrl(path),
    }));

  /**
   * 2. Published exhibitor profiles
   */
  const exhibitorEntries: MetadataRoute.Sitemap =
    exhibitors
      .filter((exhibitor) => isValidSlug(exhibitor.slug))
      .map((exhibitor) => ({
        url: absoluteUrl(
          `/exhibitors/${encodeURIComponent(exhibitor.slug)}`
        ),
      }));

  /**
   * 3. Published news articles
   *
   * Use the real publication timestamp as
   * a fallback only when updatedAt is absent.
   */
  const newsEntries: MetadataRoute.Sitemap =
    news
      .filter((article) => isValidSlug(article.slug))
      .map((article) => {
        const updatedAt = (
          article as typeof article & {
            updatedAt?: unknown;
          }
        ).updatedAt;

        const lastModified =
          parseDate(updatedAt) ??
          parseDate(article.publishedAt);

        return {
          url: absoluteUrl(
            `/news/${encodeURIComponent(article.slug)}`
          ),
          ...(lastModified ? { lastModified } : {}),
        };
      });

  /**
   * 4. Combined sitemap
   */
  return uniqueEntries([
    ...staticEntries,
    ...exhibitorEntries,
    ...newsEntries,
  ]);
}
