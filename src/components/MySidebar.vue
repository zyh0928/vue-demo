<template>
  <v-navigation-drawer app clipped v-model="$store.state.drawer">
    <sidebar-menu :menus="menus" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SidebarMenu from "./SidebarMenu.vue";
import { Menu } from "typings";
@Component({
  components: {
    SidebarMenu,
  },
})
export default class MySidebar extends Vue {
  readonly menus: Menu[] = [
    {
      id: 1,
      label: !0,
      name: {
        "zh-Hans": "页面",
        en: "Page",
      },
    },
    {
      icon: "mdi-ghost",
      id: 2,
      name: {
        "zh-Hans": "嗨！！",
        en: "Welcome",
      },
      route: "welcome",
    },
    {
      icon: "mdi-alien",
      id: 3,
      name: {
        "zh-Hans": "干货",
        en: "Gank",
      },
      route: "gank",
    },
    {
      icon: "mdi-face-woman-shimmer",
      id: 4,
      name: {
        "zh-Hans": "哇呜！",
        en: "Girls",
      },
      route: "girls",
    },
    {
      icon: "mdi-information",
      id: 5,
      name: {
        "zh-Hans": "关于",
        en: "About",
      },
      route: "about",
    },
    {
      id: 6,
      label: !0,
      name: {
        "zh-Hans": "测试",
        en: "Test",
      },
    },
    {
      icon: "mdi-scale-balance",
      id: 7,
      name: {
        "zh-Hans": "根节点",
        en: "Root Node",
      },
      route: "node",

      children: [
        {
          icon: "mdi-radioactive",
          id: 71,
          name: {
            "zh-Hans": "子节点-1",
            en: "Subnode-1",
          },
          route: "1",
        },
        {
          icon: "mdi-skull-outline",
          id: 72,
          name: {
            "zh-Hans": "子节点-2",
            en: "Subnode-2",
          },
          route: "2",

          children: [
            {
              icon: "mdi-skull-outline",
              id: 721,
              name: {
                "zh-Hans": "子节点-2-1",
                en: "Subnode-2-1",
              },
              route: "1",
            },
            {
              icon: "mdi-heart-half-full",
              id: 722,
              name: {
                "zh-Hans": "子节点-2-2",
                en: "Subnode-2-2",
              },
              route: "2",
            },
            {
              icon: "mdi-hubspot",
              id: 723,
              name: {
                "zh-Hans": "子节点-2-3",
                en: "Subnode-2-3",
              },
              route: "3",
            },
          ],
        },
        {
          icon: "mdi-rice",
          id: 53,
          name: {
            "zh-Hans": "子节点-3",
            en: "Subnode-3",
          },
          route: "3",

          children: [
            {
              icon: "mdi-food",
              id: 531,
              name: {
                "zh-Hans": "子节点-3-1",
                en: "Subnode-3-1",
              },
              route: "1",
            },
            {
              icon: "mdi-cards",
              id: 532,
              name: {
                "zh-Hans": "子节点-3-2",
                en: "Subnode-3-2",
              },
              route: "2",
            },
            {
              icon: "mdi-cube",
              id: 533,
              name: {
                "zh-Hans": "子节点-3-3",
                en: "Subnode-3-3",
              },
              route: "3",
            },
          ],
        },
      ],
    },
  ];
}
</script>
