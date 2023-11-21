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
  base: loadEnv(mode, process.cwd(), "BASE_URL").BASE_URL,
  build: {
    terserOptions: {
      compress: {
        drop_console: !0,
      },
    },
  },
  envPrefix: "DEMO_",
  plugins: [
    AutoImport({
      dts: "types/auto-imports.d.ts",
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
      dts: "types/auto-components.d.ts",
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    VueI18n({
      include: resolve(__dirname, "src/locales/**"),
    }),
    Vuetify({
      styles: { configFile: "src/styles/settings.scss" },
    }),
    Unfonts({
      google: {
        display: "block",
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
  ],
  resolve: {
    alias: {
      "#": resolve(__dirname, "src/store"),
      $: resolve(__dirname, "src/service"),
      "@": resolve(__dirname, "src"),
      "~": resolve(__dirname, "src/assets"),
    },
  },
  server: {
    port: 9029,
    proxy: {
      "/cat-api": {
        changeOrigin: !0,
        rewrite: (path) => path.replace(/^\/cat-api/, ""),
        target: "https://api.thecatapi.com",
      },
      "/dog-api": {
        changeOrigin: !0,
        rewrite: (path) => path.replace(/^\/dog-api/, ""),
        target: "https://shibe.online/api",
      },
      "/jrsc-api": {
        changeOrigin: !0,
        rewrite: (path) => path.replace(/^\/jrsc-api/, ""),
        target: "https://v2.jinrishici.com",
      },
    },
    strictPort: !0,
  },
}));
