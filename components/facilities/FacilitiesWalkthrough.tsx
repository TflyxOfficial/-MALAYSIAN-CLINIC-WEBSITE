"use client";

import dynamic from "next/dynamic";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";

const FacilitiesScene = dynamic(
  () => import("@/components/three/FacilitiesScene"),
  { ssr: false }
);

const rooms = [
  {
    title: "Consultation Suites",
    body: "Private, soundproofed rooms for unhurried first consultations.",
  },
  {
    title: "Infusion Lounge",
    body: "A quiet, monitored space for IV nutrient therapy sessions.",
  },
  {
    title: "Treatment Rooms",
    body: "Purpose-built rooms for aesthetic and dermatological procedures.",
  },
  {
    title: "Recovery Corner",
    body: "A calm space to rest before you head back out into the day.",
  },
];

export default function FacilitiesWalkthrough() {
  const { canUseWebGL, ready } = useMotionCapability();

  return (
    <div id="facilities-walkthrough" className="relative">
      <div className="sticky top-16 h-[70vh] overflow-hidden rounded-2xl border border-charcoal/10 bg-bone-dim">
        {ready && canUseWebGL ? (
          <FacilitiesScene containerId="facilities-walkthrough" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-teal-tint via-bone to-bone-deep px-8 text-center">
            <p className="font-serif text-2xl">A calmer kind of clinic.</p>
            <p className="max-w-sm text-sm text-charcoal-muted">
              3D walkthrough disabled for reduced motion / lower-powered
              devices. See the room list below.
            </p>
          </div>
        )}
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {rooms.map((room) => (
          <div key={room.title} className="rounded-2xl border border-charcoal/10 p-8">
            <h2 className="font-serif text-xl">{room.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
              {room.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
