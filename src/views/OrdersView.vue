<template>
  <section
    class="min-h-screen bg-background text-text px-6 py-10 sm:px-10 md:px-16"
    aria-labelledby="orders-heading"
    @keydown.escape="closeOrderModal"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Page Title -->
      <h1 id="orders-heading" class="text-2xl sm:text-3xl font-bold text-heading mb-8">
        My Orders
      </h1>

      <!-- Ongoing Orders -->
      <div v-if="loading" class="mb-12">
        <h2 class="text-xl font-semibold text-accent-hover mb-4">Ongoing Orders</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="n" class="border border-border rounded-xl p-5 bg-background animate-pulse">
            <div class="h-5 bg-accent/20 rounded w-1/3 mb-3"></div>
            <div class="h-3 bg-accent/10 rounded mb-1"></div>
            <div class="h-3 bg-accent/10 rounded mb-1"></div>
            <div class="h-3 bg-accent/10 rounded mb-1"></div>
            <div class="mt-4 h-8 bg-accent/20 rounded"></div>
          </div>
        </div>
      </div>

      <div v-else-if="ongoingOrders.length" class="mb-12">
        <h2 class="text-xl font-semibold text-accent-hover mb-4" id="ongoing-heading">
          Ongoing Orders
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-labelledby="ongoing-heading">
          <article
            v-for="order in ongoingOrders"
            :key="order.id"
            class="border border-border rounded-xl p-5 bg-background shadow-sm hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-accent"
          >
            <header class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-lg text-accent">Order #{{ order.ref }}</h3>
              <span class="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                {{ order.status }}
              </span>
            </header>

            <ul class="text-sm space-y-1 mb-3">
              <li><span class="font-medium">Items:</span> {{ order.items.length }}</li>
              <li><span class="font-medium">Total:</span> ${{ order.total }}</li>
              <li><span class="font-medium">Placed on:</span> {{ formatDate(order.date) }}</li>
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
      <div v-if="!loading && pastOrders.length">
        <h2 class="text-xl font-semibold text-accent-hover mb-4" id="past-heading">
          Past Orders
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-labelledby="past-heading">
          <article
            v-for="order in pastOrders"
            :key="order.id"
            class="border border-border rounded-xl p-5 bg-background shadow-sm hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-accent"
          >
            <header class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-lg text-accent-hover">Order #{{ order.ref }}</h3>
              <span class="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                {{ order.status }}
              </span>
            </header>

            <ul class="text-sm space-y-1 mb-3">
              <li><span class="font-medium">Items:</span> {{ order.items.length }}</li>
              <li><span class="font-medium">Total:</span> ${{ order.total }}</li>
              <li><span class="font-medium">Delivered on:</span> {{ formatDate(order.date) }}</li>
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
      <div v-if="!loading && !ongoingOrders.length && !pastOrders.length" class="text-center py-20">
        <p class="text-text/70 text-lg mb-4">You haven’t placed any orders yet.</p>
        <router-link
          to="/products"
          class="text-accent font-semibold hover:underline focus:underline"
        >
          Browse products
        </router-link>
      </div>
    </div>

    <OrderModal :order="selectedOrder" v-if="showOrderModal" @close="closeOrderModal" />
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { supabase } from "@/lib/supabaseClient.js";
import OrderModal from "@/components/orderModal.vue";

const auth = useAuthStore();
const orders = ref([]);
const selectedOrder = ref(null);
const showOrderModal = ref(false);
const loading = ref(false);

// Fetch user orders
async function getOrders() {
  const user = auth.user;
  if (!user) return;

  loading.value = true;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch orders:", error);
    loading.value = false;
    return;
  }

  orders.value = data.map((order) => ({
    id: order.id,
    ref: order.order_ref,
    status: order.order_status,
    total: order.total_amount,
    date: order.created_at,
    items: order.items || [],
  }));

  loading.value = false;
}

watch(
  () => auth.user,
  (user) => user && getOrders(),
  { immediate: true }
);

const ongoingOrders = computed(() =>
  orders.value.filter((o) => ["processing", "shipped", "out for delivery"].includes(o.status))
);

const pastOrders = computed(() =>
  orders.value.filter((o) => ["delivered", "cancelled"].includes(o.status))
);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

function viewOrder(orderId) {
  selectedOrder.value = orders.value.find((o) => o.id === orderId);
  showOrderModal.value = true;
}

function closeOrderModal() {
  selectedOrder.value = null;
  showOrderModal.value = false;
}

function reorder(order) {
  console.log("Reordering", order);
}

function trackOrder(orderId) {
  console.log("Tracking order", orderId);
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
