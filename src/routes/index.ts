import Router from "vue-router";
import Vue from "vue";
import routes from "./list";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes
});
