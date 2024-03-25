import { createRouter, createWebHistory } from "vue-router";
import LoginLayout from "../layouts/login.vue";
import Layout from "../layouts/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginLayout,
    },
    {
      path: "/",
      component: Layout,
    },
  ],
});

NProgress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});

export default router;
