import { createRouter, createWebHistory } from "vue-router";
import { useLocale } from "vuetify";

import children from "@/routes";

import useGlobalStore from "#/global";
import { langs } from "~/variables.json";

import i18n from "./i18n";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      children,
      path: "/:lang(en|zh)",
      redirect: {
        name: "welcome",
      },
    },
    {
      path: "/",
      redirect: {
        name: "welcome",
        params: {
          lang: "zh",
        },
      },
    },
    {
      component: () => import("@/views/error/NotFound.vue"),
      name: "notFound",
      path: "/:pathMatch(.*)*",
    },
  ],
});

let setPage: (value: unknown) => void;
let current: Ref<string>;

const locales = langs.map(({ code }) => code);

router.beforeEach(({ fullPath, name, params }) => {
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

    router.push(`/en${fullPath}`);
  }
});

export default router;
