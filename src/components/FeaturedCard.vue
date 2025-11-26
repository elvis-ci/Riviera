<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  fragrance: {
    type: Object,
    required: true,
  },
  cartStore: {
    type: Object,
    required: true,
  },
});

const quantity = ref(1);

const increaseQuantity = (fragrance) => {
  quantity.value++;
  props.cartStore.updateQuantity(fragrance.id, quantity.value);
};

const decreaseQuantity = (fragrance) => {
  if (quantity.value > 1) quantity.value--;
  props.cartStore.updateQuantity(fragrance.id, quantity.value);
};

const isInCart = (id) => {
  return props.cartStore.cartItems.some((cartItem) => cartItem.id === id);
};

watch(
  () => props.cartStore.cartItems,
  (newCartItems) => {
    const cartItem = newCartItems.find((fragrance) => fragrance.id === props.fragrance.id);
    quantity.value = cartItem ? cartItem.quantity : 1;
  },
  { immediate: true, deep: true }
);

// Calculate discounted price
const calculateCurrentPrice = (originalPrice, discount) => {
  const currentPrice = originalPrice - originalPrice * (discount / 100);
  return Math.round(currentPrice);
};
// Generate star rating (with half stars)
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) stars.push("full");
    else if (i === fullStars + 1 && hasHalfStar) stars.push("half");
    else stars.push("empty");
  }
  return stars;
};
</script>

<template>
  <!-- Actual Fragrance Cards -->
  <article
    class="relative group bg-background border border-border overflow-hidden shadow-md hover:shadow-xl sm:hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 mx-3 sm:mx-4 h-fit max-w-[350px]"
  >
    <!-- Image Section -->
    <div class="relative overflow-hidden h-[10rem] sm:h-[15rem]">
      <img
        :src="fragrance.image_url"
        :alt="fragrance.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        class="absolute top-3 left-3 bg-red-900 text-white px-2 py-1 text-xs sm:text-sm rounded-full font-medium transform -rotate-12 shadow-md"
      >
        {{ fragrance.discount }}% OFF
      </div>
    </div>

    <!-- Details Section -->
    <div
      class="relative flex flex-col items-start justify-center z-10 p-2 sm:p-4 text-center bg-background"
    >
      <div class="flex w-full justify-between items-start gap-3">
        <h3 class="text-sm sm:text-xl font-semibold text-accent mb-2 text-start leading-tight">
          {{ fragrance.name }}
        </h3>

        <!-- ⭐ Rating Section -->
        <div class="flex items-center justify-start mt-1">
          <template v-for="(star, i) in renderStars(fragrance.rating)" :key="i">
            <!-- Full Star -->
            <svg
              v-if="star === 'full'"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-2.5 h-2.5 sm:w-4 sm:h-4 text-yellow-600"
              aria-hidden="true"
            >
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.898 1.48 8.263L12 18.896l-7.416 4.571 1.48-8.263L0 9.306l8.332-1.151z"
              />
            </svg>

            <!-- Half Star -->
            <svg
              v-else-if="star === 'half'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-2.5 h-2.5 sm:w-4 sm:h-4 text-yellow-600"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="halfGradient">
                  <stop offset="50%" stop-color="currentColor" />
                  <stop offset="50%" stop-color="transparent" stop-opacity="1" />
                </linearGradient>
              </defs>
              <path
                fill="url(#halfGradient)"
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.898 1.48 8.263L12 18.896l-7.416 4.571 1.48-8.263L0 9.306l8.332-1.151z"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.898 1.48 8.263L12 18.896l-7.416 4.571 1.48-8.263L0 9.306l8.332-1.151z"
              />
            </svg>

            <!-- Empty Star -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              class="w-2.5 h-2.5 sm:w-4 sm:h-4 text-yellow-600"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.5l2.26 5.57 5.79.44-4.41 3.87 1.35 5.65L12 16.77l-4.47 2.26 1.35-5.65-4.41-3.87 5.79-.44L11.48 3.5z"
              />
            </svg>
          </template>
        </div>
      </div>

      <p class="text-text/70 text-xs sm:text-base mb-4 line-clamp-2 text-start leading-snug">
        {{ fragrance.description }}
      </p>
      <div class="flex w-full justify-between items-end">
        <div class="flex flex-col items-start">
          <span class="text-xs sm:text-base font-semibold text-text/70">Price</span>
          <div class="flex items-center gap-2">
            <span class="text-sm lg:text-lg font-bold text-accent">
             ₦
              {{ calculateCurrentPrice(fragrance.price, fragrance.discount) }}
            </span>
            <span class="text-xs sm:text-sm hidden sm:block text-border line-through">
              ₦ {{ fragrance.price }}
            </span>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-end mb-2 gap-2">
            <button
              @click="decreaseQuantity(fragrance)"
              class="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 transition text-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span class="w-6 text-center font-bold text-xs sm:text-sm">{{ quantity }}</span>
            <button
              @click="increaseQuantity(fragrance)"
              class="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-border rounded-md hover:bg-accent/10 transition text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            @click="
              !isInCart(fragrance.id)
                ? cartStore.addToCart(fragrance, quantity)
                : cartStore.removeFromCart(fragrance.id)
            "
            class="group/btn ml-auto w-fit flex items-center py-2  rounded-lg font-medium shadow-md transition-all duration-200 gap-1 sm:gap-2"
            aria-label="Add {{ fragrance.name }} to cart"
            :class="[
              !isInCart(fragrance.id)
                ? ' bg-accent text-white hover:bg-accent/90 text-xs sm:text-sm xl:text-base px-3'
                : 'bg-background text-accent-hover hover:bg-accent/10 border-2 border-accent text-xs xl:text-sm px-1',
            ]"
          >
            <IconMdiCartOutline size="20" class="hidden sm:block"/>
            <span> {{ !isInCart(fragrance.id) ? "Add to Cart" : "Remove from Cart" }} </span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
