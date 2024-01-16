export type MenuType = Partial<{
  children: MenuType[];
  icon: string;
  id: StrNum;
  label: StrMap;
  name: string;
  parentId: StrNum;
  path: string;
  redirect: string;
  route: string;
  type: "all" | "menu" | "router";
}>;

export default defineStore("user", () => {
  const reloadRoute = ref(!0);

  const menus = ref<MenuType[]>([]);

  const $reset = () => {
    reloadRoute.value = !0;
    menus.value = [];
  };

  const setReloadRoute = (value: unknown) => {
    reloadRoute.value = Boolean(value);
  };

  const setMenu = (value: unknown) => {
    menus.value = Array.isArray(value) ? value : [];
  };

  return {
    $reset,
    menus,
    reloadRoute,
    setMenu,
    setReloadRoute,
  };
});
