<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center text-center bg-background text-text p-6"
  >
    <!-- Error Code -->
    <h1
      class="text-[6rem] sm:text-[8rem] font-extrabold text-accent drop-shadow-md mb-2"
      aria-label="404"
    >
      404
    </h1>

    <!-- Message -->
    <h2 class="text-2xl sm:text-3xl font-semibold mb-3 text-text">
      Page Not Found
    </h2>

    <p class="max-w-md text-text/70 mb-6 text-sm sm:text-base">
      The page you're looking for doesn’t exist or might have been moved.  
      Please check the URL or return to the homepage.
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4 justify-center">
      <RouterLink
        to="/"
        class="bg-accent text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition text-sm sm:text-base"
      >
        Go Home
      </RouterLink>

      <RouterLink
        to="/contact"
        class="border border-accent text-accent font-medium px-6 py-3 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition text-sm sm:text-base"
      >
        Contact Support
      </RouterLink>
    </div>

    <!-- Decorative Illustration (optional placeholder) -->
    <div class="mt-10 opacity-80">
      <IconMdiAlertCircleOutline class="text-accent w-16 h-16 sm:w-20 sm:h-20" />
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
import IconMdiAlertCircleOutline from "~icons/mdi/alert-circle-outline";
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
