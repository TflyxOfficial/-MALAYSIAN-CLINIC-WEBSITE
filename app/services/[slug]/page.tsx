import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data/services";
import { site } from "@/lib/data/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <Link
        href="/services"
        className="text-sm text-teal-dark hover:underline"
      >
        &larr; All services
      </Link>

      <p className="mt-8 text-xs uppercase tracking-widest2 text-teal-dark">
        {service.category}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        {service.title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal-muted">
        {service.summary}
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          {service.description.map((para) => (
            <p key={para} className="max-w-2xl text-base leading-relaxed text-charcoal-soft">
              {para}
            </p>
          ))}

          <div className="mt-8">
            <h2 className="text-xs uppercase tracking-widest2 text-charcoal-muted">
              Suitable For
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.suitableFor.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-charcoal/10 px-3 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit w-full rounded-2xl border border-charcoal/10 p-6 md:w-72">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest2 text-charcoal-muted">
                Duration
              </dt>
              <dd className="mt-1">{service.duration}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest2 text-charcoal-muted">
                Downtime
              </dt>
              <dd className="mt-1">{service.downtime}</dd>
            </div>
          </dl>
          <Link
            href="/contact"
            className="mt-6 block rounded-full bg-charcoal px-5 py-3 text-center text-sm text-bone hover:bg-teal-dark"
          >
            Book a consultation
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-full border border-teal px-5 py-3 text-center text-sm text-teal-dark hover:bg-teal-tint"
          >
            Ask on WhatsApp
          </a>
          <p className="mt-4 text-xs leading-relaxed text-charcoal-muted">
            Outcomes vary by individual. This page does not guarantee
            specific results and is not a substitute for a clinical
            consultation.
          </p>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl">Related {service.category} services</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-2xl border border-charcoal/10 p-6 hover:shadow-md"
              >
                <h3 className="font-serif text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-charcoal-muted">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
