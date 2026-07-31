"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/data/testimonials";

function PlaceholderPhoto({ seed, label }: { seed: string; label: string }) {
  const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const hue = hash % 360;
  return (
    <div
      className="flex h-48 items-center justify-center text-xs text-white/70"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 30% 30%), hsl(${hue} 20% 15%))`,
      }}
    >
      {label}
    </div>
  );
}

export default function BeforeAfterCard({ testimonial }: { testimonial: Testimonial }) {
  const [revealed, setRevealed] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
      <div className="grid grid-cols-2">
        <div className={`blur-reveal ${revealed ? "revealed" : ""}`}>
          <PlaceholderPhoto seed={`${testimonial.beforeAfterSeed}-before`} label="Before" />
        </div>
        <div className={`blur-reveal ${revealed ? "revealed" : ""}`}>
          <PlaceholderPhoto seed={`${testimonial.beforeAfterSeed}-after`} label="After" />
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-widest2 text-teal-dark">
          {testimonial.procedureCategory}
        </p>
        <p className="mt-3 text-sm italic leading-relaxed text-charcoal-soft">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="mt-3 text-xs text-charcoal-muted">
          — {testimonial.initials}
          {testimonial.consentOnFile && " · Written consent on file"}
        </p>

        {!revealed ? (
          <div className="mt-5 rounded-xl bg-bone-dim p-4">
            <label className="flex items-start gap-2 text-xs text-charcoal-muted">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                I understand these are real patient photos shared with
                consent, individual results vary, and these images are not
                a guarantee of outcome.
              </span>
            </label>
            <button
              type="button"
              disabled={!acknowledged}
              onClick={() => setRevealed(true)}
              className="mt-3 w-full rounded-full bg-charcoal px-4 py-2 text-xs text-bone disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reveal photos
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(false)}
            className="mt-5 text-xs text-teal-dark underline underline-offset-4"
          >
            Blur again
          </button>
        )}
      </div>
    </div>
  );
}
