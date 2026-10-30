// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://frankieramirez.com",
  integrations: [sitemap()],
  output: "static",
  compressHTML: true,
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans",
      cssVariable: "--font-plex-sans",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Serif",
      cssVariable: "--font-plex-serif",
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["ui-serif", "Georgia", "serif"],
    },
    {
      provider: fontProviders.local(),
      name: "Geist Serif",
      cssVariable: "--font-geist-serif",
      fallbacks: ["ui-serif", "Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-serif/GeistSerif-Regular.woff2"],
            weight: 400,
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-plex-mono",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "Menlo", "Consolas", "monospace"],
    },
  ],
});
