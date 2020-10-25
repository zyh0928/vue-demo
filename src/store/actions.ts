import State from "./state";
import { ActionTree } from "vuex";
import { sendHttp } from "@/utils";

const actions: ActionTree<State, State> = {
  clearInfo: ({ commit }): void => {
    commit("init");
    commit("user/init");

    sessionStorage.clear();
    localStorage.clear();
  },

  toggleDrawer: ({ state: { drawer }, commit }) => commit("setDrawer", !drawer),

  getAjax: async ({ getters: { mapApi } }, api) => {
    const resp = await sendHttp({ url: mapApi("path", api), returnAll: !0 });

    return resp;
  },
};

export default actions;
