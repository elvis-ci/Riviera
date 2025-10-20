<script setup>
import { ref, computed, onMounted } from "vue";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { useCartStore } from "@/stores/useCartStore";
import { useRoute } from "vue-router";

const store = useFragranceStore();
const cartStore = useCartStore();
const route = useRoute();

// --- Filters ---
const searchQuery = ref("");
const selectedCategory = ref(null);
const maxPriceFilter = ref(200);
const selectedRating = ref(0);

// --- Local state for product quantities ---
const quantities = ref({}); // e.g. { "id1": 2, "id2": 1 }

onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }
});

// --- Safe computed for max price ---
const maxPrice = computed(() => {
  return store.fragranceList.length
    ? Math.ceil(Math.max(...store.fragranceList.map((f) => f.price)))
    : 200;
});

// --- Filtered Fragrances ---
const filteredFragrances = computed(() => {
  return store.fragranceList.filter((f) => {
    const matchesCategory = selectedCategory.value ? f.category === selectedCategory.value : true;
    const matchesPrice = f.price <= maxPriceFilter.value;
    const matchesRating = f.rating >= selectedRating.value;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });
});

// --- Check if in cart ---
const isInCart = (id) => {
  return cartStore.cartItems.some((item) => item.id === id);
};

// --- Update Quantity (before adding to cart) ---
const updateQuantity = (item, newQty) => {
  if (newQty < 1) newQty = 1;
  quantities.value[item.id] = newQty;

  //If the item is already in the cart, update its quantity directly
  if (isInCart(item.id)) {
    cartStore.updateQuantity(item.id, newQty);
  }
};

// --- Add / Remove from Cart ---
const toggleCart = (item) => {
  const quantity = quantities.value[item.id] || 1;
  if (isInCart(item.id)) {
    cartStore.removeFromCart(item.id);
  } else {
    cartStore.addToCart(item, quantity);
  }
};

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
      <!-- Sidebar Filters -->
      <aside class="flex flex-col gap-6" aria-label="Filter options">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium mb-1">Search</label>
          <input
            id="search"
            type="text"
            v-model="searchQuery"
            placeholder="Search fragrances..."
            class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <!-- Categories -->
        <div>
          <p class="text-sm font-medium mb-2">Category</p>
          <ul class="flex flex-col gap-1" role="radiogroup">
            <li v-for="cat in store.categories" :key="cat.id">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  :value="cat.name"
                  v-model="selectedCategory"
                  class="accent-accent"
                />
                {{ cat.name }}
              </label>
            </li>
            <li>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  :value="null"
                  v-model="selectedCategory"
                  class="accent-accent"
                />
                All Categories
              </label>
            </li>
          </ul>
        </div>

        <!-- Price -->
        <div>
          <label class="text-sm font-medium mb-2 block" for="price-range">
            Max Price: ${{ maxPriceFilter }}
          </label>
          <input
            id="price-range"
            type="range"
            :max="maxPrice"
            min="0"
            v-model="maxPriceFilter"
            class="w-full accent-accent"
          />
        </div>

        <!-- Rating -->
        <div>
          <p class="text-sm font-medium mb-2">Minimum Rating</p>
          <ul class="flex flex-col gap-1" role="radiogroup">
            <li v-for="r in ratingsOptions" :key="r">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" :value="r" v-model="selectedRating" class="accent-accent" />
                <span>
                  <span v-for="i in r" :key="i" class="text-accent">★</span>
                  <span v-for="i in 5 - r" :key="i" class="text-gray-300">★</span>
                </span>
              </label>
            </li>
            <li>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="0" v-model="selectedRating" class="accent-accent" />
                All Ratings
              </label>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Product Grid -->
      <main>
        <div
          v-if="filteredFragrances.length === 0"
          class="text-center text-gray-500 py-20"
          role="status"
        >
          No fragrances match your filters.
        </div>

        <div
          v-else
          class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Fragrance product list"
        >
          <article
            v-for="item in filteredFragrances"
            :key="item.id"
            class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
          >
            <img
              :src="item.image_url"
              :alt="item.name"
              class="w-full h-64 object-cover"
              loading="lazy"
            />

            <div class="p-4 flex flex-col gap-2">
              <h2 class="text-lg font-semibold text-heading truncate">{{ item.name }}</h2>
              <p class="text-sm text-gray-600 line-clamp-2">
                {{ item.description || "A delightful fragrance." }}
              </p>

              <div class="flex items-center gap-1">
                <span v-for="i in 5" :key="i" class="text-sm">
                  <span :class="i <= item.rating ? 'text-accent' : 'text-gray-300'">★</span>
                </span>
                <span class="text-xs text-gray-600 ml-1">({{ item.rating }})</span>
              </div>

              <div class="flex justify-between items-center mt-1">
                <div>
                  <span
                    v-if="item.currentPrice < item.price"
                    class="text-gray-400 line-through text-sm"
                    >${{ item.price }}</span
                  >
                  <span class="text-accent font-bold text-lg ml-1">${{ item.currentPrice }}</span>
                </div>
                <!-- Quantity Selector -->
                <div class="flex items-center gap-2">
                  <button
                    @click="updateQuantity(item, (quantities[item.id] || 1) - 1)"
                    class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10"
                  >
                    −
                  </button>
                  <span class="w-8 text-center font-medium">
                    {{ quantities[item.id] || 1 }}
                  </span>
                  <button
                    @click="updateQuantity(item, (quantities[item.id] || 1) + 1)"
                    class="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-accent/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                @click="toggleCart(item)"
                class="mt-3 w-full py-3 font-bold rounded-lg text-sm shadow-md transition focus:ring-2 focus:ring-accent focus:ring-offset-1"
                :class="
                  isInCart(item.id)
                    ? 'text-accent border-accent border-2 hover:bg-accent/30'
                    : 'bg-accent text-white hover:bg-accent-hover'
                "
              >
                {{ isInCart(item.id) ? "Remove from Cart" : "Add to Cart" }}
              </button>
            </div>
          </article>
        </div>
      </main>
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
