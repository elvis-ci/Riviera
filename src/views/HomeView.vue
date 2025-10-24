<template>
  <!-- Hero Section -->
  <section
    class="relative flex flex-col md:flex-row items-center justify-between bg-background text-text overflow-hidden min-h-[90vh] lg:max-w-[1400px] lg:mx-auto"
    :style="mobileBgStyle"
  >
    <!-- Overlay for better contrast (mobile only) -->
    <div
      class="absolute inset-0 md:hidden bg-gradient-to-t from-background/95 via-background/70 to-transparent z-0"
    ></div>

    <!-- Left: Text Content -->
    <div
      class="relative w-full md:w-1/2 px-6 sm:px-10 md:px-16 py-20 flex flex-col items-center md:items-start text-center md:text-left z-10 animate-fadeIn"
    >
      <h1
        class="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold text-heading leading-tight mb-4"
      >
        Timeless <span class="text-accent">Elegance</span> in Every Scent
      </h1>

      <p
        class="text-base sm:text-lg md:text-xl text-text/80 max-w-md mx-auto md:mx-0 leading-relaxed mb-8"
      >
        Discover fragrances that capture your essence — crafted for those who value sophistication,
        simplicity, and self-expression.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
        <RouterLink
          to="/products"
          class="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-full sm:text-lg shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-accent/50 w-full sm:w-auto"
        >
          Shop Now
        </RouterLink>

        <RouterLink
          to="/about"
          class="border border-border hover:bg-accent/30 hover:border-accent text-heading py-3 px-8 rounded-full text-base sm:text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 w-full sm:w-auto !important"
        >
          Learn More
        </RouterLink>
      </div>
    </div>

    <!-- Right: Hero Image -->
    <div
      class="hidden md:block relative w-full md:w-1/2 h-[60vh] lg:h-screen overflow-hidden rounded-none md:rounded-l-2xl z-10"
      role="img"
      aria-label="Luxury perfume bottle display"
    >
      <img
        :src="heroImg"
        alt="Luxury fragrance bottles on a marble table"
        class="absolute w-fit h-full scale-120 object-cover object-center transform transition-transform duration-[2000ms] ease-out"
      />
      <div
        class="absolute inset-0 bg-gradient-to-l from-background/70 via-transparent to-background/30"
      ></div>
    </div>

    <!-- Decorative Gradient Line -->
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-70 hidden md:block"
      aria-hidden="true"
    ></div>
  </section>

  <!-- 🌿 Featured Fragrances -->
  <Featured :featuredFragrances="featuredFragrances" :loading="fragranceStore.loading" />

  <!-- 🪷 Categories -->
  <Categories :categories="categories" />

  <!-- 💌 Newsletter -->
  <section class="py-16 md:py-20 bg-surface text-center px-6">
    <div class="max-w-2xl mx-auto space-y-6">
      <h3 class="text-2xl sm:text-3xl md:text-4xl font-heading text-heading">
        Join Our Inner Circle
      </h3>
      <p class="text-text/80 text-base sm:text-lg max-w-lg mx-auto">
        Get early access to exclusive launches, private sales, and scent stories from our atelier.
      </p>

      <form
        class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        aria-label="Subscribe to our newsletter"
      >
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          class="w-full sm:w-80 p-3 rounded-lg border border-border bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none placeholder:text-text/50"
        />
        <button
          type="submit"
          class="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-accent/50 w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { useFragranceStore } from "@/stores/useFragranceStore";
import Categories from "@/components/Categories.vue";
import Featured from "@/components/Featured.vue";
import heroImg from "@/assets/img/chat.png";

const fragranceStore = useFragranceStore();
const categories = computed(() => fragranceStore.categories);
const featuredFragrances = computed(() => fragranceStore.featuredFragrances);

const isMobile = ref(window.innerWidth < 768);
const mobileBgStyle = computed(() =>
  isMobile.value
    ? {
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {}
);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};
window.addEventListener("resize", handleResize);
onBeforeUnmount(() => window.removeEventListener("resize", handleResize));

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
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

/* Small improvements for very narrow screens */
@media (max-width: 380px) {
  h1 {
    font-size: 1.8rem;
  }
  p {
    font-size: 0.95rem;
  }
  .py-3 {
    padding-top: 0.65rem;
    padding-bottom: 0.65rem;
  }
}
</style>
