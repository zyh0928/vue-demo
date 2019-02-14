import About from "@/view/About.vue";
import Welcome from "@/view/Welcome.vue";

export default [
  {
    component: () => import("@/view/NotFound.vue"),
    name: "notFound",
    path: "*"
  },
  {
    path: "/",
    redirect: "/welcome"
  },
  {
    component: Welcome,
    name: "welcome",
    path: "/welcome"
  },
  {
    component: About,
    name: "about",
    path: "/about"
  }
];
