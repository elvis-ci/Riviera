<template>
  <div class="relative flex bg-background text-text min-h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col bg-surface border-r border-border transition-all duration-300 ease-in-out overflow-hidden',
        sidebarOpen ? 'w-64' : 'w-20'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-4 border-b border-border">
        <h1
          v-if="sidebarOpen"
          class="text-lg font-bold text-text truncate"
        >
          Admin Menu
        </h1>
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="text-text hover:text-accent-hover focus:outline-none focus:ring-2 focus:ring-accent rounded p-2"
          :aria-label="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <span v-if="sidebarOpen">✕</span>
          <span v-else>☰</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col mt-5 space-y-1">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.path"
          class="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-accent-hover transition focus:ring-2 focus:ring-white/70"
          active-class="bg-accent-hover"
        >
          <component :is="link.icon" class="text-lg shrink-0" />
          <span
            v-if="sidebarOpen"
            class="whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ link.name }}
          </span>
        </RouterLink>
      </nav>

      <!-- Logout -->
      <div class="mt-auto px-4 py-4 border-t border-border">
        <button
          class="flex items-center gap-3 w-full text-left py-2 hover:bg-accent-hover rounded-md transition focus:ring-2 focus:ring-white/70"
        >
          <IconMdiLogout class="text-lg shrink-0" />
          <span v-if="sidebarOpen" class="whitespace-nowrap">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-1 px-6 py-10 transition-all duration-300"
      :class="[sidebarOpen ? 'ml-0' : 'ml-0']"
    >
      <section class="flex items-center gap-3 mb-6">
        <h2 class="text-lg sm:text-xl font-semibold">Dashboard Overview</h2>
      </section>

      <!-- Dashboard Cards -->
      <section
        class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      >
        <div
          v-for="card in cards"
          :key="card.title"
          class="bg-surface border border-border rounded-2xl shadow hover:shadow-md transition p-5 sm:p-6"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-base sm:text-lg font-semibold">
              {{ card.title }}
            </h3>
            <component :is="card.icon" class="text-accent text-xl sm:text-2xl" />
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-accent mt-3">
            {{ card.value }}
          </p>
          <p class="text-muted text-sm mt-1">{{ card.desc }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import IconMdiViewDashboard from "~icons/mdi/view-dashboard";
import IconMdiCart from "~icons/mdi/cart";
import IconMdiPackageVariant from "~icons/mdi/package-variant";
import IconMdiAccountGroup from "~icons/mdi/account-group";
import IconMdiLogout from "~icons/mdi/logout";

const sidebarOpen = ref(true);

const links = [
  { name: "Dashboard", path: "/admin", icon: IconMdiViewDashboard },
  { name: "Orders", path: "/admin/orders", icon: IconMdiCart },
  { name: "Products", path: "/admin/products", icon: IconMdiPackageVariant },
  { name: "Users", path: "/admin/users", icon: IconMdiAccountGroup },
];

const cards = [
  {
    title: "Total Sales",
    value: "₦1,245,000",
    desc: "Revenue in last 30 days",
    icon: IconMdiCart,
  },
  {
    title: "Products",
    value: "128",
    desc: "Active catalog items",
    icon: IconMdiPackageVariant,
  },
  {
    title: "Users",
    value: "534",
    desc: "Registered customers",
    icon: IconMdiAccountGroup,
  },
];
</script>

<style scoped>
/* Prevent text overflow when sidebar is collapsed */
aside span {
  transition: opacity 0.3s ease, width 0.3s ease;
}
</style>
