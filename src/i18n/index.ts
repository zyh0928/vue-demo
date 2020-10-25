import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en";
import zhHans from "./zh-Hans";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

Vue.use(VueI18n);

const i18n = new VueI18n({
  fallbackLocale: "zh-Hans",
  locale: "zh-Hans",
  messages: {
    "zh-Hans": zhHans,
    en,
  },
  // silentTranslationWarn: !0
});

extend("required", {
  ...required,
  message: (_, values): any => i18n.t("validations.required", values),
});

export default i18n;
