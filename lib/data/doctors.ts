// Sanity-style schema (for future CMS migration):
// {
//   name: 'doctor',
//   type: 'document',
//   fields: [
//     { name: 'name', type: 'string' },
//     { name: 'slug', type: 'slug' },
//     { name: 'title', type: 'string' },
//     { name: 'mmcNumber', type: 'string' },
//     { name: 'specialties', type: 'array', of: [{ type: 'string' }] },
//     { name: 'bio', type: 'text' },
//     { name: 'qualifications', type: 'array', of: [{ type: 'string' }] },
//     { name: 'photo', type: 'image' },
//   ],
// }

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  mmcNumber: string;
  specialties: string[];
  qualifications: string[];
  bio: string;
  photoSeed: string;
}

export const doctors: Doctor[] = [
  {
    slug: "dr-amelia-tan",
    name: "Dr. Amelia Tan",
    title: "Medical Director & Aesthetic Physician",
    mmcNumber: "MMC 48213 (placeholder)",
    specialties: ["Aesthetic Medicine", "Facial Rejuvenation"],
    qualifications: ["MBBS (Malaya)", "Dip. Aesthetic Medicine (AAAM)"],
    bio: "Dr. Amelia leads the clinical direction of Klinik Serenity, with a practice built on conservative, natural-looking outcomes and a preference for the smallest effective intervention.",
    photoSeed: "doctor-amelia",
  },
  {
    slug: "dr-rajan-kumaresh",
    name: "Dr. Rajan Kumaresh",
    title: "General Practitioner",
    mmcNumber: "MMC 51907 (placeholder)",
    specialties: ["General Medicine", "Preventive Health Screening"],
    qualifications: ["MBBS (UKM)", "MAFP"],
    bio: "Dr. Rajan oversees primary and preventive care, with a particular interest in metabolic health screening and long-term wellness planning for working professionals.",
    photoSeed: "doctor-rajan",
  },
  {
    slug: "dr-siti-nurhaliza-yaakub",
    name: "Dr. Siti Nurhaliza Yaakub",
    title: "Consultant Dermatologist",
    mmcNumber: "MMC 39662 (placeholder)",
    specialties: ["Dermatology", "Skin Health"],
    qualifications: ["MBBS (UM)", "MRCP (UK)", "AdvMDerm"],
    bio: "Dr. Siti brings a specialist dermatology lens to the clinic's aesthetic and medical skin programmes, with an emphasis on evidence-based protocols over trend-driven treatments.",
    photoSeed: "doctor-siti",
  },
  {
    slug: "dr-marcus-lim",
    name: "Dr. Marcus Lim",
    title: "Wellness & Longevity Physician",
    mmcNumber: "MMC 55120 (placeholder)",
    specialties: ["Wellness Medicine", "IV Nutrient Therapy"],
    qualifications: ["MBBS (Monash)", "Cert. Functional Medicine"],
    bio: "Dr. Marcus designs the clinic's wellness and longevity programmes, working closely with each patient on sleep, recovery, and nutrient optimisation.",
    photoSeed: "doctor-marcus",
  },
];
