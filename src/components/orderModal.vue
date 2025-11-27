<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    role="dialog"
    aria-modal="true"
  >
    <!-- Modal -->
    <div
      class="bg-background text-text w-full max-w-xl rounded-2xl shadow-xl border border-border p-6 relative animate-fadeIn"
    >
      <!-- Close button -->
      <button
        @click="close"
        class="absolute right-4 top-4 text-text/60 hover:text-accent transition"
        aria-label="Close"
      >
        ✕
      </button>

      <!-- Order Reference -->
      <div class="mb-4">
        <h2 class="text-2xl font-semibold text-heading">
          Order #{{ order?.ref }}
        </h2>

        <span
          class="px-3 py-1 text-xs font-semibold rounded-full inline-block mt-2"
          :class="statusClasses(order?.status)"
        >
          {{ order?.status }}
        </span>
      </div>

      <!-- Order Summary -->
      <div class="space-y-2 text-sm mb-6">
        <p><span class="font-medium">Placed on:</span> {{ formatDate(order?.date) }}</p>
        <p><span class="font-medium">Total:</span> ${{ order?.total }}</p>
        <p><span class="font-medium">Items:</span> {{ order?.items?.length }}</p>
      </div>

      <!-- Order Items -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-heading mb-3">Items</h3>

        <ul class="space-y-3 max-h-60 overflow-y-auto pr-2">
          <li
            v-for="(item, index) in order?.items"
            :key="index"
            class="border border-border rounded-lg p-3 bg-surface"
          >
            <p class="font-medium">{{ item.name }}</p>
            <p class="text-sm text-text/70">Qty: {{ item.quantity }}</p>
            <p class="text-sm text-text/70">Price: ${{ item.price }}</p>
          </li>
        </ul>
      </div>

      <!-- Reorder Button -->
      <button
        @click="reorder(order)"
        class="w-full text-sm font-semibold text-white bg-accent py-2.5 rounded-md hover:bg-accent-hover transition"
      >
        Reorder
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  order: Object,
});

const emits = defineEmits(["close", "reorder"]);

function close() {
  emits("close");
}

function reorder(order) {
  emits("reorder", order);
}

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const statusClasses = (status) => {
  switch (status) {
    case "processing":
    case "shipped":
    case "out for delivery":
      return "bg-yellow-100 text-yellow-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out;
}
</style>
