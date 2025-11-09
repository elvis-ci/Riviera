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
    <div class="relative">
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
          <span class="font-semibold text-lg inline font-serif">Riviera</span>
        </RouterLink>

        <!-- Mobile Menu & Theme Toggle -->
        <div class="flex items-center gap-4 lg:hidden">
          <!-- Cart -->
          <RouterLink
            to="/cart"
            class="text-text flex items-center gap-1 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1 relative"
            aria-label="Shopping cart"
          >
            <IconMdiCartOutline class="scale-110" size="22" />
            <span class="sr-only">Cart</span>
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

          <button
            @click="toggleTheme"
            class="text-text hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
            aria-label="Toggle dark mode"
          >
            <IconMdiWeatherSunny v-if="!isDark" size="24" />
            <IconMdiWeatherNight v-else size="24" />
          </button>

          <button
            @click.stop="toggleMobileMenu"
            class="text-text hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
            aria-label="Toggle navigation menu"
          >
            <IconMdiMenu v-if="!isMobileMenuOpen" size="26" />
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

        <!-- Right Icons -->
        <div class=" hidden lg:flex items-center gap-6">
          <!-- Cart -->
          <RouterLink
            to="/cart"
            class="text-text flex items-center gap-1 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1 relative"
            aria-label="Shopping cart"
          >
            <IconMdiCartOutline class="scale-120" size="22" />
            <span
              v-if="cartCount > 0"
              :class="[
                'absolute -top-2 -right-2 bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold transform transition-transform duration-300',
                animate ? 'bounce' : '',
              ]"
            >
              {{ cartCount }}
            </span>
          </RouterLink>

          <!-- Conditional Auth Buttons -->
          <div class="">
            <!-- Settings button toggles the menu on click -->
            <div>
              <RouterLink
                v-if="!auth.user"
                to="/signIn"
                class="flex gap-2 items-center px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
              >
                <IconMdiLogin size="22" />
                <span class="hidden sm:inline">Sign In</span>
              </RouterLink>

              <button
                v-else
                ref="settingsButton"
                @click.stop="toggleSettings"
                :aria-expanded="isSettingsOpen"
                aria-haspopup="true"
                class="text-text hover:text-accent transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1"
              >
                <IconMdiAccountCircleOutline class="scale-120" size="22" />
              </button>
            </div>
            <!-- Dropdown: visible when isSettingsOpen -->
            <div
              ref="settingsMenu"
              v-show="isSettingsOpen"
              @click.stop
              class="absolute top-full right-0 w-48 text-text bg-surface dark:bg-surface border border-border border-t-0 shadow-lg py-2 transition-all duration-150 z-50"
            >
              <div>
                <RouterLink
                  to="/profile"
                  class="flex gap-2 items-center px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <IconMdiAccountCircle size="22" />
                  Profile
                </RouterLink>

                <RouterLink
                  to="/orders"
                  class="flex gap-2 px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <IconMdiClipboardTextOutline size="22" />
                  Orders</RouterLink
                >
                <button
                  @click="handleSignOut"
                  class="flex gap-2 w-full font-semibold text-left px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <IconMdiLogout size="22" />

                  Sign Out
                </button>
              </div>
            </div>
          </div>
          <button
            @click="toggleTheme"
            class="text-text scale-120 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
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
          ref="navArea"
          v-if="isMobileMenuOpen"
          class="lg:hidden absolute w-full z-40 right-0 bg-surface/95 border-border py-4 px-6 space-y-4 shadow-lg"
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
                      : 'text-gray-800 dark:text-gray-100 hover:bg-accent/80 font-medium transition-colors'
                "
                class="focus-visible:ring-2 focus-visible:ring-accent px-1 py-1 block"
              >
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>

          <div class="flex flex-col gap-3 pt-4 border-t border-border">
            <template v-if="auth.user">
              <RouterLink to="/profile" class="hover:text-accent transition-colors">
                Profile
              </RouterLink>

              <RouterLink to="/orders" class="hover:text-accent transition-colors"
                >Orders</RouterLink
              >
              <RouterLink to="/help" class="hover:text-accent transition-colors">
                Help & Support
              </RouterLink>

              <button
                @click="auth.logout"
                class="flex gap-2 items-center p-3 mt-4 text-center font-semibold bg-accent text-white hover:bg-accent-hover transition-colors"
              >
                <IconMdiLogout aria-hidden="true" size="22" />

                Sign Out
              </button>
            </template>

            <template v-else>
              <RouterLink to="/help" class=" px-1 hover:text-accent transition-colors">
                Help & Support
              </RouterLink>

              <RouterLink
                to="/SignIn"
                class="flex gap-2 items-center px-1 hover:text-accent transition-colors"
              >
                <IconMdiLogin aria-hidden="true" size="22" />

                Sign In
              </RouterLink>
            </template>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import IconMdiWeatherSunny from "~icons/mdi/weather-sunny";
import IconMdiWeatherNight from "~icons/mdi/weather-night";
import IconMdiCartOutline from "~icons/mdi/cart-outline";
import IconMdiAccountCircle from "~icons/mdi/account-circle";
import IconMdiMenu from "~icons/mdi/menu";
import IconMdiClose from "~icons/mdi/close";
import IconMdiClipboardTextOutline from "~icons/mdi/clipboard-text-outline";
import IconMdiLogoutVariant from "~icons/mdi/logout-variant";

// Auth store (composition store)
const auth = useAuthStore();
auth.fetchUser(); // ensure we have the user if already signed in

// Cart
const cartStore = useCartStore();
const cartCount = ref(cartStore.itemCount);
const animate = ref(false);

watch(
  () => cartStore.itemCount,
  (newVal, oldVal) => {
    cartCount.value = newVal;
    if (newVal !== oldVal) {
      animate.value = true;
      setTimeout(() => (animate.value = false), 400);
    }
  },
  { immediate: true }
);

const navArea = ref(null);
const isMobileMenuOpen = ref(false);
const isDark = ref(false);
const isScrolled = ref(false);

function handleClickOutsideNav(event) {
  if (isMobileMenuOpen.value == true && !navArea.value.contains(event.target)) {
    isMobileMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutsideNav);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutsideNav);
});

// new: settings dropdown state + refs
const isSettingsOpen = ref(false);
const settingsButton = ref(null);
const settingsMenu = ref(null);

const navigation = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Shop", link: "/products" },
  { id: 3, title: "About Us", link: "/about" },
  { id: 4, title: "Contact", link: "/contact" },
];

const toggleMobileMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value);

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

  // close settings menu when clicking outside
  document.addEventListener("click", onDocumentClick);
  // close with Escape key
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onKeydown);
});

function toggleSettings() {
  isSettingsOpen.value = !isSettingsOpen.value;
}

function onDocumentClick(e) {
  const btn = settingsButton.value;
  const menu = settingsMenu.value;
  if (!menu || !btn) return;
  // if click is outside both button and menu, close
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    isSettingsOpen.value = false;
  }
}

function onKeydown(e) {
  if (e.key === "Escape") isSettingsOpen.value = false;
}

function handleSignOut() {
  // prefer auth.logout so store can handle supabase signOut + state
  auth.logout();
  isSettingsOpen.value = false;
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
