import "@/styles/main.scss";

import { createVuetify } from "vuetify";
import { en, zhHans } from "vuetify/locale";

import { locale, localeFallback } from "~/variables.json";

import type { LocaleMessages, ThemeDefinition } from "vuetify";

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

const messages: Record<I18nCode, LocaleMessages> = {
  en,
  zh: zhHans,
};

export default createVuetify({
  locale: {
    fallback: localeFallback,
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
