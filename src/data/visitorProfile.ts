export type VisitorGroup = {
  slug: string;
  name: string;
  roles: string[];
};

// Roles below are taken from the "Visitor Profile" page of the official
// Uganda Buildcon brochure, grouped for navigation.
export const visitorGroups: VisitorGroup[] = [
  {
    slug: "architects-engineers-consultants",
    name: "Architects, Engineers & Consultants",
    roles: [
      "Architects and Planners",
      "Engineers",
      "Structural & Civil Engineers",
      "Consulting Engineers",
      "Project Managers and Consultants",
      "Urban Planners and Designers",
      "Interior Design Professionals",
      "Energy Efficiency Experts",
    ],
  },
  {
    slug: "contractors-builders",
    name: "Contractors & Builders",
    roles: [
      "Building Contractors",
      "Contractors and Subcontractors",
      "Builders and Developers",
      "Construction Industry Professionals",
      "Safety and Security Professionals",
    ],
  },
  {
    slug: "developers-investors-owners",
    name: "Developers, Investors & Owners",
    roles: [
      "Builders and Developers",
      "Homeowners and Property Investors",
      "Investors and Financiers",
      "Facility Managers",
      "Hoteliers",
      "Hospitality Industry Professionals",
      "Hospitality & Health Facilities",
    ],
  },
  {
    slug: "trade-distribution",
    name: "Trade & Distribution",
    roles: [
      "Building Material Suppliers",
      "Dealers and Distributors",
      "Importers",
      "Retailers",
      "Sourcing Professionals",
    ],
  },
  {
    slug: "government-institutions",
    name: "Government, Academia & Institutions",
    roles: [
      "Government Agencies / Building Authorities",
      "Universities, Technical & Research Institutes",
      "Academics and Researchers",
      "General Visitors",
    ],
  },
];

// Brochure "Exhibitors": companies specialising in construction materials,
// heavy machinery, green building solutions, engineering services,
// architectural design, finishing, infrastructure software and building tech.
export const whoShouldExhibit: string[] = [
  "Manufacturers",
  "Exporters",
  "International Suppliers",
  "Ugandan Manufacturers",
  "Importers",
  "Distributors",
  "Construction Material Companies",
  "Heavy Machinery Companies",
  "Green Building Solution Providers",
  "Engineering Service Companies",
  "Architectural Design Firms",
  "Interior & Exterior Finishing Companies",
  "Infrastructure Software Providers",
  "Building Technology Providers",
  "Electrical Companies",
  "Plumbing & Sanitary Companies",
  "HVAC & Lift Companies",
  "Steel & Structural Companies",
  "Solar & Renewable Energy Companies",
  "Fire, Safety & Security Companies",
];
