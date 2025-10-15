<script setup>
import { computed } from "vue";
import { useFragranceStore } from "@/stores/useFragranceStore";

// Example favourites (you would eventually manage this via Pinia or localStorage)
const store = useFragranceStore();
const favourites = computed(() =>
  store.fragranceList.slice(0, 5) // Replace this with your real favourites list
);

function addToCart(item) {
  console.log("Added to cart:", item.name);
  // integrate your cart store or emit event
}

function removeFromFavourites(item) {
  console.log("Removed from favourites:", item.name);
  // remove from favourites logic
}
</script>

<template>
  <main id="favourites" class="bg-surface text-text overflow-hidden">
    <!-- Hero Section -->
    <section
      class="relative py-20 px-6 text-center bg-gradient-to-b from-accent/10 via-surface to-surface"
      aria-labelledby="favourites-heading"
    >
      <div class="max-w-3xl mx-auto">
        <h1
          id="favourites-heading"
          class="text-4xl font-heading text-heading mb-4 leading-tight"
        >
          Your Favourite Scents
        </h1>
        <p class="text-lg text-text/80">
          Every fragrance tells a story — here are the ones that speak to you most.
        </p>
      </div>
    </section>

    <!-- Favourites List -->
    <section class="relative py-16 px-6">
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"
      ></div>

      <div class="relative max-w-7xl mx-auto">
        <div
          v-if="favourites.length > 0"
          class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          role="list"
          aria-label="Favourite fragrances"
        >
          <article
            v-for="item in favourites"
            :key="item.id"
            role="listitem"
            class="bg-background border border-border rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 group focus-within:shadow-lg"
          >
            <!-- Image -->
            <div class="relative overflow-hidden">
              <img
                :src="item.image"
                :alt="`${item.name} perfume bottle`"
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <button
                @click="removeFromFavourites(item)"
                class="absolute top-3 right-3 bg-white/70 hover:bg-accent text-heading hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
                aria-label="Remove from favourites"
              >
                <i class="fa-solid fa-heart" aria-hidden="true"></i>
              </button>
            </div>

            <!-- Details -->
            <div class="p-5 text-center">
              <h3 class="text-lg font-semibold text-heading mb-2 line-clamp-1">
                {{ item.name }}
              </h3>
              <p class="text-text/80 text-sm mb-4 line-clamp-2">
                {{ item.short }}
              </p>
              <p class="text-accent font-medium mb-4">
                ${{ item.currentPrice.toFixed(2) }}
              </p>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  @click="addToCart(item)"
                  class="bg-accent text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-accent-hover transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
                >
                  Add to Cart
                </button>
                <button
                  @click="removeFromFavourites(item)"
                  class="border border-accent text-accent hover:bg-accent hover:text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-24 flex flex-col items-center justify-center"
          aria-live="polite"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965871.png"
            alt=""
            class="w-28 h-28 opacity-60 mb-6"
            aria-hidden="true"
          />
          <h2 class="text-2xl font-heading text-heading mb-2">
            No favourites yet
          </h2>
          <p class="text-text/70 mb-6">
            You haven’t added any fragrances to your favourites list.
          </p>
          <router-link
            to="/products"
            class="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-accent-hover transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
          >
            Browse Fragrances
            <span aria-hidden="true">→</span>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Motion safety */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* Focus accessibility */
button:focus-visible,
a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--color-accent, #b48a4a);
}

/* For text truncation in names/descriptions */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
