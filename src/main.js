import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore.js";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const auth = useAuthStore();

await auth.restoreSession();
auth.initAuthListener();

app.mount("#app");
