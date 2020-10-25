import State from "@/store/state";
import router from "@/router";
import { Store } from "vuex";

export default () => (store: Store<State>): void => {
  router.beforeEach(async (to, from, next) => {
    store.commit("setPage", to.name);
    next();
  });
};
