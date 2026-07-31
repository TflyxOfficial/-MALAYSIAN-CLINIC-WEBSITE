"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/data/site";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      value: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
    }).to(
      curtainRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.9,
        ease: "power4.inOut",
      },
      "+=0.15"
    ).to(
      rootRef.current,
      {
        display: "none",
        duration: 0,
        onComplete: onDone,
      }
    );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={curtainRef}
        className="absolute inset-0 flex items-center justify-center bg-charcoal"
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col items-center gap-4 text-bone">
          <span className="font-serif text-2xl tracking-tight">
            {site.clinicName}
          </span>
          <span className="font-sans text-xs tracking-widest2 text-bone/60">
            {String(progress).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
