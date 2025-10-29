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
      class="relative w-full md:w-3/5 px-6 sm:px-10 md:px-16 py-20 flex flex-col items-center md:items-start text-center md:text-left z-10 animate-fadeIn"
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
      class="hidden md:block relative sm:w-full md:w-2/5 h-[60vh] lg:h-screen overflow-hidden rounded-none md:rounded-l-2xl z-10"
      role="img"
      aria-label="Luxury perfume bottle display"
    >
      <img
        :src="heroImg"
        alt="Luxury fragrance bottles on a marble table"
        class="absolute w-fit h-full mx-auto scale-120 object-cover object-center transform transition-transform duration-[2000ms] ease-out"
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

  <!-- Featured Fragrances Section -->
  <section class="py-16 sm:py-20 bg-surface px-4 sm:px-6" aria-labelledby="featured-heading">
    <!-- Heading -->
    <div class="max-w-7xl mx-auto text-center mb-10 sm:mb-12">
      <h2 id="featured-heading" class="text-3xl sm:text-4xl font-heading text-heading mb-3 sm:mb-4">
        Best Deals
      </h2>
      <p class="text-text/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Indulge in our curated collection of captivating fragrances, each telling its own unique
        story.
      </p>
    </div>

    <!--  Featured Fragrances -->
    <Featured />
  </section>
  <section
    class="py-24 px-6 text-text bg-background relative overflow-hidden"
    aria-labelledby="fragrance-categories-heading"
  >
    <!-- Section Header -->
    <div class="max-w-7xl mx-auto relative z-10 text-center mb-16">
      <h2
        id="fragrance-categories-heading"
        class="text-4xl sm:text-5xl font-heading text-heading mb-4 tracking-tight"
      >
        Explore Fragrance Categories
      </h2>
      <p class="text-text/90 text-lg max-w-2xl mx-auto">
        From floral elegance to woody allure — find a scent that speaks to your essence.
      </p>
    </div>
    <Categories />
  </section>
  <!-- 🪷 Categories -->

  <!-- Newsletter -->
  <section class="py-16 md:py-20 bg-secondary/10 text-center px-6">
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
import { ref, computed, onBeforeUnmount, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useFragranceStore } from "@/stores/useFragranceStore";
import Categories from "@/components/Categories.vue";
import Featured from "@/components/Featured.vue";
import heroImg from "@/assets/img/chat.png";
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
</script>

<style scoped>
.fragrance-carousel {
  --carousel-gap: 1rem;
  padding-inline: 0.5rem;
  margin-bottom: 3rem;
  position: relative;
}

/* ✅ Pagination styling (fixed selector) */
.fragrance-carousel :deep(.carousel__pagination) {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}

.fragrance-carousel :deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: var(--color-border);
  transition: all 0.3s ease;
  opacity: 0.6;
}

.fragrance-carousel :deep(.carousel__pagination-button--active) {
  background-color: var(--color-accent);
  transform: scale(1.3);
  opacity: 1;
}

/* ✅ Hover / focus ring for better accessibility */
.fragrance-carousel :deep(.carousel__pagination-button:focus-visible) {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ✅ Navigation buttons on mobile */
.fragrance-carousel :deep(.carousel__prev),
.fragrance-carousel :deep(.carousel__next) {
  background-color: var(--color-accent);
  color: white;
  border-radius: 9999px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.fragrance-carousel :deep(.carousel__prev:hover),
.fragrance-carousel :deep(.carousel__next:hover) {
  background-color: var(--color-accent-hover);
}

/* ✅ Responsive spacing */
@media (min-width: 640px) {
  .fragrance-carousel {
    --carousel-gap: 1.5rem;
    padding-inline: 1.5rem;
  }
}

/* ✅ Accessibility - reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}

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
