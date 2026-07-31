export type Locale = "en" | "bm";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      doctors: "Doctors",
      services: "Services",
      facilities: "Facilities",
      testimonials: "Testimonials",
      contact: "Contact",
      faq: "FAQ",
    },
    cta: {
      bookNow: "Book a Consultation",
      whatsapp: "Chat on WhatsApp",
    },
    hero: {
      eyebrow: "Kuala Lumpur, Malaysia",
      headline: "Considered care, quietly delivered.",
      sub: "A private clinic built around unhurried consultations, conservative treatment planning, and physician-led aesthetic and general medicine.",
    },
    footer: {
      sitemap: "Sitemap",
      compliance: "Compliance",
      hours: "Operating Hours",
      contact: "Contact",
      pdpa: "Your personal data is handled in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia.",
    },
  },
  bm: {
    nav: {
      home: "Laman Utama",
      about: "Tentang Kami",
      doctors: "Doktor",
      services: "Perkhidmatan",
      facilities: "Kemudahan",
      testimonials: "Testimoni",
      contact: "Hubungi",
      faq: "Soalan Lazim",
    },
    cta: {
      bookNow: "Tempah Konsultasi",
      whatsapp: "Chat di WhatsApp",
    },
    hero: {
      eyebrow: "Kuala Lumpur, Malaysia",
      headline: "Penjagaan teliti, dihantar dengan tenang.",
      sub: "Klinik peribadi yang dibina berasaskan konsultasi tanpa tergesa-gesa, perancangan rawatan yang berhemat, serta perubatan estetik dan am yang diketuai doktor.",
    },
    footer: {
      sitemap: "Peta Laman",
      compliance: "Pematuhan",
      hours: "Waktu Operasi",
      contact: "Hubungi Kami",
      pdpa: "Data peribadi anda dikendalikan selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia.",
    },
  },
} as const;

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    doctors: string;
    services: string;
    facilities: string;
    testimonials: string;
    contact: string;
    faq: string;
  };
  cta: {
    bookNow: string;
    whatsapp: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  footer: {
    sitemap: string;
    compliance: string;
    hours: string;
    contact: string;
    pdpa: string;
  };
};
