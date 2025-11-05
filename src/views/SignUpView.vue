<template>
  <section
    class="min-h-screen flex items-center justify-center bg-background text-text px-6 py-12"
    aria-labelledby="signup-heading"
  >
    <div
      class="bg-surface border border-border rounded-2xl shadow-lg w-full max-w-lg p-8 sm:p-10 space-y-6"
    >
      <h1 id="signup-heading" class="text-2xl sm:text-3xl font-bold text-heading text-center mb-6">
        Create Your Account
      </h1>

      <!-- Sign Up Form -->
      <form
        @submit.prevent="handleSignUp"
        class="flex flex-col gap-5"
        aria-describedby="signup-instructions"
      >
        <p id="signup-instructions" class="sr-only">Fill in all fields to create your account</p>

        <!-- Full Name -->
        <div>
          <label for="name" class="block text-sm font-medium mb-1">
            Full Name <span class="text-red-600">*</span></label
          >
          <input
            v-model="name"
            id="name"
            type="text"
            required
            placeholder="John Doe"
            class="w-full border border-border rounded-lg px-4 py-2 text-sm bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium mb-1">
            Email Address <span class="text-red-600">*</span></label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            autocomplete="email"
            class="w-full border border-border rounded-lg px-4 py-2 text-sm bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium mb-1">
            Password <span class="text-red-600">*</span></label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            required
            minlength="8"
            placeholder="••••••••"
            autocomplete="new-password"
            class="w-full border border-border rounded-lg px-4 py-2 text-sm bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
          <p v-if="password && password.length < 6" class="text-red-500 text-xs mt-1" role="alert">
            Password must be at least 8 characters
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirm" class="block text-sm font-medium mb-1"> Confirm Password </label>
          <input
            v-model="confirmPassword"
            id="confirm"
            type="password"
            required
            placeholder="••••••••"
            autocomplete="new-password"
            class="w-full border border-border rounded-lg px-4 py-2 text-sm bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
          <p
            v-if="confirmPassword && confirmPassword !== password"
            class="text-red-500 text-xs mt-1"
            role="alert"
          >
            Passwords do not match
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full mt-2 py-2.5 rounded-lg font-semibold text-sm text-white bg-accent hover:bg-accent-hover transition-all duration-300 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!isLoading">Create Account</span>
          <span v-else class="flex items-center justify-center gap-2">
            <span
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            ></span>
            Signing up...
          </span>
        </button>

        <!-- Divider -->
        <div class="flex items-center justify-center gap-3">
          <span class="border-t border-border flex-grow"></span>
          <span class="text-xs text-text uppercase">or</span>
          <span class="border-t border-border flex-grow"></span>
        </div>

        <!-- Social Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
          @click="auth.signInWithGoogle"
            type="button"
            class="w-full border text- border-border bg-background text-heading py-2 rounded-lg font-medium hover:bg-accent/30 transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt=""
              class="inline w-5 h-5 mr-2 align-middle"
            />
            Continue with Google
          </button>
        </div>

        <!-- Already have an account -->
        <p class="text-sm text-center mt-4 text-text/80">
          Already have an account?
          <router-link
            to="/signin"
            class="text-accent ml-2 font-medium hover:underline focus:underline focus:outline-none"
          >
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useAuthStore} from '@/stores/useAuthStore.js'

const auth = useAuthStore()

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const handleSignUp = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  isLoading.value = true;

  // Simulated API sign-up (replace with real auth logic)
  setTimeout(() => {
    localStorage.setItem("user", JSON.stringify({ name: name.value, email: email.value }));
    isLoading.value = false;
    router.push("/profile");
  }, 1500);
};
</script>

<style scoped>
/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
