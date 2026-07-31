"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { splitWords } from "./SplitText";
import StaticHeroFallback from "./StaticHeroFallback";
import Preloader from "./Preloader";
import { site } from "@/lib/data/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const { t } = useLocale();
  const capability = useMotionCapability();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const headlineWords = splitWords(t.hero.headline);

  useEffect(() => {
    if (!preloaderDone || !headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll(".split-word > span");

    if (capability.prefersReducedMotion) {
      gsap.set(words, { opacity: 1, y: 0 });
      gsap.fromTo(
        [".hero-eyebrow", ".hero-sub", ".hero-cta"],
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.1 }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      words,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
      }
    )
      .fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.7"
      )
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, [preloaderDone, capability.prefersReducedMotion]);

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-bone">
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}

      <div className="absolute inset-0">
        {capability.ready && capability.canUseWebGL ? (
          <HeroScene />
        ) : (
          <StaticHeroFallback />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bone via-bone/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-content px-5 pb-20 pt-40 md:px-8 md:pb-28">
        <p className="hero-eyebrow mb-4 text-xs uppercase tracking-widest2 text-teal-dark opacity-0">
          {t.hero.eyebrow}
        </p>
        <h1
          ref={headlineRef}
          className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-charcoal sm:text-6xl md:text-7xl"
        >
          {headlineWords.map((word, i) => (
            <span key={`${word}-${i}`} className="split-word mr-[0.28em]">
              <span style={{ opacity: 0 }}>{word}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub mt-6 max-w-lg text-base text-charcoal-muted opacity-0 md:text-lg">
          {t.hero.sub}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="hero-cta rounded-full bg-charcoal px-6 py-3 text-sm text-bone opacity-0 transition-colors hover:bg-teal-dark"
          >
            {t.cta.bookNow}
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta rounded-full border border-teal px-6 py-3 text-sm text-teal-dark opacity-0 transition-colors hover:bg-teal-tint"
          >
            {t.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
