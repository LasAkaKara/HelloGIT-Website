import { createApp } from "vue";
import router from "./router/index.router";
import App from "./App.vue";
import "./assets/main.css";
import { useAuthStore } from "./store/auth.store";

const app = createApp(App);
app.use(router).mount("#app");

useAuthStore().initializeUser();
