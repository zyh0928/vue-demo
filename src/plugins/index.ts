import "@/styles/main.scss";

import error from "./error";
import i18n from "./i18n";
import router from "./router";
import vuetify from "./vuetify";

import type { App } from "vue";

const store = createPinia();

export default (app: App) => {
  app.use(router).use(store).use(i18n).use(vuetify).use(error);
};
