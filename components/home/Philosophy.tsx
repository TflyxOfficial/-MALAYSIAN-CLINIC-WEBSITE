"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { philosophyStatements } from "@/lib/data/site";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy() {
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const { prefersReducedMotion, ready } = useMotionCapability();

  useEffect(() => {
    if (!ready || !sectionRef.current) return;
    const items = itemRefs.current.filter(Boolean) as HTMLParagraphElement[];
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1 });
        return;
      }

      gsap.set(items, { opacity: 0 });
      gsap.set(items[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${items.length * 100}%`,
          scrub: 0.6,
          pin: true,
        },
      });

      items.forEach((el, i) => {
        if (i === 0) return;
        tl.to(items[i - 1], { opacity: 0, duration: 0.4 }, i)
          .to(el, { opacity: 1, duration: 0.4 }, i);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, prefersReducedMotion, locale]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center justify-center bg-charcoal px-5 py-24 text-bone md:px-8"
    >
      <div className="relative mx-auto w-full max-w-3xl text-center">
        {philosophyStatements.map((statement, i) => (
          <p
            key={statement.en}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center font-serif text-2xl leading-snug sm:text-4xl md:text-5xl"
          >
            {locale === "bm" ? statement.bm : statement.en}
          </p>
        ))}
        <div className="invisible font-serif text-2xl sm:text-4xl md:text-5xl">
          {philosophyStatements[0].en}
        </div>
      </div>
    </section>
  );
}
