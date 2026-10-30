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

const BROCHURE_SOURCE = "6th Uganda Buildcon International Expo 2027 Brochure";
const BROCHURE_URL = "/downloads/6th_Uganda_Buildcon_International_Expo_2027_Brochure.pdf";



export const marketFacts: MarketFact[] = [
  {
    id: "gdp-growth",
    value: "6.4%",
    label: "Real GDP Growth",
    detail:
      "Uganda's economy recorded preliminary real GDP growth of 6.4% in FY 2025/26, compared with 6.3% in FY 2024/25.",
    period: "FY 2025/26",
    sourceName: "Uganda Bureau of Statistics",
    sourceUrl:
      "https://www.ubos.org/wp-content/uploads/publications/06_2026Preliminary_GDP_2025-26_June_Release.pdf",
    lastVerified: "2026-10-29",
  },
  {
    id: "urbanisation",
    value: "32%",
    label: "Urban Population",
    detail:
      "Approximately 32% of Uganda's population lived in urban areas in 2025, reflecting the importance of housing, buildings and urban services.",
    period: "2025",
    sourceName: "World Bank",
    sourceUrl:
      "https://data.worldbank.org/indicator/SP.URB.TOTL.IN.ZS?locations=UG",
    lastVerified: "2026-10-29",
  },
  {
    id: "vision-2040",
    value: "2040",
    label: "National Development Vision",
    detail:
      "Uganda Vision 2040 sets out the country's long-term development priorities, including infrastructure, urban development and industrialisation.",
    period: "Uganda Vision 2040",
    sourceName: "National Planning Authority",
    sourceUrl:
      "https://npa.go.ug/uganda-vision-2040/",
    lastVerified: "2026-10-29",
  },
];




export const opportunityCategories: string[] = [
  "Residential Housing",
  "Commercial Buildings",
  "Roads & Transport Infrastructure",
  "Energy & Hydropower Projects",
  "Urban Development",
  "Industrial Buildings",
  "Hospitality & Healthcare Facilities",
  "Water & Utility Infrastructure",
  "Interiors & Building Finishes",
];


export const keyProjects: string[] = ["Kampala–Jinja Expressway", "Hydropower expansions"];

export const marketSources = [
  { name: "Uganda Buildcon 2026 brochure", url: BROCHURE_URL },
  { name: "Uganda Vision 2040 (National Planning Authority)", url: "https://www.npa.go.ug/" },
  { name: "Uganda Bureau of Statistics", url: "https://www.ubos.org/" },
  { name: "Ministry of Lands, Housing and Urban Development", url: "https://mlhud.go.ug/" },
];
