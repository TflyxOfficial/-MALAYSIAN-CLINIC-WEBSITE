import type { Metadata } from "next";
import FacilitiesWalkthrough from "@/components/facilities/FacilitiesWalkthrough";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Take a tour of Klinik Serenity's consultation suites, infusion lounge, and treatment rooms.",
};

export default function FacilitiesPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        Facilities
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        A clinic tour, scroll by scroll.
      </h1>
      <p className="mt-6 max-w-xl text-base text-charcoal-muted">
        Scroll to move through a stylised walkthrough of our facility. On
        devices with reduced motion enabled or lower graphics capability,
        a static summary is shown instead.
      </p>

      <div className="mt-16">
        <FacilitiesWalkthrough />
      </div>
    </div>
  );
}
