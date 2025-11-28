<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
import { RouterLink, RouterView } from "vue-router";

const auth = useAuthStore();

const tabs = [
  { name: "Profile", path: "/profile/myprofile" },
  { name: "Favorites", path: "/profile/favorites" },
  { name: "Orders", path: "/profile/orders" },
  { name: "Account Settings", path: "/profile/account-settings" },
];
</script>

<template>
  <main class="min-h-screen bg-surface text-text flex flex-col md:flex-row">
    <!-- Sidebar / Tabs -->
    <aside
      class="bg-background border-b md:border-b-0 md:border-r border-border md:w-64 flex md:flex-col sticky top-0 z-10"
    >
      <h2 class="text-2xl font-semibold text-heading p-4 md:pb-6 hidden md:block">
        Welcome {{ auth.user.user_metadata.name.split(" ")[0] }}
      </h2>

      <!-- Tabs for mobile -->
      <div class="flex md:flex-col overflow-x-auto md:overflow-x-visible">
        <RouterLink
          v-for="tab in tabs"
          :to="tab.path"
          :key="tab.name"
          :class="[
            'flex-1 md:flex-none px-4 py-3 font-medium whitespace-nowrap transition border-transparent text-center border-l-0 md:border-l-8 md:text-left hover:bg-accent/10',
            $route.path === tab.path
              ? 'md:border-accent bg-accent/10 text-heading'
              : 'border-l-transparent text-text',
          ]"
        >
          {{ tab.name }}
        </RouterLink>
      </div>
    </aside>

    <!-- Main Content -->
    <section class="flex-1 p-2">
      <RouterView />
    </section>
  </main>
</template>

<style scoped>
/* Mobile scrollbar for tabs */
aside > div::-webkit-scrollbar {
  height: 4px;
}
aside > div::-webkit-scrollbar-thumb {
  background: #b78a4f;
  border-radius: 4px;
}
aside > div::-webkit-scrollbar-track {
  background: transparent;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
