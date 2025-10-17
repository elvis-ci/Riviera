<script setup>
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

// Accept featured fragrances as prop
const props = defineProps({
  featuredFragrances: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Match breakpoints with Categories carousel
const breakpoints = {
  0: { itemsToShow: 1.2, snapAlign: "center" },   // mobile: slightly peek next card
  768: { itemsToShow: 2, snapAlign: "center" },   // tablet
  1024: { itemsToShow: 3, snapAlign: "start" },   // desktop
};

// Calculate discounted price
const calculateCurrentPrice = (originalPrice, discount) => {
  const currentPrice = originalPrice - (originalPrice * (discount / 100));
  return Math.round(currentPrice);
};
</script>

<template>
  <section class="py-20 bg-surface px-6">
    <!-- Section Header -->
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-heading text-heading mb-4">Best Deals</h2>
      <p class="text-text/80 text-lg max-w-2xl mx-auto">
        Indulge in our curated collection of captivating fragrances, each telling its own unique story.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="!props.featuredFragrances?.length" class="text-center py-10 text-text/70">
      Loading fragrances...
    </div>

    <!-- Carousel -->
    <div v-else class="max-w-7xl mx-auto relative">
      <Carousel
        :wrap-around="false"
        :transition="500"
        :breakpoints="breakpoints"
        class="fragrance-carousel"
      >
        <Slide v-for="(fragrance, index) in props.featuredFragrances" :key="index">
          <article
            :aria-label="`Fragrance: ${fragrance.name}`"
            class="relative group bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-border-hover transform hover:-translate-y-2 transition-all duration-500 ease-out mx-4"
          >
            <!-- Image -->
            <div class="relative overflow-hidden">
              <img
                :src="fragrance.image"
                :alt="fragrance.name"
                class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <!-- Discount Badge -->
              <div class="absolute top-4 left-4 bg-red-900 text-white px-3 py-1.5 rounded-full font-medium transform -rotate-12 shadow-lg">
                {{ fragrance.discount }}% OFF
              </div>

              <!-- Favorite Icon -->
              <button
                class="absolute top-4 right-4 z-20 bg-white/90 hover:bg-accent text-heading hover:text-white p-2 rounded-full shadow-md transition-colors duration-200"
                aria-label="Add to Favorites"
              >
                <IconMdiHeartOutline size="22" />
              </button>

              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pb-20 justify-center">
                <span class="text-white text-lg font-medium italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Discover the Magic
                </span>
              </div>
            </div>

            <!-- Bottom Content -->
            <div class="relative z-10 p-6 text-center bg-background">
              <h3 class="text-xl font-semibold text-heading mb-2">{{ fragrance.name }}</h3>
              <p class="text-text/70 text-sm mb-4 line-clamp-2">{{ fragrance.description }}</p>

              <div class="flex flex-col items-center gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-lg font-semibold text-border line-through">${{ fragrance.price }}</span>
                  <span class="text-xl font-bold text-accent">${{ calculateCurrentPrice(fragrance.price, fragrance.discount) }}</span>
                </div>

                <button class="group/btn flex items-center gap-2 bg-accent text-white hover:bg-accent/90 px-6 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all duration-200 hover:gap-3">
                  <IconMdiCartOutline size="22" />
                  Add to Cart
                  <span class="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">→</span>
                </button>
              </div>
            </div>
          </article>
        </Slide>

        <!-- Navigation & Pagination -->
        <template #addons>
          <Navigation v-slot="{ goPrev, goNext }">
            <button @click="goPrev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-accent/80 text-white px-3 py-2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50" aria-label="Previous fragrance">
              ‹
            </button>
            <button @click="goNext" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent/80 text-white px-3 py-2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50" aria-label="Next fragrance">
              ›
            </button>
          </Navigation>
          <div class="mt-6 flex justify-center">
            <Pagination />
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
/* Hover float animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

article:hover {
  animation: float 3s ease-in-out infinite;
}

/* Carousel spacing (match categories) */
.fragrance-carousel {
  --carousel-gap: 1.5rem;
  padding-inline: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
}
</style>
