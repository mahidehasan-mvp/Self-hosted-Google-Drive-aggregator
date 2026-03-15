import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./contexts/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)",
          surface: "rgb(var(--brand-surface) / <alpha-value>)",
          border: "rgb(var(--brand-border) / <alpha-value>)",
          gray: "rgb(var(--brand-gray) / <alpha-value>)",
          electric: "rgb(var(--brand-electric) / <alpha-value>)",
          purple: "rgb(var(--brand-purple) / <alpha-value>)",
        },
        dp: {
          bg: "rgb(var(--dp-bg) / <alpha-value>)",
          s1: "rgb(var(--dp-s1) / <alpha-value>)",
          s2: "rgb(var(--dp-s2) / <alpha-value>)",
          border: "rgb(var(--dp-border) / <alpha-value>)",
          hover: "rgb(var(--dp-hover) / <alpha-value>)",
          text: "rgb(var(--dp-text) / <alpha-value>)",
          text2: "rgb(var(--dp-text2) / <alpha-value>)",
          text3: "rgb(var(--dp-text3) / <alpha-value>)",
          sidebar: "rgb(var(--dp-sidebar) / <alpha-value>)",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 5s ease-in-out 1s infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-up-d1": "fadeUp 0.6s 0.1s ease forwards both",
        "fade-up-d2": "fadeUp 0.6s 0.2s ease forwards both",
        "fade-up-d3": "fadeUp 0.6s 0.3s ease forwards both",
        "fade-up-d4": "fadeUp 0.6s 0.4s ease forwards both",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
