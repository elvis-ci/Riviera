import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getFragrances } from "@/services/fragranceService.js";

export const useFragranceStore = defineStore("fragranceStore", () => {
  // --- State ---
  const fragrances = ref([]);
  const featuredFragrances = ref(JSON.parse(localStorage.getItem("featuredFragrances")) || []); // ✅ persisted
  const categories = ref(JSON.parse(localStorage.getItem("categories")) || []);
  const loading = ref(false);
  const error = ref(null);
  const lastFetch = ref(Number(localStorage.getItem("lastFetch")) || 0);
  const lastFeaturedUpdate = ref(Number(localStorage.getItem("lastFeaturedUpdate")) || 0); // ✅ track featured refresh time

  // --- Actions ---
  async function fetchFragrances(force = false) {
    try {
      loading.value = true;
      error.value = null;

      const oneDay = 24 * 60 * 60 * 1000; // 24h in ms
      const isCacheValid = categories.value.length && Date.now() - lastFetch.value < oneDay;

      const isFeaturedValid =
        featuredFragrances.value.length && Date.now() - lastFeaturedUpdate.value < oneDay;

      // ✅ If both categories and featured are fresh, skip fetch
      if (!force && isCacheValid && isFeaturedValid && fragrances.value.length) {
        console.log("✅ Using cached data — no fetch needed");
        return;
      }

      console.log("🌐 Fetching fragrances from backend...");
      const { data, error: fetchError } = await getFragrances();
      if (fetchError) throw fetchError;
      // Normalize fragrance data
      fragrances.value = data.map((f) => ({
        ...f,
        price: Number(f.price) || 0,
        stock: Number(f.stock) || 0,
        discount: Number(f.discount) || 0,
        category: f.category || "Uncategorized",
        rating: Number(f.rating) || 0,
        currentPrice: Number(f.currentPrice)
      }));

      console.log("🌸 Fetched fragrances", fragrances.value);

      // ✅ Recompute categories
      const uniqueCategories = [...new Set(fragrances.value.map((f) => f.category))];

      categories.value = uniqueCategories.map((cat) => {
        const catFragrances = fragrances.value.filter((f) => f.category === cat);
        const prices = catFragrances.map((f) => f.price);
        return {
          id: createCategoryId(cat),
          name: cat,
          description: getCategoryDescription(cat),
          image: catFragrances[0]?.image_url || "", // Assuming image_url field
          count: catFragrances.length,
          priceRange: {
            min: Math.min(...prices),
            max: Math.max(...prices),
          },
        };
      });

      // Update featured fragrances only if expired or forced
      if (!isFeaturedValid || force) {
        featuredFragrances.value = getRandomItems(fragrances.value, 5);
        localStorage.setItem("featuredFragrances", JSON.stringify(featuredFragrances.value));
        lastFeaturedUpdate.value = Date.now();
        localStorage.setItem("lastFeaturedUpdate", String(lastFeaturedUpdate.value));
        console.log("🌟 Featured fragrances updated", featuredFragrances.value);
      } else {
        console.log("🌟 Using cached featured fragrances", featuredFragrances.value);
      }

      // ✅ Persist categories and fetch time
      localStorage.setItem("categories", JSON.stringify(categories.value));
      lastFetch.value = Date.now();
      localStorage.setItem("lastFetch", String(lastFetch.value));

      console.log("✅ Categories updated and cached");
    } catch (err) {
      console.error("❌ Error fetching fragrances:", err);
      error.value = err.message || "Failed to fetch fragrances";
      fragrances.value = [];
    } finally {
      loading.value = false;
    }
  }

  // --- Helpers ---
  function createCategoryId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function getCategoryDescription(category) {
    const descriptions = {
      Floral: "Delicate blooms and romantic bouquets for the graceful spirit.",
      Woody: "Rich, warm scents inspired by nature's finest timber.",
      Oriental: "Exotic spices and mysterious aromas from the Far East.",
      Fresh: "Crisp, clean fragrances that invigorate the senses.",
      Uncategorized: "Unique scents waiting to be discovered.",
    };
    return descriptions[category] || "Explore our unique collection of fragrances.";
  }

  // ✅ Helper: Random item selection
  function getRandomItems(array, count) {
    if (!array.length) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // --- Getters ---
  const fragranceList = computed(() => fragrances.value);
  const getOutOfStock = computed(() => fragrances.value.filter((f) => f.stock === 0));
  const getLowStock = computed(() => fragrances.value.filter((f) => f.stock > 0 && f.stock <= 5));

  const getBySlug = (slug) => fragrances.value.find((f) => f.slug === slug);
  const getByCategory = (name) => fragrances.value.filter((f) => f.category === name);

  // --- Return everything ---
  return {
    // State
    fragrances,
    categories,
    featuredFragrances, // ✅ now persisted
    loading,
    error,

    // Computed
    fragranceList,
    getOutOfStock,
    getLowStock,

    // Actions
    fetchFragrances,
    getBySlug,
    getByCategory,
  };
});
