import type { Config } from "tailwindcss";

// NOTE: Tailwind v4 is configured CSS-first via the `@theme` block in
// `app/globals.css` — that is the single source of truth for the theme.
// This file is kept only to document the content sources; color/font tokens
// live in globals.css. (A v4 JS config is NOT auto-loaded without `@config`.)
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
};

export default config;
