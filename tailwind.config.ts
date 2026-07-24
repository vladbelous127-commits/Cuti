import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          950: "#050505",
          900: "#0A0A0A",
          850: "#101010",
          800: "#151515",
          700: "#1C1C1C",
          600: "#242424",
        },
        brand: {
          DEFAULT: "#74A432",
          50: "#F1F7E8",
          100: "#E0EFC9",
          200: "#C6E098",
          300: "#A6CE66",
          400: "#8CBB45",
          500: "#74A432",
          600: "#5C8427",
          700: "#46641E",
          800: "#324718",
          900: "#232F12",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C766",
          dark: "#9A7C1B",
        },
        muted: {
          DEFAULT: "#A1A1A1",
          soft: "#7A7A7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(116, 164, 50, 0.45)",
        "glow-gold": "0 0 40px -12px rgba(201, 162, 39, 0.4)",
        card: "0 8px 30px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-brand":
          "radial-gradient(60% 60% at 50% 0%, rgba(116,164,50,0.18) 0%, rgba(5,5,5,0) 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 32s linear infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
