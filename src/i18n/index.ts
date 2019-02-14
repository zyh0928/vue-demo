import VeeValidate from "vee-validate";
import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en";
import enValidation from "./en/validation";
import zhHans from "./zh-Hans";
import zhHansValidation from "./zh-Hans/validation";

Vue.use(VueI18n);

const i18n = new VueI18n({
  fallbackLocale: "zh-Hans",
  locale: "zh-Hans",
  messages: {
    "zh-Hans": zhHans,
    en
  }
  // silentTranslationWarn: !0
});

Vue.use(VeeValidate, {
  dictionary: {
    "zh-Hans": {
      messages: zhHansValidation
    },
    en: {
      messages: enValidation
    }
  },
  i18n,
  i18nRootKey: "validations"
});

export default i18n;
