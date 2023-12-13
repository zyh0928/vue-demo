import { resolve } from "path";

import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Unfonts from "unplugin-fonts/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, __dirname, "BASE_URL").BASE_URL,
  envPrefix: "DEMO_",
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : void 0,
  },
  plugins: [
    Unfonts({
      google: {
        families: [
          {
            name: "Raleway",
            styles: "wght@100;300;400;500;700;900",
          },
          {
            name: "Noto Sans SC",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
        injectTo: "body",
      },
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    VueI18n({
      include: resolve(__dirname, "locales/**"),
    }),
    Vuetify({
      styles: { configFile: "src/styles/settings.scss" },
    }),
    AutoImport({
      dts: "@types/auto-imports.d.ts",
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "vue-i18n": ["createI18n", "useI18n"],
        },
      ],
    }),
    Components({
      dts: "@types/auto-components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "#": resolve(__dirname, "src/store"),
      $: resolve(__dirname, "src/service"),
      "%": resolve(__dirname, "src/pages"),
      "@": resolve(__dirname, "src"),
      "@@": resolve(__dirname, "."),
      "~": resolve(__dirname, "src/assets"),
    },
  },
  server: {
    host: !0,
    port: 9029,
    strictPort: !0,
  },
}));
