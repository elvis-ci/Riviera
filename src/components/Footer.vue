<template>
  <footer class="bg-surface text-text border-t border-border py-12 px-6">
    <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
      <!-- Brand Section -->
      <div class="space-y-4">
        <RouterLink to="/" class="flex items-center gap-2" aria-label="Go to homepage">
          <img src="@/assets/logo.png" alt="Perfume Brand Logo" class="h-10 w-auto" />
          <span class="font-semibold text-lg font-sans">Riviera</span>
        </RouterLink>

        <p class="text-sm text-text/70 leading-relaxed">
          Discover elegant, timeless fragrances crafted with the finest ingredients.
        </p>

        <!-- ✅ Social Icons -->
        <div class="flex gap-4 mt-4">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener"
            class="hover:text-accent transition-colors"
          >
            <component :is="social.icon" size="22" />
          </a>
        </div>
      </div>

      <!-- Dynamic Footer Link Groups -->
      <div v-for="(group, index) in footerLinks" :key="index" class="space-y-3">
        <h3 class="font-semibold text-heading text-lg">{{ group.title }}</h3>
        <ul class="space-y-2">
          <li v-for="link in group.links" :key="link.name">
            <RouterLink
              :to="link.path"
              class="text-text/80 hover:text-accent text-sm transition-colors"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="max-w-7xl mx-auto mt-12 pt-6 border-t border-border text-center text-sm text-text/80">
      © {{ new Date().getFullYear() }} Perfume. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
// ✅ Explicitly import icons (this guarantees they render)
import IconMdiFacebook from '~icons/mdi/facebook'
import IconMdiInstagram from '~icons/mdi/instagram'
import IconMdiTwitter from '~icons/mdi/twitter'

// Footer link groups
const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "All Products", path: "/products" },
      { name: "New Arrivals", path: "/products/new" },
      { name: "Best Sellers", path: "/products/best-sellers" },
      { name: "Gift Sets", path: "/products/gift-sets" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQs", path: "/faqs" },
      { name: "Shipping & Returns", path: "/shipping" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
  },
]

// ✅ Assign actual icon components
const socialLinks = [
  { label: "Facebook", icon: IconMdiFacebook, href: "https://facebook.com" },
  { label: "Instagram", icon: IconMdiInstagram, href: "https://instagram.com" },
  { label: "Twitter", icon: IconMdiTwitter, href: "https://twitter.com" },
]
</script>
