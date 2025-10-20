<template>
  <section class="py-12 px-6 bg-surface text-text min-h-screen" aria-labelledby="cart-heading">
    <!-- Header -->
    <header class="max-w-7xl mx-auto mb-10 text-center">
      <h1 id="cart-heading" class="text-4xl font-heading text-heading mb-2">Your Cart</h1>
      <p class="text-text/90">Review your selected fragrances before checkout.</p>
    </header>

    <div
      class="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-10"
      role="region"
      aria-label="Shopping cart content"
    >
      <!-- Cart Items -->
      <section class="space-y-6" aria-label="Cart items">
        <article
          v-for="(item, index) in cartItems"
          :key="item.id || index"
          class="flex items-center gap-6 bg-background border border-border rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-300 group"
          role="group"
          :aria-labelledby="`item-${index}-name`"
        >
          <!-- Product Image -->
          <div class="relative shrink-0">
            <img
              :src="item.image_url"
              :alt="`Image of ${item.name}`"
              class="w-28 h-28 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300 self-start"
              loading="lazy"
            />
          </div>

          <!-- Item Info -->
          <div class="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <h2 :id="`item-${index}-name`" class="text-lg font-semibold text-heading truncate">
                {{ item.name }}
              </h2>
              <p
                class="text-sm text-text/70 line-clamp-2"
                :aria-label="`Description: ${item.short}`"
              >
                {{ item.description }}
              </p>
            </div>

            <!-- Price + Quantity -->
            <div class="mt-3 flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-baseline gap-2">
                <span
                  v-if="item.price > item.currentPrice"
                  class="text-gray-400 line-through text-sm"
                >
                  ${{ item.price }}
                </span>
                <span class="text-xl font-bold text-accent">
                  ${{ item.currentPrice.toFixed(2) }}
                </span>
              </div>

              <div
                class="flex flex-wrap items-center gap-2 sm:gap-4 sm:flex-nowrap justify-end"
                role="group"
                :aria-label="`Quantity controls for ${item.name}`"
              >
                <div class="flex items-center gap-2">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 text-heading focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span class="text-heading font-medium w-8 text-center" aria-live="polite">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 text-heading focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  @click="removeFromCart(item.id)"
                  class="text-sm text-red-600 hover:text-red-700 font-medium sm:ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- Empty State -->
        <div v-if="cartItems.length === 0" class="text-center py-20 text-text/70" role="status">
          Your cart is empty. Go explore our fragrances!
        </div>
      </section>

      <!-- Summary Section -->
      <aside
        class="bg-background border border-border rounded-2xl p-6 shadow-md h-fit sticky top-10"
        aria-label="Order summary"
      >
        <h2 class="text-2xl font-semibold text-heading mb-4">Order Summary</h2>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Discount</span>
            <span class="font-medium text-green-700" aria-label="Applied discount">
              -${{ cartStore.generalDiscount.toFixed(2) }}
            </span>
          </div>
          <div
            class="flex justify-between border-t border-border pt-3 text-base font-semibold text-heading"
          >
            <span>Total</span>
            <span aria-label="Total price">${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="checkout"
          class="mt-6 w-full bg-accent text-white font-medium py-3 rounded-lg shadow-md hover:bg-accent/90 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/useCartStore";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems || []);

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)
);
const total = computed(() => cartStore.cartTotal);

function updateQuantity(item, newQty) {
  if (newQty < 1) return;
  cartStore.updateQuantity(item.id, newQty);
}

function removeFromCart(item) {
  cartStore.removeFromCart(item);
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
