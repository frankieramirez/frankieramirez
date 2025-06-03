// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://frankieramirez.com", // Update with your actual domain
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
  ],
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
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Manrope",
        weights: [200, 300, 400, 500, 600, 700, 800],
        styles: ["normal"],
        cssVariable: "--font-manrope",
        display: "swap",
        subsets: ["latin"],
      },
    ],
  },
});
