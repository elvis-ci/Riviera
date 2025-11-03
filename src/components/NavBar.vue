<template>
  <header
    :class="[
      'sticky top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md border-b',
      isScrolled
        ? 'bg-surface/70 dark:bg-accent-/40 border-none shadow-sm'
        : 'bg-surface border-transparent',
    ]"
    role="banner"
  >
    <div
      class="relative max-w-full mx-auto px-6 py-2 flex flex-wrap items-center justify-between text-gray-900 dark:text-gray-100"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
        aria-label="Go to homepage"
      >
        <img src="@/assets/logo.png" alt="Perfume Brand Logo" class="h-10 w-auto" />
        <span class="font-semibold text-lg hidden sm:inline font-serif">Riviera</span>
      </RouterLink>

      <!-- Mobile Menu & Theme Toggle -->
      <div class="flex items-center gap-4 lg:hidden">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="text-text hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
          aria-label="Toggle dark mode"
        >
          <IconMdiWeatherSunny v-if="!isDark" size="24" />
          <IconMdiWeatherNight v-else size="24" />
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          class="text-text hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
          aria-label="Toggle navigation menu"
        >
          <IconMdiMenu v-if="!isOpen" size="26" />
          <IconMdiClose v-else size="26" />
        </button>
      </div>

      <!-- Desktop Navigation -->
      <nav
        class="hidden lg:flex items-center gap-8 xl:absolute xl:left-1/2 xl:-translate-x-1/2"
        aria-label="Primary navigation"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.id"
          :to="item.link"
          class="focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1"
          :class="
            ({ isActive }) =>
              isActive
                ? 'text-accent font-semibold transition-colors'
                : 'text-gray-800 dark:text-gray-200 hover:text-accent font-medium transition-colors'
          "
        >
          {{ item.title }}
        </RouterLink>
      </nav>

      <!-- Right Icons (Cart + Profile + Theme) -->
      <div class="hidden lg:flex items-center gap-6 relative">
        <!-- 🛒 Cart -->
        <RouterLink
          to="/cart"
          class="text-text flex items-center gap-1 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1 relative"
          aria-label="Shopping cart"
        >
          <IconMdiCartOutline class="scale-110" size="22" />
          <span class="hidden sm:inline">Cart</span>
          <span
            v-if="cartCount > 0"
            :class="[
              'absolute -top-1 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transform transition-transform duration-300',
              animate ? 'bounce' : '',
            ]"
          >
            {{ cartCount }}
          </span>
        </RouterLink>

        <!-- 👤 Profile Dropdown -->
        <div class="relative group">
          <button
            class="text-text hover:text-accent transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <IconMdiAccountCircle size="22" class="scale-120" />
            <span class="hidden sm:inline">Profile</span>
          </button>

          <div
            class="absolute right-0 mt-2 w-48 text-text bg-surface dark:bg-surface border border-border rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <template v-if="isSignedIn">
              <RouterLink
                to="/profile"
                class="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >My Profile</RouterLink
              >
              <RouterLink
                to="/favourites"
                class="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >Favourites</RouterLink
              >
              <RouterLink
                to="/orders"
                class="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >Orders</RouterLink
              >
              <button
                @click="signOut"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
              >
                Sign Out
              </button>
            </template>

            <template v-else>
              <RouterLink
                to="/signin"
                class="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >Sign In</RouterLink
              >
              <RouterLink
                to="/help"
                class="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >Help & Support</RouterLink
              >
            </template>
          </div>
        </div>

        <!-- Desktop Theme Toggle -->
        <button
          @click="toggleTheme"
          class="ml-4 text-text hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
          aria-label="Toggle dark mode"
        >
          <IconMdiWeatherSunny v-if="!isDark" size="22" />
          <IconMdiWeatherNight v-else size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <nav
        v-if="isOpen"
        class="lg:hidden bg-white dark:bg-surface border-t border-border py-4 px-6 space-y-4 shadow-lg backdrop-blur-md"
        aria-label="Mobile navigation"
      >
        <ul class="flex flex-col gap-3">
          <li v-for="item in navigation" :key="item.id">
            <RouterLink
              :to="item.link"
              :class="
                ({ isActive }) =>
                  isActive
                    ? 'text-accent font-semibold transition-colors'
                    : 'text-gray-800 dark:text-gray-100 hover:text-accent font-medium transition-colors'
              "
              class="focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1"
            >
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex flex-col gap-3 pt-4 border-t border-border">
          <template v-if="isSignedIn">
            <RouterLink to="/profile" class="hover:text-accent transition-colors">
              Profile
            </RouterLink>
            <RouterLink to="/favourites" class="hover:text-accent transition-colors">
              Favourites
            </RouterLink>
            <RouterLink to="/orders" class="hover:text-accent transition-colors">
              Orders
            </RouterLink>
            <button @click="signOut" class="text-left hover:text-accent transition-colors">
              Sign Out
            </button>
          </template>

          <template v-else>
            <RouterLink to="/signin" class="hover:text-accent transition-colors">
              Sign In
            </RouterLink>
            <RouterLink to="/help" class="hover:text-accent transition-colors">
              Help & Support
            </RouterLink>
          </template>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useCartStore } from "@/stores/useCartStore";
import IconMdiWeatherSunny from "~icons/mdi/weather-sunny";
import IconMdiWeatherNight from "~icons/mdi/weather-night";
import IconMdiCartOutline from "~icons/mdi/cart-outline";
import IconMdiAccountCircle from "~icons/mdi/account-circle";
import IconMdiMenu from "~icons/mdi/menu";
import IconMdiClose from "~icons/mdi/close";

// Cart Store
const cartStore = useCartStore();
const cartCount = ref(cartStore.itemCount);
const animate = ref(false);

// Trigger bounce when cart count increases
watch(
  () => cartStore.itemCount,
  (newVal, oldVal) => {
    cartCount.value = newVal;
    if ((newVal > oldVal) || (newVal < oldVal)) {
      animate.value = true;
      setTimeout(() => (animate.value = false), 400);
    }
  },
  { immediate: true }
);

const isOpen = ref(false);
const isDark = ref(false);
const isScrolled = ref(false);
const isSignedIn = ref(true);

const navigation = [
  { id: 1, title: "Home", link: "/home" },
  { id: 2, title: "Shop", link: "/products" },
  { id: 3, title: "About Us", link: "/about" },
  { id: 4, title: "Contact", link: "/contact" },
];

const toggleMenu = () => (isOpen.value = !isOpen.value);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

const applyTheme = (dark) => {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.setAttribute("data-theme", dark ? "dark" : "light");
  isDark.value = dark;
};

const toggleTheme = () => {
  const next = !isDark.value;
  applyTheme(next);
  localStorage.setItem("theme", next ? "dark" : "light");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    applyTheme(saved === "dark");
  } else {
    applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function signOut() {
  localStorage.removeItem("user");
  isSignedIn.value = false;
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes bounce-scale {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.5);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.bounce {
  animation: bounce-scale 0.4s ease-in-out;
}
</style>
