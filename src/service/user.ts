import sleep from "@/utils/sleep";

import type { MenuType } from "#/user";

export const getRoutes = async (): Promise<MenuType[]> => {
  await sleep(500);

  return [
    {
      icon: "human-greeting-variant",
      id: 1,
      label: {
        en: "Welcome",
        zh: "嗨！！",
      },
      path: "welcome/index",
      route: "welcome",
    },
    {
      icon: "star-shooting",
      id: 2,
      label: {
        en: "Image",
        zh: "哇呜！",
      },
      path: "image/index",
      route: "image",
    },
    {
      icon: "arrange-bring-forward",
      id: 3,
      label: {
        en: "About",
        zh: "关于",
      },
      path: "about/index",
      route: "about",
    },
    {
      icon: "resistor-nodes",
      id: 4,
      label: {
        en: "Root Node",
        zh: "根节点",
      },
      path: "node/index",
      redirect: "node/2",
      route: "node",
    },
    {
      id: 401,
      name: "nodeId",
      parentId: 4,
      path: "node/id/index",
      route: ":id(1|2)",
      type: "router",
    },
    {
      id: 41,
      label: {
        en: "Subnode-1",
        zh: "子节点-1",
      },
      parentId: 4,
      route: "1",
      type: "menu",
    },
    {
      id: 42,
      label: {
        en: "Subnode-2",
        zh: "子节点-2",
      },
      parentId: 4,
      route: "2",
      type: "menu",
    },
    {
      id: 43,
      label: {
        en: "Subnode-3",
        zh: "子节点-3",
      },
      parentId: 4,
      route: "3",
      type: "menu",
    },
    {
      icon: "heart-broken",
      id: 5,
      label: {
        en: "Oops!",
        zh: "完蛋啦！",
      },
      redirect: "tree/a",
      route: "tree",
    },
    {
      id: 51,
      label: {
        en: "AAA",
        zh: "一一一",
      },
      parentId: 5,
      path: "tree/a/index",
      route: "a",
    },
    {
      id: 52,
      label: {
        en: "BBB",
        zh: "二二二",
      },
      parentId: 5,
      path: "tree/b/index",
      route: "b",
    },
    {
      id: 53,
      label: {
        en: "CCC",
        zh: "三三三",
      },
      parentId: 5,
      route: "c",
      type: "menu",
    },
  ];
};
