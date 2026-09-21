import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Design tokens from DESIGN.md: bamboo identity, one accent, green-cast
        // neutrals. See DESIGN.md for the reason behind each value.
        paper: {
          light: "#FAF7EF",
          dark: "#0C130D",
        },
        ink: {
          DEFAULT: "#1A2419",
          // soft/faint are theme-aware CSS variables (see globals.css) so body
          // text passes WCAG AA in both modes: light #46523F/#6B755F,
          // dark #A9B8A0/#98A88F.
          soft: "var(--ink-soft)",
          faint: "var(--ink-faint)",
          light: "#EDF3EA",
          softdark: "#243020",
          card: "#131C12",
          carddark: "#0A100A",
        },
        bamboo: {
          50: "#F2F7EA",
          100: "#E3EED2",
          200: "#C9E3AB",
          300: "#A8D180",
          400: "#7BC96A",
          500: "#5AA649",
          600: "#3F7D2E",
          700: "#2F6122",
          800: "#22471A",
          900: "#163110",
        },
        benchmark: {
          // Chart strokes only need 3:1 (WCAG graphical objects); text and
          // button fills use -deep (#8A5410), 5.9:1 on light paper.
          DEFAULT: "#C97A1B",
          light: "#E09A45",
          deep: "#8A5410",
        },
      },
      animation: {
        float: "float 11s ease-in-out infinite",
        "float-slow": "float 17s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
