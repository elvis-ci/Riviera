<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article
    class="relative group bg-background border border-border overflow-hidden shadow-md hover:shadow-2xl hover:border-border-hover transition-all duration-500 ease-out mx-3 sm:mx-4 max-w-[350px] flex flex-col h-fit"
  >
    <!-- Image -->
    <div class="relative overflow-hidden h-[10rem] sm:h-[15rem]">
      <img
        :src="category.image"
        :alt="`${category.name} fragrance category`"
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
      class="relative flex flex-col items-start justify-center z-10 px-4 sm:p-6 text-center bg-background"
    >
      <div>
        <h3 class="text-xl font-semibold text-heading mb-2">
          {{ category.name }}
        </h3>
        <p class="text-sm text-text/80 mb-4 line-clamp-2">
          {{ category.description }}
        </p>
      </div>

      <div class="w-full flex items-center justify-center mb-2">
        <p>
          From
          <span class="font-semibold text-accent"> ${{ category.priceRange.min }} </span>
        </p>
      </div>
      <router-link
        :to="{ name: 'products', query: { category: category.name } }"
        class="bg-accent cta hover:bg-accent-hover text-sm px-6 py-2.5 w-full rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
        :aria-label="`Browse fragrances in ${category.name}`"
      >
        Browse Collection
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.cta {
  color: white;
}

/* Hover lift */
article:hover {
  transform: translateY(-6px);
}

/* Responsive balance */
@media (max-width: 640px) {
  article {
padding-bottom: 20px;  }
}
</style>
