import { colors } from "@/assets/variables.json";

import useUserStore from "./user";

export default defineStore("global", {
  actions: {
    clearInfo() {
      this.init();

      const user = useUserStore();
      user.init();

      sessionStorage.clear();
      localStorage.clear();
    },
    getRandomColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
    getSequenceColor(index: number) {
      return this.colors[index % this.colors.length];
    },
    init() {
      this.page = "";
    },
    setPage(value: unknown) {
      this.page = typeof value === "string" ? value : "";
    },
  },
  getters: {},
  state: () => ({
    colors,
    page: "",
  }),
});
