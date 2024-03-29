import "@/styles/main.scss";

import { createVuetify } from "vuetify";
// @ts-expect-error
import en from "vuetify/lib/locale/en";
// @ts-expect-error
import zh from "vuetify/lib/locale/zh-Hans";

import { langs } from "~/variables.json";

import type { LocaleMessages, ThemeDefinition } from "vuetify";

const [locale] = langs.map(({ code }) => code);

const light: ThemeDefinition = {
  colors: {
    // 赤紅
    error: "#cb4042",
    // 空
    info: "#58b2dc",
    // 真朱
    primary: "#ab3b3a",
    // 瑠璃
    secondary: "#005caf",
    // 青竹
    success: "#00896c",
    // 山吹
    warning: "#ffb11b",
  },
  dark: !1,
};

const messages: Record<string, LocaleMessages> = {
  en,
  zh,
};

export default createVuetify({
  locale: {
    fallback: locale,
    locale,
    messages,
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light,
    },
  },
});
