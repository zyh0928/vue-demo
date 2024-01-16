<script lang="ts" setup>
import { useTitle } from "@vueuse/core";
import { useTheme } from "vuetify/lib/framework.mjs";

import useUserStore from "#/user";
import { langs } from "~/variables.json";

defineEmits<{ toggle: [] }>();

const baseUrl = import.meta.env.BASE_URL;

const title = useTitle();
const theme = useTheme();
const route = useRoute();
const { locale, t } = useI18n();
const { menus } = storeToRefs(useUserStore());

// TODO: to store
const toggleTheme = () => {
  const mode = theme.global.current.value.dark ? "light" : "dark";

  theme.global.name.value = mode;

  localStorage.setItem("theme", mode);
};

const getTitle = (paths: string[]) => {
  if (!paths.length) return;

  let node = menus.value.find((item) => item.route === paths[0]);

  paths.slice(1).forEach((path) => {
    node = node?.children?.find((item) => item.route === path) ?? node;
  });

  return node;
};

onMounted(() => {
  theme.global.name.value = localStorage.getItem("theme") ?? "light";
});

watch(
  () => route.path,
  (value) => {
    const paths = value.split("/").slice(2);

    const node = getTitle(paths);

    title.value = node?.label?.[locale.value] || t("pages.error.404");
  },
);
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('toggle')" />
    </template>

    <v-app-bar-title>
      {{ title }}
    </v-app-bar-title>

    <template #append>
      <v-menu location="start top" transition="fab-transition">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-translate" />
        </template>

        <v-list density="compact" nav>
          <v-list-item
            v-for="{ code, label } of langs"
            :key="code"
            :active="code === $i18n.locale"
            color="primary"
            @click="$router.push({ params: { lang: code }, replace: !0 })"
          >
            <template #prepend>
              <v-avatar
                :image="`${baseUrl}icons/${code}.svg`"
                density="compact"
                rounded="0"
              />
            </template>

            <v-list-item-title>{{ label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme" />
    </template>
  </v-app-bar>
</template>
