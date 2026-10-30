export interface SectorItem {
  name: string;
  slug: string;
  subcategories: string[];
}

// Product categories adapted from the exhibitor profile supplied for the exhibition.
// These describe the exhibition's scope; they do not indicate confirmed exhibitors.
export const exhibitionSectors: SectorItem[] = [
  {
    name: "Building Materials",
    slug: "building-materials",
    subcategories: [
      "Cement & Steel",
      "Concrete Blocks & Block-Making Machinery",
      "Gypsum Boards",
      "Lightweight Building Materials",
      "Roofing & Façade Materials",
      "Timber & Wood Products",
    ],
  },
  {
    name: "Construction Machinery & Equipment",
    slug: "construction-machinery-equipment",
    subcategories: [
      "Earthmoving Machinery",
      "Demolition Equipment",
      "Quarrying & Mining Equipment",
      "Construction Tools & Measuring Equipment",
      "Formwork & Scaffolding",
      "Surveying Instruments",
    ],
  },
  {
    name: "Structural Systems & Prefabrication",
    slug: "structural-engineering-prefab",
    subcategories: [
      "Structural Engineering Services",
      "Structural Steel Fabrication",
      "Prefabricated Structures",
      "Modular Building Systems",
      "Aluminium Extrusions",
    ],
  },
  {
    name: "Doors, Windows, Glass & Hardware",
    slug: "doors-windows-glass-hardware",
    subcategories: [
      "Doors & Windows",
      "Architectural Glass",
      "Decorative Glass & Mirrors",
      "Architectural Hardware",
      "uPVC Profiles & Machinery",
    ],
  },
  {
    name: "Construction Chemicals & Coatings",
    slug: "construction-chemicals-paints-coatings",
    subcategories: [
      "Construction Chemicals",
      "Waterproofing Products",
      "Adhesives & Sealants",
      "Paints & Protective Coatings",
    ],
  },
  {
    name: "Tiles, Stone & Flooring",
    slug: "tiles-marble-stone-flooring",
    subcategories: [
      "Tiles & Sanitaryware",
      "Marble & Natural Stone",
      "Flooring Materials",
      "Wall Coverings",
      "Industrial Flooring Systems",
    ],
  },
  {
    name: "Interiors, Kitchens & Bathrooms",
    slug: "interiors-kitchen-bath",
    subcategories: [
      "Interior Finishes & Décor",
      "Kitchen & Bathroom Products",
      "Plumbing Fixtures & Fittings",
      "Acoustic & Soundproofing Products",
      "Noise Control Solutions",
      "Outdoor Furniture & Landscaping",
    ],
  },
  {
    name: "Electrical, Lighting & Power",
    slug: "electrical-lighting-power",
    subcategories: [
      "Electrical Equipment & Components",
      "Wires & Cables",
      "Switches & Switchgear",
      "LED & Architectural Lighting",
      "Batteries & Generators",
    ],
  },
  {
    name: "HVAC, Lifts & Building Automation",
    slug: "hvac-lifts-automation",
    subcategories: [
      "Air Conditioning & HVAC Systems",
      "Lifts & Elevators",
      "Building Automation Systems",
      "Home Automation Solutions",
    ],
  },
  {
    name: "Fire Safety & Security",
    slug: "fire-safety-security",
    subcategories: [
      "Fire Detection & Protection Systems",
      "Passive Fire Protection",
      "Safety & Security Solutions",
    ],
  },
  {
    name: "Renewable Energy Systems",
    slug: "renewable-green-energy",
    subcategories: [
      "Renewable Energy Equipment",
      "Solar Power Products",
      "Wind Energy Products",
      "Other Green Energy Solutions",
    ],
  },
  {
    name: "Construction Technology & Software",
    slug: "construction-technology-software",
    subcategories: [
      "Building Information Modelling (BIM)",
      "Infrastructure Design Software",
      "Construction Waste Management",
    ],
  },
];
