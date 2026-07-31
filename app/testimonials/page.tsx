import type { Metadata } from "next";
import { testimonials } from "@/lib/data/testimonials";
import BeforeAfterCard from "@/components/testimonials/BeforeAfterCard";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Patient testimonials and consent-gated before/after gallery for Klinik Serenity, in line with MOH aesthetic advertising guidelines.",
};

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        Testimonials
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        Patient stories, shared with consent.
      </h1>

      <div className="mt-6 max-w-2xl rounded-2xl border border-teal/30 bg-teal-tint p-6 text-sm leading-relaxed text-charcoal-soft">
        <p className="font-medium text-teal-dark">Disclaimer</p>
        <p className="mt-2">
          All before-and-after photos on this page are shown with the
          explicit written consent of the patient depicted, and are blurred
          by default in line with Ministry of Health guidelines on
          aesthetic medical advertising. Individual results vary and are
          not guaranteed. Please read the acknowledgement on each card
          before choosing to reveal an image.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <BeforeAfterCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
