/**
 * Market statistics used across the site (homepage, Why Uganda).
 * Every entry must carry a source. Figures below are as published in the
 * official Uganda Buildcon 2026 brochure ("Why Uganda?"). Remove an entry
 * rather than publish an unsourced figure.
 */

export type MarketFact = {
  id: string;
  value: string;
  label: string;
  detail?: string;
  period?: string;
  sourceName: string;
  sourceUrl?: string;
  lastVerified: string; // YYYY-MM-DD
};

const BROCHURE_SOURCE = "Uganda Buildcon 2026 brochure";
const BROCHURE_URL = "/downloads/Uganda-Buildcon-Expo-Brochure.pdf";

export const marketFacts: MarketFact[] = [
  {
    id: "gdp-growth",
    value: "6.0%",
    label: "Projected GDP growth",
    detail:
      "Uganda's GDP growth rate is projected to reach 6.0% in the fiscal year 2026, sustaining demand for infrastructure, housing and commercial space.",
    period: "FY 2026",
    sourceName: BROCHURE_SOURCE,
    sourceUrl: BROCHURE_URL,
    lastVerified: "2026-10-09",
  },
  {
    id: "urbanisation",
    value: "26.77%",
    label: "Urbanisation rate and rising",
    detail:
      "With urbanisation now at 26.77% and rising, Uganda faces high demand for residential housing, commercial buildings and urban infrastructure.",
    period: "Current",
    sourceName: BROCHURE_SOURCE,
    sourceUrl: BROCHURE_URL,
    lastVerified: "2026-10-09",
  },
  {
    id: "vision-2040",
    value: "$3 billion+",
    label: "Vision 2040 infrastructure commitment",
    detail:
      "The government's Vision 2040 plan dedicates over $3 billion to infrastructure projects, with the Kampala–Jinja Expressway and hydropower expansions already underway.",
    period: "Vision 2040",
    sourceName: BROCHURE_SOURCE,
    sourceUrl: BROCHURE_URL,
    lastVerified: "2026-10-09",
  },
];

export const opportunityCategories: string[] = [
  "Residential Housing",
  "Commercial Construction",
  "Roads & Expressways",
  "Hydropower & Energy",
  "Urban Infrastructure",
  "Industrial Projects",
  "Hospitality & Health Facilities",
  "Water & Utility Projects",
  "Interior & Finishing Projects",
];

export const keyProjects: string[] = ["Kampala–Jinja Expressway", "Hydropower expansions"];

export const marketSources = [
  { name: "Uganda Buildcon 2026 brochure", url: BROCHURE_URL },
  { name: "Uganda Vision 2040 (National Planning Authority)", url: "https://www.npa.go.ug/" },
  { name: "Uganda Bureau of Statistics", url: "https://www.ubos.org/" },
  { name: "Ministry of Lands, Housing and Urban Development", url: "https://mlhud.go.ug/" },
];
