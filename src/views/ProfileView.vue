<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
// User data
const user = computed(() => auth.userProfile ?? null);

onMounted(() => {
  console.log(user.value);
});

// Form state
const editing = ref(false);
const form = ref({ ...user.value });
// Sidebar / Tabs
const tabs = ["Profile", "Favorites", "Orders", "Account Settings"];
const currentTab = ref("Profile");

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
  <main class="min-h-screen bg-surface text-text flex flex-col md:flex-row">
    <!-- Sidebar / Tabs -->
    <aside
      class="bg-background border-b md:border-b-0 md:border-r border-border md:w-64 flex md:flex-col sticky top-0 z-10"
    >
      <h2 class="text-2xl font-semibold text-heading p-4 md:pb-6 hidden md:block">Dashboard</h2>

      <!-- Tabs for mobile -->
      <div class="flex md:flex-col overflow-x-auto md:overflow-x-visible">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="currentTab = tab"
          :class="[
            'flex-1 md:flex-none px-4 py-3 font-medium whitespace-nowrap transition text-center md:text-left',
            currentTab === tab ? 'bg-accent text-white' : 'hover:bg-accent/10 text-text',
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <section class="flex-1 p-6 md:p-8">
      <!-- Profile Tab -->
      <div
        v-if="currentTab === 'Profile'"
        class="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-md p-6 md:p-8"
      >
        <!-- Avatar & Name -->
        <div class="flex flex-col items-center mb-8">
          <div
            class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-accent/20 flex items-center justify-center text-4xl font-bold text-accent"
          >
            {{ user.full_name.charAt(0) }}
          </div>
          <h2 class="mt-4 text-2xl font-semibold text-heading text-center">{{ user.full_name }}</h2>
          <p class="text-text/70">{{ user.email }}</p>
          <p class="text-sm text-text/60 mt-1 text-center">
            Member since
            {{
              new Date(user.joined).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })
            }}
          </p>
        </div>

        <!-- Editable Profile Form -->
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-heading mb-1"
                >Full Name</label
              >
              <input
                id="name"
                v-model="form.full_name"
                :disabled="!editing"
                type="text"
                class="w-full p-3 rounded-lg border border-border bg-surface focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:opacity-60"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-heading mb-1">Email</label>
              <input
                id="email"
                v-model="form.email"
                :disabled="!editing"
                type="email"
                class="w-full p-3 rounded-lg border border-border bg-surface focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:opacity-60"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-heading mb-1"
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
              <label for="address" class="block text-sm font-medium text-heading mb-1"
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

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button
              v-if="!editing"
              type="button"
              @click="toggleEdit"
              class="border border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Edit Profile
            </button>

            <div v-else class="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                type="submit"
                class="bg-accent text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-accent-hover transition flex-1"
              >
                Save Changes
              </button>
              <button
                type="button"
                @click="toggleEdit"
                class="border border-border text-text hover:bg-border/10 px-6 py-3 rounded-lg font-medium transition flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Favorites Tab -->
      <div
        v-else-if="currentTab === 'Favorites'"
        class="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-md p-6 md:p-8 text-center text-text/70"
      >
        <p>No favorites added yet.</p>
      </div>

      <!-- Orders Tab -->
      <div
        v-else-if="currentTab === 'Orders'"
        class="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-md p-6 md:p-8"
      >
        <h3 class="text-xl font-semibold text-heading mb-4">Recent Orders</h3>
        <ul class="space-y-3 text-text/80">
          <li>No recent orders yet.</li>
        </ul>
      </div>

      <!-- Account Settings Tab -->
      <div
        v-else-if="currentTab === 'Account Settings'"
        class="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-md p-6 md:p-8"
      >
        <h3 class="text-xl font-semibold text-heading mb-4">Account Settings</h3>
        <ul class="space-y-3 text-text/80">
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
    </section>
  </main>
</template>

<style scoped>
/* Mobile scrollbar for tabs */
aside > div::-webkit-scrollbar {
  height: 4px;
}
aside > div::-webkit-scrollbar-thumb {
  background: #b78a4f;
  border-radius: 4px;
}
aside > div::-webkit-scrollbar-track {
  background: transparent;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
