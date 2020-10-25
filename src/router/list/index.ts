import About from "@/views/About.vue";
import Gank from "@/views/Gank.vue";
import Girls from "@/views/Girls.vue";
import Welcome from "@/views/Welcome.vue";

export default [
  {
    component: (): any => import("@/views/NotFound.vue"),
    name: "notFound",
    path: "*",
  },
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    component: Welcome,
    name: "welcome",
    path: "/welcome",
  },
  {
    component: Gank,
    name: "gank",
    path: "/gank",
  },
  {
    component: Girls,
    name: "girls",
    path: "/girls",
  },
  {
    component: About,
    name: "about",
    path: "/about",
  },
];
