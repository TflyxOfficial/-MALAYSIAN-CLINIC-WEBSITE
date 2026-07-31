"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const rooms = [
  { position: [0, 0, 0] as [number, number, number], color: "#DCE8E4" },
  { position: [4.5, 0.4, -3] as [number, number, number], color: "#E5DFD3" },
  { position: [-4.5, -0.4, -6] as [number, number, number], color: "#3C6E62" },
  { position: [2, 0.2, -9] as [number, number, number], color: "#EFEBE3" },
];

function Rig({ containerId }: { containerId: string }) {
  const cameraTarget = useRef({ z: 6 });

  useFrame((state) => {
    state.camera.position.z = cameraTarget.current.z;
    state.camera.lookAt(0, 0, cameraTarget.current.z - 6);
  });

  useEffect(() => {
    const trigger = document.getElementById(containerId);
    if (!trigger) return;

    const ctx = gsap.context(() => {
      gsap.to(cameraTarget.current, {
        z: -10,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    });

    return () => ctx.revert();
  }, [containerId]);

  return null;
}

function RoomMarker({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    return () => {
      ref.current?.geometry.dispose();
      const mat = ref.current?.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    };
  }, []);

  return (
    <group position={position}>
      <RoundedBox args={[3, 1.6, 3]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
      </RoundedBox>
      <Sphere ref={ref} args={[0.25, 24, 24]} position={[0, 1.3, 0]}>
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </Sphere>
    </group>
  );
}

export default function FacilitiesScene({ containerId }: { containerId: string }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.2, 6], fov: 50 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#F7F5F1"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-4, -2, -6]} intensity={0.35} color="#3C6E62" />
      {rooms.map((room, i) => (
        <RoomMarker key={i} position={room.position} color={room.color} />
      ))}
      <Rig containerId={containerId} />
    </Canvas>
  );
}
