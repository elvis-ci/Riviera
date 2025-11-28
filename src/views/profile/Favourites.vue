<script setup>
// Example favorites data (replace with API or store later)
import { ref } from "vue";

const loading = ref(true);

const favorites = ref([
  {
    id: 1,
    name: "Luxury Perfume A",
    price: 35000,
    image: "/images/sample-product-1.jpg",
  },
  {
    id: 2,
    name: "Fragrance Oil B",
    price: 18000,
    image: "/images/sample-product-2.jpg",
  },
  {
    id: 3,
    name: "Body Spray C",
    price: 12000,
    image: "/images/sample-product-3.jpg",
  },
]);

// Fake loading
setTimeout(() => (loading.value = false), 800);
</script>

<template>
  <section class="p-4 sm:p-6">
    <h1 class="text-2xl font-semibold text-heading mb-6">Your Favorites</h1>

    <!-- Empty State -->
    <div
      v-if="!loading && favorites.length === 0"
      class="text-center py-16 text-text/70"
    >
      <p class="text-lg">You have no favorite items yet.</p>
      <p class="text-sm mt-2">Start adding products to your wishlist.</p>
    </div>

    <!-- Skeleton Loading -->
    <div
      v-else-if="loading"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div v-for="i in 6" :key="i" class="bg-background p-4 rounded-xl shadow border border-border animate-pulse">
        <div class="w-full h-40 bg-surface rounded-lg mb-4"></div>
        <div class="h-4 bg-surface rounded mb-2"></div>
        <div class="h-4 w-1/2 bg-surface rounded"></div>
      </div>
    </div>

    <!-- Favorites Grid -->
    <div
      v-else
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="item in favorites"
        :key="item.id"
        class="bg-background border border-border rounded-xl shadow overflow-hidden flex flex-col"
      >
        <!-- Product Image -->
        <img
          :src="item.image"
          :alt="item.name"
          class="h-48 w-full object-cover"
        />

        <!-- Content -->
        <div class="p-4 flex-1 flex flex-col">
          <h2 class="font-semibold text-heading text-lg mb-1">{{ item.name }}</h2>
          <p class="text-accent font-medium mb-4">₦{{ item.price.toLocaleString() }}</p>

          <div class="mt-auto flex justify-between items-center">
            <button
              class="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-accent/10"
            >
              View
            </button>

            <button
              class="px-3 py-1.5 text-sm rounded-lg bg-accent text-white hover:opacity-90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
