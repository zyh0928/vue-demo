<script setup lang="ts">
import { useLocale } from "vuetify";

const route = useRoute();
const { current } = useLocale();
const { locale } = useI18n();

const drawer = ref(!0);

watch(
  () => route.params.lang,
  (lang) => {
    if (typeof lang === "string") {
      locale.value = lang || "en";
      current.value = lang || "en";
    }
  },
);
</script>

<template>
  <v-app>
    <my-header @toggle="drawer = !drawer" />

    <my-sidebar :drawer="drawer" />

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
    </v-main>
  </v-app>
</template>
