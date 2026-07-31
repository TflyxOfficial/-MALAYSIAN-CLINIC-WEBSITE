"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { doctors, Doctor } from "@/lib/data/doctors";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";
import DoctorAvatar from "@/components/ui/DoctorAvatar";

const loopDoctors = [...doctors, ...doctors];

export default function DoctorsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const { prefersReducedMotion, ready } = useMotionCapability();

  useEffect(() => {
    if (!ready || prefersReducedMotion || !trackRef.current) return;

    const track = trackRef.current;
    const width = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -width,
      duration: 32,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [ready, prefersReducedMotion]);

  return (
    <section className="overflow-hidden bg-bone-dim py-24">
      <div className="mx-auto mb-10 max-w-content px-5 md:px-8">
        <p className="text-xs uppercase tracking-widest2 text-teal-dark">
          Our Physicians
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-3xl md:text-4xl">
          A small, deliberately chosen clinical team.
        </h2>
      </div>

      <div
        className="no-scrollbar overflow-x-auto"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="flex w-max gap-6 px-5 will-change-transform md:px-8">
          {loopDoctors.map((doctor, i) => (
            <button
              key={`${doctor.slug}-${i}`}
              type="button"
              onClick={() => setSelected(doctor)}
              className="w-64 flex-shrink-0 rounded-2xl border border-charcoal/10 bg-white p-6 text-left transition-shadow hover:shadow-md"
            >
              <DoctorAvatar
                seed={doctor.photoSeed}
                name={doctor.name}
                photo={doctor.photo}
                size={72}
              />
              <p className="mt-4 font-serif text-lg leading-tight">{doctor.name}</p>
              <p className="mt-1 text-xs text-charcoal-muted">{doctor.title}</p>
              <p className="mt-3 text-xs text-teal-dark">{doctor.mmcNumber}</p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/60 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-bone p-8"
            >
              <DoctorAvatar
                seed={selected.photoSeed}
                name={selected.name}
                photo={selected.photo}
                size={88}
              />
              <h3 className="mt-5 font-serif text-2xl">{selected.name}</h3>
              <p className="mt-1 text-sm text-charcoal-muted">{selected.title}</p>
              <p className="mt-3 text-sm text-teal-dark">{selected.mmcNumber}</p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">
                {selected.bio}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-charcoal-muted">
                {selected.qualifications.map((q) => (
                  <li key={q} className="rounded-full border border-charcoal/10 px-3 py-1">
                    {q}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-6 rounded-full bg-charcoal px-5 py-2 text-sm text-bone"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
