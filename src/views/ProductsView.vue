<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { useCartStore } from "@/stores/useCartStore";
import { useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";

// --- Pinia stores ---
const store = useFragranceStore();
const cartStore = useCartStore();

// --- Filters ---
const searchQuery = ref("");
const selectedCategory = ref(null);
const minPrice = ref(0);
const maxPriceVal = ref(200000);
const selectedPriceRange = ref([minPrice.value, maxPriceVal.value]);
const selectedRating = ref(0);

// --- Collapsible filter sections ---
const showCategories = ref(true);
const showRatings = ref(true);
const showFiltersMobile = ref(false);

// --- Route category pre-filter ---
const route = useRoute();
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }

  const prices = store.fragranceList.map((f) => f.price);
  if (prices.length) {
    const highest = Math.max(...prices);
    maxPriceVal.value = highest;
    selectedPriceRange.value = [minPrice.value, maxPriceVal.value];
  }
});

// --- Keep slider values in sync ---
watch([minPrice, maxPriceVal], () => {
  if (minPrice.value > maxPriceVal.value) {
    minPrice.value = maxPriceVal.value;
  }
  selectedPriceRange.value = [minPrice.value, maxPriceVal.value];
});

// --- Max price from store ---
const maxPrice = computed(() => {
  const prices = store.fragranceList.map((f) => f.price);
  return prices.length ? Math.max(...prices) : 200000;
});

// --- Dynamic gradient for the track ---
const rangeTrackStyle = computed(() => {
  const min = minPrice.value;
  const max = maxPriceVal.value;
  const limit = maxPrice.value || 100;
  const left = (min / limit) * 100;
  const right = (max / limit) * 100;
  return {
    background: `linear-gradient(to right, #d1d5db ${left}%, #784B12 ${left}%, #784B12 ${right}%, #d1d5db ${right}%)`,
  };
});

// --- Handlers ---
const onMinRangeInput = (e) => {
  const value = Number(e.target.value);
  if (value <= maxPriceVal.value) minPrice.value = value;
};
const onMaxRangeInput = (e) => {
  const value = Number(e.target.value);
  if (value >= minPrice.value) maxPriceVal.value = value;
};

// --- Ratings options ---
const ratingsOptions = [5, 4, 3, 2, 1];

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

const currentPage = ref(1);
const itemsPerPage = ref(12);

const paginatedFragrances = computed (() => {
  const start = 0;
  const end = start + currentPage.value * itemsPerPage.value;
  return filteredFragrances.value.slice(start, end);
})

watch(filteredFragrances, () => {
  currentPage.value = 1; // Reset to first page on filter change
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on filter change
});
</script>

