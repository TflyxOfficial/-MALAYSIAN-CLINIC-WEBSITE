"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/data/services";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featured = services.filter((_, i) => i % 2 === 0).slice(0, 6);

export default function ServicesShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, ready } = useMotionCapability();

  useEffect(() => {
    if (!ready || prefersReducedMotion) return;
    if (!trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bone py-24">
      <div className="mx-auto mb-10 max-w-content px-5 md:px-8">
        <p className="text-xs uppercase tracking-widest2 text-teal-dark">
          Our Services
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-3xl md:text-4xl">
          Four disciplines, one considered approach.
        </h2>
      </div>

      <div
        ref={trackRef}
        className={
          prefersReducedMotion
            ? "flex snap-x gap-6 overflow-x-auto px-5 pb-6 no-scrollbar md:px-8"
            : "flex gap-6 px-5 will-change-transform md:px-8"
        }
      >
        {featured.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="perspective-1000 group w-[78vw] flex-shrink-0 snap-start sm:w-[420px]"
          >
            <div className="h-[420px] rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm transition-transform duration-300 ease-clinic group-hover:-translate-y-1 group-hover:shadow-lg">
              <span className="text-xs uppercase tracking-widest2 text-teal-dark">
                {service.category}
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight">
                {service.title}
              </h3>
              <p className="mt-4 text-sm text-charcoal-muted">
                {service.summary}
              </p>
              <div className="mt-8 flex gap-6 text-xs text-charcoal-muted">
                <span>{service.duration}</span>
                <span>{service.downtime} downtime</span>
              </div>
              <span className="mt-6 inline-block text-sm text-teal-dark underline underline-offset-4">
                View treatment
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
