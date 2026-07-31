# Content Notes for Final Copywriting Pass

This repository ships with placeholder content throughout (clinic name
"Klinik Serenity", doctor names, MMC registration numbers, MOH licence
number, addresses, and quotes). None of it is real and none of it should
be published as-is. Flag the following constraints to whoever writes the
final copy:

## 1. No superlative or unverified medical claims

Malaysian MOH guidelines on private healthcare advertising (and MMC's
ethical guidelines on advertising) prohibit language that:

- Claims a treatment is "the best," "the most effective," "guaranteed,"
  "risk-free," "miracle," "instant," or similar unverifiable superlatives.
- Implies a specific, guaranteed cosmetic or medical outcome.
- Compares favourably against other named or unnamed providers.
- Uses fear-based or urgency-based sales language ("book before it's too
  late").

All placeholder copy in this repo was written to avoid this language.
Please keep that constraint when replacing it with real copy — search for
words like "best", "guaranteed", "instant", "miracle" before publishing
any new copy.

## 2. Before/after imagery

- Every before/after image must have documented written consent on file
  before it is used, even internally.
- Images must remain blurred by default on the live site and only reveal
  after the visitor actively acknowledges the disclaimer, per the pattern
  already implemented in `components/testimonials/BeforeAfterCard.tsx`.
- Do not caption images with implied guarantees ("you will look like
  this").

## 3. MMC / MOH numbers

All MMC registration numbers, MOH facility licence numbers, and company
registration numbers in this repo are clearly marked "(placeholder)" and
are fictional. They must be replaced with verified, real numbers before
launch — do not remove the "(placeholder)" marker until that
verification has happened.

## 4. Bahasa Malaysia coverage

Only the header, footer, and homepage hero currently have BM copy (see
`lib/i18n/dictionary.ts`). A full BM translation pass is needed for:
About, Doctors, Services (all categories and detail pages), Facilities,
Testimonials, Contact, and FAQ.

## 5. Doctor bios

Doctor bios in `lib/data/doctors.ts` are generic placeholders. Replace
with real biographical copy reviewed by each physician, and confirm
qualifications listed match their actual certifications before publishing.
