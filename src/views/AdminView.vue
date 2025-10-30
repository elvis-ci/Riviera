<template>
  <div class="relative flex bg-background text-text min-h-[92vh]">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col bg-surface border-r border-border transition-all duration-300 ease-in-out overflow-hidden',
        isSidebarOpen ? 'w-64' : 'w-20',
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-4 border-b border-border">
        <h1 v-if="isSidebarOpen" class="text-lg font-bold text-text truncate">Admin Menu</h1>
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          :class="[
            'text-text hover:tet-accent-hover font-bold focus:outline-none focus:ring-2 focus:ring-accent rounded p-2',
          ]"
          :aria-label="isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <span v-if="isSidebarOpen" class=" ">✕</span>
          <span v-else>☰</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col mt-5 space-y-1">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.path"
          class="flex items-center gap-3 px-4 py-3 text-md mb-4 font-medium hover:bg-accent-hover/60 transition focus:ring-2 focus:ring-white/70"
          active-class="bg-accent-hover/60 "
        >
          <component :is="link.icon" class="text-lg shrink-0" />
          <span v-if="isSidebarOpen" class="whitespace-nowrap overflow-hidden text-ellipsis">
            {{ link.name }}
          </span>
        </RouterLink>
      </nav>

      <!-- Logout -->
      <div class="mt-auto px-4 py-4 border-t border-border">
        <button
          class="flex font-bold items-center gap-3 w-full text-left py-2 hover:bg-accent-hover rounded-md transition focus:ring-2 focus:ring-white/70"
        >
          <IconMdiLogout class="text-lg shrink-0" />
          <span v-if="isSidebarOpen" class="whitespace-nowrap ">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import IconMdiViewDashboard from "~icons/mdi/view-dashboard";
import IconMdiCart from "~icons/mdi/cart";
import IconMdiPackageVariant from "~icons/mdi/package-variant";
import IconMdiAccountGroup from "~icons/mdi/account-group";
import IconMdiLogout from "~icons/mdi/logout";
import IconMdiCog from "~icons/mdi/cog";

const isSidebarOpen = ref(true);

const links = [
  { name: "Dashboard", path: "/admin/dashboard", icon: IconMdiViewDashboard },
  { name: "Manage Orders", path: "/admin/orders", icon: IconMdiCart },
  { name: "Manage Products", path: "/admin/products", icon: IconMdiPackageVariant },
  { name: "Users", path: "/admin/users", icon: IconMdiAccountGroup },
  { name: "Settings", path: "/admin/settings", icon: IconMdiCog },
];
</script>

<style scoped>
a:hover, a:focus {
  color: var(--text-text);
}

/* Prevent text overflow when sidebar is collapsed */
aside span {
  transition: opacity 0.3s ease, width 0.3s ease;
}
</style>
