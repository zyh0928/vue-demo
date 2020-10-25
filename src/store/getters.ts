import State from "./state";
import { GetterTree } from "vuex";

const getters: GetterTree<State, State> = {
  mapApi: (state, getters) => (path: string, ...args: any) => {
    const map = getters[path];
    const route = typeof map === "string" ? map : map(...args);

    return `${process.env.VUE_APP_API}/${route}`;
  },

  path: () => (path: string) => `${path}`,
};

export default getters;
