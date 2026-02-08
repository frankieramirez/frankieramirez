// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://frankieramirez.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  output: "static",
  compressHTML: true,
  experimental: {
    clientPrerender: true,
  },
});
