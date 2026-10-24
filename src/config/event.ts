/**
 * Single source of truth for all event facts, contact details and CTA
 * destinations. Every component must import from here rather than
 * hardcoding dates, venue names or contact details.
 *
 * Sources: ugandabuildcon.com (2027 dates, venue, 6th-edition logo, contacts),
 * the official 2026 brochure (positioning, profiles, organiser details) and
 * the 2025 Post Show Report (previous-edition results and supporters).
 */

export const event = {
  name: "Uganda Buildcon International Expo 2027",
  shortName: "Uganda Buildcon",
  brandWord: "Buildcon",
  descriptor: "Uganda's Largest B2B Trade Show for the Building & Construction Industry",
  edition: "2027",
  editionLabel: "6th Edition",

  dates: {
    start: "2027-08-04",
    end: "2027-08-06",
    display: "4–6 August 2027",
    displayShort: "4–6 AUG 2027",
    openingTimeConfirmed: false,
    countdownTargetIso: "2027-08-04T09:00:00+03:00", // Africa/Kampala (EAT, UTC+3)
    timezone: "Africa/Kampala",
  },


venue: {
  name: "UMA Multi Purpose Hall",
  city: "Kampala",
  country: "Uganda",
  countryCode: "UG",

  fullLocation:
    "UMA Multi Purpose Hall, UMA Show Grounds, Lugogo, Kampala, Uganda",

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7979.5051093340335!2d32.6006641!3d0.3289738!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbebdb1732ff%3A0xf6d0dc5ffff22a9e!2sUMA%20multi%20purpose%20hall!5e0!3m2!1sen!2sin!4v1792735579365!5m2!1sen!2sin",

  mapLinkUrl:
    "https://maps.app.goo.gl/QFZghxhrEAAdw1deA",
},


  format: "B2B Trade Exhibition",
  industry: "Building & Construction",
  website: "https://ugandabuildcon.com",
  websiteDisplay: "www.ugandabuildcon.com",

  brandLines: {
    main: "BUILDING THE FUTURE TOGETHER",
    supporting: "Uganda's Largest B2B Tradeshow on the Building & Construction Industry.",
    exhibitor: "Take Your Business to Uganda's Construction Market.",
    visitor: "Source Products. Meet Suppliers. Develop Business.",
  },

  organisers: [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      logo: "/logos/futurex-logo.png",
      url: "https://www.futurextrade.com/",
    },
    {
      name: "Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL)",
      logo: "/logos/etsipl-logo.png",
      url: "https://www.etsipl.in/",
    },
  ],

 
contact: {
  futurex: {
    company: "Futurex Group",
    name: "Mr. Namit Gupta",
    email: "namit@futurextrade.com",
    phone: "(+91) 9810855697",
  },

  etsipl: {
    company: "ETSIPL",
    name: "Mr. Vijayanka Brighuvanshi",
    email: "vijayanka@etsipl.in",
    phone: "(+91) 9324232529",
  },

  futurexSales: {
    company: "Futurex Group",
    name: "Mr. Vaibhav Srivastava",
    email: "vaibhav@futurextrade.com",
    phone: "(+91) 9807169880",
  },

  // Existing code compatibility
  exhibitorEnquiries: {
    company: "Futurex Group",
    name: "Mr. Namit Gupta",
    email: "namit@futurextrade.com",
    phone: "(+91) 9810855697",
  },

  internationalParticipation: {
    company: "ETSIPL",
    name: "Mr. Vijayanka Brighuvanshi",
    email: "vijayanka@etsipl.in",
    phone: "(+91) 9324232529",
  },

  general: {
    company: "Futurex Group",
    name: "Mr. Namit Gupta",
    email: "namit@futurextrade.com",
    phone: "(+91) 9810855697",
  },
},


  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  cta: {
    bookStand: "/book-a-stand",
    registerVisit: "/register-to-visit",
  },

  downloads: {
    brochure: "/downloads/Uganda-Buildcon-Expo-Brochure.pdf",
    postShowReport: "/downloads/Uganda-Buildcon-Post-Show-Report-2025.pdf",
  },

  exhibitorDirectoryMinimum: 6,
} as const;

export type EventConfig = typeof event;
