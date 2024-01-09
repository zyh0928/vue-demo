<script setup lang="ts">
import { useLocale } from "vuetify";

import useGlobalStore from "#/global";

const route = useRoute();
const { current } = useLocale();
const { locale } = useI18n();
const { snackbar } = useGlobalStore();

const drawer = ref(!0);

watch(
  () => route.params.lang,
  (lang) => {
    if (typeof lang === "string") {
      locale.value = lang || "zh";
      current.value = lang || "zh";
    }
  },
);
</script>

<template>
  <v-app>
    <my-header @toggle="drawer = !drawer" />

    <my-sidebar :model-value="drawer" />

    <v-main>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animate__animated animate__jackInTheBox animate__fast"
          leave-active-class="animate__animated animate__bounceOut animate__fast"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>

      <v-snackbar
        v-model="snackbar.show"
        color="error"
        location="top"
        timeout="3000"
        v-bind="snackbar.options"
      >
        <template #actions>
          <v-icon @click="snackbar.show = !1">mdi-close</v-icon>
        </template>

        {{ snackbar.text }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>
