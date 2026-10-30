
export type VisitorGroup = {
  slug: string;
  name: string;
  roles: string[];
};

/**
 * Visitor profiles for the
 * 6th Uganda Buildcon International Expo 2027.
 *
 * Based on the official exhibition brochure,
 * with overlapping roles consolidated and
 * category names standardised.
 *
 * Existing slugs are preserved for compatibility
 * with visitor group icons and page components.
 */

export const visitorGroups: VisitorGroup[] = [
  {
    slug: "architects-engineers-consultants",
    name: "Architects, Engineers & Consultants",
    roles: [
      "Architects & Building Designers",
      "Civil & Structural Engineers",
      "Consulting Engineers",
      "Urban Planners",
      "Interior Designers",
      "Project Managers & Consultants",
      "Energy Efficiency Specialists",
    ],
  },
  {
    slug: "contractors-builders",
    name: "Contractors & Builders",
    roles: [
      "Building Contractors",
      "Civil Engineering Contractors",
      "Specialist Contractors & Subcontractors",
      "Builders & Construction Professionals",
      "Construction Safety Professionals",
    ],
  },
  {
    slug: "developers-investors-owners",
    name: "Developers, Investors & Property Owners",
    roles: [
      "Property Developers",
      "Real Estate Investors",
      "Property Owners & Homeowners",
      "Investors & Financiers",
      "Facility & Property Managers",
      "Hotel Owners & Hospitality Developers",
      "Healthcare Facility Developers",
    ],
  },
  {
    slug: "trade-distribution",
    name: "Trade Buyers & Distributors",
    roles: [
      "Building Material Buyers & Suppliers",
      "Importers",
      "Wholesalers & Distributors",
      "Building Product Dealers & Retailers",
      "Procurement & Sourcing Professionals",
    ],
  },
  {
    slug: "government-institutions",
    name: "Government & Institutions",
    roles: [
      "Government Agencies & Building Authorities",
      "Infrastructure & Urban Development Bodies",
      "Universities & Technical Institutions",
      "Research Institutions",
      "Academics & Researchers",
    ],
  },
];
