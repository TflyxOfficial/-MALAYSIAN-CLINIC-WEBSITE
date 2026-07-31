import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Klinik Serenity — a private medical and aesthetic clinic in Kuala Lumpur built on conservative, physician-led care.",
};

const values = [
  {
    title: "Consultation-led",
    body: "Every visit begins with a conversation. No treatment is scheduled without a clinical assessment first.",
  },
  {
    title: "Conservative by default",
    body: "We favour the smallest effective intervention, and we say so when a treatment isn't warranted.",
  },
  {
    title: "Continuity of care",
    body: "Where possible, you see the same physician across visits, for consistent, longitudinal care.",
  },
  {
    title: "Bilingual, always",
    body: "Our clinical and front-desk teams operate comfortably in both English and Bahasa Malaysia.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        About {site.clinicName}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        A private clinic built around unhurried, physician-led care.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal-muted md:text-lg">
        {site.clinicName} was founded to bring together general medicine,
        specialist referral pathways, aesthetic medicine, and wellness care
        under one clinical roof — with every treatment plan reviewed by a
        physician first. This page contains placeholder copy pending final
        client-supplied content.
      </p>

      <div className="relative mt-12 h-72 w-full overflow-hidden rounded-2xl border border-charcoal/10 sm:h-96">
        <Image
          src="/images/brand/team-group.jpg"
          alt={`The ${site.clinicName} clinical team`}
          fill
          sizes="(min-width: 768px) 900px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-charcoal/10 p-8">
            <h2 className="font-serif text-xl">{v.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
              {v.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-2xl bg-charcoal px-8 py-12 text-bone md:px-12">
        <h2 className="max-w-xl font-serif text-2xl md:text-3xl">
          Registered and regulated under Malaysian private healthcare law.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/70">
          {site.clinicNameFull} operates under MOH private healthcare
          facility licence {site.mohLicense}. Company registration:{" "}
          {site.companyReg}. All figures shown are placeholders pending
          verification against final registration documents.
        </p>
      </div>
    </div>
  );
}
