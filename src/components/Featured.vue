// ...existing code...
<script setup>
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { computed } from "vue";

// Props
const props = defineProps({
  featuredFragrances: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// show skeleton while loading or no items yet
const showSkeleton = computed(() => props.loading || !props.featuredFragrances?.length);

// Carousel breakpoints
const breakpoints = {
  0: { itemsToShow: 1.2, snapAlign: "center" },
  768: { itemsToShow: 2, snapAlign: "center" },
  1024: { itemsToShow: 3, snapAlign: "start" },
};

// Calculate discounted price
const calculateCurrentPrice = (originalPrice, discount) => {
  const currentPrice = originalPrice - (originalPrice * (discount / 100));
  return Math.round(currentPrice);
};
</script>
// ...existing code...

<template>
  <section class="py-20 bg-surface px-6" aria-labelledby="featured-heading" aria-busy="false">
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 id="featured-heading" class="text-4xl font-heading text-heading mb-4">Best Deals</h2>
      <p class="text-text/80 text-lg max-w-2xl mx-auto">
        Indulge in our curated collection of captivating fragrances, each telling its own unique story.
      </p>
    </div>

    <!-- Carousel Wrapper -->
    <Carousel
      :wrap-around="false"
      :transition="500"
      :breakpoints="breakpoints"
      class="fragrance-carousel"
      aria-label="Featured fragrances carousel"
    >
      <!-- Loading Skeleton Slides -->
      <template v-if="showSkeleton">
        <Slide v-for="n in 5" :key="'skeleton-' + n" aria-hidden="false">
          <article
            class="animate-pulse bg-surface rounded-2xl h-96 w-full p-6 flex flex-col justify-between"
            role="status"
            aria-label="Loading featured fragrance"
          >
            <div class="bg-gray-300/40 rounded-lg h-48 w-full mb-4" />
            <div class="space-y-3">
              <div class="h-6 bg-gray-300/40 rounded w-3/4 mx-auto"></div>
              <div class="h-4 bg-gray-300/40 rounded w-5/6 mx-auto"></div>
              <div class="flex items-center justify-center gap-3 mt-4">
                <div class="h-6 w-20 bg-gray-300/40 rounded" />
                <div class="h-8 w-28 bg-gray-300/40 rounded" />
              </div>
            </div>
            <span class="sr-only">Loading featured fragrances</span>
          </article>
        </Slide>
      </template>

      <!-- Actual Slides -->
      <template v-else>
        <Slide v-for="(fragrance, index) in props.featuredFragrances" :key="fragrance.slug || index">
          <article
            class="relative group bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 mx-4"
            :aria-label="`Fragrance: ${fragrance.name}`"
          >
            <div class="relative overflow-hidden">
              <img
                :src="fragrance.image_url"
                :alt="fragrance.name"
                class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute top-4 left-4 bg-red-900 text-white px-3 py-1.5 rounded-full font-medium transform -rotate-12 shadow-lg">
                {{ fragrance.discount }}% OFF
              </div>
            </div>
            <div class="relative z-10 p-6 text-center bg-background">
              <h3 class="text-xl font-semibold text-heading mb-2">{{ fragrance.name }}</h3>
              <p class="text-text/70 text-sm mb-4 line-clamp-2">{{ fragrance.description }}</p>
              <div class="flex flex-col items-center gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-lg font-semibold text-border line-through">${{ fragrance.price }}</span>
                  <span class="text-xl font-bold text-accent">${{ calculateCurrentPrice(fragrance.price, fragrance.discount) }}</span>
                </div>
              </div>
            </div>
          </article>
        </Slide>
      </template>
    </Carousel>
  </section>
</template>

<style scoped>
.fragrance-carousel {
  --carousel-gap: 1.5rem;
  padding-inline: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
}
</style>
// ...existing code...