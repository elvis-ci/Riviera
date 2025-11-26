<template>
  <section
    class="my-24 flex items-center justify-center bg-background text-text px-2 sm:px-10"
    aria-labelledby="signup-heading"
  >
    <div
      class="bg-surface border border-border rounded-2xl shadow-lg w-full max-w-lg py-8 px-4 sm:p-10 space-y-6"
    >
      <!-- Heading -->
      <h1
        id="signup-heading"
        class="text-2xl sm:text-3xl font-bold text-heading text-center mb-6"
      >
        Create Your Account
      </h1>

      <!-- Confirmation Message -->
      <div
        v-if="isConfirmationSent"
        class="text-center text-green-700 font-medium"
        role="status"
        aria-live="polite"
      >
        A confirmation link has been sent to your email.
      </div>

      <!-- Sign Up Form -->
      <form
        v-else
        @submit.prevent="handleSignUp"
        class="flex flex-col gap-5"
        aria-describedby="signup-instructions"
      >
        <p id="signup-instructions" class="sr-only">
          Fill in all fields to create your account
        </p>

        <!-- Full Name -->
        <div>
          <label for="name" class="block text-sm font-medium mb-1">
            Full Name <span class="text-red-600">*</span>
          </label>
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
            Email Address <span class="text-red-600">*</span>
          </label>
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
            Password <span class="text-red-600">*</span>
          </label>
          <div class="flex items-center relative">
            <input
              v-model="password"
              id="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              minlength="8"
              required
              placeholder="••••••••"
              autocomplete="new-password"
              aria-describedby="password-requirements"
              class="w-full border border-border rounded-lg px-4 py-2 text-sm bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-4 text-text/70"
              aria-label="Toggle password visibility"
            >
              <IconMdiEye v-if="isPasswordVisible" />
              <IconMdiEyeOff v-else />
            </button>
          </div>
          <p
            id="password-requirements"
            v-if="password && password.length < 8"
            class="text-red-500 text-xs mt-1"
            role="alert"
          >
            Password must be at least 8 characters
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirm" class="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <div class="flex items-center relative">
            <input
              v-model="confirmPassword"
              id="confirm"
              :type="isPasswordVisible ? 'text' : 'password'"
              required
              placeholder="••••••••"
              autocomplete="new-password"
              aria-describedby="confirm-password-requirements"
              class="w-full border border-border rounded-lg px-4 py-2 text-sm bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
            />
          </div>
          <p
            id="confirm-password-requirements"
            v-if="confirmPassword && confirmPassword !== password"
            class="text-red-700 text-xs mt-1"
            role="alert"
          >
            Passwords do not match
          </p>
        </div>

        <!-- Error Message (Live Region) -->
        <div
          v-if="errorMsg"
          ref="errorRef"
          tabindex="-1"
          role="alert"
          aria-live="assertive"
          class="text-red-600 text-sm mt-2 text-center"
        >
          {{ errorMsg }}
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

        <!-- Social Signin -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="handleSignInWithGoogle"
            type="button"
            class="w-full border border-border bg-background text-heading py-2 rounded-lg font-medium hover:bg-accent/30 transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";

const auth = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const isConfirmationSent = ref(false);
const isPasswordVisible = ref(false);
const errorMsg = ref(null);
const errorRef = ref(null);

const handleSignUp = async () => {
  // Reset error
  errorMsg.value = null;

  // Password match check
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match";
    nextTick(() => errorRef.value?.focus());
    return;
  }

  isLoading.value = true;
  await auth.signUpWithEmail(email.value, password.value, name.value);

  if (!auth.errorMsg) {
    isLoading.value = false;
    isConfirmationSent.value = true;
  } else {
    isLoading.value = false;
    errorMsg.value = auth.errorMsg;
    nextTick(() => errorRef.value?.focus());
    console.log("error:", auth.errorMsg);
  }
};

async function handleSignInWithGoogle() {
  await auth.signInWithGoogle();
}

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}
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
