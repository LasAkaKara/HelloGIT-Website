import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Admin from "../views/admin.vue";
import Home from "../views/Home.vue";
import Event from "../views/Event.vue";
import EventDetail from "../views/EventDetail.vue";
import CreateEvent from "../views/CreateEvent.vue";
import Typography from "../views/typography.vue";
import Blog from "../views/Blog.vue";
import BlogDetail from "../views/BlogDetail.vue";
import CreateBlog from "../views/CreateBlog.vue";
import Project from "../views/Project.vue";
import { useAuthStore } from "../store/auth.store";

const routes = [
  { path: "/", component: Home },
  { path: "/event", component: Event },
  { path: "/event/:id", component: EventDetail },
  { path: "/event/create", component: CreateEvent },
  { path: "/blog", component: Blog },
  { path: "/blog/create", component: CreateBlog, meta: { requiresAuth: true } },
  { path: "/blog/:id", component: BlogDetail },
  { path: "/project", component: Project },
  // { path: "/about", component: AboutUs },
  { path: "/typography", component: Typography },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/admin", component: Admin, meta: { requiresAdmin: true } },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const { state } = useAuthStore();
  const role = state?.user?.role;

  // Check for admin-only routes
  if (to.meta?.requiresAdmin) {
    if (!role) return next("/login");
    if (role !== "admin") return next("/");
  }

  // Check for authenticated routes (any logged-in user)
  if (to.meta?.requiresAuth) {
    if (!role) return next("/login");
  }

  next();
});

export default router;
