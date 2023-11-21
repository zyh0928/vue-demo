import useUserStore from "./user";

export default defineStore("global", () => {
  const user = useUserStore();

  const page = ref("");

  const $reset = () => {
    page.value = "";
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

  return {
    $reset,
    clearInfo,
    page,
    setPage,
  };
});
