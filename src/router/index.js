import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Perfume | Home" },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
      meta: { title: "Perfume | Products" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { title: "Perfume | About Us" },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: { title: "Perfume | Contact" },
    },
    {
      path: "/favourites",
      name: "favourites",
      component: () => import("../views/FavouritesView.vue"),
      meta: { title: "Perfume | Favourites" },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
      meta: { title: "Perfume | Cart" },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { title: "Perfume | Profile" },
    },
  ],
});

// 🧠 Automatically set page title from route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Perfume";
  next();
});

export default router;
