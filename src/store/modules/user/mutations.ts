import State from "./state";
// import cloneDeep from "lodash/cloneDeep";
import { MutationTree } from "vuex";

// const { toString } = Object.prototype;

const mutations: MutationTree<State> = {
  init: (state) => {
    // eslint-disable-next-line no-console
    console.log("user init:", state);
  },

  // state.profile = toString.call(data) === "[object Object]" ? cloneDeep(data) : {}
};

export default mutations;
