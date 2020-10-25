import State from "./state";
import { MutationTree } from "vuex";

const mutations: MutationTree<State> = {
  init: (state) => {
    state.drawer = !0;

    state.page = "";
  },

  setPage: (state, value = "") =>
    (state.page = typeof value === "string" ? value : ""),

  setDrawer: (state, value = !1) =>
    (state.drawer = typeof value === "boolean" ? value : !1),
};

export default mutations;
