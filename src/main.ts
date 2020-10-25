import App from "./App.vue";
import Vue from "vue";
import i18n from "./i18n";
import router from "./router";
import store from "./store";
import * as utils from "@/utils";
import vuetify from "@/plugins/vuetify";
import { Utils } from "typings";

Vue.config.errorHandler = (e, vm) => {
  vm;
  // eslint-disable-next-line no-console
  console.log("Vue Caught global error:\n\n", e.stack || e);
};

/**
 * * 定义自定义工具类
 */
declare module "vue/types/vue" {
  interface Vue {
    readonly $utils: Utils;
  }
}
Vue.prototype.$utils = utils;

Vue.config.productionTip = !1;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
