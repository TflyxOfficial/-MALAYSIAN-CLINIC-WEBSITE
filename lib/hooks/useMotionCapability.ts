"use client";

import { useEffect, useState } from "react";

export interface MotionCapability {
  prefersReducedMotion: boolean;
  isLowEndDevice: boolean;
  /** True when we should render the full WebGL / heavy-motion experience. */
  canUseWebGL: boolean;
  ready: boolean;
}

export function useMotionCapability(): MotionCapability {
  const [state, setState] = useState<MotionCapability>({
    prefersReducedMotion: false,
    isLowEndDevice: false,
    canUseWebGL: false,
    ready: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mq.matches;
    const cores =
      typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
        ? navigator.hardwareConcurrency
        : 8;
    const isLowEndDevice = cores > 0 && cores < 4;

    setState({
      prefersReducedMotion,
      isLowEndDevice,
      canUseWebGL: !prefersReducedMotion && !isLowEndDevice,
      ready: true,
    });

    const listener = (e: MediaQueryListEvent) => {
      setState((s) => ({
        ...s,
        prefersReducedMotion: e.matches,
        canUseWebGL: !e.matches && !s.isLowEndDevice,
      }));
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return state;
}
