<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useFragranceStore } from "@/stores/useFragranceStore";
import { useAuthStore } from "@/stores/useAuthStore";

const fragranceStore = useFragranceStore();

// --- Scroll to Top Logic ---
const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 200; // show after 200px scroll
};

// const scrollToTop = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

const auth = useAuthStore();

onMounted(async () => {
  // Register scroll listener
  window.addEventListener("scroll", handleScroll);

  // Fetch fragrances (only once when app mounts)
  await fragranceStore.fetchFragrances();
  await auth.restoreSession();
  auth.initAuthListener();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="relative">
    <NavBar />
    <RouterView />
    <Footer />

    <!-- Scroll To Top Button -->
    <!-- <transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        aria-label="Scroll to top"
        class="scroll-to-top fixed bottom-8 right-8 bg-accent text-background rounded-full shadow-lg hover:bg-accent/90 transition-colors"
      >
        ^
      </button>
    </transition> -->
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scroll-to-top {
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
