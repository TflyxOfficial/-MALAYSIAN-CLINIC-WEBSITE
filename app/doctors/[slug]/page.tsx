import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors } from "@/lib/data/doctors";
import DoctorAvatar from "@/components/ui/DoctorAvatar";
import { site } from "@/lib/data/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const doctor = doctors.find((d) => d.slug === params.slug);
  if (!doctor) return {};
  return {
    title: doctor.name,
    description: `${doctor.name}, ${doctor.title} at ${site.clinicName}. ${doctor.mmcNumber}.`,
  };
}

export default function DoctorDetailPage({ params }: Props) {
  const doctor = doctors.find((d) => d.slug === params.slug);
  if (!doctor) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialties,
    honorificPrefix: "Dr.",
    worksFor: {
      "@type": "MedicalClinic",
      name: site.clinicNameFull,
    },
  };

  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/doctors" className="text-sm text-teal-dark hover:underline">
        &larr; All physicians
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
        <DoctorAvatar
          seed={doctor.photoSeed}
          name={doctor.name}
          photo={doctor.photo}
          size={140}
        />
        <div>
          <h1 className="font-serif text-4xl">{doctor.name}</h1>
          <p className="mt-2 text-charcoal-muted">{doctor.title}</p>
          <p className="mt-3 inline-block rounded-full bg-teal-tint px-3 py-1 text-xs text-teal-dark">
            {doctor.mmcNumber}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft">
            {doctor.bio}
          </p>

          <div className="mt-8">
            <h2 className="text-xs uppercase tracking-widest2 text-charcoal-muted">
              Qualifications
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {doctor.qualifications.map((q) => (
                <li
                  key={q}
                  className="rounded-full border border-charcoal/10 px-3 py-1 text-sm"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xs uppercase tracking-widest2 text-charcoal-muted">
              Specialties
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {doctor.specialties.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-charcoal/10 px-3 py-1 text-sm"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-charcoal px-6 py-3 text-sm text-bone hover:bg-teal-dark"
          >
            Book a consultation
          </Link>
        </div>
      </div>

      {doctor.photoConsult && (
        <div className="relative mt-16 h-72 w-full overflow-hidden rounded-2xl border border-charcoal/10 sm:h-96">
          <Image
            src={doctor.photoConsult}
            alt={`${doctor.name} in consultation at ${site.clinicName}`}
            fill
            sizes="(min-width: 768px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
