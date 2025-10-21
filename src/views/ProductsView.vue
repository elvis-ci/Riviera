<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { useCartStore } from "@/stores/useCartStore";
import { useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";

// --- Pinia store ---
const store = useFragranceStore();
const cartStore = useCartStore();

// --- Filters ---
const searchQuery = ref("");
const selectedCategory = ref(null);
const selectedPriceRange = ref([0, 200]);
const selectedRating = ref(0);

// --- Route for preset category filter ---
const route = useRoute();
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }
});

// --- Filtered fragrances ---
const filteredFragrances = computed(() => {
  return store.fragranceList.filter((f) => {
    const matchesCategory = selectedCategory.value ? f.category === selectedCategory.value : true;
    const matchesPrice =
      f.price >= selectedPriceRange.value[0] && f.price <= selectedPriceRange.value[1];
    const matchesRating = f.rating >= selectedRating.value;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });
});

// --- Price range slider max ---
const maxPrice = computed(() => Math.max(...store.fragranceList.map((f) => f.price)));

// --- Ratings options ---
const ratingsOptions = [5, 4, 3, 2, 1];


</script>

<template>
  <section class="py-12 px-6 bg-surface text-text">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8 text-center">
      <h1 class="text-4xl font-heading text-heading mb-2">Shop Fragrances</h1>
      <p class="text-text/90">
        Discover your perfect scent — filter by category, price, rating, or search by name.
      </p>
    </div>

    <div class="max-w-7xl mx-auto grid lg:grid-cols-[250px_1fr] gap-8">
      <!-- Filters Sidebar -->
      <aside class="flex flex-col gap-6">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium mb-1">Search</label>
          <input
            id="search"
            type="text"
            v-model="searchQuery"
            placeholder="Search fragrances..."
            class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        <!-- Categories -->
        <div>
          <p class="text-sm font-medium mb-2">Category</p>
          <ul class="flex flex-col gap-1">
            <li v-for="cat in store.categories" :key="cat.id">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  :value="cat.name"
                  v-model="selectedCategory"
                  class="focus:ring-accent focus:ring-2 h-4 w-4 text-accent border-border"
                />
                {{ cat.name }}
              </label>
            </li>
            <li>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value=""
                  v-model="selectedCategory"
                  class="focus:ring-accent focus:ring-2 h-4 w-4 text-accent border-border"
                />
                All Categories
              </label>
            </li>
          </ul>
        </div>

        <!-- Price -->
        <div>
          <p class="text-sm font-medium mb-2">Price (max: ${{ maxPrice }})</p>
          <input
            type="range"
            :max="maxPrice"
            v-model="selectedPriceRange[1]"
            class="w-full h-2 accent-accent"
          />
          <div class="text-xs mt-1">Up to ${{ selectedPriceRange[1] }}</div>
        </div>

        <!-- Rating -->
        <div>
          <p class="text-sm font-medium mb-2">Minimum Rating</p>
          <ul class="flex flex-col gap-1">
            <li v-for="r in ratingsOptions" :key="r">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  :value="r"
                  v-model="selectedRating"
                  class="focus:ring-accent focus:ring-2 h-4 w-4 text-accent border-border"
                />
                <span>
                  <span v-for="i in r" :key="i" class="text-accent">★</span>
                  <span v-for="i in 5 - r" :key="i" class="text-text/50">★</span>
                </span>
              </label>
            </li>
            <li>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="0"
                  v-model="selectedRating"
                  class="focus:ring-accent focus:ring-2 h-4 w-4 text-accent border-border"
                />
                All Ratings
              </label>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Products Grid -->
      <section>
        <div v-if="filteredFragrances.length === 0" class="text-center text-text/70 py-20">
          No fragrances match your filters.
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="item in filteredFragrances"
            :key="item.id"
            :item="item"
            :cart-store="cartStore"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
