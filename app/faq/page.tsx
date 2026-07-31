import type { Metadata } from "next";
import { faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about appointments, insurance and panel coverage, and language support at Klinik Serenity.",
};

const categories = [
  "General",
  "Appointments",
  "Insurance & Panel",
  "Aesthetic Treatments",
] as const;

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        FAQ
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        Frequently asked questions.
      </h1>

      <div className="mt-6 max-w-2xl rounded-2xl border border-charcoal/10 bg-bone-dim p-6 text-sm leading-relaxed text-charcoal-soft">
        <p>
          <strong>Language note:</strong> Our clinic operates fully bilingual
          in English and Bahasa Malaysia. This website currently provides
          full translation for the homepage and site navigation; remaining
          pages will be translated in a follow-up content pass.
        </p>
      </div>

      <div className="mt-14 space-y-14">
        {categories.map((category) => {
          const items = faqItems.filter((f) => f.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="font-serif text-2xl">{category}</h2>
              <div className="mt-6 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10">
                {items.map((item) => (
                  <details key={item.question} className="group p-6">
                    <summary className="cursor-pointer list-none text-base font-medium marker:content-none">
                      <span className="flex items-center justify-between gap-4">
                        {item.question}
                        <span className="text-teal-dark transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
