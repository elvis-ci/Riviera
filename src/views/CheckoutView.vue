<template>
  <main
    class="py-16 px-2 md:px-10 bg-surface text-text min-h-screen flex flex-col items-center"
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
    <div class="max-w-6xl w-full grid lg:grid-cols-[2fr_1fr] gap-5 md:gap-10">
      <div class="relative pb-5 md:pb-0">
        <!-- Error message live region -->
        <div
          v-if="errorMsg || formErrorMsg"
          class="w-full bg-red-200/50 absolute bottom-0 ml-[50%] md:ml-0 -translate-x-[50%] z-40 md:static md:translate-x-0 rounded-t-lg md:rounded-none md:mb-4"
        >
          <div
            v-if="formErrorMsg"
            ref="errorRef"
            tabindex="-1"
            role="alert"
            aria-live="assertive"
            class="w-full p-2 text-lg max-w-5xl md:mb-4 text-center text-red-600 font-medium"
          >
            {{ formErrorMsg }}
          </div>
          <div
            v-if="errorMsg"
            ref="errorRef"
            tabindex="-1"
            role="alert"
            aria-live="assertive"
            class="w-full p-2 text-lg max-w-5xl md:mb-4 text-center text-red-600 font-medium"
          >
            {{ errorMsg }}
          </div>
        </div>
        <!-- FORM SECTION -->
        <section
          class="bg-background/40 backdrop-blur-md border border-border rounded-xl py-6 px-2 sm:p-6  space-y-8 shadow-sm"
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
                  class="w-full px-2 py-1 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label for="email" class="block mb-1 text-sm font-medium">Email Address</label>
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  placeholder="you@example.com"
                  class="w-full px-2 py-1 sm:py-2 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label for="phone" class="block mb-1 text-sm font-medium">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  v-model="phone"
                  placeholder="+234 812 345 6789"
                  class="w-full px-2 py-1 sm:py-2 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
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
                  class="w-full px-2 py-1 sm:py-2 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
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
                    class="w-full px-2 py-1 sm:py-2 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
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
                    class="w-full px-2 py-1 sm:py-2 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
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
                  class="w-full px-2 py-1 sm:py-2 rounded-lg bg-background border border-border text-heading outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </form>
          </div>
        </section>
      </div>

      <!-- ORDER SUMMARY -->
      <aside
        class="bg-background border border-border rounded-xl p-6 shadow-md h-fit sticky top-24 space-y-5"
      >
        <h2 class="text-2xl font-semibold text-heading">Order Summary</h2>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium">₦ {{ subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between">
            <span>Discount</span>
            <span class="font-medium text-green-700">₦ {{ discount.toFixed(2) }}</span>
          </div>

          <div
            class="flex justify-between border-t border-border pt-3 text-base font-semibold text-heading"
          >
            <span>Total</span>
            <span>₦ {{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="handlePayment"
          class="w-full px-6 py-3 bg-accent text-white text-center font-medium rounded-lg shadow-md hover:bg-accent/90 transition"
          :class="{ disabled: loading || formErrorMsg }"
          :disabled="loading || formErrorMsg"
        >
          {{ loading ? "Processing..." : "Proceed to Payment" }}
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
import { computed, ref, nextTick, watch } from "vue";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import PaystackPop from "@paystack/inline-js";
import { supabase } from "@/lib/supabaseClient.js";
import { useRouter } from "vue-router";
const router = useRouter();

const auth = useAuthStore();
const cartStore = useCartStore();

// Form data
const fullName = ref(auth.userProfile?.full_name || "");
const email = ref(auth.userProfile?.email || "");
const phone = ref(auth.userProfile?.phone || "");
const address = ref(auth.userProfile?.address || "");
const city = ref("");
const state = ref("");
const postalCode = ref("");
const loading = ref(false);
const formErrorMsg = ref(null);
const errorMsg = ref(null);
const errorRef = ref(null);

// Order summary
const subtotal = computed(() => cartStore.cartSubTotal);
const discount = computed(() => cartStore.generalDiscount);
const total = computed(() => subtotal.value - discount.value);
watch(
  [fullName, email, phone, address, city, state, postalCode],
  ([f, e, p, a, c, s, pc]) => {
    if (f && e && p && a && c && s && pc) {
      formErrorMsg.value = null;
    } else {
      formErrorMsg.value = "Please fill in all fields.";
    }
  },
  { immediate: true }
);
async function handlePayment() {
  loading.value = true;
  try {
    const paystack = new PaystackPop();

    await paystack.checkout({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email.value,
      amount: total.value * 100, // in kobo
      currency: "₦",
      onSuccess: async (res) => {
        console.log("Payment successful. Verifying...", res.reference);
        const {data, error} = await supabase.functions.invoke("paystack-verify", {
          body: JSON.stringify({ reference: res.reference }),
        })

        if(error){
          console.error("Payment verification error:", `error: ${error}`, `datamsg: ${data}`);
          errorMsg.value = "Payment verification failed. Please contact support.";
          await nextTick();
          loading.value = false;
          return;
        }

        function generateOrderRef() {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let ref = "";
          for (let i = 0; i < 6; i++) {
            ref += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return ref;
        }

        const orderRef = generateOrderRef();

        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              user_id: auth.userProfile.id,
              shipping_full_name: fullName.value,
              shipping_email: email.value,
              shipping_phone: phone.value,
              shipping_address: address.value,
              shipping_city: city.value,
              shipping_state: state.value,
              shipping_postal_code: postalCode.value,
              total_amount: total.value,
              items: cartStore.cartItems,
              payment_ref: res.reference,
              payment_status: "paid",
              order_status: "processing",
              created_at: new Date().toISOString(),
              order_ref: orderRef,
            },
          ])
          .select();

        if (orderError) {
          console.error("Order saving error:", orderError);
          errorMsg.value = "Failed to save order. Please contact support.";
          await nextTick();
          return;
        }

        // Insert order items
        const orderId = orderData[0].id;

        const orderItems = cartStore.cartItems.map((item) => ({
          order_id: orderId,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          created_at: new Date().toISOString(),
        }));

        const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

        if (itemsError) {
          console.log("Order items saving error:", itemsError);
          errorMsg.value = "Failed to save order items. Please contact support.";
          await nextTick();
          return;
        }
        console.log("Order successful:", orderData[0]);
        router.push(`/order-confirmation/${orderRef}`);
        cartStore.clearCart();

        loading.value = false;
      },
      onCancel: async () => {
        errorMsg.value = "Payment was cancelled.";
        await nextTick();
        loading.value = false;
      },
      onError: async (error) => {
        console.error("Payment error:", error);
        errorMsg.value = "An error occurred during payment. Please try again.";
        await nextTick();
        loading.value = false;
      },
    });
  } catch (error) {
    console.error("Payment initialization failed:", error);
    errorMsg.value = "Failed to initialize payment. Please try again.";
    await nextTick();
    loading.value = false;}
}
</script>

<style scoped>
button {
  transition: all 0.25s ease;
}
.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
