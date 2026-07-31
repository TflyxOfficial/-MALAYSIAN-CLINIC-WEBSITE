"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Facilities teaser tradeoff (documented in README): rather than a full
// spline camera path through a 3D scene, this section uses a
// scroll-scrubbed layered parallax reveal of stylised panels. The fuller
// R3F walkthrough lives on /facilities where the time budget justifies it.
const panels = [
  { label: "Consultation Suites", tone: "bg-teal-tint" },
  { label: "Infusion Lounge", tone: "bg-bone-deep" },
  { label: "Treatment Rooms", tone: "bg-charcoal/5" },
];

export default function FacilitiesTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, ready } = useMotionCapability();

  useEffect(() => {
    if (!ready || prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".facility-panel");
      layers.forEach((layer, i) => {
        gsap.fromTo(
          layer,
          { yPercent: 14 * (i + 1), scale: 0.94 },
          {
            yPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="bg-bone px-5 py-24 md:px-8">
      <div className="mx-auto max-w-content">
        <p className="text-xs uppercase tracking-widest2 text-teal-dark">
          Facilities
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-3xl md:text-4xl">
          A clinic built to feel unhurried.
        </h2>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className={`facility-panel flex h-64 flex-col justify-end rounded-2xl border border-charcoal/10 p-6 ${panel.tone}`}
            >
              <span className="font-serif text-xl">{panel.label}</span>
            </div>
          ))}
        </div>

        <Link
          href="/facilities"
          className="mt-10 inline-block rounded-full border border-charcoal/20 px-6 py-3 text-sm hover:border-teal hover:text-teal-dark"
        >
          Take the full clinic tour
        </Link>
      </div>
    </section>
  );
}
