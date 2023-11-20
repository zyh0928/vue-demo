import { locale, localeFallback } from "@/assets/variables.json";
import en from "@/locales/en.yaml";
import zh from "@/locales/zh.yaml";

export default createI18n<[I18nSchema], I18nCode, false>({
  fallbackLocale: localeFallback,
  legacy: !1,
  locale,
  messages: {
    en,
    zh,
  },
});
