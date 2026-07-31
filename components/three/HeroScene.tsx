"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const HERO_MODEL_URL = "/models/hero-organic.glb";

// Commissioned abstract sculptural form (Draco-free, WebP-compressed
// glTF, ~1MB) — replaces the earlier procedural MeshDistortMaterial
// stand-in referenced in the README.
function OrganicForm({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const lerped = useRef({ x: 0, y: 0 });
  const { scene } = useGLTF(HERO_MODEL_URL);

  const model = useMemo(() => scene.clone(true), [scene]);

  useFrame((frame, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x += delta * 0.06;
    groupRef.current.rotation.y += delta * 0.09;

    // Restrained, lerped cursor-reactive parallax.
    lerped.current.x += (pointer.current.x - lerped.current.x) * 0.04;
    lerped.current.y += (pointer.current.y - lerped.current.y) * 0.04;

    groupRef.current.rotation.z = lerped.current.x * 0.15;
    groupRef.current.position.x = lerped.current.x * 0.4;
    groupRef.current.position.y = lerped.current.y * 0.25;
  });

  useEffect(() => {
    return () => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };
  }, [model]);

  return (
    <group ref={groupRef} scale={2.1} position={[0, -0.3, 0]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(HERO_MODEL_URL);

function PointerTracker({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { size } = useThree();
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / size.width) * 2 - 1;
      pointer.current.y = -((e.clientY / size.height) * 2 - 1);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [pointer, size]);
  return null;
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const dpr = useMemo<[number, number]>(() => [1, 1.8], []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 4]} intensity={1.1} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#E5DFD3" />
      <OrganicForm pointer={pointer} />
      <PointerTracker pointer={pointer} />
    </Canvas>
  );
}
