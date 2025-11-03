<script setup>
import { computed } from "vue";

const props = defineProps({
  isModalOpen: { 
    type: Boolean, 
    required: true 
  },
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "cancel-order", "toggle-restriction", "change-role"]);

const closeModal = () => emit("close");
const cancelOrder = (id) => emit("cancel-order", id);
const toggleRestriction = () => emit("toggle-restriction");
const changeRole = (role) => emit("change-role", role);

const ongoingOrders = computed(() => props.user.orders.filter((o) => o.status === "Ongoing"));
const previousOrders = computed(() => props.user.orders.filter((o) => o.status !== "Ongoing"));
</script>

<template>
  <!-- Backdrop -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <!-- Modal -->
    <div
      class="bg-surface text-text w-full max-w-3xl rounded-2xl shadow-lg border border-border overflow-hidden animate-fadeIn"
    >
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-border">
        <h2 class="text-xl font-semibold">User Details</h2>
        <button
          @click="closeModal"
          class="text-text hover:text-accent-hover focus:outline-none focus:ring-2 focus:ring-accent rounded p-1"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="px-6 py-4 space-y-6 overflow-y-auto max-h-[70vh]">
        <!-- User Info -->
        <div>
          <h3 class="text-lg font-semibold mb-2">Profile</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p><span class="font-semibold">Name:</span> {{ user.name }}</p>
            <p><span class="font-semibold">Email:</span> {{ user.email }}</p>
            <p><span class="font-semibold">Role:</span> {{ user.role }}</p>
            <p>
              <span class="font-semibold">Status:</span>
              <span
                :class="
                  user.isRestricted ? 'text-red-500 font-medium' : 'text-green-500 font-medium'
                "
              >
                {{ user.isRestricted ? "Restricted" : "Active" }}
              </span>
            </p>
            <p><span class="font-semibold">Joined:</span> {{ user.joinedDate }}</p>
            <p><span class="font-semibold">Orders:</span> {{ user.orders.length }}</p>
          </div>
        </div>

        <!-- Ongoing Orders -->
        <div v-if="ongoingOrders.length">
          <h3 class="text-lg font-semibold mb-2">Ongoing Orders</h3>
          <div class="space-y-3">
            <div
              v-for="order in ongoingOrders"
              :key="order.id"
              class="border border-border rounded-lg p-3 bg-background"
            >
              <div class="flex justify-between items-center">
                <p class="font-medium">#{{ order.id }}</p>
                <span class="text-accent text-sm font-semibold">{{ order.status }}</span>
              </div>
              <p class="text-sm text-text/70">Total: {{ order.total }} USD</p>
              <p class="text-sm text-text/70">Date: {{ order.date }}</p>
              <button
                class="mt-2 text-sm px-3 py-1 bg-red-500/90 text-white rounded-md hover:bg-red-600 transition"
                @click="cancelOrder(order.id)"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>

        <!-- Previous Orders -->
        <div v-if="previousOrders.length">
          <h3 class="text-lg font-semibold mb-2">Previous Orders</h3>
          <div class="overflow-x-auto border border-border rounded-lg">
            <table class="w-full text-sm">
              <thead class="bg-background border-b border-border text-text/70">
                <tr>
                  <th class="text-left py-2 px-3">Order ID</th>
                  <th class="text-left py-2 px-3">Date</th>
                  <th class="text-left py-2 px-3">Total</th>
                  <th class="text-left py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in previousOrders"
                  :key="order.id"
                  class="border-b border-border last:border-none hover:bg-accent-hover/20"
                >
                  <td class="py-2 px-3">{{ order.id }}</td>
                  <td class="py-2 px-3">{{ order.date }}</td>
                  <td class="py-2 px-3">{{ order.total }} USD</td>
                  <td class="py-2 px-3">{{ order.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Admin Actions -->
        <div class="pt-4 border-t border-border">
          <h3 class="text-lg font-semibold mb-3">Actions</h3>
          <div class="flex flex-wrap gap-3">
            <button
              class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              @click="toggleRestriction"
            >
              {{ user.isRestricted ? "Unrestrict User" : "Restrict User" }}
            </button>

            <button
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              @click="changeRole('admin')"
            >
              Make Admin
            </button>

            <button
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              @click="changeRole('user')"
            >
              Make Regular User
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end px-6 py-4 border-t border-border">
        <button
          @click="closeModal"
          class="px-4 py-2 rounded-md bg-accent text-white hover:bg-accent-hover transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}
</style>
