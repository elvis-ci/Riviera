<template>
  <div class="">
    <h2 class="text-2xl sm:text-4xl mb-10 font-semibold text-heading/80 tracking-tight">
      Explore Our Recommendations
    </h2>

    <div class="relative overflow-hidden">
      <Carousel
        :wrap-around="false"
        :transition="600"
        :breakpoints="breakpoints"
        class="category-carousel"
      >
        <!-- Skeleton when loading -->
        <Slide v-for="n in showSkeleton ? 5 : 0" :key="'skeleton-' + n" aria-hidden="false">
          <article
            class="animate-pulse bg-surface rounded-2xl h-[460px] flex flex-col justify-between p-6 border border-border"
          >
            <div class="bg-gray-300/30 rounded-lg h-56 w-full mb-4"></div>
            <div class="space-y-3">
              <div class="h-5 bg-gray-300/30 rounded w-3/4 mx-auto"></div>
              <div class="h-4 bg-gray-300/30 rounded w-5/6 mx-auto"></div>
            </div>
          </article>
        </Slide>

        <!-- Actual Slides -->
        <Slide
          v-for="(item, index) in !showSkeleton ? recommendations : []"
          :key="item.id || index"
        >
          <ProductCard :item="item" :cartStore="cartStore" :style="recommendationsStyle" />
        </Slide>

        <!-- Navigation + Pagination -->
        <template #addons>
          <Navigation v-slot="{ goPrev, goNext }">
            <button
              @click="goPrev"
              class="absolute hidden md:block left-2 sm:left-0 top-1/2 -translate-y-1/2 bg-accent text-white px-3 py-2 rounded-full hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
              aria-label="Previous category"
            >
              ‹
            </button>
            <button
              @click="goNext"
              class="absolute hidden md:block right-2 sm:right-0 top-1/2 -translate-y-1/2 bg-accent text-white px-3 py-2 rounded-full hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
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
  </div>

</template>

<script setup>
import { computed } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { useCartStore } from "@/stores/useCartStore";
import ProductCard from "@/components/ProductCard.vue";

// --- Pinia stores ---
const store = useFragranceStore();
const cartStore = useCartStore();

const recommendations = computed(() =>
  store.fragranceList.filter((f) => f.discount > 26 && f.stock > 1)
);
// Show skeleton while loading or if no items yet
const showSkeleton = computed(() => recommendations.value?.length === 0);

const breakpoints = {
  0: { itemsToShow: 1.5, snapAlign: "center" }, // Slight gap for mobile
  640: { itemsToShow: 3.3, snapAlign: "center" }, // Small tablets
  768: { itemsToShow: 3.2, snapAlign: "center" },
  1024: { itemsToShow: 3.8, snapAlign: "start" },
  1200: { itemsToShow: 4.2, snapAlign: "start" },
};

const recommendationsStyle = [
  "max-w-[82%] ml-0 min-w-[82%] sm:min-w-[80%] sm:max-w-[80%] md:min-w-[80%] md:max-w-[80%] lg:max-w-[80%] lg:min-w-[80%]",
];
</script>
<style scoped>
.category-carousel {
  --carousel-gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
}

/* ✅ Pagination styling (fixed selector) */
.category-carousel :deep(.carousel__pagination) {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}

.category-carousel :deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: var(--color-border);
  transition: all 0.3s ease;
  opacity: 0.6;
}

.category-carousel :deep(.carousel__pagination-button--active) {
  background-color: var(--color-accent);
  transform: scale(1.3);
  opacity: 1;
}

/* ✅ Hover / focus ring for better accessibility */
.category-carousel :deep(.carousel__pagination-button:focus-visible) {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ✅ Navigation buttons on mobile */
.category-carousel :deep(.carousel__prev),
.category-carousel :deep(.carousel__next) {
  background-color: var(--color-accent);
  color: white;
  border-radius: 9999px;
  width: 36px;
  height: 36px;
  display: none;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.category-carousel :deep(.carousel__prev:hover),
.category-carousel :deep(.carousel__next:hover) {
  background-color: var(--color-accent-hover);
}

/* Hover lift */
article:hover {
  transform: translateY(-6px);
}

/* Responsive balance */
@media (max-width: 640px) {
  .category-carousel {
  }
}

@media (min-width: 769px) {
  /* ✅ Navigation buttons on mobile */
  .category-carousel :deep(.carousel__prev),
  .category-carousel :deep(.carousel__next) {
    display: flex;
  }
}
</style>
