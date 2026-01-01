import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  build: {
    lib: {
      entry: "src/bundle.manifests.ts", // Bundle registers one or more manifests
      formats: ["es"],
      fileName: "media-colour-finder-v-2",
    },
    outDir: "../wwwroot/App_Plugins/MediaColourFinderV2", // your web component will be saved in this location
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
