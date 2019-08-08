/// <reference types="vuetify" />
// Customization
import "@/style/app.scss";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    options: {
      customProperties: !0
    }
  }
});
