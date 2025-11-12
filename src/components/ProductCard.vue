<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  style:{
    type: Object,
    required: true
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
    class="bg-background overflow-hidden  hover:shadow-xl transition-all duration-500 flex flex-col mx-auto"
    :class="[style]"
  >
    <!-- Image Section (shorter height now) -->
    <div class="w-full overflow-hidden h-35 md:h-50">
      <img
        :src="item.image_url"
        :alt="item.name"
        class="w-full h-full rounded-lg object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Content Section -->
    <div
      class="relative z-10 shadow-md sm:py-1 py-1 flex flex-col justify-between"
    >
      <div>
        <div class="flex w-full justify-between items-center pb-1">
          <h2 class="text-sm sm:text-base font-semibold text-accent-hover truncate">
            {{ item.name }}
          </h2>
          <!-- Rating -->
          <div class="flex items-end gap-0.5">
            <p  class="flex items-center text-xs sm:text-sm text-gray-500">
              <span
                class="text-[13px] sm:text-xl text-yellow-500"
                :class=" item.rating >= 1 ? 'text-yellow-400' : 'text-gray-300'"
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
            <span class="text-xs sm:text-sm text-text/70">Price</span>
            <div class="flex items-center gap-2">
              <span class="text-accent font-bold text-xs sm:text-lg">
                ${{ item.currentPrice }}
              </span>
              <span
                v-if="item.currentPrice < item.price"
                class="text-text/60 line-through text-xs sm:text-sm"
              >
                ${{ item.price }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-1 ml-1">
            <button
              @click="decreaseQuantity"
              class="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 transition text-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span class="w-5 text-center font-bold text-sm">{{ quantity }}</span>
            <button
              @click="increaseQuantity"
              class="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 transition text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          @click="isInCart ? removeFromCart() : addToCart()"
          class="flex justify-center gap-3 w-full py-2 font-semibold mb-1 rounded-lg text-xs sm:text-sm shadow-md transition focus:ring-1 focus:ring-accent "
          :class="[
            isInCart
              ? 'text-accent border-accent hover:bg-accent/10'
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
