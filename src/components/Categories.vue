<template>
  <section
    class="py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto grid gap-6 md:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px]"
  >
    <!-- Large Feature Block (First Category) -->
    <div
      v-if="categories.length"
      class="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl bg-background border border-border p-4 sm:p-6 flex flex-col justify-end shadow-md hover:shadow-xl transition-all duration-500"
    >
      <img
        :src="categories[0].image"
        :alt="categories[0].name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      ></div>
      <div class="relative z-10 text-white max-w-full sm:max-w-sm">
        <h2 class="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3">{{ categories[0].name }}</h2>
        <p class="text-xs sm:text-sm opacity-90 mb-2 sm:mb-4 line-clamp-3">
          {{ categories[0].description }}
        </p>
        <p class="text-sm font-semibold opacity-90 mb-3">
          From ₦ {{ categories[0].priceRange.min }}
        </p>
        <RouterLink
          :to="{ name: 'products', query: { category: categories[0].name } }"
          class="cta px-4 sm:px-5 py-2 sm:py-3 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm sm:text-base shadow-md transition inline-block w-full sm:w-auto text-center"
        >
          Browse Collection
        </RouterLink>
      </div>
    </div>

    <!-- Remaining Categories -->
    <div
      v-for="(category, index) in categories.slice(1)"
      :key="category.id || index"
      class="relative rounded-2xl overflow-hidden bg-background border border-border p-4 sm:p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
    >
      <img
        :src="category.image"
        :alt="category.name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      ></div>
      <div class="relative z-10 text-white flex flex-col justify-between h-full">
        <div>
          <h3 class="text-lg sm:text-xl font-semibold">{{ category.name }}</h3>
          <p class="text-xs sm:text-sm opacity-90 mb-1 line-clamp-3">{{ category.description }}</p>
          <p class="text-sm font-semibold opacity-90">From ₦ {{ category.priceRange.min }}</p>
        </div>
        <RouterLink
          :to="{ name: 'products', query: { category: category.name } }"
          class="cta mt-3 px-3 sm:px-4 py-2 sm:py-3 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm sm:text-base shadow-md transition text-center w-full"
        >
          Browse
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { RouterLink } from "vue-router";

const fragranceStore = useFragranceStore();
const categories = ref([]);

onMounted(async () => {
  if (!fragranceStore.categories.length) {
    await fragranceStore.fetchFragrances(true);
  }
  categories.value = fragranceStore.categories;
});
</script>

<style scoped>
.cta {
  color: white;
}

/* Lift effect on hover */
section div:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

/* Text shadow for readability */
section div .relative.z-10 {
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* Responsive grid adjustments */
@media (max-width: 1024px) {
  section {
    grid-template-columns: repeat(2, 1fr);
    auto-rows: 200px;
  }
}
@media (max-width: 640px) {
  section {
    grid-template-columns: 1fr;
    auto-rows: auto;
  }
  section div p,
  section div h2,
  section div h3 {
    text-align: left;
  }
}
</style>
