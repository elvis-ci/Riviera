<template>
  <section
    class="min-h-screen my-5 flex items-center justify-center bg-background text-text px-6 sm:px-10"
    aria-labelledby="signin-heading"
  >
    <div
      class="bg-surface border border-border rounded-2xl shadow-lg w-full max-w-lg p-8 sm:p-10 space-y-6"
      role="form"
      aria-describedby="signin-description"
    >
      <!-- Heading -->
      <div class="text-center">
        <h1 id="signin-heading" class="text-3xl sm:text-4xl font-bold text-heading mb-2">
          Welcome Back
        </h1>
        <p id="signin-description" class="text-text/80 text-sm">
          Sign in to continue to your account
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSignIn" class="space-y-5">
        <!-- Email -->
        <div class="flex flex-col">
          <label for="email" class="text-sm font-medium text-heading mb-1"> Email Address </label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="border border-border bg-background rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col">
          <label for="password" class="text-sm font-medium text-heading mb-1"> Password </label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="border border-border bg-background rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors"
            placeholder="Enter your password"
          />
        </div>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between text-sm text-text/80">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="accent-accent w-4 h-4 rounded"
              aria-label="Remember me"
            />
            Remember me
          </label>
          <router-link
            to="/forgot-password"
            class="text-accent hover:text-accent-hover font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
          >
            Forgot password?
          </router-link>
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          class="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-2.5 rounded-lg shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all duration-200"
          :aria-busy="loading"
        >
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="inline-flex items-center gap-2 justify-center">
            <span
              class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            ></span>
            Signing in...
          </span>
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center justify-center gap-3">
        <span class="border-t border-border flex-grow"></span>
        <span class="text-xs text-text uppercase">or</span>
        <span class="border-t border-border flex-grow"></span>
      </div>

      <!-- Social Buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="handleSignInWithGoogle"
          type="button"
          class="w-full border text- border-border bg-background text-heading py-2 rounded-lg font-medium hover:bg-surface transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt=""
            class="inline w-5 h-5 mr-2 align-middle"
          />
          Continue with Google
        </button>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-text/70">
        Don’t have an account?
        <router-link
          to="/signup"
          class="text-accent hover:text-accent-hover font-medium focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
        >
          Sign Up
        </router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";

const auth = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);

async function handleSignIn() {
  isLoading.value = true;
  await auth.signInWithEmail(email.value, password.value);
  if (!auth.errorMsg) {
    isLoading.value = false;
    router.push("/");
    console.log("Signup successful", "user:", auth.user);
  } else {
    isLoading.value = false;
    console.log("error:", auth.errorMsg);
  }
}

function handleSignInWithGoogle() {
  auth.signInWithGoogle();
}
</script>

<style scoped>
/* Accessibility Enhancements */
:focus-visible {
  outline: none;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
