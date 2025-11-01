<script setup>
import { ref, computed } from "vue";
import IconMdiMagnify from "~icons/mdi/magnify";
import IconMdiDotsVertical from "~icons/mdi/dots-vertical";
import IconMdiPlus from "~icons/mdi/plus";
import IconMdiAccountGroup from "~icons/mdi/account-group";
import IconMdiAccountCheck from "~icons/mdi/account-check";
import IconMdiAccountOff from "~icons/mdi/account-off";
import IconMdiAccountCancel from "~icons/mdi/account-cancel";
import IconMdiSortAscending from "~icons/mdi/sort-ascending";
import IconMdiSortDescending from "~icons/mdi/sort-descending";

const users = ref([
  {
    id: "#U1001",
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
    dateJoined: "2025-10-25",
  },
  {
    id: "#U1002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
    dateJoined: "2025-10-20",
  },
  {
    id: "#U1003",
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Customer",
    status: "Inactive",
    dateJoined: "2025-10-15",
  },
  {
    id: "#U1004",
    name: "Sarah Lee",
    email: "sarah@example.com",
    role: "Customer",
    status: "Banned",
    dateJoined: "2025-09-30",
  },
]);

const searchQuery = ref("");
const selectedRole = ref("All");
const selectedStatus = ref("All");
const selectedDate = ref("All");
const sortBy = ref("None");
const sortOrder = ref("asc");
const isSorted = ref(false);
const showFilters = ref(true);
const showSummaries = ref(false);

// Computed Stats
const totalUsers = computed(() => users.value.length);
const activeUsers = computed(() => users.value.filter(u => u.status === "Active").length);
const inactiveUsers = computed(() => users.value.filter(u => u.status === "Inactive").length);
const bannedUsers = computed(() => users.value.filter(u => u.status === "Banned").length);

const summaries = ref([
  { label: "Total Users", value: totalUsers.value, icon: { iconName: IconMdiAccountGroup, iconClass: "text-accent" }},
  { label: "Active", value: activeUsers.value, icon: { iconName: IconMdiAccountCheck, iconClass: "text-green-600" }},
  { label: "Inactive", value: inactiveUsers.value, icon: { iconName: IconMdiAccountOff, iconClass: "text-yellow-600" }},
  { label: "Banned", value: bannedUsers.value, icon: { iconName: IconMdiAccountCancel, iconClass: "text-red-600" }},
]);

// Filtered and Sorted Users
const uniqueDates = computed(() => ["All", ...new Set(users.value.map(u => u.dateJoined))]);

const filteredUsers = computed(() => {
  let result = users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = selectedRole.value === "All" || user.role === selectedRole.value;
    const matchesStatus = selectedStatus.value === "All" || user.status === selectedStatus.value;
    const matchesDate = selectedDate.value === "All" || user.dateJoined === selectedDate.value;
    return matchesSearch && matchesRole && matchesStatus && matchesDate;
  });

  if (sortBy.value !== "None") {
    isSorted.value = true;
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy.value) {
        case "Name": comparison = a.name.localeCompare(b.name); break;
        case "Role": comparison = a.role.localeCompare(b.role); break;
        case "Date Joined": comparison = new Date(a.dateJoined) - new Date(b.dateJoined); break;
      }
      return sortOrder.value === "asc" ? comparison : -comparison;
    });
  } else {
    isSorted.value = false;
  }
  return result;
});

function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function toggleSummaries() {
  showSummaries.value = !showSummaries.value;
}

function getStatusColor(status) {
  switch (status) {
    case "Active":
      return "text-green-800 bg-green-100";
    case "Inactive":
      return "text-yellow-800 bg-yellow-100";
    default:
      return "text-red-800 bg-red-100";
  }
}

</script>

