<script lang="ts" setup>
import { defalutMenus, sidebarWidth } from "@/assets/variables.json";
import { list2tree } from "@/utils/tree";

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
    <v-list nav>
      <template v-for="item of list" :key="item.id">
        <v-list-subheader v-if="item.type === 'label'">
          {{ item.name[locale] }}
        </v-list-subheader>

        <v-list-group v-else-if="Array.isArray(item.children)" color="primary">
          <template #activator="{ props: itemProps }">
            <v-list-item
              v-bind="itemProps"
              :prepend-icon="`mdi-${item.icon}`"
              :title="item.name[locale]"
            />
          </template>

          <v-list-item
            v-for="subitem of item.children"
            :key="subitem.id"
            :title="subitem.name[locale]"
            :to="`/${locale}/${item.route}/${subitem.route}`"
            color="primary"
          />
        </v-list-group>

        <v-list-item
          v-else
          :prepend-icon="`mdi-${item.icon}`"
          :title="item.name[locale]"
          :to="`/${locale}/${item.route}`"
          color="primary"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
