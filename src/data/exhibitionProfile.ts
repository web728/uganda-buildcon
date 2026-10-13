export interface SectorItem {
  name: string;
  slug: string;
  subcategories: string[];
}

// Every subcategory below is taken from the "Exhibitor Profile" page of the
// official Uganda Buildcon brochure, grouped into sectors for navigation.
export const exhibitionSectors: SectorItem[] = [
  {
    name: "Building Materials",
    slug: "building-materials",
    subcategories: ["Cement and Steel", "Concrete Blocks & Machinery", "Gypsum Boards", "Lightweight Construction Materials", "Roofing & Façade", "Timber & Timber Products"],
  },
  {
    name: "Construction Machinery & Equipment",
    slug: "construction-machinery-equipment",
    subcategories: ["Earthmoving Equipment", "Demolition Equipment", "Quarrying & Mining Equipment", "Construction Tools, Machinery and Tapes", "Formwork and Scaffolding", "Surveying Equipment"],
  },
  {
    name: "Structural Engineering & Prefab",
    slug: "structural-engineering-prefab",
    subcategories: ["Structural Engineering", "Structural Steel Fabrication", "Pre-fabricated Structures", "Modular Construction Solutions", "Aluminum Extrusions"],
  },
  {
    name: "Doors, Windows, Glass & Hardware",
    slug: "doors-windows-glass-hardware",
    subcategories: ["Doors and Windows", "Architectural Glass", "Decorative Glass and Mirrors", "Architectural Hardware", "PVC/UPVC Machinery and Profiles"],
  },
  {
    name: "Construction Chemicals, Paints & Coatings",
    slug: "construction-chemicals-paints-coatings",
    subcategories: ["Construction Chemicals & Waterproofing", "Adhesive & Sealants", "Paints & Coatings"],
  },
  {
    name: "Tiles, Marble, Stone & Flooring",
    slug: "tiles-marble-stone-flooring",
    subcategories: ["Tiles & Sanitary Ware", "Marble & Stones", "Flooring and Wall Coverings", "Industrial Flooring Solutions"],
  },
  {
    name: "Interiors, Kitchen & Bath",
    slug: "interiors-kitchen-bath",
    subcategories: ["Interior Decorating Products", "Kitchen & Bathroom Solutions", "Plumbing Fittings and Accessories", "Acoustics & Soundproofing Solutions", "Noise Control Products", "Outdoor Furniture & Landscaping"],
  },
  {
    name: "Electrical, Lighting & Power",
    slug: "electrical-lighting-power",
    subcategories: ["Electricals & Electronics", "Wires & Cables", "Switches & Switch Gear", "Lighting / LED", "Battery & Generators"],
  },
  {
    name: "HVAC, Lifts & Building Automation",
    slug: "hvac-lifts-automation",
    subcategories: ["Air Conditioning & HVAC", "Lifts & Elevators", "Building Automation", "Home Automation Systems"],
  },
  {
    name: "Fire, Safety & Security",
    slug: "fire-safety-security",
    subcategories: ["Fire Protection Systems", "Passive Fire Protection", "Safety & Security"],
  },
  {
    name: "Renewable & Green Energy",
    slug: "renewable-green-energy",
    subcategories: ["Renewable Energy Systems", "Solar, Wind & Other Green Energy Products"],
  },
  {
    name: "Construction Technology & Software",
    slug: "construction-technology-software",
    subcategories: ["Building Information Modeling (BIM) Software", "Infrastructure Software", "Construction Waste Management"],
  },
];
