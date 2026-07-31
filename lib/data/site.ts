// Sanity-style schema (for future CMS migration):
// {
//   name: 'siteSettings',
//   type: 'document',
//   fields: [ { name: 'clinicName', type: 'string' }, ... ]
// }

export const site = {
  clinicName: "Klinik Serenity",
  clinicNameFull: "Klinik Serenity Aesthetic & Wellness Sdn Bhd",
  tagline: "Considered care, quietly delivered.",
  taglineBm: "Penjagaan teliti, dihantar dengan tenang.",
  phone: "+60 3-2181 8899",
  phoneHref: "tel:+60321818899",
  whatsapp: "+60 12-345 6789",
  whatsappHref: "https://wa.me/60123456789",
  email: "hello@klinikserenity.example",
  address: {
    line1: "Level 3, Menara Amara",
    line2: "Jalan Ampang Utama 1/1",
    city: "50450 Kuala Lumpur",
    country: "Malaysia",
  },
  mohLicense: "MOH/PVT/2024/00123 (placeholder)",
  companyReg: "202401012345 (123456-X) — placeholder",
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.0!2d101.7186!3d3.1590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwOScyMS4wIk4gMTAxwrA0MyczOSc",
  wazeUrl: "https://waze.com/ul?ll=3.1590,101.7186&navigate=yes",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sunday", time: "By appointment only" },
    { day: "Public Holidays", time: "Closed" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/klinikserenity.example" },
    { label: "Facebook", href: "https://facebook.com/klinikserenity.example" },
  ],
};

export const philosophyStatements = [
  {
    en: "We believe good medicine is unhurried.",
    bm: "Kami percaya rawatan yang baik tidak tergesa-gesa.",
  },
  {
    en: "Every treatment plan begins with a conversation, not a checklist.",
    bm: "Setiap pelan rawatan bermula dengan perbualan, bukan senarai semak.",
  },
  {
    en: "Aesthetic care, practised with clinical restraint.",
    bm: "Penjagaan estetik, diamalkan dengan disiplin klinikal.",
  },
  {
    en: "Your comfort is a clinical priority, not an afterthought.",
    bm: "Keselesaan anda adalah keutamaan klinikal, bukan tambahan.",
  },
];
