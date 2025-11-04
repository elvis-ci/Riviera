import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Riviera | Home" },
    },

    // Products
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
      meta: { title: "Riviera | Products" },
    },
    //orders
    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/OrdersView.vue"),
      meta: { title: "Riviera | orders" },
    },

    // About
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { title: "Riviera | About Us" },
    },

    // Contact
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: { title: "Riviera | Contact" },
    },

    // Favourites
    {
      path: "/favourites",
      name: "favourites",
      component: () => import("../views/FavouritesView.vue"),
      meta: { title: "Riviera | Favourites" },
    },

    // Cart
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
      meta: { title: "Riviera | Cart" },
    },

    // Profile
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { title: "Riviera | Profile", requiresAuth: true },
    },

    // Sign In
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SignInView.vue"),
      meta: { title: "Riviera | Sign In", guestOnly: true },
    },

    // Sign Up
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUpView.vue"),
      meta: { title: "Riviera | Sign Up", guestOnly: true },
    },

    // Sign Out (can redirect to home or login after clearing session)
    {
      path: "/signout",
      name: "signout",
      beforeEnter: (to, from, next) => {
        // Example sign-out logic (adjust if using Supabase or Firebase)
        localStorage.removeItem("user");
        next("/signin");
      },
      meta: { title: "Signing Out..." },
    },

    // Admin Dashboard
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("../views/admin/AdminDashboard.vue"),
        },
        {
          path: "products",
          name: "admin-products",
          component: () => import("../views/admin/ManageProducts.vue"),
        },
        {
          path: "orders",
          name: "admin-orders",
          component: () => import("../views/admin/ManageOrders.vue"),
        },
        {
          path: "users",
          name: "admin-users",
          component: () => import("../views/admin/ManageUsers.vue"),
        },
        { path: "", redirect: "/admin/dashboard" },
      ],
    },
    // 404 Page
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
      meta: { title: "Riviera | Page Not Found" },
    },
  ],
});

// Automatically set page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Riviera";
  next();
});

export default router;
