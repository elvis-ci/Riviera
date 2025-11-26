import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/useAuthStore";

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
        next("/signin");
      },
      meta: { title: "Signing Out..." },
    },

    // checkout
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
      meta: { requiresAuth: true, title: "Checkout" },
    },
    {
      path: "/order-confirmation/:ref",
      name: "order-confirmation",
      component: () => import("../views/OrderConfirmationView.vue"),
      meta: { requiresAuth: true, title: "Order Confirmation" },
    },
    // Admin Dashboard
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
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
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  // 1. Always set the document title first
  document.title = to.meta.title || "Riviera";

  const auth = useAuthStore();
  const user = await auth.userProfile;
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;

  // --- Authentication Check ---
  if (requiresAuth && !user) {
    // If auth is required but the user is not logged in, redirect to signin.
    next({ name: "signin" });
    return;
  }

  // --- Admin/Role Check (Only runs if user is logged in) ---
  if (requiresAdmin) {
    if (user?.role === "admin") {
      // User is logged in and is an admin, allow navigation.
      next();
      return;
    } else {
      // User is logged in but is NOT an admin, redirect to home.
      next({ name: "home" });
      return;
    }
  }

  // --- Default: Allow navigation ---
  next();
});
export default router;
