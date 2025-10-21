<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  cartStore: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateQuantity", "addToCart"]);
const quantity = ref(1);
// --- Computed ---
const isInCart = computed(() =>
  props.cartStore.cartItems.some((cartItem) => cartItem.id === props.item.id)
);

function increaseQuantity() {
  quantity.value++;
  props.cartStore.updateQuantity(props.item.id, quantity.value);
}

function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--;
  props.cartStore.updateQuantity(props.item.id, quantity.value);
}

function addToCart() {
  props.cartStore.addToCart(props.item, quantity.value);
}

function removeFromCart() {
  props.cartStore.removeFromCart(props.item.id);
}

watch(
  () => props.cartStore.cartItems,
  (newCartItems) => {
    const cartItem = newCartItems.find((item) => item.id === props.item.id);
    quantity.value = cartItem ? cartItem.quantity : 1;
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <article
    class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
  >
    <img :src="item.image_url" :alt="item.name" class="w-full h-64 object-cover" loading="lazy" />

    <div class="p-4 flex flex-col gap-2">
      <h2 class="text-lg font-semibold text-heading truncate">{{ item.name }}</h2>
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ item.description || "A delightful fragrance." }}
      </p>

      <!-- Ratings -->
      <div class="flex items-center gap-1">
        <span v-for="i in 5" :key="i" class="text-sm">
          <span :class="i <= item.rating ? 'text-accent' : 'text-gray-300'">★</span>
        </span>
      </div>

      <!-- Price + Quantity -->
      <div class="flex justify-between items-center mt-1">
        <div>
          <span v-if="item.currentPrice < item.price" class="text-gray-400 line-through text-sm"
            >${{ item.price }}</span
          >
          <span class="text-accent font-bold text-lg ml-1">${{ item.currentPrice }}</span>
        </div>

        <!-- Quantity Selector -->
        <div class="flex items-center gap-2">
          <button
            @click="decreaseQuantity"
            class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10"
          >
            −
          </button>
          <span class="w-8 text-center font-medium">
            {{ quantity }}
          </span>
          <button
            @click="increaseQuantity"
            class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10"
          >
            +
          </button>
        </div>
      </div>

      <!-- Add/Remove Button -->
      <button
        @click="isInCart ? removeFromCart() : addToCart()"
        class="mt-3 w-full py-3 font-bold rounded-lg text-sm shadow-md transition focus:ring-2 focus:ring-accent focus:ring-offset-1"
        :class="
          isInCart
            ? 'text-accent border-accent border-2 hover:bg-accent/30'
            : 'bg-accent text-white hover:bg-accent-hover'
        "
      >
        {{ isInCart ? "Remove from Cart" : "Add to Cart" }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
