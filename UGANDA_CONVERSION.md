# Uganda Buildcon — Conversion from the Tanzania Buildcon codebase

This site was converted from the Tanzania Buildcon International Expo 2027 codebase
(Next.js 16.3 / React 19.2 / TypeScript / Tailwind v4 / Framer Motion 13 / MongoDB /
Google Sheets / Nodemailer). Architecture, folder structure, components, animation
patterns and the form pipeline were kept; Uganda-specific content, branding, assets
and SEO were applied on top.

## Sources and how conflicts were resolved

| Source | Used for |
|---|---|
| ugandabuildcon.com (checked 9 Oct 2026) | 2027 dates (4–6 August 2027), venue (UMA Show Grounds, Kampala), 6th-edition logo, contacts (incl. Vaibhav Srivastava), partners/supporters and their logos, gallery photos |
| 5th Uganda Buildcon 2026 brochure | Positioning copy, key objectives, "Why Uganda" market figures, exhibitor profile (50+ categories), visitor profile, benefits, organiser text, 2025 facts & figures |
| 4th Uganda Buildcon 2025 Post Show Report | Satisfaction survey, exhibitor feedback, visitor reasons, inauguration photos, 2025 sponsors/supporters |

**Date conflict:** the brochure is for the 5th edition (6–8 Aug 2026), which has already
taken place; the live website lists **4–6 August 2027** and uses a **6th Edition** logo.
The site targets the 2027 / 6th edition — **4–6 August 2027 confirmed by the client on
9 Oct 2026.** All event facts live in `src/config/event.ts`.

The live site also has inconsistencies of its own (a 2025 page title, a
"© 2023 Kenya Buildcon" footer, empty stat counters) — those were not carried over.

## Branding (sampled from brochure/PSR pixels and the official logo)

| Token | Value | Origin |
|---|---|---|
| `brand-blue-dark` | `#0c4e78` | "UGANDA" wordmark, date chips |
| `brand-navy` | `#123472` | headings, contact panels |
| `brand-blue` | `#1f6fae` | lifted ocean blue (legible on white and navy) |
| `brand-green` / `-dark` | `#3cb44e` / `#2a9048` | highlights, bullets |
| `brand-lime` | `#72c448` | decorative wedges |
| dark sections | `#081a36` | navy replacing Tanzania's near-black |

## Notable changes

- New: `src/data/previousEdition.ts`, `src/data/galleryFallback.ts`,
  `src/lib/utils/siteUrl.ts`, `PreviousEditionSection` (2025 results on the homepage).
- Route `/why-tanzania` → `/why-uganda`; Tanzania components renamed accordingly.
- Reference IDs `TB*` → `UB*` (`UBEX`, `UBVR`, `UBPT`, `UBCN`); Mongo field
  `existingBusinessInTanzania` → `existingBusinessInUganda`; default DB `uganda_buildcon`.
- Partners, gallery and downloads show official Uganda content when the CMS is empty.
- `scripts/setup-sheets.mjs` now creates the "Website Enquiries" tab the app writes to.

### Pre-existing issues fixed during conversion

- Exhibitor emails were sent without a `referenceId` (subjects read "undefined").
- User-submitted values were inserted into email HTML unescaped.
- Several CTAs linked to `/book-stand` (404); two heroes used a missing image.
- The homepage showed invented placeholder exhibitors.
- Forms were permanently disabled when no reCAPTCHA site key was set.
- Market counters re-rounded figures (e.g. 26.77% displayed as 26.8%).
- Root `canonical: "/"` leaked into pages without their own canonical;
  `robots.txt` blocked `/_next/`; Event JSON-LD was duplicated; the loader added a second `<h1>`.
- Sector icon map keys did not match the sector slugs.
- Framer Motion SVG `d`/`r` console errors; React-compiler lint errors; dead code
  flagged by lint (lint now reports 0 errors and 1 informational warning about
  react-hook-form's `watch()` and the React Compiler).
- Contact page lists all three organiser contacts shown on ugandabuildcon.com.

## Open items

1. Uganda credentials: MongoDB Atlas, Google service account + Uganda sheet
   (`npm run setup:sheets`), Gmail sender, `FORM_NOTIFICATION_EMAIL_1/2`, a reCAPTCHA
   key registered for ugandabuildcon.com, `AUTH_SECRET`, and an admin seed.
2. Live integration tests (Mongo save, Sheets row, both notification inboxes) once those exist.
3. Confirm the 2027 hall within UMA Show Grounds and daily opening times (dates confirmed).
4. Market figures are as printed in the brochure, which gives no primary source.
5. Add Search Console verification (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and social URLs.
