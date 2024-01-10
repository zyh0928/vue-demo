import type { MenuType } from "$/auth";

export default defineStore("user", () => {
  const menus = ref<MenuType[]>([]);

  const $reset = () => {
    menus.value = [];
  };

  const setMenu = (value: unknown) => {
    menus.value = Array.isArray(value) ? value : [];
  };

  return {
    $reset,
    menus,
    setMenu,
  };
});
