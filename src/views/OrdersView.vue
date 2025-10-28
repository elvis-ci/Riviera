<template>
  <section
    class="min-h-screen bg-background text-text px-6 py-10 sm:px-10 md:px-16"
    aria-labelledby="orders-heading"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Page Title -->
      <h1
        id="orders-heading"
        class="text-2xl sm:text-3xl font-bold text-heading mb-8"
      >
        My Orders
      </h1>

      <!-- Ongoing Orders -->
      <div v-if="ongoingOrders.length" class="mb-12">
        <h2
          class="text-xl font-semibold text-accent-hover mb-4"
          id="ongoing-heading"
        >
          Ongoing Orders
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-labelledby="ongoing-heading"
        >
          <article
            v-for="order in ongoingOrders"
            :key="order.id"
            class="border border-border rounded-xl p-5 bg-background shadow-sm hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-accent"
          >
            <header class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-lg text-accent">
                Order #{{ order.id }}
              </h3>
              <span
                class="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full"
              >
                {{ order.status }}
              </span>
            </header>

            <ul class="text-sm space-y-1 mb-3">
              <li>
                <span class="font-medium">Items:</span>
                {{ order.items.length }}
              </li>
              <li>
                <span class="font-medium">Total:</span>
                ${{ order.total }}
              </li>
              <li>
                <span class="font-medium">Placed on:</span>
                {{ formatDate(order.date) }}
              </li>
            </ul>

            <footer class="flex justify-between items-center mt-4">
              <button
                @click="viewOrder(order.id)"
                class="text-accent font-medium text-sm hover:underline focus:underline"
              >
                View Details
              </button>

              <button
                @click="trackOrder(order.id)"
                class="text-xs font-semibold text-white bg-accent px-3 py-1.5 rounded-md hover:bg-accent-hover focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
              >
                Track
              </button>
            </footer>
          </article>
        </div>
      </div>

      <!-- Past Orders -->
      <div v-if="pastOrders.length">
        <h2
          class="text-xl font-semibold text-accent-hover mb-4"
          id="past-heading"
        >
          Past Orders
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-labelledby="past-heading"
        >
          <article
            v-for="order in pastOrders"
            :key="order.id"
            class="border border-border rounded-xl p-5 bg-background shadow-sm hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-accent"
          >
            <header class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-lg text-accent-hover">
                Order #{{ order.id }}
              </h3>
              <span
                class="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full"
              >
                {{ order.status }}
              </span>
            </header>

            <ul class="text-sm space-y-1 mb-3">
              <li>
                <span class="font-medium">Items:</span>
                {{ order.items.length }}
              </li>
              <li>
                <span class="font-medium">Total:</span>
                ${{ order.total }}
              </li>
              <li>
                <span class="font-medium">Delivered on:</span>
                {{ formatDate(order.date) }}
              </li>
            </ul>

            <footer class="flex justify-between items-center mt-4">
              <button
                @click="viewOrder(order.id)"
                class="text-accent font-medium text-sm hover:underline focus:underline"
              >
                View Details
              </button>

              <button
                @click="reorder(order)"
                class="text-xs font-semibold text-white bg-accent px-3 py-1.5 rounded-md hover:bg-accent-hover focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
              >
                Reorder
              </button>
            </footer>
          </article>
        </div>
      </div>

      <!-- No Orders -->
      <div
        v-if="!ongoingOrders.length && !pastOrders.length"
        class="text-center py-20"
      >
        <p class="text-text/70 text-lg mb-4">You haven’t placed any orders yet.</p>
        <router-link
          to="/products"
          class="text-accent font-semibold hover:underline focus:underline"
        >
          Browse products
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Mock orders data (replace with Supabase/Firebase data)
const orders = ref([
  {
    id: "A102",
    status: "Shipped",
    total: 89.99,
    date: "2025-10-18",
    items: [{}, {}, {}],
  },
  {
    id: "A101",
    status: "Delivered",
    total: 129.49,
    date: "2025-09-22",
    items: [{}, {}, {}, {}],
  },
  {
    id: "A099",
    status: "Processing",
    total: 45.0,
    date: "2025-10-19",
    items: [{}],
  },
]);

// Computed separation of ongoing vs past
const ongoingOrders = ref(orders.value.filter((o) => o.status !== "Delivered"));
const pastOrders = ref(orders.value.filter((o) => o.status === "Delivered"));

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

function viewOrder(id) {
  router.push(`/orders/${id}`);
}

function trackOrder(id) {
  alert(`Tracking order ${id}...`);
}

function reorder(order) {
  alert(`Reordered items from order ${order.id}`);
}
</script>

<style scoped>
article {
  transition: transform 0.3s ease;
}

article:hover {
  transform: translateY(-5px);
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
