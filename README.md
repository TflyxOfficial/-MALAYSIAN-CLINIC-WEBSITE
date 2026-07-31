# Klinik Serenity — Flagship Website (Scaffold)

A from-scratch Next.js 14 App Router build for a fictional premium
Malaysian private clinic, **Klinik Serenity**. All clinic details, staff
names, MMC/MOH numbers, and copy in this repository are **placeholder
content** invented for this scaffold — see [`CONTENT-NOTES.md`](./CONTENT-NOTES.md)
for what a real copywriting/legal pass needs to check before launch.

## Tech stack

- **Next.js 14 (App Router)** + TypeScript, Server Components by default
- **Three.js** via `@react-three/fiber` + `@react-three/drei` (hero
  organic form, facilities walkthrough)
- **GSAP + ScrollTrigger** as the primary scroll/motion engine
- **Framer Motion** for UI-level transitions (mobile menu, doctor modal)
- **Tailwind CSS** with custom design tokens (bone / charcoal / teal —
  no default Tailwind palette, no hospital blue)
- **next/font** self-hosted variable fonts: Fraunces (serif headlines) +
  Manrope (grotesk UI/body), standing in for a bespoke editorial pairing
- Content modelled as typed **TS data modules** in `lib/data/*.ts`, with
  Sanity-style schema comments so it can move to a headless CMS later
  with minimal reshaping
- **React Hook Form + Zod** for the booking form, posting to a stub
  **Server Action** (`lib/actions/booking.ts`)
- **next/image** is configured (`next.config.js`) for future real photography;
  the current build uses generated SVG/CSS placeholder imagery for
  doctors and before/after photos so the repo has zero external image
  dependencies

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

No environment variables are required for the current stub. If the
booking Server Action is wired to a real backend later, add e.g.
`BOOKING_WEBHOOK_URL` to a `.env.local`.

## Site map (9 routes)

| Route | Notes |
|---|---|
| `/` | Homepage showpiece — see Motion spec below |
| `/about` | Clinic story, values, licence info |
| `/doctors`, `/doctors/[slug]` | Doctor directory + dynamic detail page with `Physician` JSON-LD |
| `/services`, `/services/[slug]` | Categorised services (Aesthetic / General / Specialist / Wellness) + dynamic treatment detail template |
| `/facilities` | Clinic tour with a fuller scroll-scrubbed 3D walkthrough |
| `/testimonials` | Consent-gated, blurred-by-default before/after gallery |
| `/contact` | RHF + Zod booking form (stub Server Action), WhatsApp CTA, Maps embed, Waze deep link, hours |
| `/faq` | FAQ, insurance/panel info, EN/BM language note |

`app/sitemap.ts` and `app/robots.ts` implement the App Router SEO
conventions. Every page has `generateMetadata`; `MedicalClinic` JSON-LD
is emitted in the root layout and `Physician` JSON-LD on each doctor page.

## Homepage motion spec — what was built

- **Hero**: full-viewport R3F canvas, a distorted icosahedron
  (`MeshDistortMaterial` from drei) standing in for a metaball/organic
  form, restrained lerped cursor parallax, code-split via
  `next/dynamic(..., { ssr: false })`.
- **Reduced-motion / low-end fallback**: `lib/hooks/useMotionCapability.ts`
  checks `prefers-reduced-motion` **and** `navigator.hardwareConcurrency < 4`
  and swaps to a static CSS gradient hero (`StaticHeroFallback.tsx`) —
  implemented for real, not a stub.
- **Preloader**: branded loader with a GSAP-driven progress counter,
  exiting via a curtain wipe (`scaleY` from a fixed origin), not a plain
  fade (`components/home/Preloader.tsx`).
- **Headline reveal**: manual span-per-word split (`SplitText.tsx`) +
  GSAP stagger, since the official SplitText plugin requires a Club
  GreenSock licence.
- **Philosophy**: `ScrollTrigger`-pinned section, scrub-tied cross-fade
  across 4 short philosophy statements (localised EN/BM).
- **Services showcase**: pinned horizontal-scroll module via
  `gsap.to(track, { x, scrollTrigger: { pin, scrub } })`, CSS 3D
  tilt/lift on card hover.
