<script setup>
import { computed } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const showSkeleton = computed(() => props.loading || !props.categories?.length);

const breakpoints = {
  0: { itemsToShow: 1.1, snapAlign: "center" },
  640: { itemsToShow: 1.5, snapAlign: "center" },
  768: { itemsToShow: 2, snapAlign: "center" },
  1024: { itemsToShow: 3.04, snapAlign: "start" },
  1200: { itemsToShow: 3.1, snapAlign: "start" },
};
</script>

<template>
  <section
    class="py-24 px-6 text-text bg-background relative overflow-hidden"
    aria-labelledby="fragrance-categories-heading"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-secondary/5 pointer-events-none"
    ></div>

    <!-- Section Header -->
    <div class="max-w-7xl mx-auto relative z-10 text-center mb-16">
      <h2
        id="fragrance-categories-heading"
        class="text-4xl sm:text-5xl font-heading text-heading mb-4 tracking-tight"
      >
        Explore Fragrance Categories
      </h2>
      <p class="text-text/90 text-lg max-w-2xl mx-auto">
        From floral elegance to woody allure — find a scent that speaks to your essence.
      </p>
    </div>

    <!-- Carousel -->
    <div class="max-w-7xl mx-auto relative">
      <Carousel
        :wrap-around="false"
        :transition="600"
        :breakpoints="breakpoints"
        class="category-carousel"
      >
        <!-- Skeleton when loading -->
        <template v-if="showSkeleton">
          <Slide v-for="n in 5" :key="'skeleton-' + n">
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
        </template>

        <!-- Actual Slides -->
        <template v-else>
          <Slide v-for="cat in categories" :key="cat.id">
            <article
              class="relative group bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-border-hover transition-all duration-500 ease-out mx-3 sm:mx-4 flex flex-col h-[460px]"
            >
              <!-- Image -->
              <div class="relative h-[65%] overflow-hidden rounded-t-2xl">
                <img
                  :src="cat.image"
                  :alt="`${cat.name} fragrance category`"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8"
                >
                  <span
                    class="text-white text-base font-medium italic opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out"
                  >
                    Discover More →
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div
              class="relative flex flex-col items-start justify-center z-10 p-4 sm:p-6 text-center bg-background rounded-t-3xl -mt-4"
              >
                <div>
                  <h3 class="text-xl font-semibold text-heading mb-2">
                    {{ cat.name }}
                  </h3>
                  <p class="text-sm text-text/80 mb-4 line-clamp-2">
                    {{ cat.description }}
                  </p>
                </div>

                <ul
                  class="flex justify-center items-center gap-4 text-sm text-text/80 mb-5"
                  aria-label="Category details"
                >
                  <li>
                    <span class="font-semibold text-accent">
                      {{ cat.availableQuantity }}
                    </span>
                    available
                  </li>
                  <li>
                    From
                    <span class="font-semibold text-accent">
                      ${{ cat.priceRange.min }}
                    </span>
                  </li>
                </ul>

                <button
                  class="btn-primary text-sm px-6 py-2.5 w-full rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                  :aria-label="`Browse fragrances in ${cat.name}`"
                >
                  Browse Collection
                </button>
              </div>
            </article>
          </Slide>
        </template>

        <!-- Navigation + Pagination -->
        <template #addons>
          <Navigation v-slot="{ goPrev, goNext }">
            <button
              @click="goPrev"
              class="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 bg-accent text-white px-3 py-2 rounded-full hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
              aria-label="Previous category"
            >
              ‹
            </button>
            <button
              @click="goNext"
              class="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 bg-accent text-white px-3 py-2 rounded-full hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
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
  </section>
</template>

<style scoped>
.category-carousel {
  --carousel-gap: 1rem;
  padding-inline: 0.5rem;
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
  display: flex;
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
  article {
    height: 400px;
  }

  .category-carousel {
    padding-inline: 0.5rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
