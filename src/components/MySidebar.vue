<script lang="ts" setup>
import { list2tree } from "@/utils/tree";

import type { VNavigationDrawer as DefaultProps } from "vuetify/components";

type MenuType = {
  id: GenericScalar;
  name: I18nType;
  children?: MenuType[];
  icon?: string;
  parentId?: GenericScalar;
  route?: string;
  type?: "item" | "label";
};

interface Props extends /* @vue-ignore */ Partial<DefaultProps> {
  menus?: MenuType[];
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => [
    {
      id: 1,
      name: {
        en: "Page",
        zh: "页面",
      },
      type: "label",
    },
    {
      icon: "human-greeting-variant",
      id: 2,
      name: {
        en: "Welcome",
        zh: "嗨！！",
      },
      route: "welcome",
    },
    {
      icon: "star-shooting",
      id: 4,
      name: {
        en: "image",
        zh: "哇呜！",
      },
      route: "image",
    },
    {
      icon: "arrange-bring-forward",
      id: 5,
      name: {
        en: "About",
        zh: "关于",
      },
      route: "about",
    },
    {
      id: 6,
      name: {
        en: "Test",
        zh: "测试",
      },
      type: "label",
    },
    {
      icon: "resistor-nodes",
      id: 7,
      name: {
        en: "Root Node",
        zh: "根节点",
      },
      route: "node",
    },
    {
      id: 71,
      name: {
        en: "Subnode-1",
        zh: "子节点-1",
      },
      parentId: 7,
      route: "1",
    },
    {
      id: 72,
      name: {
        en: "Subnode-2",
        zh: "子节点-2",
      },
      parentId: 7,
      route: "2",
    },
    {
      id: 73,
      name: {
        en: "Subnode-3",
        zh: "子节点-3",
      },
      parentId: 7,
      route: "3",
    },
    {
      icon: "heart-broken",
      id: 8,
      name: {
        en: "Oops!",
        zh: "完蛋啦！",
      },
      route: "error",
    },
    {
      id: 81,
      name: {
        en: "AAA",
        zh: "一一一",
      },
      parentId: 8,
      route: "1",
    },
    {
      id: 82,
      name: {
        en: "BBB",
        zh: "二二二",
      },
      parentId: 8,
      route: "2",
    },
  ],
});

const { locale } = useI18n<Record<string, never>, I18nCode>();

const list = computed(() => list2tree<MenuType>(props.menus));
</script>

<template>
  <v-navigation-drawer width="240">
    <v-list density="compact" nav>
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
