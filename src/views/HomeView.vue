<script setup>
import Featured from "@/components/Featured.vue";
import Categories from "@/components/Categories.vue";
import { useFragranceStore } from "@/stores/useFragranceStore";

const store = useFragranceStore();
const featuredFragrances = store.featuredFragrances;
const categories = store.categories
</script>

<template>
  <!-- Hero Section -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1600180758890-6ecae4c3b4a9?auto=format&fit=crop&w=1920&q=80"
      alt="Perfume bottle and soft floral backdrop"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>

    <div class="relative z-10 text-center max-w-4xl px-6">
      <h1 class="text-6xl md:text-8xl font-serif text-accent mb-6">The Essence of You</h1>
      <p class="text-xl md:text-2xl text-text/90 mb-10 italic">
        A fragrance that captures your story in every note.
      </p>
      <RouterLink to="/products" class="btn-primary"> Shop Now </RouterLink>
    </div>
  </section>

  <!-- Featured Fragrances -->
  <Featured :featuredFragrances="featuredFragrances" />

  <!-- Categories Section -->
  <categories :categories="categories" />
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
