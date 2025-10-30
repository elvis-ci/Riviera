<script setup>
import { ref, computed } from "vue";
import IconMdiMagnify from "~icons/mdi/magnify";
import IconMdiPackageVariant from "~icons/mdi/package-variant";
import IconMdiPackageCheck from "~icons/mdi/package-check";
import IconMdiAlert from "~icons/mdi/alert";
import IconMdiDotsVertical from "~icons/mdi/dots-vertical";
import IconMdiPlus from "~icons/mdi/plus";
import IconMdiSortAscending from "~icons/mdi/sort-ascending";
import IconMdiSortDescending from "~icons/mdi/sort-descending";

const products = ref([
  {
    id: "#P1001",
    name: "Amber Noir",
    category: "Unisex",
    price: 120.0,
    stock: 25,
    status: "In Stock",
    dateCreated: "2025-10-28",
  },
  {
    id: "#P1002",
    name: "Velvet Oud",
    category: "Men",
    price: 140.5,
    stock: 5,
    status: "Low Stock",
    dateCreated: "2025-10-27",
  },
  {
    id: "#P1003",
    name: "Elysian Bloom",
    category: "Women",
    price: 95.99,
    stock: 0,
    status: "Out of Stock",
    dateCreated: "2025-10-20",
  },
  {
    id: "#P1004",
    name: "Cedar Mist",
    category: "Unisex",
    price: 105.75,
    stock: 40,
    status: "In Stock",
    dateCreated: "2025-10-30",
  },
]);

const searchQuery = ref("");
const selectedCategory = ref("All");
const selectedStatus = ref("All");
const selectedDate = ref("All");

// Sorting controls
const sortBy = ref("None");
const sortOrder = ref("asc"); // "asc" or "desc"

const totalProducts = computed(() => products.value.length);
const inStockCount = computed(() =>
  products.value.filter((p) => p.status === "In Stock").length
);
const lowStockCount = computed(() =>
  products.value.filter((p) => p.status === "Low Stock").length
);

const uniqueDates = computed(() => {
  const dates = products.value.map((p) => p.dateCreated);
  return ["All", ...new Set(dates)];
});

const filteredProducts = computed(() => {
  let result = products.value.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "All" ||
      product.category === selectedCategory.value;
    const matchesStatus =
      selectedStatus.value === "All" ||
      product.status === selectedStatus.value;
    const matchesDate =
      selectedDate.value === "All" ||
      product.dateCreated === selectedDate.value;

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

  // Apply sorting
  if (sortBy.value !== "None") {
    result = [...result].sort((a, b) => {
      let comparison = 0;

      switch (sortBy.value) {
        case "Name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "Price":
          comparison = a.price - b.price;
          break;
        case "Stock":
          comparison = a.stock - b.stock;
          break;
        case "Date Created":
          comparison = new Date(a.dateCreated) - new Date(b.dateCreated);
          break;
      }

      return sortOrder.value === "asc" ? comparison : -comparison;
    });
  }

  return result;
});

function getStatusColor(status) {
  switch (status) {
    case "In Stock":
      return "text-green-800 bg-green-100";
    case "Low Stock":
      return "text-yellow-800 bg-yellow-100";
    default:
      return "text-red-800 bg-red-100";
  }
}

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
}

// Placeholder for Add Product action
function addProduct() {
  alert("Add product functionality coming soon!");
}
</script>

