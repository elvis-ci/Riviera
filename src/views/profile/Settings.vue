<script setup>
import { ref } from "vue";

const saving = ref(false);

const form = ref({
  name: "",
  email: "",
  currentPassword: "",
  newPassword: "",
});

// Simulate save
function saveSettings() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
  }, 1200);
}
</script>

<template>
  <section class="p-4 sm:p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold text-heading mb-6">
      Account Settings
    </h1>

    <div class="space-y-8">
      <!-- Profile Information -->
      <div class="bg-background border border-border rounded-xl p-6 shadow">
        <h2 class="text-xl font-semibold text-heading mb-4">
          Profile Information
        </h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border border-border bg-surface rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full border border-border bg-surface rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <div class="bg-background border border-border rounded-xl p-6 shadow">
        <h2 class="text-xl font-semibold text-heading mb-4">
          Change Password
        </h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Current Password</label>
            <input
              v-model="form.currentPassword"
              type="password"
              class="w-full border border-border bg-surface rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">New Password</label>
            <input
              v-model="form.newPassword"
              type="password"
              class="w-full border border-border bg-surface rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter new password"
            />
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          @click="saveSettings"
          class="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          :disabled="saving"
        >
          <span v-if="!saving">Save Changes</span>
          <span v-else class="animate-pulse">Saving...</span>
        </button>
      </div>
    </div>
  </section>
</template>
