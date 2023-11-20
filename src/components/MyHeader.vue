<script lang="ts" setup>
import useGlobalStore from "#/global";
import { langs } from "~/variables.json";

defineEmits<{
  "toggle:dark": [];
  "toggle:drawer": [];
}>();

const globalStore = useGlobalStore();

const { page } = storeToRefs(globalStore);

const baseUrl = import.meta.env.BASE_URL;
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('toggle:drawer')" />
    </template>

    <v-app-bar-title>
      {{
        $te(`views.${page}.title`)
          ? $t(`views.${page}.title`)
          : $t("views.error.404")
      }}
    </v-app-bar-title>

    <template #append>
      <v-menu location="start top" transition="fab-transition">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-translate" />
        </template>

        <v-list>
          <v-list-item
            v-for="{ code, label } of langs"
            :key="code"
            :active="code === $i18n.locale"
            :disabled="code === $i18n.locale"
            color="primary"
            @click="$router.push({ params: { lang: code } })"
          >
            <template #prepend>
              <v-avatar rounded="0">
                <v-img :src="`${baseUrl}icon/${code}.svg`" />
              </v-avatar>
            </template>

            <v-list-item-title>{{ label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon="mdi-theme-light-dark" @click="$emit('toggle:dark')" />
    </template>
  </v-app-bar>
</template>
