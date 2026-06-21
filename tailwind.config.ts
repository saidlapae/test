import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0a0a0a", light: "#171717", dark: "#000000" },
        accent: { DEFAULT: "#ea580c", light: "#f97316", dark: "#c2410c" },
      },
      borderRadius: { DEFAULT: "0.375rem" }, // rounded-md
      letterSpacing: { DEFAULT: "0em" }, // no tracking
    },
  },
  plugins: [],
};
export default config;
