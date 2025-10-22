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
      class="max-w-full mx-auto px-6 py-4 flex items-center justify-between text-gray-900 dark:text-gray-100"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
        aria-label="Go to homepage"
      >
        <img
          src="@/assets/logo.svg"
          alt="Perfume Brand Logo"
          class="h-10 w-auto"
        />
        <span class="font-semibold text-lg hidden sm:inline">Perfume</span>
      </RouterLink>

      <!-- Mobile Menu & Theme Toggle -->
      <div class="flex items-center gap-4 md:hidden">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
          aria-label="Toggle dark mode"
        >
          <IconMdiWeatherSunny v-if="!isDark" size="24" />
          <IconMdiWeatherNight v-else size="24" />
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          class="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
          aria-label="Toggle navigation menu"
        >
          <IconMdiMenu v-if="!isOpen" size="26" />
          <IconMdiClose v-else size="26" />
        </button>
      </div>

      <!-- Desktop Navigation -->
      <nav
        class="hidden md:flex items-center gap-8"
        aria-label="Primary navigation"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.id"
          :to="item.link"
          class="focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1"
          :class="({ isActive }) =>
            isActive
              ? 'text-accent font-semibold transition-colors'
              : 'text-gray-800 dark:text-gray-200 hover:text-accent font-medium transition-colors'
          "
        >
          {{ item.title }}
        </RouterLink>
      </nav>

      <!-- Right Icons -->
      <div class="hidden md:flex items-center gap-6 relative">
        <!-- Cart -->
        <RouterLink
          to="/cart"
          class="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
          aria-label="Shopping cart"
        >
          <IconMdiCartOutline size="22" />
        </RouterLink>

        <!-- Profile Dropdown -->
        <div class="relative group">
          <button
            class=" text-text hover:text-accent transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <IconMdiAccountCircle size="22" />
            <span class="hidden sm:inline text-sm">Profile</span>
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
        class="md:hidden bg-white/95 dark:bg-zinc-900/95 border-t border-border py-4 px-6 space-y-4 shadow-lg backdrop-blur-md"
        aria-label="Mobile navigation"
      >
        <ul class="flex flex-col gap-3">
          <li v-for="item in navigation" :key="item.id">
            <RouterLink
              :to="item.link"
              :class="({ isActive }) =>
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
            <button
              @click="signOut"
              class="text-left hover:text-accent transition-colors"
            >
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
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const isDark = ref(false);
const isScrolled = ref(false);
const isSignedIn = ref(true);

const navigation = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Products", link: "/products" },
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

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });
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

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
