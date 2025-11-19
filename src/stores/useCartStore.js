import { ref, computed } from "vue";
import { defineStore } from "pinia";

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
  const cartSubTotal = computed(() =>
    cartItems.value.reduce((sum, item) => {
      return sum + item.currentPrice * item.quantity;
    }, 0)
  );

  const cartTotal = computed(() => {
    const subtotal = cartSubTotal.value; // number
    const discount = generalDiscount.value; // percent number

    return discount > 0 ? subtotal - subtotal * (discount / 100) : subtotal;
  });

  const itemCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));

  return {
    cartItems,
    loading,
    generalDiscount,
    cartSubTotal,
    cartTotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