<template>
  <section class="bg-background space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-bold text-heading">Manage Users</h1>
    </div>

    <!-- Summaries -->
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-heading/70">Summary</h2>
        <button
          @click="toggleSummaries"
          class="text-sm text-accent hover:text-accent-hover font-medium select-none"
        >
          {{ showSummaries ? "Hide" : "Show" }} details
        </button>
      </div>

      <div v-if="showSummaries" class="grid grid-cols-1 sm:grid-cols-4 gap-4 my-4">
        <div v-for="summary in summaries" :key="summary.label">
          <div class="flex items-center gap-3 p-4 rounded-2xl border border-border bg-surface/70 shadow-sm">
            <component
              :is="summary.icon.iconName"
              :class="[summary.icon.iconClass, 'text-3xl']"
              size="28"
              aria-hidden="true"
            />
            <div>
              <p class="text-sm text-text/70">{{ summary.label }}</p>
              <p class="text-xl font-bold text-text">{{ summary.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="flex flex-col gap-4 mt-6">
      <div class="flex flex-col w-full">
        <label for="user-search" class="text-sm font-medium text-text/80 mb-1">
          Search Users
        </label>
        <div class="relative">
          <input
            id="user-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by name..."
            class="pl-10 pr-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:outline-none bg-background text-text placeholder:text-text/60"
          />
          <IconMdiMagnify class="absolute left-3 top-2.5 text-text/70" size="20" />
          <button @click="toggleFilters" class="ml-2 bg-accent text-white p-3 rounded-xl text-xs sm:text-sm absolute right-1 top-1">
            {{ showFilters ? "Hide Filters" : "Show Filters" }}
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div v-if="showFilters" class="flex flex-wrap gap-4">
        <!-- Role -->
        <div>
          <label for="role-filter" class="block text-sm font-medium text-text/80 mb-1">
            Role
          </label>
          <select
            id="role-filter"
            v-model="selectedRole"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option>All</option>
            <option>Admin</option>
            <option>Customer</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label for="status-filter" class="block text-sm font-medium text-text/80 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            v-model="selectedStatus"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Banned</option>
          </select>
        </div>

        <!-- Date Joined -->
        <div>
          <label for="date-filter" class="block text-sm font-medium text-text/80 mb-1">
            Date Joined
          </label>
          <select
            id="date-filter"
            v-model="selectedDate"
            class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          >
            <option v-for="date in uniqueDates" :key="date" :value="date">{{ date }}</option>
          </select>
        </div>

        <!-- Sort -->
        <div>
          <label for="sort-by" class="block text-sm font-medium text-text/80 mb-1">Sort By</label>
          <div class="flex flex-col gap-2">
            <select
              id="sort-by"
              v-model="sortBy"
              class="rounded-xl border border-border py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
            >
              <option>None</option>
              <option>Name</option>
              <option>Role</option>
              <option>Date Joined</option>
            </select>

            <div v-if="isSorted" class="flex items-center gap-4 mt-1">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sortOrder"
                  value="asc"
                  v-model="sortOrder"
                  class="accent-green-600 focus:ring-2 focus:ring-green-500"
                />
                <span class="text-sm text-text/80 flex items-center gap-1">
                  <IconMdiSortAscending class="text-green-600" size="18" />
                  Ascending
                </span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sortOrder"
                  value="desc"
                  v-model="sortOrder"
                  class="accent-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span class="text-sm text-text/80 flex items-center gap-1">
                  <IconMdiSortDescending class="text-red-600" size="18" />
                  Descending
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="overflow-x-scroll border border-border rounded-2xl shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-surface text-xs text-text uppercase sm:text-sm">
          <tr>
            <th class="py-3 px-4 font-semibold">ID</th>
            <th class="py-3 px-4 font-semibold">Name</th>
            <th class="py-3 px-4 font-semibold">Email</th>
            <th class="py-3 px-4 font-semibold">Role</th>
            <th class="py-3 px-4 font-semibold text-center">Status</th>
            <th class="py-3 px-4 font-semibold text-center">Date Joined</th>
            <th class="py-3 px-4 text-right"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-t border-border hover:bg-accent/5 transition"
          >
            <td class="py-3 px-4 text-sm font-medium text-accent-hover">{{ user.id }}</td>
            <td class="py-3 px-4 text-sm text-text">{{ user.name }}</td>
            <td class="py-3 px-4 text-sm text-text/80">{{ user.email }}</td>
            <td class="py-3 px-4 text-sm text-text/90">{{ user.role }}</td>
            <td class="py-3 px-4 text-center">
              <span
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                :class="getStatusColor(user.status)"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="py-3 px-4 text-sm text-center text-text/80">
              {{ user.dateJoined }}
            </td>
            <td class="py-3 px-4 text-right">
              <button
                class="flex items-center text-accent hover:text-accent-hover font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg px-2"
              >
                <IconMdiDotsVertical size="18" />
                Manage User
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!filteredUsers.length" class="text-center py-10 text-text/70 text-sm">
        No users found.
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 640px) {
  h1 {
    font-size: 1.25rem;
  }
  th,
  td {
    padding: 0.5rem;
  }
  input,
  select {
    font-size: 0.9rem;
  }
  button {
    font-size: 0.85rem;
  }
}
</style>
