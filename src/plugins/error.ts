import type { Plugin } from "vue";

export default <Plugin>{
  install: (Vue) => {
    Vue.config.errorHandler = (e: unknown, vm) => {
      vm;
      // eslint-disable-next-line no-console
      console.log("Vue Caught global error:\n\n", e);
    };
  },
};
