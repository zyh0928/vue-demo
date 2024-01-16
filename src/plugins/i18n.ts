import en from "@@/locales/en.yaml";
import zh from "@@/locales/zh.yaml";

import { langs } from "~/variables.json";

const [locale] = langs.map(({ code }) => code);

export default createI18n<[StrMap<string | StrMap>], string, false>({
  fallbackLocale: locale,
  legacy: !1,
  locale,
  messages: {
    en,
    zh,
  },
});
