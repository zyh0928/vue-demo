<script setup lang="ts">
import { useLocale } from "vuetify";

const route = useRoute();
const { current } = useLocale();
const { locale } = useI18n();

const theme = ref(localStorage.getItem("theme") ?? "light");
const drawer = ref(!0);

const toggleTheme = () => {
  const value = theme.value === "dark" ? "light" : "dark";

  theme.value = value;

  localStorage.setItem("theme", value);
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

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
  <v-app :theme="theme">
    <my-header @toggle:dark="toggleTheme" @toggle:drawer="toggleDrawer" />

    <my-sidebar :drawer="drawer" />

    <v-main>
      <v-container class="h-100">
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animate__animated animate__jackInTheBox animate__fast"
            leave-active-class="animate__animated animate__bounceOut animate__fast"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
