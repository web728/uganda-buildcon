/**
 * Results and supporters of the previous Uganda Buildcon edition.
 * Every figure here is taken from the official 2026 brochure ("Facts & Figures
 * of Previous Edition") or the 2025 Post Show Report. Do not add figures that
 * are not printed in an official document.
 */

export const previousEdition = {
  label: "4th Uganda Buildcon International Expo 2025",
  shortLabel: "2025 Edition",
  dates: "7–9 August 2025",
  venue: "Multi Purpose Hall, UMA Show Grounds, Kampala",
  inaugurated: "7 August 2025",
  source: "Uganda Buildcon 2025 Post Show Report & 2026 brochure",
};

export type HeadlineStat = { numericValue: number; suffix?: string; label: string };

/** Brochure: "Facts & Figures of Previous Edition". */
export const previousEditionStats: HeadlineStat[] = [
  { numericValue: 120, suffix: "+", label: "Exhibiting Brands" },
  { numericValue: 3000, suffix: "+", label: "Trade Visitors" },
  { numericValue: 500, suffix: "+", label: "Products & Services" },
  { numericValue: 8, suffix: "+", label: "Participating Countries" },
];

/** Post Show Report: "Satisfaction Survey". */
export const satisfactionSurvey = [
  { value: "92%", label: "Exhibitor satisfaction" },
  { value: "95%", label: "Visitor satisfaction" },
  { value: "85.1%", label: "Exhibitor engagement rate" },
  { value: "91.2%", label: "Visitor engagement rate" },
];

/** Post Show Report: "Exhibitors Feedback". */
export const exhibitorFeedback = [
  { value: "92%", label: "appreciated the service from the organisers" },
  { value: "88%", label: "were satisfied with the quality of visitors" },
  { value: "67%", label: "were satisfied with the whole expo" },
  { value: "66%", label: "got chances of business after the expo" },
  { value: "63%", label: "chose Uganda Buildcon to build their brand image" },
];

/** Post Show Report: "Visitor's Reason for Attending the Show". */
export const visitorReasons = [
  "Sourcing New Vendors",
  "Purchase New Products & Services",
  "Strengthen relationships with existing suppliers or partners",
  "Promote Products / Services",
  "Attend Workshops / Training Sessions",
];

export type Supporter = {
  name: string;
  role: string;
  logo?: string;
  url?: string;
};

/**
 * Partners shown on ugandabuildcon.com and in the 2025 Post Show Report.
 * Logos are the official files published on ugandabuildcon.com.
 */

export const supporters: Supporter[] = [
  {
    name: "Ministry of Lands, Housing and Urban Development",
    role: "In Partnership With",
    logo: "/images/partners/mlhud.jpg",
    url: "https://mlhud.go.ug/",
  },
  {
    name: "Uganda National Association of Building and Civil Engineering Contractors (UNABCEC)",
    role: "Supported By",
    logo: "/images/partners/unabsec.jpg",
  },
  {
    name: "Uganda Institution of Professional Engineers (UIPE)",
    role: "Supported By",
    logo: "/images/partners/uipe.jpg",
  },
  {
    name: "Engineers Registration Board (ERB)",
    role: "Supported By",
    logo: "/images/partners/erb.jpg",
  },
  {
    name: "Uganda Manufacturers Association (UMA)",
    role: "Supported By",
    logo: "/images/partners/uma.jpg",
  },
  {
    name: "Lanestra",
    role: "Local Partner",
    logo: "/images/partners/lanestra.jpg",
  },
];

/**
 * Organisations and sponsors associated
 * with the 2025 edition.
 */
export const supporters2025: Supporter[] = [
  {
    name: "National Housing",
    role: "2025 Supporter",
  },
  {
    name: "Institution of Surveyors of Uganda",
    role: "2025 Supporter",
  },
  {
    name: "Uganda Society of Architects",
    role: "2025 Supporter",
  },
  {
    name: "GuangRenWood",
    role: "Gold Sponsor 2025",
  },
  {
    name: "Eurofoam",
    role: "Bronze Sponsor 2025",
  },
];
