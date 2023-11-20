import en from "@/locales/en.yaml";
import zh from "@/locales/zh.yaml";

import { locale, localeFallback } from "~/variables.json";

export default createI18n<[I18nSchema], I18nCode, false>({
  fallbackLocale: localeFallback,
  legacy: !1,
  locale,
  messages: {
    en,
    zh,
  },
});
