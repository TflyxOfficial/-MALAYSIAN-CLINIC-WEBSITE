// Sanity-style schema (for future CMS migration):
// {
//   name: 'service',
//   type: 'document',
//   fields: [
//     { name: 'title', type: 'string' },
//     { name: 'slug', type: 'slug' },
//     { name: 'category', type: 'string' },
//     { name: 'summary', type: 'text' },
//     { name: 'description', type: 'array', of: [{ type: 'block' }] },
//     { name: 'duration', type: 'string' },
//     { name: 'downtime', type: 'string' },
//     { name: 'suitableFor', type: 'array', of: [{ type: 'string' }] },
//   ],
// }

export type ServiceCategory = "Aesthetic" | "General" | "Specialist" | "Wellness";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string[];
  duration: string;
  downtime: string;
  suitableFor: string[];
}

export const services: Service[] = [
  {
    slug: "signature-facial-rejuvenation",
    title: "Signature Facial Rejuvenation",
    category: "Aesthetic",
    summary: "A conservative, layered approach to facial refreshment using injectable and energy-based modalities.",
    description: [
      "A consultation-led programme that begins with a full facial assessment before any treatment is recommended.",
      "Combines non-surgical modalities selected for your skin type, concerns, and downtime tolerance.",
      "Follow-up review scheduled to assess response before considering further sessions.",
    ],
    duration: "45–60 minutes",
    downtime: "Minimal, 0–2 days",
    suitableFor: ["Fine lines", "Skin laxity", "Dull tone"],
  },
  {
    slug: "medical-grade-facials",
    title: "Medical-Grade Facials",
    category: "Aesthetic",
    summary: "Clinical facials performed under physician supervision, tailored to individual skin conditions.",
    description: [
      "Assessed and performed with input from our dermatology team.",
      "Uses medical-grade formulations not available in retail spas.",
      "Suitable as a standalone treatment or paired with a longer-term skin plan.",
    ],
    duration: "60 minutes",
    downtime: "None to minimal",
    suitableFor: ["Congested skin", "Uneven texture", "Maintenance care"],
  },
  {
    slug: "body-contouring-consultation",
    title: "Body Contouring Consultation",
    category: "Aesthetic",
    summary: "A physician-led assessment of non-surgical body contouring options suited to your goals.",
    description: [
      "Begins with a body composition and skin quality assessment.",
      "Discussion of realistic, achievable outcomes based on your baseline.",
      "No treatment is scheduled at the first visit; this is an assessment-only session.",
    ],
    duration: "30 minutes",
    downtime: "None",
    suitableFor: ["Localised fat concerns", "Post-pregnancy changes", "Skin tightening enquiries"],
  },
  {
    slug: "general-health-screening",
    title: "General Health Screening",
    category: "General",
    summary: "Comprehensive screening packages covering common markers for working adults.",
    description: [
      "Blood work, vitals, and a physician review in a single visit.",
      "Packages available for annual, executive, and pre-employment screening.",
      "Results discussed in person with clear next-step recommendations.",
    ],
    duration: "90 minutes",
    downtime: "None",
    suitableFor: ["Annual check-ups", "Pre-employment screening", "Family health planning"],
  },
  {
    slug: "travel-and-vaccination",
    title: "Travel & Vaccination Clinic",
    category: "General",
    summary: "Pre-travel consultations and vaccinations administered by our general practice team.",
    description: [
      "Itinerary-based risk assessment ahead of international travel.",
      "Full range of routine and travel-specific vaccinations available.",
      "Documentation provided for visa and travel requirements where applicable.",
    ],
    duration: "20–30 minutes",
    downtime: "None",
    suitableFor: ["International travellers", "Students studying abroad", "Business travel"],
  },
  {
    slug: "chronic-disease-management",
    title: "Chronic Disease Management",
    category: "General",
    summary: "Ongoing management for common chronic conditions such as hypertension and diabetes.",
    description: [
      "Structured follow-up schedule with the same physician for continuity of care.",
      "Medication review and lifestyle planning included in every visit.",
      "Referral pathways to specialists coordinated where needed.",
    ],
    duration: "20 minutes",
    downtime: "None",
    suitableFor: ["Hypertension", "Type 2 diabetes", "Cholesterol management"],
  },
  {
    slug: "dermatology-consultation",
    title: "Dermatology Consultation",
    category: "Specialist",
    summary: "Specialist review of medical and cosmetic skin concerns with our consultant dermatologist.",
    description: [
      "In-depth history taking and skin examination.",
      "Diagnosis-led treatment planning rather than symptom-only management.",
      "Referral for biopsy or further investigation arranged where indicated.",
    ],
    duration: "30–45 minutes",
    downtime: "None",
    suitableFor: ["Acne", "Eczema", "Pigmentation concerns", "Skin lesions requiring review"],
  },
  {
    slug: "womens-health-review",
    title: "Women's Health Review",
    category: "Specialist",
    summary: "A dedicated review covering hormonal health, screening, and preventive planning.",
    description: [
      "Confidential consultation covering reproductive and hormonal health.",
      "Screening recommendations tailored to age and history.",
      "Referral coordination with obstetrics and gynaecology specialists as needed.",
    ],
    duration: "45 minutes",
    downtime: "None",
    suitableFor: ["Hormonal concerns", "Preventive screening", "Peri-menopause planning"],
  },
  {
    slug: "iv-nutrient-therapy",
    title: "IV Nutrient Therapy",
    category: "Wellness",
    summary: "Physician-formulated intravenous nutrient infusions administered in a private suite.",
    description: [
      "Formulations selected after a short wellness consultation.",
      "Administered in a private, monitored infusion suite.",
      "Not a substitute for a balanced diet; positioned as a supportive therapy.",
    ],
    duration: "45–60 minutes",
    downtime: "None",
    suitableFor: ["Fatigue support", "Recovery support", "General wellness maintenance"],
  },
  {
    slug: "sleep-and-recovery-programme",
    title: "Sleep & Recovery Programme",
    category: "Wellness",
    summary: "A structured programme addressing sleep quality, stress load, and recovery capacity.",
    description: [
      "Initial assessment covering sleep patterns, stress, and daily routine.",
      "Personalised recommendations, reviewed and adjusted over follow-up visits.",
      "Optional integration with our IV nutrient and general health services.",
    ],
    duration: "45 minutes",
    downtime: "None",
    suitableFor: ["Chronic fatigue", "Poor sleep quality", "High-stress professionals"],
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Aesthetic",
  "General",
  "Specialist",
  "Wellness",
];
