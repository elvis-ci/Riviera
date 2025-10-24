<script setup>
import aboutHero from "@/assets/img/amber2.png";
import aboutImage from "@/assets/img/orchid haze.jpg";
</script>

<template>
  <!-- Section 1: Brand Story -->
  <section
    class="relative py-20 px-6 bg-surface text-white overflow-hidden"
    aria-labelledby="about-heading"
  >
    <!-- 🌸 Background image for small screens -->
    <div
      class="absolute inset-0 bg-cover bg-top md:hidden"
      :style="{ backgroundImage: `url(${aboutHero})` }"
    ></div>

    <!-- 🌒 Overlay for contrast -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 md:hidden"
    ></div>

    <!-- Background gradient for large screens -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 hidden md:block"
    ></div>

    <!-- Main content -->
    <div
      class="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center text-text md:text-inherit"
    >
      <!-- Image (only visible on medium+ screens) -->
      <div class="relative hidden md:block">
        <img
          src="@/assets/img/amber2.png"
          alt="Perfume bottles and flowers"
          loading="lazy"
          class="rounded-2xl object-cover w-full h-[500px]"
        />
      </div>

      <!-- Text -->
      <div class="relative z-10">
        <h2
          id="about-heading"
          class="text-4xl font-heading mb-6 leading-tight md:text-heading md:text-4xl text-white"
        >
          Crafting Scents that Tell Your Story
        </h2>
        <p class="text-lg mb-6 text-white/90 md:text-text/90">
          Our fragrances are more than scents — they’re expressions of who you are. From
          <span class="font-semibold text-accent">affordable everyday favorites</span> to
          <span class="font-semibold text-accent">luxury and exclusive collections</span>, we offer
          a scent for every mood, every moment, and every memory. And for those who desire something
          truly unique, our
          <span class="font-semibold text-accent">custom scent experience</span>
          lets you co-create a fragrance that’s unmistakably yours.
        </p>
      </div>
    </div>
  </section>

  <!-- Section 2: Brand Values & Mission -->
  <section class="py-20 px-6 bg-secondary/10">
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 class="text-3xl font-heading text-heading mb-4">Our Heart & Vision</h2>
      <p class="text-text/80 max-w-3xl mx-auto">
        Every drop we create is a blend of artistry, emotion, and purpose — all bound by our mission
        to inspire confidence and unforgettable experiences through scent.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
      <div class="p-6 bg-surface rounded-2xl shadow-md hover:shadow-lg transition">
        <span class="text-3xl mb-3 block">✨</span>
        <h3 class="font-semibold text-heading text-lg mb-2">Authenticity</h3>
        <p class="text-text/80">Every scent is crafted to feel genuine, personal, and timeless.</p>
      </div>

      <div class="p-6 bg-surface rounded-2xl shadow-md hover:shadow-lg transition">
        <span class="text-3xl mb-3 block">🌿</span>
        <h3 class="font-semibold text-heading text-lg mb-2">Sustainability</h3>
        <p class="text-text/80">
          We prioritize ethical sourcing and eco-friendly production processes.
        </p>
      </div>

      <div class="p-6 bg-surface rounded-2xl shadow-md hover:shadow-lg transition">
        <span class="text-3xl mb-3 block">🤝</span>
        <h3 class="font-semibold text-heading text-lg mb-2">Inclusivity</h3>
        <p class="text-text/80">Luxury should be accessible. We create fragrances for everyone.</p>
      </div>

      <div class="p-6 bg-surface rounded-2xl shadow-md hover:shadow-lg transition">
        <span class="text-3xl mb-3 block">🌍</span>
        <h3 class="font-semibold text-heading text-lg mb-2">Legacy</h3>
        <p class="text-text/80">
          Our goal is to craft timeless fragrances that evoke memories for generations.
        </p>
      </div>
    </div>
  </section>

  <!-- Section 3: Custom Experience -->
  <section class="relative py-20 px-6 bg-surface overflow-hidden" aria-labelledby="about-heading">
    <!-- 🌸 Background image for small screens -->
    <div
      class="absolute inset-0 bg-cover bg-center md:hidden"
      :style="{ backgroundImage: `url(${aboutImage})` }"
    ></div>

    <!-- 🌒 Overlay for contrast -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 md:hidden"
    ></div>

    <!-- Background gradient for large screens -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 hidden md:block"
    ></div>

    <!-- Main content -->
    <div class="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <!-- Image (only visible on medium+ screens) -->
      <div class="relative hidden md:block">
        <img
          src="@/assets/img/orchid haze.jpg"
          alt="Perfume bottles and flowers"
          loading="lazy"
          class="rounded-2xl object-cover w-full h-[500px]"
        />
      </div>

      <!-- Text -->
      <div class="order-1 lg:order-2 text-white/90 md:text-text/90">
        <h2 id="custom-heading" class="text-3xl font-bold mb-6">The Custom Scent Experience</h2>
        <p class="text-lg mb-4 text-white/90 md:text-text/90">
          Whether you’re crafting a signature scent for yourself or curating a gift that captures
          emotion, our perfumers will guide you through a personalized scent design process.
        </p>
        <p class="mb-6 text-white/90 md:text-text/90">
          Choose from premium notes, blends, and intensities to reflect your mood, style, and story
          — because no one should ever smell like everyone else.
        </p>

        <a
          href="#contact"
          class="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition-all duration-200"
        >
          Start Your Custom Journey
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Section 4: Call-to-Action -->
  <section class="bg-accent text-white py-20 px-6 text-center">
    <h2 class="text-3xl font-heading mb-4">Redefine Confidence. Redefine You.</h2>
    <p class="max-w-2xl mx-auto mb-8 text-white/90">
      Discover how a single fragrance can transform your presence, elevate your confidence, and
      leave a lasting impression wherever you go.
    </p>
    <a
      href="#products"
      class="inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-neutral/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 transition"
    >
      Explore Our Collection
      <span aria-hidden="true">→</span>
    </a>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

h1,
h2 {
  font-weight: bold;
}

a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--color-accent, #b48a4a);
}
</style>
