
export type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

/* ==========================================
   MAIN NAVIGATION
========================================== */

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About the Exhibition",
        href: "/about",
        description:
          "Exhibition overview, objectives and key details.",
      },
      {
        label: "Why Uganda",
        href: "/why-uganda",
        description:
          "Building and construction market opportunities.",
      },
      {
        label: "Venue & Location",
        href: "/venue",
        description:
          "Exhibition venue and location information.",
      },
      {
        label: "Organisers",
        href: "/organisers",
        description:
          "Meet the joint organising companies.",
      },
      {
        label: "Partners",
        href: "/partners",
        description:
          "Exhibition partners and supporting organisations.",
      },
    ],
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      {
        label: "Why Exhibit",
        href: "/exhibit",
        description:
          "Exhibitor benefits, eligible businesses and support.",
      },
      {
        label: "Exhibition Profile",
        href: "/exhibition-profile",
        description:
          "Building and construction product sectors.",
      },
      {
        label: "Book a Stand",
        href: "/book-a-stand",
        description:
          "Enquire about exhibition space and stand options.",
      },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    children: [
      {
        label: "Why Visit",
        href: "/visit",
        description:
          "Discover products, suppliers and visitor benefits.",
      },
      {
        label: "Visitor Profile",
        href: "/visitor-profile",
        description:
          "Professionals and businesses the event is for.",
      },
      {
        label: "Register to Visit",
        href: "/register-to-visit",
        description:
          "Submit your visitor registration.",
      },
    ],
  },
  {
    label: "Media & Resources",
    href: "/gallery",
    children: [
      {
        label: "Gallery",
        href: "/gallery",
        description:
          "Photos from previous exhibition editions.",
      },
         {
      label: "Brochure",
      href: "/downloads",
      description: "Fill in the form to get the exhibition brochure.",
    },
    {
      label: "Post Show Report",
      href: "/downloads/5th_Uganda_Buildcon_International_Expo_2026_Post_Show_Report.pdf",
      description: "View the previous edition's post show report.",
    },

    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* ==========================================
   FOOTER NAVIGATION
========================================== */

export const footerNav = {
  event: [
    {
      label: "About the Exhibition",
      href: "/about",
    },
    {
      label: "Why Uganda",
      href: "/why-uganda",
    },
    {
      label: "Venue & Location",
      href: "/venue",
    },
  
  ],

  exhibit: [
    {
      label: "Why Exhibit",
      href: "/exhibit",
    },
    {
      label: "Exhibition Profile",
      href: "/exhibition-profile",
    },
    {
      label: "Book a Stand",
      href: "/book-a-stand",
    },
  ],

  visit: [
    {
      label: "Why Visit",
      href: "/visit",
    },
    {
      label: "Visitor Profile",
      href: "/visitor-profile",
    },
    {
      label: "Register to Visit",
      href: "/register-to-visit",
    },
  ],

  information: [
    {
      label: "Gallery",
      href: "/gallery",
    },
   {
    label: "Brochure",
    href: "/downloads",
  },
  {
    label: "Post Show Report",
    href: "/downloads/5th_Uganda_Buildcon_International_Expo_2026_Post_Show_Report.pdf",
  },

  ],

  legal: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms-and-conditions",
    },
    {
      label: "Cookie Policy",
      href: "/cookie-policy",
    },
  ],
} as const;
