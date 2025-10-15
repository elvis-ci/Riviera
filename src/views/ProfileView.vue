<script setup>
import { ref } from "vue";

const user = ref({
  name: "Elena Mora",
  email: "elena.mora@example.com",
  phone: "+1 (234) 567-890",
  address: "45 Bloom Street, New York, NY",
  joined: "June 2023",
});

const editing = ref(false);
const form = ref({ ...user.value });

function toggleEdit() {
  editing.value = !editing.value;
  form.value = { ...user.value };
}

function saveProfile() {
  user.value = { ...form.value };
  editing.value = false;
  alert("Profile updated successfully!");
}
</script>

<template>
  <main id="profile" class="bg-surface text-text min-h-screen">
    <!-- Hero / Header -->
    <section
      class="relative py-16 px-6 text-center bg-gradient-to-b from-accent/10 via-surface to-surface"
      aria-labelledby="profile-heading"
    >
      <h1
        id="profile-heading"
        class="text-4xl font-heading text-heading mb-3 leading-tight"
      >
        Your Profile
      </h1>
      <p class="text-text/80 text-lg max-w-2xl mx-auto">
        Manage your personal details, preferences, and account settings in one
        place.
      </p>
    </section>

    <!-- Profile Card -->
    <section class="relative py-16 px-6">
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"
      ></div>

      <div
        class="relative max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-sm p-8"
      >
        <!-- Avatar -->
        <div class="flex flex-col items-center mb-8">
          <div
            class="w-28 h-28 rounded-full bg-accent/20 flex items-center justify-center text-4xl font-bold text-accent"
            aria-hidden="true"
          >
            {{ user.name.charAt(0) }}
          </div>
          <h2 class="mt-4 text-2xl font-semibold text-heading">
            {{ user.name }}
          </h2>
          <p class="text-text/70">{{ user.email }}</p>
          <p class="text-sm text-text/60 mt-1">Member since {{ user.joined }}</p>
        </div>

        <!-- Profile Form -->
        <form
          @submit.prevent="saveProfile"
          class="space-y-6 max-w-xl mx-auto text-left"
        >
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-heading mb-1"
                >Full Name</label
              >
              <input
                id="name"
                v-model="form.name"
                :disabled="!editing"
                type="text"
                class="w-full p-3 rounded-lg border border-border bg-surface focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-heading mb-1"
                >Email</label
              >
              <input
                id="email"
                v-model="form.email"
                :disabled="!editing"
                type="email"
                class="w-full p-3 rounded-lg border border-border bg-surface focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-heading mb-1"
                >Phone Number</label
              >
              <input
                id="phone"
                v-model="form.phone"
                :disabled="!editing"
                type="tel"
                class="w-full p-3 rounded-lg border border-border bg-surface focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                for="address"
                class="block text-sm font-medium text-heading mb-1"
                >Address</label
              >
              <input
                id="address"
                v-model="form.address"
                :disabled="!editing"
                type="text"
                class="w-full p-3 rounded-lg border border-border bg-surface focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:opacity-60"
              />
            </div>
          </div>

          <div class="flex justify-center gap-4 mt-8">
            <button
              v-if="!editing"
              type="button"
              @click="toggleEdit"
              class="border border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            >
              Edit Profile
            </button>

            <button
              v-else
              type="submit"
              class="bg-accent text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-accent-hover transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            >
              Save Changes
            </button>
            <button
              v-if="editing"
              type="button"
              @click="toggleEdit"
              class="border border-border text-text hover:bg-border/10 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Orders / Preferences Section -->
    <section class="relative py-16 px-6">
      <div class="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
        <!-- Order History -->
        <div
          class="bg-background border border-border rounded-2xl shadow-sm p-8"
        >
          <h3 class="text-xl font-semibold text-heading mb-4">
            Recent Orders
          </h3>
          <ul class="space-y-3 text-text/80">
            <li>No recent orders yet.</li>
          </ul>
        </div>

        <!-- Settings -->
        <div
          class="bg-background border border-border rounded-2xl shadow-sm p-8"
        >
          <h3 class="text-xl font-semibold text-heading mb-4">
            Account Settings
          </h3>
          <ul class="space-y-4 text-text/80">
            <li>
              <button
                class="text-accent hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 rounded-lg px-1"
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                class="text-accent hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 rounded-lg px-1"
              >
                Manage Notifications
              </button>
            </li>
            <li>
              <button
                class="text-accent hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 rounded-lg px-1"
              >
                Delete Account
              </button>
            </li>
          </ul>
        </div>
      </div>
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
</style>
