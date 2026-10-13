import { event } from "@/config/event";

/** Absolute production origin (no trailing slash), e.g. https://ugandabuildcon.com */
const raw = (process.env.NEXT_PUBLIC_SITE_URL || event.website).trim().replace(/\/$/, "");

export const siteUrl = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
