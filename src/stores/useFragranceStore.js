import { defineStore } from "pinia";
import { ref, computed } from "vue";

// --- Base Category Metadata ---
const baseCategories = [
  {
    id: 1,
    name: "Amber Floral",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80",
    description: "A radiant blend of amber warmth and delicate floral notes for timeless elegance.",
  },
  {
    id: 2,
    name: "Woody Amber",
    image: "https://images.unsplash.com/photo-1541644159112-7d1f6c3c34d7?auto=format&fit=crop&w=800&q=80",
    description: "Earthy woods wrapped in smooth amber undertones — bold, grounded, and luxurious.",
  },
  {
    id: 3,
    name: "Aquatic Citrus",
    image: "https://images.unsplash.com/photo-1602333860594-08efb7d208f6?auto=format&fit=crop&w=800&q=80",
    description: "Fresh oceanic notes infused with zesty citrus for an invigorating modern touch.",
  },
  {
    id: 4,
    name: "Floral Musk",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    description: "Soft blossoms meet sensual musk in this harmonious, versatile fragrance family.",
  },
  {
    id: 5,
    name: "Oriental",
    image: "https://images.unsplash.com/photo-1616627984410-6d5b0f2d64e1?auto=format&fit=crop&w=800&q=80",
    description: "Spicy, exotic notes that transport you through rich and mysterious aromas.",
  },
];

// --- Helper: Generate a fragrance object ---
function generateFragrance(id) {
  const names = [
    "Noir Lumière", "Velvet Oud", "Azure Mist", "Golden Bloom", "Crimson Dawn", "Luna Rosa",
    "Amber Veil", "Sapphire Drift", "Wild Iris", "Midnight Whisper", "Citrus Ember", "Opal Mirage",
    "Silver Fern", "Rose Mirage", "Orchid Haze", "Mystic Dew", "Pure Grace", "Obsidian Sky",
    "Twilight Amber", "Cedar Bloom", "Emerald Soul", "Royal Musk", "Ivory Bloom", "Shadow Petal",
    "Ocean Veil", "Violet Ash", "Amber Frost", "Pearl Essence", "Velour Mist", "Cherry Noir",
    "Floral Veil", "Golden Sand", "Oud Reverie", "Velvet Bloom", "Eclipse Noir", "Lush Horizon",
    "Amber Drift", "Desert Rose", "Silk Ember", "Iris Noir", "Orchid Drift", "Citrus Noir",
    "Honey Veil", "Rosewood Glow", "Velvet Dusk", "Emerald Mist", "Ocean Drift", "Golden Veil",
    "Amber Lace", "Velvet Echo",
  ];

  const category = baseCategories[id % baseCategories.length].name;
  const name = names[id % names.length];
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const price = Math.floor(Math.random() * 80) + 80; // $80–$160
  const discount = Math.floor(Math.random() * 30) + 5; // $5–$30
  const stock = Math.floor(Math.random() * 40) + 10; // 10–50
  const discountPercent = Math.round((discount / price) * 100);
  const currentPrice = price - discount;

  return {
    id,
    name,
    slug,
    image: `https://source.unsplash.com/600x600/?perfume,bottle,${slug}`,
    short: `A captivating fragrance blending modern elegance with timeless notes of ${category.toLowerCase()}.`,
    category,
    stock,
    price,
    discount,
    discountPercent,
    currentPrice,
  };
}

// --- Helper: Week number for featured rotation ---
function getCurrentWeek() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

// --- Store Definition ---
export const useFragranceStore = defineStore("fragranceStore", () => {
  const STORAGE_KEY = "fragranceData";
  const FEATURE_KEY = "featuredWeekData";

  // ✅ Load fragrances from localStorage (if any)
  const stored = localStorage.getItem(STORAGE_KEY);
  const fragrances = ref(stored ? JSON.parse(stored) : []);

  // Generate sample data once if empty
  if (fragrances.value.length === 0) {
    fragrances.value = Array.from({ length: 50 }, (_, i) => generateFragrance(i + 1));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fragrances.value));
  }

  // --- Save Action ---
  function saveFragrances() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fragrances.value));
  }

  // --- Computed Lists ---
  const fragranceList = computed(() => fragrances.value);

  const getBySlug = (slug) => fragranceList.value.find((f) => f.slug === slug);
  const getByCategory = (category) => fragranceList.value.filter((f) => f.category === category);

  // --- Stock modification ---
  function reduceStock(id, quantity = 1) {
    const item = fragrances.value.find((f) => f.id === id);
    if (item && item.stock >= quantity) {
      item.stock -= quantity;
      saveFragrances();
    }
  }

  function restock(id, amount = 1) {
    const item = fragrances.value.find((f) => f.id === id);
    if (item) {
      item.stock += amount;
      saveFragrances();
    }
  }

  // --- Weekly Featured Fragrances ---
  const featuredFragrances = ref([]);

  const loadFeatured = () => {
    const currentWeek = getCurrentWeek();
    const storedFeatured = JSON.parse(localStorage.getItem(FEATURE_KEY) || "{}");

    if (storedFeatured.week === currentWeek && storedFeatured.items) {
      featuredFragrances.value = storedFeatured.items;
    } else {
      const shuffled = [...fragrances.value].sort(() => 0.5 - Math.random());
      featuredFragrances.value = shuffled.slice(0, 3);
      localStorage.setItem(FEATURE_KEY, JSON.stringify({ week: currentWeek, items: featuredFragrances.value }));
    }
  };

  loadFeatured();

  // --- Computed Categories ---
  const categories = computed(() => {
    return baseCategories.map((cat) => {
      const items = fragranceList.value.filter((f) => f.category === cat.name);
      const availableQuantity = items.reduce((sum, f) => sum + f.stock, 0);
      const prices = items.map((f) => f.price);
      const priceRange = prices.length
        ? { min: Math.min(...prices), max: Math.max(...prices) }
        : { min: 0, max: 0 };

      return {
        ...cat,
        availableQuantity,
        priceRange,
      };
    });
  });

  // --- Return everything ---
  return {
    fragrances,
    fragranceList,
    featuredFragrances,
    categories,
    getBySlug,
    getByCategory,
    reduceStock,
    restock,
  };
});
