import { createRouter, createWebHistory } from "vue-router";
import { useLocale } from "vuetify";

import { list2tree } from "@/utils/tree";

import useGlobalStore from "#/global";
import useUserStore, { type MenuType } from "#/user";
import { getRoutes } from "$/user";
import { langs } from "~/variables.json";

import i18n from "./i18n";

import type { RouteComponent, RouteRecordRaw } from "vue-router";

const modules: StrMap<RouteComponent> = import.meta.glob("%/**/*.vue", {
  eager: !0,
  import: "default",
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "root",
      path: "/:lang(en|zh)",
      redirect: ({ params: { lang } }) => `${lang}/welcome`,
    },
    {
      component: () => import("%/error/NotFound.vue"),
      name: "notFound",
      path: "/:pathMatch(.*)*",
    },
  ],
});

const removeDynamic = () => {
  const rotues = router.getRoutes();

  rotues.forEach(({ name }) => {
    if (name && name !== "root" && name !== "notFound") {
      router.removeRoute(name);
    }
  });
};

const tree2route = (tree: MenuType[], paraent: string) => {
  tree.forEach(({ children, name, path, redirect, route }) => {
    const item = {
      name: name || route,
      path: route || "",
    } as RouteRecordRaw;

    const component = modules[`/src/pages/${path}.vue`];

    if (component) {
      item.component = component;
    }

    if (redirect) {
      item.redirect = ({ params: { lang } }) => `${lang}/${redirect}`;
    }

    router.addRoute(paraent, item);

    if (children?.length) {
      tree2route(children, route || paraent);
    }
  });
};

let setPage: (value: unknown) => void;

router.beforeEach(async ({ name, params, path }) => {
  const { reloadRoute, setMenu, setReloadRoute } = useUserStore();

  if (reloadRoute) {
    const routes = await getRoutes();

    setMenu(
      list2tree<MenuType>(routes.filter((item) => item.type !== "router")),
    );

    const tree = list2tree<MenuType>(
      routes.filter(({ type }) => type !== "menu"),
    );

    removeDynamic();

    tree2route(tree, "root");

    setReloadRoute(!1);

    router.push({ path, replace: !0 });

    return;
  }

  if (!setPage) {
    setPage = useGlobalStore().setPage;
  }

  setPage(name);

  if (name === "notFound") {
    const locales = langs.map(({ code }) => code);

    const [first] = params.pathMatch;

    if (locales.includes(first)) {
      const { current } = useLocale();

      i18n.global.locale.value = first;
      current.value = first;

      return;
    }

    router.push({
      path: `/${locales[0]}${path}`,
      replace: !0,
    });
  }
});

export default router;
