<template>
  <section class="py-12 px-6 bg-surface text-text min-h-screen">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-10 text-center">
      <h1 class="text-4xl font-heading text-heading mb-2">Your Cart</h1>
      <p class="text-text/90">Review your selected fragrances before checkout.</p>
    </div>

    <div class="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-10">
      <!-- Cart Items -->
      <div class="space-y-6">
        <div
          v-for="(item, index) in cartItems"
          :key="item.id || index"
          class="flex flex-col sm:flex-row items-center gap-4 bg-background border border-border rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300"
        >
          <!-- Image -->
          <img
            :src="item.image_url"
            :alt="item.name"
            class="w-28 h-28 object-cover rounded-xl"
            loading="lazy"
          />

          <!-- Details -->
          <div class="flex-1 flex flex-col justify-between gap-2 text-center sm:text-left">
            <h2 class="text-lg font-semibold text-heading">{{ item.name }}</h2>
            <p class="text-sm text-text/70 line-clamp-2">{{ item.short }}</p>

            <!-- Price + Quantity -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
              <div class="text-accent font-semibold text-lg">${{ item.price }}</div>
              <div class="flex items-center gap-2 justify-center sm:justify-end">
                <button
                  @click="updateQuantity(item, item.quantity - 1)"
                  class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 text-heading"
                >−</button>
                <span class="text-heading font-medium w-8 text-center">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item, item.quantity + 1)"
                  class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 text-heading"
                >+</button>
              </div>
            </div>
          </div>

          <!-- Remove -->
          <button
            @click="removeFromCart(item)"
            class="text-sm text-red-600 hover:text-red-700 font-medium mt-2 sm:mt-0"
          >
            Remove
          </button>
        </div>

        <div
          v-if="cartItems.length === 0"
          class="text-center py-20 text-text/70"
        >
          Your cart is empty. Go explore our fragrances!
        </div>
      </div>

      <!-- Summary Section -->
      <aside class="bg-background border border-border rounded-2xl p-6 shadow-md h-fit">
        <h2 class="text-2xl font-semibold text-heading mb-4">Order Summary</h2>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Discount</span>
            <span class="font-medium text-green-700">-${{ discount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between border-t border-border pt-3 text-base font-semibold text-heading">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="checkout"
          class="mt-6 w-full bg-accent text-white font-medium py-3 rounded-lg shadow-md hover:bg-accent/90 transition-colors"
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useFragranceStore } from "@/stores/useFragranceStore";

const store = useFragranceStore();

// Example: assuming you’ll manage cart in the store
const cartItems = computed(() => store.cart || []);

// Example computed totals
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const discount = computed(() => subtotal.value * 0.1); // 10% sample discount
const total = computed(() => subtotal.value - discount.value);

function updateQuantity(item, newQty) {
  if (newQty < 1) return;
  store.updateCartQuantity(item, newQty);
}

function removeFromCart(item) {
  store.removeFromCart(item);
}

function checkout() {
  alert("Checkout coming soon!");
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
