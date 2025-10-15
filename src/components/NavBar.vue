<template>
  <header
    class="sticky top-0 z-50 bg-background/90 backdrop-blur-md text-text border-b border-border transition-colors duration-300"
  >
    <div class="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2" aria-label="Go to homepage">
        <img src="@/assets/logo.svg" alt="Perfume Brand Logo" class="h-10 w-auto" />
        <span class="font-semibold text-lg hidden sm:inline">Perfume</span>
      </RouterLink>

      <!-- Mobile Menu & Theme Toggle -->
      <div class="flex items-center gap-4 md:hidden">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="text-text hover:text-accent transition-colors"
          aria-label="Toggle dark mode"
        >
          <IconMdiWeatherSunny v-if="!isDark" size="24" />
          <IconMdiWeatherNight v-else size="24" />
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          class="text-text hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          <IconMdiMenu v-if="!isOpen" size="26" />
          <IconMdiClose v-else size="26" />
        </button>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="item in navigation"
          :key="item.id"
          :to="item.link"
          :class="
            ({ isActive }) =>
              isActive
                ? 'text-accent font-semibold transition-colors'
                : 'text-text hover:text-accent font-medium transition-colors'
          "
        >
          {{ item.title }}
        </RouterLink>
      </nav>

      <!-- Right Icons -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
          to="/favourites"
          class="hover:text-accent transition-colors"
          aria-label="Favorites"
        >
          <IconMdiHeartOutline size="22" />
        </RouterLink>

        <RouterLink
          to="/cart"
          class="hover:text-accent transition-colors"
          aria-label="Shopping cart"
          title="Cart"
        >
          <IconMdiCartOutline size="22" />
        </RouterLink>

        <RouterLink
          to="/profile"
          class="hover:text-accent transition-colors"
          aria-label="User profile"
          title="Profile"
        >
          <IconMdiAccountCircle size="22" />
        </RouterLink>

        <!-- Desktop Theme Toggle -->
        <button
          @click="toggleTheme"
          class="ml-4 text-text hover:text-accent transition-colors"
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
        class="md:hidden bg-surface border-t border-border py-4 px-6 space-y-4 shadow-lg"
      >
        <ul class="flex flex-col gap-3">
          <li v-for="item in navigation" :key="item.id">
            <RouterLink
              :to="item.link"
              :class="
                ({ isActive }) =>
                  isActive
                    ? 'text-accent font-semibold transition-colors'
                    : 'text-text hover:text-accent font-medium transition-colors'
              "
            >
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex gap-6 pt-4 border-t border-border">
          <RouterLink
            to="/favourites"
            class="hover:text-accent transition-colors"
            aria-label="Favorites"
          >
            <IconMdiHeartOutline size="22" />
          </RouterLink>

          <RouterLink to="/cart" class="hover:text-accent transition-colors" aria-label="Cart">
            <IconMdiCartOutline size="22" />
          </RouterLink>

          <RouterLink
            to="/profile"
            class="hover:text-accent transition-colors"
            aria-label="Profile"
          >
            <IconMdiAccountCircle size="22" />
          </RouterLink>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const isDark = ref(false);

const navigation = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Products", link: "/products" },
  { id: 3, title: "About Us", link: "/about" },
  { id: 4, title: "Contact", link: "/contact" },
];

const toggleMenu = () => (isOpen.value = !isOpen.value);

// Apply theme logic
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
</style>
