import State from "./state";
import axios from "axios";
import { ActionTree } from "vuex";

const actions: ActionTree<State, State> = {
  toggleDrawer: ({ state: { drawer }, commit }) => commit("setDrawer", !drawer),

  getAjax: async (store, api) => {
    const { data } = await axios.get(process.env.VUE_APP_API + api);

    return data;
  }
};

export default actions;
