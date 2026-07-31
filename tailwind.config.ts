import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: {
          DEFAULT: "#F7F5F1",
          dim: "#EFEBE3",
          deep: "#E5DFD3",
        },
        charcoal: {
          DEFAULT: "#111111",
          soft: "#2A2A28",
          muted: "#5A5750",
        },
        teal: {
          DEFAULT: "#3C6E62",
          light: "#5C8F82",
          dark: "#254A41",
          tint: "#DCE8E4",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      maxWidth: {
        content: "1440px",
      },
      transitionTimingFunction: {
        clinic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
