import type { Metadata } from "next";
import Link from "next/link";
import { doctors } from "@/lib/data/doctors";
import DoctorAvatar from "@/components/ui/DoctorAvatar";

export const metadata: Metadata = {
  title: "Doctors",
  description:
    "Meet the physicians of Klinik Serenity, including MMC registration details for each clinician.",
};

export default function DoctorsPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        Our Physicians
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        A small, deliberately chosen clinical team.
      </h1>
      <p className="mt-6 max-w-xl text-base text-charcoal-muted">
        Each physician listed is registered with the Malaysian Medical
        Council. Registration numbers shown are placeholders pending final
        verification.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doctor) => (
          <Link
            key={doctor.slug}
            href={`/doctors/${doctor.slug}`}
            className="rounded-2xl border border-charcoal/10 p-6 transition-shadow hover:shadow-md"
          >
            <DoctorAvatar seed={doctor.photoSeed} name={doctor.name} size={72} />
            <h2 className="mt-4 font-serif text-lg leading-tight">
              {doctor.name}
            </h2>
            <p className="mt-1 text-xs text-charcoal-muted">{doctor.title}</p>
            <p className="mt-3 text-xs text-teal-dark">{doctor.mmcNumber}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
