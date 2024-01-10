import sleep from "@/utils/sleep";

export type MenuType = {
  id: GenericScalar;
  component?: string;
  icon?: string;
  name?: I18nType;
  parentId?: GenericScalar;
  props?: string;
  route?: string;
  type?: "menu" | "route";
};

export const getRoutes = async (): Promise<MenuType[]> => {
  await sleep(500);

  return [
    {
      id: 1,
      props: '{"redirect":{"name":"welcome","params":{"lang":"zh"}}}',
      route: "/",
      type: "route",
    },
    {
      component: "welcome/index",
      icon: "human-greeting-variant",
      id: 2,
      name: {
        en: "Welcome",
        zh: "嗨！！",
      },
      route: "welcome",
    },
    {
      id: 3,
      props: '{"redirect":{"name":"welcome"}}',
      route: "/:lang(en|zh)",
      type: "route",
    },
    {
      component: "image/index",
      icon: "star-shooting",
      id: 4,
      name: {
        en: "Image",
        zh: "哇呜！",
      },
      route: "image",
    },
    {
      component: "about/index",
      icon: "arrange-bring-forward",
      id: 5,
      name: {
        en: "About",
        zh: "关于",
      },
      route: "about",
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
  ];
};
