<script setup>
import { ref, computed } from "vue";
import IconMdiMagnify from "~icons/mdi/magnify";
import IconMdiCheckCircle from "~icons/mdi/check-circle";
import IconMdiTruck from "~icons/mdi/truck";
import IconMdiCancel from "~icons/mdi/cancel";
import IconMdiClockOutline from "~icons/mdi/clock-outline";

// Sample data
const orders = ref([
  { id: "#1001", customer: "Mega Tron", date: "2025-10-25", status: "Pending", total: 180.0 },
  { id: "#1002", customer: "Bumble Bee", date: "2025-10-29", status: "Shipped", total: 245.5 },
  { id: "#1003", customer: "Optimus Prime", date: "2025-10-27", status: "Delivered", total: 310.99 },
  { id: "#1004", customer: "Minimus Prime", date: "2025-10-29", status: "Cancelled", total: 112.5 },
]);

const searchQuery = ref("");
const statusFilter = ref("All");
const startDate = ref("");
const endDate = ref("");

// Summary
const totalOrders = computed(() => orders.value.length);
const todayOrders = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return orders.value.filter((order) => order.date === today).length;
});

// Filtering logic
const filteredOrders = computed(() => {
  let results = [...orders.value];

  // Search
  if (searchQuery.value.trim()) {
    results = results.filter((order) =>
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Status
  if (statusFilter.value !== "All") {
    results = results.filter((order) => order.status === statusFilter.value);
  }

  // Date range
  if (startDate.value) {
    results = results.filter((order) => order.date >= startDate.value);
  }
  if (endDate.value) {
    results = results.filter((order) => order.date <= endDate.value);
  }

  return results;
});

function getStatusIcon(status) {
  switch (status) {
    case "Delivered":
      return IconMdiCheckCircle;
    case "Shipped":
      return IconMdiTruck;
    case "Cancelled":
      return IconMdiCancel;
    default:
      return IconMdiClockOutline;
  }
}

function getStatusColor(status) {
  switch (status) {
    case "Delivered":
      return "text-green-800 bg-green-100";
    case "Shipped":
      return "text-blue-800 bg-blue-100";
    case "Cancelled":
      return "text-red-800 bg-red-100";
    default:
      return "text-yellow-800 bg-yellow-100";
  }
}
</script>

<template>
  <section class="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-heading mb-2">Manage Orders</h1>
      <p class="text-text/70 text-sm">View, search, and manage customer orders</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        class="bg-white border border-border rounded-xl shadow-sm p-4 flex flex-col justify-center"
      >
        <h2 class="text-sm text-text/70 font-medium">Total Orders</h2>
        <p class="text-2xl font-bold text-heading mt-1">{{ totalOrders }}</p>
      </div>

      <div
        class="bg-white border border-border rounded-xl shadow-sm p-4 flex flex-col justify-center"
      >
        <h2 class="text-sm text-text/70 font-medium">Today's Orders</h2>
        <p class="text-2xl font-bold text-heading mt-1">{{ todayOrders }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 bg-white border border-border rounded-xl p-4 shadow-sm"
    >
      <!-- Search -->
      <div class="w-full sm:w-72">
        <label for="order-search" class="block text-sm font-medium text-text/80 mb-1">
          Search Orders
        </label>
        <div class="relative">
          <input
            id="order-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by customer name..."
            class="w-full pl-10 pr-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text placeholder:text-text/70"
          />
          <IconMdiMagnify
            class="absolute left-3 top-2.5 text-text/70"
            size="20"
            aria-hidden="true"
          />
        </div>
      </div>

      <!-- Status Filter -->
      <div>
        <label for="status" class="block text-sm font-medium text-text/80 mb-1">Status</label>
        <select
          id="status"
          v-model="statusFilter"
          class="w-full sm:w-44 py-2 px-3 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      <!-- Date Range -->
      <div class="flex gap-3 w-full sm:w-auto">
        <div>
          <label for="start-date" class="block text-sm font-medium text-text/80 mb-1">
            From
          </label>
          <input
            id="start-date"
            v-model="startDate"
            type="date"
            class="w-full sm:w-40 py-2 px-3 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text"
          />
        </div>
        <div>
          <label for="end-date" class="block text-sm font-medium text-text/80 mb-1">To</label>
          <input
            id="end-date"
            v-model="endDate"
            type="date"
            class="w-full sm:w-40 py-2 px-3 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text"
          />
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="overflow-x-auto bg-white border border-border rounded-2xl shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-accent/10 text-text uppercase text-sm">
          <tr>
            <th class="py-3 px-4 font-semibold">Order ID</th>
            <th class="py-3 px-4 font-semibold">Customer</th>
            <th class="py-3 px-4 font-semibold">Date</th>
            <th class="py-3 px-4 font-semibold">Status</th>
            <th class="py-3 px-4 font-semibold text-right">Total</th>
            <th class="py-3 px-4" aria-hidden="true"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="border-t border-border hover:bg-accent/5 transition"
          >
            <td class="py-3 px-4 text-sm font-medium text-accent-hover break-words">
              {{ order.id }}
            </td>
            <td class="py-3 px-4 text-sm text-text">{{ order.customer }}</td>
            <td class="py-3 px-4 text-sm text-text/80">{{ order.date }}</td>
            <td class="py-3 px-4">
              <span
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                :class="getStatusColor(order.status)"
              >
                <component :is="getStatusIcon(order.status)" size="16" aria-hidden="true" />
                {{ order.status }}
              </span>
            </td>
            <td class="py-3 px-4 text-sm font-semibold text-right text-accent-hover">
              ${{ order.total.toFixed(2) }}
            </td>
            <td class="py-3 px-4 text-right">
              <button
                class="text-accent hover:text-accent-hover font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg px-2"
                aria-label="View order details"
              >
                View details
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div v-if="!filteredOrders.length" class="text-center py-10 text-text/70 text-sm">
        No orders found.
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 640px) {
  h1 {
    font-size: 1.25rem;
  }

  th,
  td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  table {
    min-width: 650px;
  }

  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
