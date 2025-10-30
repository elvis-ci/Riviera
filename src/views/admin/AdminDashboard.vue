<template>
  <main class="w-full px-6 py-10 transition-all duration-300">
    <div class="max-w-[1200px]">
      <section class="flex items-center gap-3 mb-6">
        <h2 class="text-lg sm:text-xl font-semibold">Dashboard Overview</h2>
      </section>

      <!-- Dashboard Cards -->
      <section class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
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
    </div>
  </main>
</template>

<script setup>
import IconMdiCart from "~icons/mdi/cart";
import IconMdiPackageVariant from "~icons/mdi/package-variant";
import IconMdiAccountGroup from "~icons/mdi/account-group";

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

<style scoped></style>
