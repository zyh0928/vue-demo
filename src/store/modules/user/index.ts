import RootState from "@/store/state";
import State from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { Module } from "vuex";

const user: Module<State, RootState> = {
  namespaced: !0,

  state: new State(),
  getters,
  actions,
  mutations,
};

export default user;
