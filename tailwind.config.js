/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          charcoal: "#18181B",
          secondary: "#232326",
          surface: "#121215",
          border: "#27272A",
          borderLight: "#3F3F46",
          offwhite: "#FAFAFA",
          muted: "#A1A1AA",
          accent: "#E4E4E7",
          titanium: "#C7C7CD",
        },
      },
      fontFamily: {
        display: ["Syne", "Cabinet Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      aspectRatio: {
        "9/16": "9 / 16",
        "16/9": "16 / 9",
        "4/5": "4 / 5",
        "21/9": "21 / 9",
      },
      letterSpacing: {
        widestx: "0.25em",
        tighterx: "-0.04em",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseSlow: "pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
