import About from "@/views/about/index.vue";
import Image from "@/views/image/index.vue";
import Node from "@/views/node/index.vue";
import NodeChild from "@/views/node/pages/child.vue";
import Welcome from "@/views/welcome/index.vue";

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
        name: "nodeChild",
        path: ":id(1|2)",
      },
    ],
    component: Node,
    name: "node",
    path: "node",
  },
];
