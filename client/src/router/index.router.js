import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Admin from "../views/admin.vue";
import Home from "../views/Home.vue";
import Event from "../views/Event.vue";
import Typography from "../views/typography.vue";
import { useAuthStore } from "../store/auth.store";

const routes = [
  { path: "/", component: Home },
  { path: "/event", component: Event },
  // { path: "/blog", component: Blog },
  // { path: "/about", component: AboutUs },
  { path: "/typography", component: Typography },
  { path: "/login", component: Login },
  // { path: "/project", component: Project },
  { path: "/admin", component: Admin, meta: { requiresAdmin: true } },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const { state } = useAuthStore();
  const role = state?.user?.role;

  if (to.meta?.requiresAdmin) {
    if (!role) return next("/login");
    if (role != "admin") return next("/");
  }

  next();
});

export default router;
