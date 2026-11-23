import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        brand: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        artisan: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          // 2 Core Brand Colors: Primary & Complementary Secondary
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          pink: "var(--brand-primary)",
          emerald: "var(--brand-secondary)",
          magenta: "var(--brand-primary)",

          // Aliases mapped cleanly to the 2-color palette
          "1st-primary": "var(--brand-primary)",
          "2nd-primary": "var(--brand-secondary)",
          "3rd-primary": "var(--brand-primary)",
          "4th-primary": "var(--brand-secondary)",
          orange: "var(--brand-secondary)",
          purple: "var(--brand-primary)",
          plum: "var(--brand-primary)",
          blue: "var(--brand-secondary)",

          accent: "var(--brand-secondary)",
          info: "var(--brand-secondary)",

          // Neutrals & Status
          dark: "#291720",
          surface: "#291720",
          success: "var(--brand-secondary)",
        },
        primary: {
          DEFAULT: "var(--brand-primary)",
        },
        secondary: {
          DEFAULT: "var(--brand-secondary)",
        },
      },
      keyframes: {
        "slide-ltr": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "slide-rtl": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "slide-ltr": "slide-ltr 30s linear infinite",
        "slide-rtl": "slide-rtl 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
