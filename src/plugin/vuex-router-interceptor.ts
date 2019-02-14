import State from "@/store/state";
import router from "@/routes";
import { Store } from "vuex";

export default () => (store: Store<State>) => {
  router.beforeEach(async (to, from, next) => {
    store.commit("setPage", to.name);
    next();
  });
};
