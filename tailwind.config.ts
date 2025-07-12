import type { Config } from "tailwindcss";

const config: Config = {
  // Enable dark mode via the `class` strategy so we can toggle it on <html/>.
  darkMode: "class",
  // Tell Tailwind where to look for class names.
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
