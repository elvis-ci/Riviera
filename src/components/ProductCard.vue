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

const quantity = ref(1);
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
    class="bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 max-w-lg sm:max-w-md mx-auto flex flex-col"
  >
    <!-- Image Section (shorter height now) -->
    <div class="relative w-full overflow-hidden h-44 sm:h-52 md:h-50">
      <img
        :src="item.image_url"
        :alt="item.name"
        class="w-full h-full object-cover scale-96 rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Content Section -->
    <div
      class="relative z-10 bg-background rounded-t-2xl -mt-3 shadow-md p-3 sm:p-3 sm:py-1 py-1 flex flex-col justify-between"
    >
      <div>
        <div class="flex w-full justify-between items-center pb-1">
          <h2 class="text-base sm:text-md font-semibold text-accent-hover truncate">
            {{ item.name }}
          </h2>
          <!-- Rating -->
          <div class="flex items-end gap-0.5">
            <p  class="flex items-center text-sm text-gray-500">
              <span
                class="text-[13px] sm:text-xl text-yellow-500"
                :class="i <= item.rating ? 'text-yellow-400' : 'text-gray-300'"
                aria-hidden="true"
              >
                ★
              </span>
              {{ item.rating.toFixed(1) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Price + Quantity + Button -->
      <div class="flex flex-col gap-2 mt-1">
        <div class="flex justify-between items-end">
          <div class="flex flex-col items-start">
            <span class="text-sm sm:text-xs text-text/70">Price</span>
            <div class="flex items-center gap-2">
              <span class="text-accent font-bold text-lg sm:text-lg">
                ${{ item.currentPrice }}
              </span>
              <span
                v-if="item.currentPrice < item.price"
                class="text-gray-500 line-through text-xs sm:text-xs"
              >
                ${{ item.price }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="decreaseQuantity"
              class="w-6 h-6 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 transition text-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span class="w-6 text-center font-bold text-sm">{{ quantity }}</span>
            <button
              @click="increaseQuantity"
              class="w-6 h-6 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 transition text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          @click="isInCart ? removeFromCart() : addToCart()"
          class="flex justify-center gap-3 w-full py-2 font-semibold mb-1 rounded-lg text-xs sm:text-sm shadow-md transition focus:ring-2 focus:ring-accent focus:ring-offset-1"
          :class="[
            isInCart
              ? 'text-accent border-accent border-2 hover:bg-accent/10'
              : 'bg-accent text-white hover:bg-accent-hover',
          ]"
        >
          <IconMdiCartOutline size="20" />
          {{ isInCart ? "Remove from Cart" : "Add to Cart" }}
        </button>
      </div>
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

article:hover img {
  transform: scale(1.05);
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
