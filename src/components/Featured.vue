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

// Show skeleton while loading or if no items yet
const showSkeleton = computed(() => props.loading || !props.featuredFragrances?.length);

// Carousel breakpoints
const breakpoints = {
  0: { itemsToShow: 1.5, snapAlign: "center" }, // Slight gap for mobile
  640: { itemsToShow: 1.5, snapAlign: "center" }, // Small tablets
  768: { itemsToShow: 2.1, snapAlign: "center" },
  1024: { itemsToShow: 3.04, snapAlign: "start" },
  1200: { itemsToShow: 3.05, snapAlign: "start" },
};

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
  <section
    class="py-16 sm:py-20 bg-surface px-4 sm:px-6"
    aria-labelledby="featured-heading"
    :aria-busy="showSkeleton"
  >
    <!-- Heading -->
    <div class="max-w-7xl mx-auto text-center mb-10 sm:mb-12">
      <h2 id="featured-heading" class="text-3xl sm:text-4xl font-heading text-heading mb-3 sm:mb-4">
        Best Deals
      </h2>
      <p class="text-text/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Indulge in our curated collection of captivating fragrances, each telling its own unique
        story.
      </p>
    </div>

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
            <div
              class="bg-gray-300/40 rounded-lg h-[12rem] sm:h-[14rem] md:h-[16rem] w-full mb-4"
            />
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

        <!-- Actual Fragrance Cards -->
        <Slide
          v-for="(fragrance, index) in !showSkeleton ? props.featuredFragrances : []"
          :key="fragrance.slug || index"
        >
          <article
            class="relative group bg-background border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl sm:hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 mx-1 sm:mx-3 h-[24rem] sm:h-[26rem] md:h-[28rem]"
            :aria-label="`Fragrance: ${fragrance.name}`"
          >
            <!-- Image Section -->
            <div
              class="relative overflow-hidden h-[13rem] sm:h-[15rem] md:h-[16rem] lg:h-[17rem] rounded-t-2xl"
            >
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
              class="relative flex flex-col items-start justify-center z-10 p-4 sm:p-6 text-center bg-background rounded-t-3xl -mt-4"
            >
              <div class="flex w-full justify-between items-start gap-3">
                <h3
                  class="text-lg sm:text-xl font-semibold text-accent mb-2 text-start leading-tight"
                >
                  {{ fragrance.name }}
                </h3>

                <!-- ⭐ Rating Section -->
                <div class="flex items-center justify-start mt-1" aria-label="Fragrance rating">
                  <template v-for="(star, i) in renderStars(fragrance.rating)" :key="i">
                    <!-- Full Star -->
                    <svg
                      v-if="star === 'full'"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400"
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
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400"
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
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400"
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

              <p
                class="text-text/70 text-sm sm:text-base mb-4 line-clamp-2 text-start leading-snug"
              >
                {{ fragrance.description }}
              </p>
              <div class="flex w-full justify-between items-end">
                <div class="flex flex-col items-start">
                  <span class="text-sm sm:text-md font-semibold text-text/70">Price</span>
                  <div class="flex items-center gap-2">
                    <span class="text-xs sm:text-sm font-semibold text-border line-through">
                      ${{ fragrance.price }}
                    </span>
                    <span class="text-lg sm:text-xl font-bold text-accent">
                      ${{ calculateCurrentPrice(fragrance.price, fragrance.discount) }}
                    </span>
                  </div>
                </div>

                <button
                  class="group/btn w-fit flex items-center bg-accent text-white hover:bg-accent/90 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-md transition-all duration-200 gap-1 sm:gap-2"
                >
                  <IconMdiCartOutline size="20" />
                  <span class="hidden sm:inline">Add to Cart</span>
                </button>
              </div>
            </div>
          </article>
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
  </section>
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