- **Doctors strip**: GSAP infinite marquee (duplicated track, `xPercent`
  loop via `x` tween with `repeat: -1`), pauses on hover, opens a
  Framer Motion modal with bio + MMC number.
- **Facilities teaser**: a **simplified** art-directed, scroll-scrubbed
  parallax reveal of three stylised panels rather than a full 3D camera
  path — the full R3F walkthrough (`FacilitiesScene.tsx`, scroll-scrubbed
  camera dolly through abstract "rooms") lives on `/facilities`, where
  the time budget justified building it. This is the one deliberate
  scope trade documented per the brief.
- **Footer**: contact block, hours, MOH/MMC compliance links, sitemap,
  PDPA note.
- All R3F components dispose geometry/materials on unmount
  (`useEffect` cleanup in `HeroScene.tsx` / `FacilitiesScene.tsx`).
- `prefers-reduced-motion` is respected globally: `app/globals.css`
  collapses animation/transition durations, and every GSAP-driven
  component branches to a reduced/instant variant.

### GSAP ScrollSmoother substitution

The brief allows dropping **ScrollSmoother** if it requires a paid Club
GreenSock licence — it does. This build does **not** add a global smooth
scroller (no Lenis wrapper either); native scroll is used everywhere, with
ScrollTrigger driving pinned/scrubbed sections directly against native
scroll position. This keeps the stack licence-free and avoids the extra
complexity of syncing a smooth-scroll library with ScrollTrigger. `lenis`
is left in `package.json` as an available dependency if a future pass
wants a smoothed feel — it is currently unused.

## Compliance-driven decisions

- MMC registration numbers appear on every doctor card/profile, clearly
  marked `(placeholder)`.
- Before/after gallery is blurred by default; each card requires reading
  a disclaimer and ticking an acknowledgement before the images reveal —
  no unrestricted gallery exists anywhere in the app.
- Copy avoids superlative/unverified claims ("best", "guaranteed"); see
  `CONTENT-NOTES.md` for the checklist to keep enforcing this.
- Header includes an EN/BM toggle (`lib/i18n/`) covering header, nav,
  hero, and footer copy. Full page-by-page translation is **not**
  implemented for About/Doctors/Services/Facilities/Testimonials/
  Contact/FAQ — this is called out on `/faq` itself and in
  `CONTENT-NOTES.md`.
- Footer carries a placeholder MOH licence number and a PDPA-referenced
  (not GDPR) privacy note.
- WhatsApp `wa.me` CTA is present in the header, mobile menu, hero, and
  `/contact`.

## Known scope simplifications vs. the full spec

1. **Facilities teaser on the homepage** is a simplified scroll-parallax
   reveal rather than a full Spline-style camera path (the fuller 3D
   walkthrough was built on `/facilities` instead — see above).
2. **No custom GLB/Draco assets** — all 3D geometry is procedural R3F
   primitives (`Icosahedron`, `RoundedBox`, `Sphere`) rather than
   modelled/exported assets, to avoid a binary asset pipeline for a
   scaffold.
3. **No global smooth-scroll library** (see ScrollSmoother note above).
4. **Doctor and before/after "photography"** is generated (CSS
   gradients + initials), not real or stock imagery, to keep the repo
   dependency-free and avoid implying real patients/doctors exist.
5. **BM translation** covers site chrome + homepage only, as explicitly
   allowed by the brief.
6. **Booking Server Action** is a stub: it validates with Zod, logs to
   the server console, and returns a success/error message — it does not
   persist to a database or call a real PMS/CRM.
7. **Google Maps embed** uses a static illustrative `src` — replace with
   a real embed URL for the actual clinic address before launch.

## What a follow-up pass would add

- Wire `lib/data/*.ts` to a real headless CMS (the Sanity-style schema
  comments above each data file are meant to make that migration close
  to 1:1).
- Replace generated placeholder imagery with a real photography /
  Draco-compressed GLB asset pipeline for the 3D scenes.
- Full EN/BM coverage across every page (not just chrome + homepage).
- Real booking backend (PMS/CRM integration, calendar availability,
  SMS/WhatsApp confirmation) behind the existing Server Action interface.
- Automated accessibility and Lighthouse/perf budget checks in CI, plus
  visual regression tests for the motion-heavy homepage sections.
- Legal/compliance review of all MOH/MMC/PDPA-referenced copy before
  any of it is treated as real.
