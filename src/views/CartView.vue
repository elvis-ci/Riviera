<template>
  <main
    class="py-16 px-6 md:px-10 bg-surface text-text min-h-screen flex flex-col items-center"
    aria-labelledby="cart-heading"
  >
    <!-- Header -->
    <div class="max-w-5xl w-full text-center mb-12">
      <h1 id="cart-heading" class="text-5xl font-heading text-heading mb-3">Your Cart</h1>
      <p class="text-text/80 text-base md:text-lg">
        Review your selected fragrances before completing your purchase.
      </p>
    </div>

    <!-- Cart Grid -->
    <div
      class="max-w-6xl w-full grid lg:grid-cols-[2fr_1fr] gap-10"
      aria-label="Shopping cart content"
    >
      <!-- 🛍 Cart Items -->
      <section
        class="space-y-3 bg-background/40 backdrop-blur-md  rounded-lg md:p-0 transition-all duration-300"
        aria-label="Cart items"
      >
        <article
          v-for="(item, index) in cartItems"
          :key="item.id || index"
          class="relative flex items-start gap-6 bg-background border border-border/60 rounded-lg shadow-sm p-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          :aria-labelledby="`item-${index}-name`"
        >
          <!-- Product Image -->
          <div class="relative shrink-0 self-start sm:self-start">
            <img
              :src="item.image_url"
              :alt="`Image of ${item.name}`"
              class="w-20 h-20 sm:w-38 sm:h-30 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300 shadow-md"
              loading="lazy"
            />
          </div>

          <!-- Item Info -->
          <div class="flex flex-col justify-between flex-1">
            <div>
              <h2
                :id="`item-${index}-name`"
                class="text-sm md:text-lg font-semibold text-heading truncate tracking-wide"
              >
                {{ item.name }}
              </h2>
              <p
                class=" sm:block text-xs md:text-sm text-text/70 mt-1 line-clamp-2"
                :aria-label="`Description: ${item.short}`"
              >
                {{ item.description }}
              </p>
            </div>

            <!-- Price + Quantity -->
            <div class="mt-2 flex items-center justify-between flex-wrap gap-4">
              <div class="flex items-baseline gap-2">
                <span class="text-base md:text-2xl font-bold text-accent"
                  >${{ item.currentPrice }}</span
                >
              </div>

              <!-- Quantity + Remove -->
              <div
                class="flex flex-wrap items-start gap-3 sm:gap-4 sm:flex-nowrap justify-end"
                :aria-label="`Quantity controls for ${item.name}`"
              >
                <div class="flex items-center gap-2">
                  <button
                    @click="decreaseQuantity(item)"
                    class="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center border border-border rounded-lg hover:bg-accent/10 text-heading focus-visible:ring-2 focus-visible:ring-accent transition"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span class="text-heading font-medium w-5 md:w-8 text-center" aria-live="polite">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="increaseQuantity(item)"
                    class="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center border border-border rounded-lg hover:bg-accent/10 text-heading focus-visible:ring-2 focus-visible:ring-accent transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="removeFromCart(item.id)"
              class="absolute top-1 right-0 text-sm font-medium px-3 py-1.5 rounded-lg  transition"
            >
              <IconMdiBinOutline class="scale-120 md:scale-150 text-red-400" size="22" />
            </button>
          </div>
        </article>

        <!-- 🕊 Empty State -->
        <div
          v-if="cartItems.length === 0"
          class="text-center py-24 text-text/70 italic"
          role="status"
        >
          Your cart is empty — go explore our fragrances!
        </div>
      </section>

      <!-- 💰 Summary -->
      <aside
        class="bg-background border border-border rounded-3xl p-6 shadow-md h-fit sticky top-24 space-y-5"
        aria-label="Order summary"
      >
        <h2 class="text-2xl font-semibold text-heading mb-2">Order Summary</h2>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Discount</span>
            <span class="font-medium text-green-700"
              >${{ cartStore.generalDiscount.toFixed(2) }}</span
            >
          </div>
          <div
            class="flex justify-between border-t border-border pt-3 text-base font-semibold text-heading"
          >
            <span>Total</span>
            <span aria-label="Total price">${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
          <button
            @click="clearCart"
            class="w-full sm:w-1/2 px-6 py-2 border-2 border-accent-hover text-accent-hover font-medium rounded-lg hover:bg-accent/10 transition"
          >
            Clear Cart
          </button>
          <button
            @click="checkout"
            class="w-full sm:w-1/2 px-6 py-2 bg-accent text-white font-medium rounded-lg shadow-md hover:bg-accent/90 transition"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  </main>
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

function increaseQuantity(item) {
  cartStore.updateQuantity(item.id, item.quantity + 1);
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  }
}

function removeFromCart(id) {
  cartStore.removeFromCart(id);
}

function clearCart() {
  cartStore.clearCart();
}

function checkout() {
  alert("Checkout coming soon!");
}

function click() {
  classList.toggle("active");
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

button {
  transition: all 0.25s ease;
}
</style>
