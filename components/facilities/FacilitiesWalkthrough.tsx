"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMotionCapability } from "@/lib/hooks/useMotionCapability";

const FacilitiesScene = dynamic(
  () => import("@/components/three/FacilitiesScene"),
  { ssr: false }
);

const rooms = [
  {
    title: "Consultation Suites",
    body: "Private, soundproofed rooms for unhurried first consultations.",
    image: "/images/facilities/consultation-room.jpg",
  },
  {
    title: "Infusion Lounge",
    body: "A quiet, monitored space for IV nutrient therapy sessions.",
    image: "/images/facilities/lounge.jpg",
  },
  {
    title: "Treatment Rooms",
    body: "Purpose-built rooms for aesthetic and dermatological procedures.",
    image: "/images/facilities/treatment-room-2.jpg",
  },
  {
    title: "Recovery Corner",
    body: "A calm space to rest before you head back out into the day.",
    image: "/images/facilities/treatment-room-3.jpg",
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
          <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden px-8 text-center">
            <Image
              src="/images/facilities/reception.jpg"
              alt="Klinik Serenity reception"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-charcoal/60" />
            <p className="relative font-serif text-2xl text-bone">
              A calmer kind of clinic.
            </p>
            <p className="relative max-w-sm text-sm text-bone/80">
              3D walkthrough disabled for reduced motion / lower-powered
              devices. See the room list below.
            </p>
          </div>
        )}
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {rooms.map((room) => (
          <div
            key={room.title}
            className="overflow-hidden rounded-2xl border border-charcoal/10"
          >
            <div className="relative h-48 w-full">
              <Image
                src={room.image}
                alt={room.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="font-serif text-xl">{room.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                {room.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
