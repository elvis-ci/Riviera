<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");
const submitted = ref(false);

function handleSubmit(e) {
  e.preventDefault();
  submitted.value = true;
  // In a real app, integrate with backend or email API
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="relative py-20 px-6 text-center" aria-labelledby="contact-heading">
      <div class="max-w-3xl mx-auto">
        <h1 id="contact-heading" class="text-4xl font-heading text-heading mb-4 leading-tight">
          Let’s Connect
        </h1>
        <p class="text-lg text-text/80">
          Whether you’re curious about our collections, interested in creating a custom scent, or
          simply want to say hello — we’d love to hear from you.
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="relative py-16 px-6">
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"
      ></div>

      <div class="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <!-- Form -->
        <form
          @submit="handleSubmit"
          class="bg-surface p-8 rounded-2xl shadow-lg space-y-6"
          aria-label="Contact form"
        >
          <div>
            <label for="name" class="block text-heading font-medium mb-2">Full Name</label>
            <input
              v-model="name"
              id="name"
              name="name"
              type="text"
              required
              class="w-full border border-neutral/30 rounded-lg px-4 py-3 bg-transparent text-text focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            />
          </div>

          <div>
            <label for="email" class="block text-heading font-medium mb-2">Email Address</label>
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              required
              class="w-full border border-neutral/30 rounded-lg px-4 py-3 bg-transparent text-text focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            />
          </div>

          <div>
            <label for="message" class="block text-heading font-medium mb-2">Message</label>
            <textarea
              v-model="message"
              id="message"
              name="message"
              rows="5"
              required
              class="w-full border border-neutral/30 rounded-lg px-4 py-3 bg-transparent text-text resize-none focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            ></textarea>
          </div>

          <button
            type="submit"
            class="bg-accent text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition-all duration-200"
          >
            Send Message
          </button>

          <p v-if="submitted" class="text-accent font-medium mt-4" role="status">
            ✨ Thank you! We’ve received your message and will get back to you soon.
          </p>
        </form>

        <!-- Contact Info -->
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-heading text-heading mb-4">Reach Us Directly</h2>
            <ul class="space-y-4 text-text/80">
              <li>
                <span class="font-semibold text-heading">Email:</span>
                <a href="mailto:info@echelonhaus.com" class="text-accent hover:underline"
                  >info@radiance.com</a
                >
              </li>
              <li>
                <span class="font-semibold text-heading">Phone:</span>
                <a href="tel:+2348000000000" class="text-accent hover:underline"
                  >+234 800 000 0000</a
                >
              </li>
              <li>
                <span class="font-semibold text-heading">Location:</span>
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-heading text-heading mb-3">Follow Us</h3>
            <div class="flex gap-4" role="navigation" aria-label="Social links">
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
                aria-label="Visit our Instagram"
              >
                <i class="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
                aria-label="Visit our Twitter"
              >
                <i class="fa-brands fa-x-twitter" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 transition"
                aria-label="Visit our Facebook"
              >
                <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div class="pt-4 border-t border-neutral/20">
            <p class="text-text/70 text-sm">We’re open Monday–Saturday, 9AM–6PM (WAT)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Map or Decorative Section -->
    <section
      class="relative bg-neutral/5 h-[300px] flex items-center justify-center text-center"
      aria-hidden="true"
    >
      <p class="text-text/60 italic">“Every great connection begins with a conversation.”</p>
    </section>
  </main>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--color-accent, #b48a4a);
}
</style>
