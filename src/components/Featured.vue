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
  const currentPrice = originalPrice - originalPrice * (discount / 100);
  return Math.round(currentPrice);
};

// Generate star rating (including half stars)
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push("full");
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
};
</script>

<template>
  <section
    class="py-20 bg-surface px-6"
    aria-labelledby="featured-heading"
    :aria-busy="showSkeleton"
  >
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 id="featured-heading" class="text-4xl font-heading text-heading mb-4">
        Best Deals
      </h2>
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
        <Slide
          v-for="(fragrance, index) in props.featuredFragrances"
          :key="fragrance.slug || index"
        >
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
              <div
                class="absolute top-4 left-4 bg-red-900 text-white px-3 py-1.5 rounded-full font-medium transform -rotate-12 shadow-lg"
              >
                {{ fragrance.discount }}% OFF
              </div>
            </div>

            <div
              class="relative flex flex-col items-center justify-center z-10 p-6 text-center bg-transparent"
            >
              <h3 class="text-xl font-semibold text-heading mb-2">
                {{ fragrance.name }}
              </h3>

              <!-- ⭐ Rating Section -->
              <div
                class="flex items-center justify-center mb-3"
                aria-label="Fragrance rating"
              >
                <template v-for="(star, i) in renderStars(fragrance.rating)" :key="i">
                  <!-- Full Star -->
                  <svg
                    v-if="star === 'full'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    class="w-5 h-5 text-yellow-400"
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
                    class="w-5 h-5 text-yellow-400"
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
                    class="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.5l2.26 5.57 5.79.44-4.41 3.87 1.35 5.65L12 16.77l-4.47 2.26 1.35-5.65-4.41-3.87 5.79-.44L11.48 3.5z"
                    />
                  </svg>
                </template>
                <span class="ml-2 text-sm text-gray-500">
                  {{ fragrance.rating?.toFixed(1) }}
                </span>
              </div>

              <p class="text-text/70 text-sm mb-4 line-clamp-2">
                {{ fragrance.description }}
              </p>

              <div class="flex flex-col items-center gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-lg font-semibold text-border line-through">
                    ${{ fragrance.price }}
                  </span>
                  <span class="text-xl font-bold text-accent">
                    ${{ fragrance.currentPrice }}
                  </span>
                </div>
              </div>

              <button
                class="group/btn w-fit flex items-center gap-2 bg-accent text-white hover:bg-accent/90 px-6 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all duration-200 hover:gap-3"
              >
                <IconMdiCartOutline size="22" />
                Add to Cart
                <span
                  class="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"
                  >→</span
                >
              </button>
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