<template>
  <section class="p-6 lg:p-8 bg-background min-h-screen space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-bold text-heading">Manage Products</h1>

      <!-- Add Product Button -->
      <button
        @click="addProduct"
        class="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Add new product"
      >
        <IconMdiPlus size="20" aria-hidden="true" />
        Add Product
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="flex items-center gap-3 p-4 rounded-2xl border border-border bg-white shadow-sm"
      >
        <IconMdiPackageVariant class="text-accent" size="28" aria-hidden="true" />
        <div>
          <p class="text-sm text-text/70">Total Products</p>
          <p class="text-xl font-bold text-text">{{ totalProducts }}</p>
        </div>
      </div>

      <div
        class="flex items-center gap-3 p-4 rounded-2xl border border-border bg-white shadow-sm"
      >
        <IconMdiPackageCheck class="text-green-600" size="28" aria-hidden="true" />
        <div>
          <p class="text-sm text-text/70">In Stock</p>
          <p class="text-xl font-bold text-text">{{ inStockCount }}</p>
        </div>
      </div>

      <div
        class="flex items-center gap-3 p-4 rounded-2xl border border-border bg-white shadow-sm"
      >
        <IconMdiAlert class="text-yellow-600" size="28" aria-hidden="true" />
        <div>
          <p class="text-sm text-text/70">Low Stock</p>
          <p class="text-xl font-bold text-text">{{ lowStockCount }}</p>
        </div>
      </div>
    </div>

    <!-- Filters, Search, and Sort -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
      <!-- Search -->
      <div class="flex flex-col w-full sm:w-1/3">
        <label for="product-search" class="text-sm font-medium text-text/80 mb-1">
          Search Products
        </label>
        <div class="relative">
          <input
            id="product-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by product name..."
            class="w-full pl-10 pr-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text placeholder:text-text/60"
          />
          <IconMdiMagnify
            class="absolute left-3 top-2.5 text-text/70"
            size="20"
            aria-hidden="true"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 w-full sm:w-auto">
        <!-- Category -->
        <div>
          <label
            for="category-filter"
            class="block text-sm font-medium text-text/80 mb-1"
            >Category</label
          >
          <select
            id="category-filter"
            v-model="selectedCategory"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option>All</option>
            <option>Men</option>
            <option>Women</option>
            <option>Unisex</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label
            for="status-filter"
            class="block text-sm font-medium text-text/80 mb-1"
            >Status</label
          >
          <select
            id="status-filter"
            v-model="selectedStatus"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <!-- Date -->
        <div>
          <label
            for="date-filter"
            class="block text-sm font-medium text-text/80 mb-1"
            >Date Created</label
          >
          <select
            id="date-filter"
            v-model="selectedDate"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option
              v-for="date in uniqueDates"
              :key="date"
              :value="date"
            >
              {{ date }}
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div>
          <label
            for="sort-by"
            class="block text-sm font-medium text-text/80 mb-1"
          >
            Sort By
          </label>
          <div class="flex items-center gap-2">
            <select
              id="sort-by"
              v-model="sortBy"
              class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
            >
              <option>None</option>
              <option>Name</option>
              <option>Price</option>
              <option>Stock</option>
              <option>Date Created</option>
            </select>

            <!-- Sort Order Toggle -->
            <button
              @click="toggleSortOrder"
              class="flex items-center justify-center bg-accent/10 hover:bg-accent/20 rounded-xl p-2 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              :aria-label="sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'"
            >
              <IconMdiSortAscending
                v-if="sortOrder === 'asc'"
                class="text-accent"
                size="20"
              />
              <IconMdiSortDescending
                v-else
                class="text-accent"
                size="20"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="overflow-x-auto bg-white border border-border rounded-2xl shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-accent/10 text-text uppercase text-sm">
          <tr>
            <th class="py-3 px-4 font-semibold">ID</th>
            <th class="py-3 px-4 font-semibold">Name</th>
            <th class="py-3 px-4 font-semibold">Category</th>
            <th class="py-3 px-4 font-semibold text-right">Price ($)</th>
            <th class="py-3 px-4 font-semibold text-center">Stock</th>
            <th class="py-3 px-4 font-semibold text-center">Status</th>
            <th class="py-3 px-4 font-semibold text-center">Date Created</th>
            <th class="py-3 px-4 text-right"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="border-t border-border hover:bg-accent/5 transition"
          >
            <td class="py-3 px-4 text-sm font-medium text-accent-hover">
              {{ product.id }}
            </td>
            <td class="py-3 px-4 text-sm text-text">{{ product.name }}</td>
            <td class="py-3 px-4 text-sm text-text/80">{{ product.category }}</td>
            <td class="py-3 px-4 text-sm text-right text-text/90">
              {{ product.price.toFixed(2) }}
            </td>
            <td class="py-3 px-4 text-sm text-center text-text/80">
              {{ product.stock }}
            </td>
            <td class="py-3 px-4 text-center">
              <span
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                :class="getStatusColor(product.status)"
              >
                {{ product.status }}
              </span>
            </td>
            <td class="py-3 px-4 text-sm text-center text-text/80">
              {{ product.dateCreated }}
            </td>
            <td class="py-3 px-4 text-right">
              <button
                class="text-accent hover:text-accent-hover font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg px-2"
                aria-label="Manage product options"
              >
                <IconMdiDotsVertical size="18" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div
        v-if="!filteredProducts.length"
        class="text-center py-10 text-text/70 text-sm"
      >
        No products found.
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 640px) {
  h1 {
    font-size: 1.25rem;
  }

  th,
  td {
    padding: 0.5rem;
  }

  input,
  select {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.85rem;
  }
}
</style>
