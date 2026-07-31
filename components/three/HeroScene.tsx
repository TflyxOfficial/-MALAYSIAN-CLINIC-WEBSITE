"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function OrganicForm({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const lerped = useRef({ x: 0, y: 0 });

  useFrame((frame, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * 0.06;
    meshRef.current.rotation.y += delta * 0.09;

    // Restrained, lerped cursor-reactive parallax.
    lerped.current.x += (pointer.current.x - lerped.current.x) * 0.04;
    lerped.current.y += (pointer.current.y - lerped.current.y) * 0.04;

    meshRef.current.rotation.z = lerped.current.x * 0.15;
    meshRef.current.position.x = lerped.current.x * 0.4;
    meshRef.current.position.y = lerped.current.y * 0.25;
  });

  useEffect(() => {
    return () => {
      meshRef.current?.geometry.dispose();
      if (Array.isArray(meshRef.current?.material)) {
        meshRef.current?.material.forEach((m) => m.dispose());
      } else {
        (meshRef.current?.material as THREE.Material | undefined)?.dispose();
      }
    };
  }, []);

  return (
    <Icosahedron ref={meshRef} args={[1.6, 12]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#3C6E62"
        roughness={0.25}
        metalness={0.1}
        distort={0.42}
        speed={1.4}
      />
    </Icosahedron>
  );
}

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
