import type { Config } from "tailwindcss";

// GreenSquareAccord tokens, taken from greensquareaccord.co.uk/dist/css/styles.css
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Charcoal - header, footer, body text
        ink: {
          DEFAULT: "#2d363a",
          deep: "#1d2326",
        },
        // Magenta - primary buttons & links
        brand: {
          DEFAULT: "#dd0079",
          hover: "#c4006b",
        },
        // Teal - eyebrow, icons, focus
        teal: {
          DEFAULT: "#00857f",
          bright: "#009a93",
          soft: "#e6f4f3",
        },
        // Orange - tertiary buttons / hero eyebrow
        orange: {
          DEFAULT: "#ff8f15",
          hover: "#fb8300",
        },
        leaf: "#8da72f",
        mute: "#717678",
        line: "#e4e8ec",
        surface: "#f3f5f7",
        success: "#8da72f",
      },
      fontFamily: {
        sans: [
          "proxima-nova",
          "var(--font-fallback)",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        4.5: "1.125rem",
      },
      borderRadius: {
        pill: "80px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(16,24,40,0.05)",
        soft: "0 2px 10px -4px rgba(16,24,40,0.12)",
        card: "0 8px 24px -12px rgba(16,24,40,0.18)",
        premium: "0 30px 70px -30px rgba(29,35,38,0.45)",
        brand: "0 12px 30px -10px rgba(221,0,121,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
