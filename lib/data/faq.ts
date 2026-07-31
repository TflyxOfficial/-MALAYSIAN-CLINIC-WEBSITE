// Sanity-style schema (for future CMS migration):
// {
//   name: 'faqItem',
//   type: 'document',
//   fields: [
//     { name: 'question', type: 'string' },
//     { name: 'answer', type: 'text' },
//     { name: 'category', type: 'string' },
//   ],
// }

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Appointments" | "Insurance & Panel" | "Aesthetic Treatments";
}

export const faqItems: FaqItem[] = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "We recommend booking ahead via WhatsApp or our contact form so a consultation slot can be reserved with the right physician. Limited walk-in slots may be available for general consultations.",
    category: "Appointments",
  },
  {
    question: "How far in advance should I book an aesthetic consultation?",
    answer:
      "For non-urgent aesthetic consultations, we suggest booking 3–7 days ahead. Consultation-only visits do not include same-day treatment.",
    category: "Appointments",
  },
  {
    question: "Is Klinik Serenity on any insurance panels?",
    answer:
      "We are on selected corporate and insurance panels for general consultations and health screening. Aesthetic treatments are generally self-pay and not covered by insurance. Please check with our front desk for your specific panel.",
    category: "Insurance & Panel",
  },
  {
    question: "Can I claim aesthetic treatments through my insurance?",
    answer:
      "Aesthetic and cosmetic treatments are typically excluded from medical insurance coverage in Malaysia. We recommend confirming directly with your insurer before booking.",
    category: "Insurance & Panel",
  },
  {
    question: "Is service available in Bahasa Malaysia?",
    answer:
      "Yes. Our clinical and front-desk staff are fluent in both English and Bahasa Malaysia. This website currently offers full translation for the homepage and site navigation, with the remaining pages to follow in a later update.",
    category: "General",
  },
  {
    question: "How are before-and-after photos handled?",
    answer:
      "Photos in our gallery are shown only with explicit written consent from the patient, and are blurred by default in line with Ministry of Health aesthetic advertising guidelines. Viewers must actively choose to reveal each image after reading a disclaimer.",
    category: "Aesthetic Treatments",
  },
  {
    question: "Do treatment outcomes shown reflect guaranteed results?",
    answer:
      "No. Individual results vary depending on your baseline condition, skin type, and how your body responds to treatment. We do not guarantee specific outcomes for any procedure.",
    category: "Aesthetic Treatments",
  },
];
