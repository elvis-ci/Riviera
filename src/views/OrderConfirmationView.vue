<template>
  <main
    class="py-16 px-6 md:px-10 bg-surface text-text min-h-screen flex flex-col items-center"
    aria-labelledby="confirmation-heading"
  >
    <div class="max-w-5xl w-full text-center mb-12">
      <h1 id="confirmation-heading" class="text-5xl font-heading text-heading mb-3">
        Order Confirmed 🎉
      </h1>

      <p class="text-text/80 text-base md:text-lg">
        Thank you for your purchase! Your order has been successfully placed.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-lg font-medium">Loading your order...</div>

    <!-- Error State -->
    <div
      v-if="error"
      class="bg-red-200/50 text-red-700 p-4 rounded-lg w-full max-w-3xl text-center font-medium"
    >
      {{ error }}
    </div>

    <!-- Order Details -->
    <div v-if="order" class="max-w-4xl w-full space-y-10">
      <!-- Order Summary Card -->
      <section class="bg-background border border-border rounded-xl p-6 shadow-md space-y-5">
        <h2 class="text-2xl font-semibold text-heading">Order Summary</h2>

        <p class="text-sm text-text/80">
          Order Reference:
          <span class="font-semibold">{{ order.order_ref }}</span>
        </p>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Total Paid</span>
            <span class="font-medium">₦ {{ order.total_amount.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between">
            <span>Payment Status</span>
            <span class="font-medium text-green-700">{{ order.payment_status }}</span>
          </div>

          <div class="flex justify-between">
            <span>Order Status</span>
            <span class="font-medium">{{ order.order_status }}</span>
          </div>
        </div>
      </section>

      <!-- Shipping Information -->
      <section
        class="bg-background/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm"
      >
        <h2 class="text-2xl font-semibold text-heading mb-4">Shipping Information</h2>

        <ul class="text-sm space-y-2">
          <li><strong>Name:</strong> {{ order.shipping_full_name }}</li>
          <li><strong>Email:</strong> {{ order.shipping_email }}</li>
          <li><strong>Phone:</strong> {{ order.shipping_phone }}</li>
          <li>
            <strong>Address:</strong>
            {{ order.shipping_address }}, {{ order.shipping_city }}, {{ order.shipping_state }} -
            {{ order.shipping_postal_code }}
          </li>
        </ul>
      </section>

      <!-- Items Ordered -->
      <section class="bg-background border border-border rounded-xl p-6 shadow-md space-y-4">
        <h2 class="text-2xl font-semibold text-heading mb-4">Items in Your Order</h2>

        <div class="space-y-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex justify-between items-center border-b border-border pb-3"
          >
            <div>
              <p class="font-medium text-heading">{{ item.product_name }}</p>
              <p class="text-sm text-text/70">
                Qty: {{ item.quantity }} × ₦ {{ item.price.toFixed(2) }}
              </p>
            </div>

            <p class="font-semibold">₦ {{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </section>

      <div class="text-center">
        <router-link
          to="/products"
          class="cta inline-block px-6 py-3 bg-accent text-white rounded-lg shadow-md hover:bg-accent/90 transition"
        >
          Continue Shopping
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/lib/supabaseClient";

const route = useRoute();

const order = ref(null);
const items = ref([]);
const loading = ref(true);
const error = ref(null);
const orderId = ref(null);

onMounted(async () => {
  const orderRef = route.params.ref;

  // Fetch main order
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("order_ref", orderRef)
    .single();

  if (orderError || !orderData) {
    loading.value = false;
    error.value = "Order not found.";
    return;
  }

  order.value = orderData;
  orderId.value = orderData.id;

  // Fetch order items
  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId.value);
  console.log(itemsData);
  if (!itemsError && itemsData) {
    items.value = itemsData.map((i) => ({
      ...i,
      product_name: i.product_name || "Product",
    }));
  }

  loading.value = false;
});
</script>

<style scoped>
.cta {
  color: white;
}
</style>
