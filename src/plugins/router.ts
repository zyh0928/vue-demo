import { createRouter, createWebHistory } from "vue-router";
import { useLocale } from "vuetify";

import useGlobalStore from "#/global";
import useUserStore from "#/user";
import { type MenuType, getRoutes } from "$/auth";
import { langs } from "~/variables.json";

import i18n from "./i18n";

import type { RouteComponent } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

let routes: MenuType[];
let setPage: (value: unknown) => void;
let current: Ref<string>;

const locales = langs.map(({ code }) => code);

router.beforeEach(async ({ name, params, path }) => {
  if (!routes?.length) {
    const { setMenu } = useUserStore();

    routes = await getRoutes();

    setMenu(routes.filter((item) => item.type !== "route"));

    const modules: Recordable<RouteComponent> = import.meta.glob("%/**/*.vue", {
      eager: !0,
      import: "default",
    });

    routes.forEach(({ component: path, props, route, type }) => {
      const component = modules[`/src/pages/${path}.vue`];

      if (component) {
        let routeProps = {};

        try {
          routeProps = JSON.parse(props ?? "{}");
        } catch {
          //
        }

        router.addRoute({
          ...routeProps,
          component,
          name: route,
          path: `/:lang(zh|en)/${route}`,
        });
      }

      if (type === "route") {
        try {
          const routeProps = JSON.parse(props ?? "{}");

          router.addRoute({
            ...routeProps,
            path: route ?? "/",
          });
        } catch {
          //
        }
      }
    });

    router.addRoute({
      component: () => import("%/error/NotFound.vue"),
      name: "notFound",
      path: "/:pathMatch(.*)*",
    });

    router.push(path);
  }

  if (!setPage) {
    setPage = useGlobalStore().setPage;
  }

  setPage(name);

  if (name === "notFound") {
    const [first] = params.pathMatch;

    if (!current) {
      current = useLocale().current;
    }

    if (locales.includes(first)) {
      i18n.global.locale.value = first as I18nCode;
      current.value = first;
      return;
    }

    router.push(`/zh${path}`);
  }
});

export default router;
