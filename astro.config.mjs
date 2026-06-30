// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://frankieramirez.com",
  integrations: [sitemap()],
  output: "static",
  compressHTML: true,
});
