import useUserStore from "./user";

import type { VSnackbar } from "vuetify/components";

interface SnackbarState {
  show: boolean;
  text: string;
  options?: Partial<VSnackbar>;
}

export default defineStore("global", () => {
  const user = useUserStore();

  const page = ref("");

  const snackbar = reactive<SnackbarState>({
    show: !1,
    text: "",
  });

  const $reset = () => {
    page.value = "";
    snackbar.show = !1;
    snackbar.text = "";
  };

  const clearInfo = () => {
    $reset();

    user.$reset();

    sessionStorage.clear();
    localStorage.clear();
  };

  const setPage = (value: unknown) => {
    page.value = typeof value === "string" ? value : "";
  };

  const showSnackbar = (msg: string, options?: Partial<VSnackbar>) => {
    snackbar.text = msg;
    snackbar.options = options as StrMap;
    snackbar.show = !0;
  };

  return {
    $reset,
    clearInfo,
    page,
    setPage,
    showSnackbar,
    snackbar,
  };
});
