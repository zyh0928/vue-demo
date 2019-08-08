<template>
  <v-app-bar app clipped-left color="primary" dark dense elevate-on-scroll>
    <v-app-bar-nav-icon @click="$store.dispatch('toggleDrawer')" />
    <v-toolbar-title>{{
      $te(`view.${page}.title`) ? $t(`view.${page}.title`) : "Vue Demo"
    }}</v-toolbar-title>

    <v-spacer />

    <v-btn @click="toggleDark" icon>
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>

    <v-menu offset-y transition="slide-y-transition">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-web</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          :key="`header-lang${code}`"
          @click="setLang(code)"
          v-for="{ code, label } of langs"
        >
          <v-list-item-avatar>
            <v-img :src="`${baseUrl}icon/${code}.svg`" />
          </v-list-item-avatar>

          <v-list-item-title>{{ label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Global } from "typings";
import { State } from "vuex-class";

@Component
export default class MyHeader extends Vue {
  @State
  readonly page!: string;

  readonly baseUrl: string = process.env.BASE_URL;

  toggleDark() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

    localStorage.dark = this.$vuetify.theme.dark;
  }

  langs: Global.Language[] = [
    { code: "zh-Hans", label: "简体中文" },
    { code: "en", label: "English" }
  ];

  setLang(lang: "zh-Hans" | "en" = "zh-Hans") {
    this.$i18n.locale = lang;

    document.documentElement.lang = lang;

    localStorage.lang = lang;
  }

  created() {
    const { dark, lang = "zh-Hans" } = localStorage;

    this.$vuetify.theme.dark = dark === "true";

    this.setLang(lang);
  }
}
</script>
