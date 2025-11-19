<template>
  <main
    class="py-16 px-6 md:px-10 bg-surface text-text min-h-screen flex flex-col items-center"
    aria-labelledby="checkout-heading"
  >
    <!-- Header -->
    <div class="max-w-5xl w-full text-center mb-12">
      <h1 id="checkout-heading" class="text-5xl font-heading text-heading mb-3">Checkout</h1>
      <p class="text-text/80 text-base md:text-lg">
        Provide your details to complete this purchase.
      </p>
    </div>

    <!-- Layout Grid -->
    <div class="max-w-6xl w-full grid lg:grid-cols-[2fr_1fr] gap-10">
      <!-- FORM SECTION -->
      <section
        class="bg-background/40 backdrop-blur-md border border-border rounded-xl p-6 space-y-8 shadow-sm"
        aria-label="Checkout form"
      >
        <!-- Contact Information -->
        <div>
          <h2 class="text-2xl font-semibold text-heading mb-4">Contact Information</h2>
          <form class="space-y-5">
            <div>
              <label for="name" class="block mb-1 text-sm font-medium">Full Name</label>
              <input
                id="name"
                type="text"
                v-model="fullName"
                placeholder="John Adams"
                class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label for="email" class="block mb-1 text-sm font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="you@example.com"
                class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label for="phone" class="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                id="phone"
                type="tel"
                v-model="phone"
                placeholder="+234 812 345 6789"
                class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </form>
        </div>

        <!-- Shipping Details -->
        <div>
          <h2 class="text-2xl font-semibold text-heading mb-4">Shipping Address</h2>
          <form class="space-y-5">
            <div>
              <label for="address" class="block mb-1 text-sm font-medium">Street Address</label>
              <input
                id="address"
                type="text"
                v-model="address"
                placeholder="House number, street name…"
                required
                class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="city" class="block mb-1 text-sm font-medium"
                  >City <span class="text-red-500">*</span></label
                >
                <input
                  id="city"
                  type="text"
                  v-model="city"
                  placeholder="Lagos"
                  required
                  class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label for="state" class="block mb-1 text-sm font-medium"
                  >State <span class="text-red-500">*</span></label
                >
                <input
                  id="state"
                  type="text"
                  v-model="state"
                  placeholder="Lagos State"
                  required
                  class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label for="postalCode" class="block mb-1 text-sm font-medium"
                >Postal Code <span class="text-red-500">*</span></label
              >
              <input
                id="postalCode"
                type="text"
                v-model="postalCode"
                placeholder="100001"
                required
                class="w-full px-4 py-3 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </form>
        </div>
      </section>

      <!-- ORDER SUMMARY -->
      <aside
        class="bg-background border border-border rounded-3xl p-6 shadow-md h-fit sticky top-24 space-y-5"
      >
        <h2 class="text-2xl font-semibold text-heading">Order Summary</h2>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between">
            <span>Discount</span>
            <span class="font-medium text-green-700">${{ discount.toFixed(2) }}</span>
          </div>

          <div
            class="flex justify-between border-t border-border pt-3 text-base font-semibold text-heading"
          >
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="proceedToPay"
          class="w-full px-6 py-3 bg-accent text-white text-center font-medium rounded-lg shadow-md hover:bg-accent/90 transition"
        >
          Proceed to Payment
        </button>

        <router-link
          to="/cart"
          class="block text-center text-sm text-accent-hover hover:underline mt-2"
        >
          ← Back to Cart
        </router-link>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
const cartStore = useCartStore();

// Form data
const fullName = computed(() => auth.userProfile?.full_name || "");
const email = computed(() => auth.userProfile?.email || "");
const phone = computed(() => auth.userProfile?.phone || "");
const address = computed(() => auth.userProfile?.address || "");
const city = ref("");
const state = ref("");
const postalCode = ref("");

// Order summary
const subtotal = computed(() => cartStore.cartTotal + cartStore.generalDiscount);
const discount = computed(() => cartStore.generalDiscount);
const total = computed(() => cartStore.cartTotal);

function proceedToPay() {
  alert("Paystack payment coming soon!");
}
</script>

<style scoped>
button {
  transition: all 0.25s ease;
}
</style>
