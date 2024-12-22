import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "PrimaryAttributeStrength":"#b9500b",
        "PrimaryAttributeAgility":"#167c13",
        "PrimaryAttributeIntelligence":"#22729e",
        "PrimaryAttributeUniversal":"#5d3fd3",
      },
    },
  },
  plugins: [],
} satisfies Config;
