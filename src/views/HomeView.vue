<template>
  <!-- Hero Section -->
  <section
    class="relative flex flex-col md:flex-row items-center justify-between bg-background text-text overflow-hidden min-h-[90vh] max-w-[1400px] lg:mx-auto"
    :style="mobileBgStyle"
  >
    <!-- Overlay for better contrast (mobile only) -->
    <div
      class="absolute inset-0 md:hidden bg-gradient-to-t from-background/95 via-background/70 to-transparent z-0"
    ></div>

    <!-- Left: Text Content -->
    <div
      class="relative w-full my-auto md:w-3/5 px-6 sm:px-10 md:px-16 sm:py-20 flex flex-col items-start justify-center md:items-start text-start md:text-left z-10 animate-fadeIn"
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
          class="cta bg-accent hover:bg-accent-hover text-center font-semibold py-3 px-8 rounded-full sm:text-lg shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-accent/50 w-full sm:w-auto"
        >
          Shop Now
        </RouterLink>

        <RouterLink
          to="/about"
          class="border border-border text-center hover:bg-accent/30 hover:border-accent text-heading py-3 px-8 rounded-full text-base sm:text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 w-full sm:w-auto !important"
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
  <section class="py-16 sm:py-20 bg-surface sm:px-6" aria-labelledby="featured-heading">
    <div class="max-w-7xl mx-auto text-center mb-10 sm:mb-12">
      <h2 id="featured-heading" class="text-4xl sm:text-5xl font-heading text-heading mb-4 tracking-tight">
        Best Deals
      </h2>
      <p class="text-text/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Indulge in our curated collection of captivating fragrances, each telling its own unique
        story.
      </p>
    </div>
    <Featured />
  </section>

  <section
    class="py-24 sm:px-6 text-text bg-background relative overflow-hidden"
    aria-labelledby="fragrance-categories-heading"
  >
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

  <!-- 🪞 Brand Story -->
  <section class="py-20 bg-surface text-text">
    <div class="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
      <div class="w-full md:w-1/2">
        <img
          src="@/assets/img/amber.jpg"
          alt="Perfume artisan crafting fragrance"
          class="rounded-2xl shadow-lg object-cover w-full h-[400px]"
        />
      </div>

      <div class="w-full md:w-1/2 space-y-6">
        <h2 class="text-3xl sm:text-4xl font-heading text-heading">The Art Behind the Scent</h2>
        <p class="text-text/80 leading-relaxed">
          At <span class="font-semibold text-accent">Echelon Fragrances</span>, we believe every
          scent tells a story. Our artisans blend rare ingredients from around the world to create
          perfumes that celebrate individuality, elegance, and timeless sophistication.
        </p>
        <RouterLink
          to="/about"
          class="cta inline-block bg-accent font-semibold py-3 px-8 rounded-lg hover:bg-accent-hover transition-all focus:outline-none focus:ring-4 focus:ring-accent/50"
        >
          Discover Our Story
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 💎 Testimonials -->
  <section class="py-20 bg-background text-text relative" aria-labelledby="testimonial-heading">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 id="testimonial-heading" class="text-3xl sm:text-4xl font-heading text-heading mb-10">
        What Our Customers Say
      </h2>

      <div class="grid gap-10 md:grid-cols-3">
        <article class="p-6 bg-surface rounded-2xl shadow-md">
          <p class="italic text-text/80 mb-4">
            “Every fragrance feels like it was made just for me. The attention to detail is
            unmatched.”
          </p>
          <h3 class="font-semibold text-heading">— Ada O., Lagos</h3>
        </article>

        <article class="p-6 bg-surface rounded-2xl shadow-md">
          <p class="italic text-text/80 mb-4">
            “I’ve never had so many compliments on a scent before. Truly luxurious and
            long-lasting.”
          </p>
          <h3 class="font-semibold text-heading">— James K., Abuja</h3>
        </article>

        <article class="p-6 bg-surface rounded-2xl shadow-md">
          <p class="italic text-text/80 mb-4">
            “The packaging, the aroma, the experience — everything speaks sophistication.”
          </p>
          <h3 class="font-semibold text-heading">— Ifeoma A., Port Harcourt</h3>
        </article>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-20 bg-background text-text" aria-labelledby="faq-heading">
    <div class="max-w-4xl mx-auto px-6">
      <h2 id="faq-heading" class="text-3xl sm:text-4xl font-heading text-heading mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div class="space-y-6">
        <details class="faq-item border-b border-border pb-4">
          <summary class="cursor-pointer font-medium text-heading focus:outline-accent">
            How long do your fragrances last?
          </summary>
          <div class="faq-content">
            <p class="mt-2 text-text/80 leading-relaxed">
              Our fragrances are designed to last 6–8 hours depending on your skin type and
              environment.
            </p>
          </div>
        </details>

        <details class="faq-item border-b border-border pb-4">
          <summary class="cursor-pointer font-medium text-heading focus:outline-accent">
            Are your perfumes unisex?
          </summary>
          <div class="faq-content">
            <p class="mt-2 text-text/80 leading-relaxed">
              Yes. We design scents that transcend gender — elegant, expressive, and balanced for
              everyone.
            </p>
          </div>
        </details>

        <details class="faq-item border-b border-border pb-4">
          <summary class="cursor-pointer font-medium text-heading focus:outline-accent">
            Do you offer international shipping?
          </summary>
          <div class="faq-content">
            <p class="mt-2 text-text/80 leading-relaxed">
              We currently ship across Africa, Europe, and North America with reliable global
              logistics partners.
            </p>
          </div>
        </details>
      </div>
    </div>
  </section>

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
import { ref, computed, onBeforeUnmount } from "vue";
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
.cta {
  color: white;
}
.fragrance-carousel {
  --carousel-gap: 1rem;
  padding-inline: 0.5rem;
  margin-bottom: 3rem;
  position: relative;
}

/* ✅ Pagination styling */
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

/* ✅ Navigation buttons */
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

/* Remove default arrow marker to use our own */
.faq-item summary {
  list-style: none;
  position: relative;
  cursor: pointer;
  padding-right: 1.75rem;
  transition: color 0.3s ease;
}

/* Custom arrow indicator */
.faq-item summary::after {
  content: "›";
  position: absolute;
  right: 0;
  top: 0;
  font-size: 1.4rem;
  color: var(--color-accent);
  transition: transform 0.3s ease;
}

/* Rotate the arrow when open */
.faq-item[open] summary::after {
  transform: rotate(90deg);
}

/* Smooth expanding content */
.faq-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-0.5rem);
  transition: max-height 0.45s ease, opacity 0.35s ease, transform 0.35s ease;
}

/* When open, reveal content */
.faq-item[open] .faq-content {
  max-height: 500px; /* large enough for longest content */
  opacity: 1;
  transform: translateY(0);
}
/* Close others when one opens */
.faq-item[open] ~ .faq-item[open] {
  open: false;
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
  .faq-content {
    transition: none;
  }
  .faq-item summary::after {
    transition: none;
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
