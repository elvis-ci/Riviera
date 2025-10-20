import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getFragrances } from "@/services/fragranceService.js";

export const useCartStore = defineStore("cartStore", () => {
  // --- State ---
  const cartItems = ref(JSON.parse(localStorage.getItem("cart")) || []);
  const loading = ref(false);
  const generalDiscount = ref(0); // e.g., for promo codes

  // --- Actions ---
  const addToCart = (fragrance, quantity) => {
    const existingItem = cartItems.value.find((item) => item.id === fragrance.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({ ...fragrance, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  };

  const updateQuantity = (id, quantity) => {
    const existingItem = cartItems.value.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    }
  };

  const clearCart = () => {
    cartItems.value = [];
    localStorage.removeItem("cart");
  };

  // --- Getters ---
  const cartTotal = computed(() => {
    const total = cartItems.value.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);

    return generalDiscount.value > 0 ? total - total * (generalDiscount.value / 100) : total;
  });

  const itemCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));

  return {
    cartItems,
    loading,
    generalDiscount,
    cartTotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
