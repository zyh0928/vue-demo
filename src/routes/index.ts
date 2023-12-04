import About from "%/about/index.vue";
import Image from "%/image/index.vue";
import Node from "%/node/index.vue";
import NodeChild from "%/node/pages/child.vue";
import Welcome from "%/welcome/index.vue";

import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    component: Welcome,
    name: "welcome",
    path: "welcome",
  },
  {
    component: Image,
    name: "image",
    path: "image",
  },
  {
    component: About,
    name: "about",
    path: "about",
  },
  {
    children: [
      {
        component: NodeChild,
        name: "node",
        path: ":id(1|2)",
      },
    ],
    component: Node,
    path: "node",
    redirect: ({ params: { lang } }) => ({
      name: "node",
      params: {
        id: "1",
        lang,
      },
    }),
  },
];