<template>
  <section class="py-12 bg-background text-text">
    <!-- Header -->
    <!-- Modern Hero / Intro Section -->
    <section
      class="relative overflow-hidden  py-20 sm:py-28"
    >
      <div class="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2B1A10] dark:text-text mb-4"
        >
          Find Your <span class="text-accent">Signature Scent</span>
        </h1>

        <p class="max-w-2xl mx-auto text-base sm:text-lg text-[#4B3A2B]/80 dark:text-text/80 mb-8">
          Explore our curated collection of timeless fragrances — filter by category, mood, or price
          to discover a scent that’s uniquely yours.
        </p>

      </div>
    </section>

    <!-- Layout -->
    <div class="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8 relative">
      <!-- Sidebar (Desktop) -->
      <aside
        class="hidden lg:block sticky top-24 self-start h-fit bg-surface border border-border rounded-2xl p-6 shadow-sm"
      >
        <!-- Search -->
        <div class="mb-6">
          <label for="search" class="block text-sm font-medium mb-1">Search</label>
          <input
            id="search"
            type="text"
            v-model="searchQuery"
            placeholder="Search fragrances..."
            class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        <!-- Category -->
        <div class="mb-6">
          <button
            @click="showCategories = !showCategories"
            class="w-full flex justify-between items-center text-sm font-medium mb-2 text-heading"
          >
            <span>Category</span>
            <span
              class="transform transition-transform duration-200"
              :class="{ 'rotate-180': showCategories }"
            >
              ▼
            </span>
          </button>

          <transition name="fade">
            <ul v-if="showCategories" class="flex flex-col gap-1">
              <li v-for="cat in store.categories" :key="cat.id">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    :value="cat.name"
                    v-model="selectedCategory"
                    class="focus:ring-accent h-4 w-4 text-accent border-border"
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
                    class="focus:ring-accent h-4 w-4 text-accent border-border"
                  />
                  All Categories
                </label>
              </li>
            </ul>
          </transition>
        </div>

        <!-- Dual range price filter (desktop) -->
        <div class="mb-6">
          <p class="text-sm font-medium mb-2">Price (max: ${{ maxPrice }})</p>

          <!-- Range Track -->
          <div class="relative w-full h-2 rounded-md" :style="rangeTrackStyle">
            <input
              type="range"
              :min="0"
              :max="maxPrice"
              v-model.number="minPrice"
              @input="onMinRangeInput"
              class="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
              style="z-index: 3"
            />
            <input
              type="range"
              :min="0"
              :max="maxPrice"
              v-model.number="maxPriceVal"
              @input="onMaxRangeInput"
              class="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
              style="z-index: 2"
            />
          </div>

          <!-- Numeric Inputs -->
          <div class="flex items-center justify-between mt-3 gap-2">
            <input
              type="number"
              v-model.number="minPrice"
              min="0"
              :max="maxPriceVal"
              class="w-1/2 px-2 py-1 border border-border rounded-md text-sm focus:ring-1 focus:ring-accent"
              placeholder="Min"
            />
            <span class="text-xs text-text/70">to</span>
            <input
              type="number"
              v-model.number="maxPriceVal"
              :max="maxPrice"
              :min="minPrice"
              class="w-1/2 px-2 py-1 border border-border rounded-md text-sm focus:ring-1 focus:ring-accent"
              placeholder="Max"
            />
          </div>
          <div class="text-xs mt-1">Range: ${{ minPrice }} - ${{ maxPriceVal }}</div>
        </div>

        <!-- Ratings -->
        <div>
          <button
            @click="showRatings = !showRatings"
            class="w-full flex justify-between items-center text-sm font-medium mb-2 text-heading"
          >
            <span>Minimum Rating</span>
            <span
              class="transform transition-transform duration-200"
              :class="{ 'rotate-180': showRatings }"
            >
              ▼
            </span>
          </button>

          <transition name="fade">
            <ul v-if="showRatings" class="flex flex-col gap-1">
              <li v-for="r in ratingsOptions" :key="r">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    :value="r"
                    v-model="selectedRating"
                    class="focus:ring-accent h-4 w-4 text-accent border-border"
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
                    class="focus:ring-accent h-4 w-4 text-accent border-border"
                  />
                  All Ratings
                </label>
              </li>
            </ul>
          </transition>
        </div>
      </aside>

      <!-- Main section -->
      <section class="min-h-[70vh]">
        <!-- Mobile Filters -->
        <div class="lg:hidden mb-6 space-y-4">
          <button
            @click="showFiltersMobile = !showFiltersMobile"
            class="w-full py-2 px-4 border border-border rounded-lg bg-surface text-heading font-medium flex justify-between items-center"
          >
            <span>Filters & Search</span>
            <span
              class="transition-transform duration-200"
              :class="{ 'rotate-180': showFiltersMobile }"
            >
              ▼
            </span>
          </button>

          <transition name="fade">
            <div
              v-if="showFiltersMobile"
              class="bg-surface border border-border rounded-xl p-4 space-y-4"
            >
              <!-- Search -->
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search fragrances..."
                class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <!-- Category -->
              <div>
                <p class="font-medium text-sm mb-1">Category</p>
                <select
                  v-model="selectedCategory"
                  class="w-full px-3 py-2 border border-border rounded-md"
                >
                  <option value="">All Categories</option>
                  <option v-for="cat in store.categories" :key="cat.id" :value="cat.name">
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <!-- Dual slider (mobile) -->
              <div>
                <p class="font-medium text-sm mb-1">Price (max: ${{ maxPrice }})</p>
                <div class="relative w-full h-2 rounded-md" :style="rangeTrackStyle">
                  <input
                    type="range"
                    :min="0"
                    :max="maxPrice"
                    v-model.number="minPrice"
                    @input="onMinRangeInput"
                    class="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
                    style="z-index: 3"
                  />
                  <input
                    type="range"
                    :min="0"
                    :max="maxPrice"
                    v-model.number="maxPriceVal"
                    @input="onMaxRangeInput"
                    class="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
                    style="z-index: 2"
                  />
                </div>

                <div class="flex items-center justify-between mt-3 gap-2">
                  <input
                    type="number"
                    v-model.number="minPrice"
                    min="0"
                    :max="maxPriceVal"
                    class="w-1/2 px-2 py-1 border border-border rounded-md text-sm focus:ring-1 focus:ring-accent"
                    placeholder="Min"
                  />
                  <span class="text-xs text-text/70">to</span>
                  <input
                    type="number"
                    v-model.number="maxPriceVal"
                    :max="maxPrice"
                    :min="minPrice"
                    class="w-1/2 px-2 py-1 border border-border rounded-md text-sm focus:ring-1 focus:ring-accent"
                    placeholder="Max"
                  />
                </div>
                <div class="text-xs mt-1">Range: ${{ minPrice }} - ${{ maxPriceVal }}</div>
              </div>

              <!-- Rating -->
              <div>
                <p class="font-medium text-sm mb-1">Minimum Rating</p>
                <select
                  v-model="selectedRating"
                  class="w-full px-3 py-2 border border-border rounded-md"
                >
                  <option value="0">All Ratings</option>
                  <option v-for="r in ratingsOptions" :key="r" :value="r">{{ r }} ★ & Up</option>
                </select>
              </div>
            </div>
          </transition>
        </div>

        <!-- Products Grid -->
        <div v-if="filteredFragrances.length === 0" class="text-center text-text/70 py-20">
          No fragrances match your filters.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="item in paginatedFragrances"
            :key="item.id"
            :item="item"
            :cart-store="cartStore"
          />
        </div>

        <!-- Pagination Controls -->
         <div class="w-full flex justify-center items-center mt-10">
          <button @click="currentPage++" class=" bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition">
            Load More ...
          </button>
         </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0.95);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: scaleY(1);
}

/* Range styling */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: transparent;
  pointer-events: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: var(--color-accent-hover);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}

input[type="range"]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: var(--color-accent-hover);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}
.range-thumb-brown::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #92400e; /* Brown thumb */
  cursor: pointer;
  border: 2px solid #fff;
}
.range-thumb-brown::-webkit-slider-runnable-track {
  height: 2px;
  background: transparent;
}

.range-thumb-brown::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #92400e;
  border: 2px solid #fff;
  cursor: pointer;
}
.range-thumb-brown::-moz-range-track {
  background: transparent;
}
</style>
