<template>
  <!-- 🌸 Hero Section -->
  <section
    class="relative h-[90vh] md:h-screen flex items-center justify-center text-center overflow-hidden bg-background"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out scale-105 hover:scale-110"
      style="background-image: url('https://images.unsplash.com/photo-1600180758890-6ecae4c3b4a9?auto=format&fit=crop&w=1920&q=80');"
    ></div>

    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background/90"
    ></div>

    <!-- Floating Perfume Mockup -->
    <img
      src="https://images.unsplash.com/photo-1610078884516-5f94e3d1dbe7?auto=format&fit=crop&w=600&q=80"
      alt="Perfume bottle mockup"
      class="absolute bottom-16 right-10 hidden md:block w-56 drop-shadow-2xl opacity-90 hover:translate-y-[-10px] transition-transform duration-700 ease-out"
    />

    <!-- Hero Content -->
    <div
      class="relative z-10 max-w-4xl mx-auto px-6 text-white text-center animate-fadeInUp"
    >
      <!-- Promo Badge -->
      <p
        class="inline-block bg-accent/20 text-accent font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wider mb-6 backdrop-blur-sm"
      >
        🎁 Free Shipping on Orders Over ₦50,000
      </p>

      <h1
        class="text-5xl md:text-7xl font-serif font-semibold leading-tight mb-6 tracking-tight drop-shadow-lg"
      >
        Discover the <span class="text-accent">Essence</span> of Your Identity
      </h1>

      <p class="text-lg md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
        Handcrafted fragrances that blend <span class="text-accent/90">art and emotion</span> —
        because your scent should tell your story.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/products"
          class="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-accent/50"
        >
          Shop Now
        </RouterLink>
        <RouterLink
          to="/about"
          class="border border-white/70 hover:border-accent text-white/90 hover:text-accent py-3 px-8 rounded-full text-lg font-medium transition-all"
        >
          Discover More
        </RouterLink>
      </div>
    </div>

    <!-- Decorative Bottom Curve -->
    <svg
      class="absolute bottom-0 left-0 w-full text-background"
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        fill-opacity="1"
        d="M0,224L60,224C120,224,240,224,360,186.7C480,149,600,75,720,58.7C840,43,960,85,1080,117.3C1200,149,1320,171,1380,181.3L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
      ></path>
    </svg>
  </section>

  <!-- Featured Fragrances -->
  <Featured :featuredFragrances="featuredFragrances" :loading="fragranceStore.loading" />

  <!-- Categories Section -->
  <Categories :categories="categories" />

  <!-- Newsletter -->
  <section class="py-20 bg-surface px-6 text-center">
    <div class="max-w-2xl mx-auto">
      <h3 class="text-3xl font-heading mb-4 text-heading">Join Our Circle</h3>
      <p class="text-text mb-8">
        Be the first to experience new releases, special offers, and fragrance tips.
      </p>
      <form class="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          class="w-full sm:w-80 p-3 rounded-lg border border-border bg-background text-text focus:ring-2 focus:ring-accent"
        />
        <button class="btn-primary w-full sm:w-auto">Subscribe</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useFragranceStore } from "@/stores/useFragranceStore";
import Categories from "@/components/Categories.vue";
import Featured from "@/components/Featured.vue";

const fragranceStore = useFragranceStore();

// ✅ Computed for reactivity
const categories = computed(() => fragranceStore.categories);
const featuredFragrances = computed(() => fragranceStore.featuredFragrances);

onMounted(async () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const lastFetch = Number(localStorage.getItem("lastFetch")) || 0;
  const lastFeaturedUpdate = Number(localStorage.getItem("lastFeaturedUpdate")) || 0;

  const isCategoryExpired = !categories.value.length || Date.now() - lastFetch > oneDay;
  const isFeaturedExpired =
    !featuredFragrances.value.length || Date.now() - lastFeaturedUpdate > oneDay;

  if (isCategoryExpired || isFeaturedExpired) {
    await fragranceStore.fetchFragrances(true);
  }
});
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out forwards;
}
</style>
