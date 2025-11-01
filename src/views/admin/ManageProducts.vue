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
import IconMdiCloseCircle from "~icons/mdi/close-circle";

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
const isSorted = ref(false);
const showFilters = ref(true);

const totalProducts = computed(() => products.value.length);
const inStockCount = computed(() => products.value.filter((p) => p.status === "In Stock").length);
const lowStockCount = computed(() => products.value.filter((p) => p.status === "Low Stock").length);
const OutOfStockCount = computed(
  () => products.value.filter((p) => p.status === "Out of Stock").length
);

const summmaries = ref([
  {
    label: "Total Products",
    value: totalProducts.value,
    icon: { iconName: IconMdiPackageVariant, iconClass: "text-accent" },
  },
  {
    label: "In Stock",
    value: inStockCount.value,
    icon: { iconName: IconMdiPackageCheck, iconClass: "text-green-600" },
  },
  {
    label: "Low Stock",
    value: lowStockCount.value,
    icon: { iconName: IconMdiAlert, iconClass: "text-yellow-600" },
  },
  {
    label: "Out of Stock",
    value: OutOfStockCount.value,
    icon: { iconName: IconMdiCloseCircle, iconClass: "text-red-600" },
  },
]);
const showSummaries = ref(false);
const uniqueDates = computed(() => {
  const dates = products.value.map((p) => p.dateCreated);
  return ["All", ...new Set(dates)];
});

// FIXED FILTER + SORT LOGIC
const filteredProducts = computed(() => {
  let result = products.value.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "All" || product.category === selectedCategory.value;
    const matchesStatus = selectedStatus.value === "All" || product.status === selectedStatus.value;
    const matchesDate = selectedDate.value === "All" || product.dateCreated === selectedDate.value;

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

  //  Apply sorting
  if (sortBy.value !== "None") {
    isSorted.value = true;
    result.sort((a, b) => {
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
          comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          break;
      }

      return sortOrder.value === "asc" ? comparison : -comparison;
    });
  } else {
    isSorted.value = false;
  }

  return result;
});
function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function toggleSummaries() {
  showSummaries.value = !showSummaries.value;
}

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

// Placeholder for Add Product action
function addProduct() {
  alert("Add product functionality coming soon!");
}
</script>

<template>
  <section class="bg-background space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-bold text-heading">Manage Products</h1>

      <!-- Add Product Button -->
      <button
        @click="addProduct"
        class="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Add new product"
      >
        <IconMdiPlus class="text-3xl" size="20" aria-hidden="true" />
        Add Product
      </button>
    </div>

    <!-- Summary Cards -->
    <div>
      <div class="flex items-center w-full justify-between">
        <h2 class="text-xl font-semibold text-heading/70">Summary</h2>
        <button
          @click="toggleSummaries"
          class="text-sm text-accent hover:text-accent-hover font-medium cursor-pointer select-none"
        >
          {{ showSummaries ? "Hide" : "Show" }} details
        </button>
      </div>
      <div v-if="showSummaries" class="grid grid-cols-1 sm:grid-cols-4 gap-4 my-4">
        <div v-for="summary in summmaries" :key="summary">
          <div
            class="flex ma items-center gap-3 p-4 rounded-2xl border border-border bg-surface/70 shadow-sm"
          >
            <component
              :is="summary.icon.iconName"
              :class="[summary.icon.iconClass, 'text-3xl']"
              size="28"
              aria-hidden="true"
            />
            <div>
              <p class="lg:text-sm sm:text-xs text-text/70">{{ summary.label }}</p>
              <p class="text-xl font-bold text-text">{{ summary.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters, Search, and Sort -->
    <div class="flex flex-col sm:items-start sm:justify-between gap-4 mt-6">
      <!-- Search -->
      <div class="flex flex-col w-full">
        <label for="product-search" class="text-sm font-medium text-text/80 mb-1">
          Search Products
        </label>
        <div class="relative w-3x">
          <input
            id="product-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by product name..."
            class="pl-10 pr-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text placeholder:text-text/60"
          />
          <IconMdiMagnify
            class="absolute left-3 top-2.5 text-text/70"
            size="20"
            aria-hidden="true"
          />
          <button @click="toggleFilters" class="ml-2 bg-accent text-white p-3 rounded-xl text-xs sm:text-sm">
            {{showFilters ? 'Hide Filters' : 'Show Filters'}}
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div v-if="showFilters" class="flex flex-wrap gap-4 w-full sm:w-auto">
        <!-- Category -->
        <div>
          <label for="category-filter" class="block text-sm font-medium text-text/80 mb-1">
            Category
          </label>
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
          <label for="status-filter" class="block text-sm font-medium text-text/80 mb-1">
            Status
          </label>
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
          <label for="date-filter" class="block text-sm font-medium text-text/80 mb-1">
            Date Created
          </label>
          <select
            id="date-filter"
            v-model="selectedDate"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option v-for="date in uniqueDates" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div>
          <label for="sort-by" class="block text-sm font-medium text-text/80 mb-1"> Sort By </label>
          <div class="flex flex-col gap-2">
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

            <!-- Sort Order Radios -->
            <div v-if="isSorted" class="flex items-center gap-4 mt-1">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sortOrder"
                  value="asc"
                  v-model="sortOrder"
                  :disabled="sortBy === 'None'"
                  class="accent-green-600 focus:ring-2 focus:ring-green-500"
                />
                <span class="text-sm text-text/80 flex items-center gap-1">
                  <IconMdiSortAscending class="text-green-600" size="18" />
                  Ascending
                </span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sortOrder"
                  value="desc"
                  v-model="sortOrder"
                  :disabled="sortBy === 'None'"
                  class="accent-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span class="text-sm text-text/80 flex items-center gap-1">
                  <IconMdiSortDescending class="text-red-600" size="18" />
                  Descending
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="overflow-x-scroll box-content border border-border rounded-2xl shadow-sm">
      <table class="w-full text-left border-collapse ">
        <thead class="bg-surface text-xs text-text uppercase sm:text-sm">
          <tr>
            <th class="py-3 px-4 font-semibold">ID</th>
            <th class="py-3 px-4 font-semibold">Name</th>
            <th class="py-3 px-4 font-semibold">Category</th>
            <th class="py-3 px-4 font-semibold text-left">Price ($)</th>
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
            <td class="py-3 px-4 text-sm  text-text/90">
              {{ product.price.toFixed(2) }}
            </td>
            <td class="py-3 px-4 text-sm text-center text-text/80">
              {{ product.stock }}
            </td>
            <td class="py-3 px-4 text-center">
              <span
                class=" inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
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
                class="flex items-center text-accent hover:text-accent-hover font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg px-2"
                aria-label="Manage product options"
              >
                <IconMdiDotsVertical size="18" />
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div v-if="!filteredProducts.length" class="text-center py-10 text-text/70 text-sm">
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
