import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Klinik Serenity's Aesthetic, General, Specialist, and Wellness services.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        Services
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        Four disciplines, one considered approach.
      </h1>

      <div className="mt-16 space-y-16">
        {serviceCategories.map((category) => {
          const items = services.filter((s) => s.category === category);
          return (
            <section key={category}>
              <h2 className="font-serif text-2xl">{category}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-2xl border border-charcoal/10 p-6 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-serif text-lg leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-charcoal-muted">
                      {service.summary}
                    </p>
                    <div className="mt-5 flex gap-4 text-xs text-charcoal-muted">
                      <span>{service.duration}</span>
                      <span>{service.downtime} downtime</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
