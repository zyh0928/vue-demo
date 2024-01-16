<script lang="ts" setup>
import { list2tree } from "@/utils/tree";

import useUserStore from "#/user";
import type { MenuType } from "$/auth";

import type { VNavigationDrawer as DefaultProps } from "vuetify/components";

type TreeItem = MenuType & { children?: MenuType[] };

interface Props extends /* @vue-ignore */ Partial<DefaultProps> {}

withDefaults(defineProps<Props>(), {});

const { locale } = useI18n();

const { menus } = storeToRefs(useUserStore());

const list = computed(() => list2tree<TreeItem>(menus.value));
</script>

<template>
  <v-navigation-drawer width="240">
    <v-list density="compact" nav>
      <template v-for="item of list" :key="item.id">
        <v-list-group
          v-if="Array.isArray(item.children)"
          :value="item.id"
          color="primary"
        >
          <template #activator="{ props: itemProps }">
            <v-list-item
              v-bind="itemProps"
              :prepend-icon="`mdi-${item.icon}`"
              :title="item.name?.[locale]"
            />
          </template>

          <v-list-item
            v-for="subitem of item.children"
            :key="subitem.id"
            :title="subitem.name?.[locale]"
            :to="`/${locale}/${item.route}/${subitem.route}`"
            :value="`/${item.route}/${subitem.route}`"
            color="primary"
          />
        </v-list-group>

        <v-list-item
          v-else
          :prepend-icon="`mdi-${item.icon}`"
          :title="item.name?.[locale]"
          :to="`/${locale}/${item.route}`"
          color="primary"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
