// Sanity-style schema (for future CMS migration):
// {
//   name: 'testimonial',
//   type: 'document',
//   fields: [
//     { name: 'initials', type: 'string' },
//     { name: 'procedureCategory', type: 'string' },
//     { name: 'quote', type: 'text' },
//     { name: 'consentOnFile', type: 'boolean' },
//     { name: 'beforeAfterSeed', type: 'string' },
//   ],
// }

export interface Testimonial {
  id: string;
  initials: string;
  procedureCategory: string;
  quote: string;
  consentOnFile: boolean;
  beforeAfterSeed: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    initials: "S.L.",
    procedureCategory: "Facial Rejuvenation",
    quote:
      "The consultation was thorough and nobody rushed me into a decision. I appreciated being told what wasn't necessary.",
    consentOnFile: true,
    beforeAfterSeed: "gallery-1",
  },
  {
    id: "t2",
    initials: "N.A.R.",
    procedureCategory: "Medical-Grade Facials",
    quote:
      "Results were gradual and realistic, in line with what was discussed at the first visit.",
    consentOnFile: true,
    beforeAfterSeed: "gallery-2",
  },
  {
    id: "t3",
    initials: "K.W.T.",
    procedureCategory: "Body Contouring Consultation",
    quote:
      "Appreciated the honesty about what non-surgical options could and couldn't achieve for my case.",
    consentOnFile: true,
    beforeAfterSeed: "gallery-3",
  },
];
