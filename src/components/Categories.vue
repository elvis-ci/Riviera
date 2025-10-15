<script setup>
import { useFragranceStore } from "@/stores/useFragranceStore";
import { computed } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const store = useFragranceStore();
const categories = computed(() => store.categories);

// Responsive settings
const breakpoints = {
  0: {
    itemsToShow: 1.2, // slightly peeks next card on mobile
    snapAlign: "center",
  },
  768: {
    itemsToShow: 2,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 3,
    snapAlign: "start",
  },
};
</script>

<template>
  <section class="py-20 px-6 text-text" aria-labelledby="fragrance-categories-heading">
    <!-- Section Header -->
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 id="fragrance-categories-heading" class="text-4xl font-heading text-heading mb-4">
        Fragrance Categories
      </h2>
      <p class="text-text/90 text-lg max-w-2xl mx-auto">
        Explore scents crafted for every occasion — from floral dreams to woody elegance.
      </p>
    </div>

    <!-- Category Carousel -->
    <div class="max-w-7xl mx-auto relative">
      <Carousel
        :wrap-around="true"
        :transition="500"
        :breakpoints="breakpoints"
        class="category-carousel"
      >
        <Slide v-for="cat in categories" :key="cat.id">
          <article
            role="listitem"
            :aria-labelledby="`category-${cat.id}-title`"
            :aria-describedby="`category-${cat.id}-desc`"
            class="relative group bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-border-hover focus-within:shadow-2xl focus-within:border-border-hover transform hover:-translate-y-2 transition-all duration-500 ease-out mx-4"
          >
            <!-- Price Ribbon -->
            <div
              class="absolute top-0 left-0 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-br-lg shadow"
            >
              From ${{ cat.priceRange.min }}
            </div>

            <!-- Image Section -->
            <div class="relative overflow-hidden">
              <img
                :src="cat.image"
                :alt="`${cat.name} fragrance category`"
                class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-20"
                aria-hidden="true"
              >
                <span
                  class="text-white text-lg font-medium italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                >
                  Discover More
                </span>
              </div>
            </div>

            <!-- Details Section -->
            <div class="relative z-10 p-6 text-center bg-background">
              <h3 :id="`category-${cat.id}-title`" class="text-xl font-semibold text-heading mb-2">
                {{ cat.name }}
              </h3>
              <p :id="`category-${cat.id}-desc`" class="text-text/80 text-sm mb-4 line-clamp-2">
                {{ cat.description }}
              </p>

              <!-- Stats -->
              <ul
                class="flex justify-center items-center gap-3 text-sm text-text/90"
                aria-label="Category details"
              >
                <li>
                  💧 Available: <span class="font-semibold">{{ cat.availableQuantity }}</span>
                </li>
              </ul>

              <!-- Button -->
              <div class="flex justify-center">
                <button
                  class="group/btn mt-5 flex items-center gap-2 bg-accent text-white hover:bg-accent-hover px-6 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 hover:gap-3"
                  :aria-label="`Browse fragrances in ${cat.name} category`"
                >
                  Browse Collection
                  <span class="opacity-100 duration-200" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </article>
        </Slide>

        <!-- Navigation & Pagination -->
        <template #addons>
          <Navigation v-slot="{ goPrev, goNext }">
            <button
              @click="goPrev"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-accent/80 text-white px-3 py-2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
              aria-label="Previous category"
            >
              ‹
            </button>
            <button
              @click="goNext"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accent/80 text-white px-3 py-2 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
              aria-label="Next category"
            >
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
/* Motion safety */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* Hover float */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

article:hover {
  animation: float 3s ease-in-out infinite;
}

/* Focus styles */
button:focus-visible,
article:focus-within {
  outline: none;
  box-shadow: 0 0 0 4px var(--color-accent, #b48a4a);
}

/* Carousel spacing */
.category-carousel {
  --carousel-gap: 1.5rem;
  padding-inline: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
}

/* Pagination spacing */
.category-carousel :deep(.carousel__pagination) {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
  position: absolute;
  bottom: -10px;
}

/* Pagination dots styling */
.category-carousel :deep(.carousel__pagination-button) {
  margin-inline: 0.5rem;
}

/* High-contrast mode adjustments */
@media (forced-colors: active) {
  button {
    forced-color-adjust: none;
    background: Highlight;
    color: HighlightText;
  }
}
</style>
