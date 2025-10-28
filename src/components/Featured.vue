<script setup>
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import { computed, onMounted } from "vue";
import "vue3-carousel/dist/carousel.css";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { useCartStore } from "@/stores/useCartStore";
import FeaturedCard from "@/components/FeaturedCard.vue";

const cartStore = useCartStore();
const fragranceStore = useFragranceStore();
const featuredFragrances = computed(() => fragranceStore.featuredFragrances);

// Show skeleton while loading or if no items yet
const showSkeleton = computed(() => featuredFragrances?.length);
onMounted(async () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const lastFeaturedUpdate = Number(localStorage.getItem("lastFeaturedUpdate")) || 0;

  const isFeaturedExpired =
    !featuredFragrances.value.length || Date.now() - lastFeaturedUpdate > oneDay;

  if ( isFeaturedExpired) {
    await fragranceStore.fetchFragrances(true);
  }
});
// Carousel breakpoints
const breakpoints = {
  0: { itemsToShow: 1.5, snapAlign: "center" }, // Slight gap for mobile
  640: { itemsToShow: 1.5, snapAlign: "center" }, // Small tablets
  768: { itemsToShow: 2.1, snapAlign: "center" },
  1024: { itemsToShow: 3.04, snapAlign: "start" },
  1200: { itemsToShow: 3.05, snapAlign: "start" },
};
</script>

<template>
  <div class="max-w-7xl mx-auto relative">
    <!-- Carousel -->
    <Carousel
      :wrap-around="false"
      :transition="500"
      :breakpoints="breakpoints"
      class="fragrance-carousel"
      aria-label="Featured fragrances carousel"
    >
      <!-- Skeleton Slides -->
      <Slide v-for="n in showSkeleton ? 5 : 0" :key="'skeleton-' + n" aria-hidden="false">
        <article
          class="animate-pulse bg-surface rounded-2xl h-[24rem] sm:h-[26rem] md:h-[28rem] w-full p-4 sm:p-6 flex flex-col justify-between"
          role="status"
          aria-label="Loading featured fragrance"
        >
          <div class="bg-gray-300/40 rounded-lg h-[12rem] sm:h-[14rem] md:h-[16rem] w-full mb-4" />
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

      <Slide
        v-for="fragrance in !showSkeleton ? featuredFragrances : []"
        :key="fragrance.id || index"
      >
        <FeaturedCard :fragrance="fragrance" :cartStore="cartStore" />
      </Slide>

      <!-- Carousel Controls -->
      <template #addons>
        <Navigation v-slot="{ goPrev, goNext }">
          <button
            @click="goPrev"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-accent/80 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
            aria-label="Previous category"
          >
            ‹
          </button>
          <button
            @click="goNext"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent/80 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
            aria-label="Next category"
          >
            ›
          </button>
        </Navigation>
        <div class="mt-8 flex justify-center">
          <Pagination />
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.fragrance-carousel {
  --carousel-gap: 1rem;
  padding-inline: 0.5rem;
  margin-bottom: 3rem;
  position: relative;
}

/* ✅ Pagination styling (fixed selector) */
.fragrance-carousel :deep(.carousel__pagination) {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}

.fragrance-carousel :deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: var(--color-border);
  transition: all 0.3s ease;
  opacity: 0.6;
}

.fragrance-carousel :deep(.carousel__pagination-button--active) {
  background-color: var(--color-accent);
  transform: scale(1.3);
  opacity: 1;
}

/* ✅ Hover / focus ring for better accessibility */
.fragrance-carousel :deep(.carousel__pagination-button:focus-visible) {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ✅ Navigation buttons on mobile */
.fragrance-carousel :deep(.carousel__prev),
.fragrance-carousel :deep(.carousel__next) {
  background-color: var(--color-accent);
  color: white;
  border-radius: 9999px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.fragrance-carousel :deep(.carousel__prev:hover),
.fragrance-carousel :deep(.carousel__next:hover) {
  background-color: var(--color-accent-hover);
}

/* ✅ Responsive spacing */
@media (min-width: 640px) {
  .fragrance-carousel {
    --carousel-gap: 1.5rem;
    padding-inline: 1.5rem;
  }
}

/* ✅ Accessibility - reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
