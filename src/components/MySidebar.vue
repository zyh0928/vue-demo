<script lang="ts" setup>
import { list2tree } from "@/utils/tree";

import { defalutMenus, sidebarWidth } from "~/variables.json";

type MenuType = {
  children?: MenuType[];
  icon?: string;
  id: GenericScalar;
  name: I18nType;
  parentId?: GenericScalar;
  route?: string;
  type?: "item" | "label";
};

type Props = {
  drawer: boolean;
  menus?: MenuType[];
};

const props = withDefaults(defineProps<Props>(), {
  menus: () => defalutMenus as MenuType[],
});

const { locale } = useI18n<Record<string, never>, I18nCode>();

const list = computed(() => list2tree<MenuType>(props.menus));
</script>

<template>
  <v-navigation-drawer :model-value="drawer" :width="sidebarWidth">
    <v-list nav density="compact">
      <template
        v-for="{ id, type, route, name, children, icon } of list"
        :key="id"
      >
        <v-list-subheader v-if="type === 'label'">
          {{ name[locale] }}
        </v-list-subheader>

        <v-list-group
          v-else-if="Array.isArray(children)"
          :value="id"
          color="primary"
        >
          <template #activator="{ props: itemProps }">
            <v-list-item
              v-bind="itemProps"
              :prepend-icon="`mdi-${icon}`"
              :title="name[locale]"
            />
          </template>

          <v-list-item
            v-for="subitem of children"
            :key="subitem.id"
            :title="subitem.name[locale]"
            :to="`/${locale}/${route}/${subitem.route}`"
            :value="`/${route}/${subitem.route}`"
            color="primary"
          />
        </v-list-group>

        <v-list-item
          v-else
          :prepend-icon="`mdi-${icon}`"
          :title="name[locale]"
          :to="`/${locale}/${route}`"
          color="primary"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
