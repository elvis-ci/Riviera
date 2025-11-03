<script setup>
import { ref, watch } from "vue";
import IconMdiClose from "~icons/mdi/close";
import IconMdiDelete from "~icons/mdi/delete";
import IconMdiPlus from "~icons/mdi/plus";
import IconMdiPackageVariantClosed from "~icons/mdi/package-variant-closed";

const props = defineProps({
  isModalOpen: Boolean,
  product: Object,
});

const emit = defineEmits(["close", "delete", "increaseStock"]);

const newStock = ref(0);

// Reset input whenever modal opens
watch(
  () => props.isModalOpen,
  (open) => {
    if (open) newStock.value = 0;
  }
);

function handleIncreaseStock() {
  if (newStock.value <= 0) {
    alert("Enter a valid number greater than 0");
    return;
  }
  emit("increaseStock", { id: props.product.id, amount: newStock.value });
  newStock.value = 0;
}

function handleDelete() {
  const confirmDelete = confirm(`Are you sure you want to delete ${props.product.name}?`);
  if (confirmDelete) emit("delete", props.product.id);
}
</script>

<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="bg-surface rounded-2xl shadow-lg w-full max-w-md p-6 relative border border-border">
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-text/60 hover:text-accent transition"
        aria-label="Close modal"
      >
        <IconMdiClose size="22" />
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 mb-4">
        <IconMdiPackageVariantClosed class="text-accent text-3xl" />
        <h2 class="text-xl font-semibold text-heading">Product Details</h2>
      </div>

      <!-- Product Info -->
      <div class="space-y-3 text-text/90">
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">ID:</span>
          <span>{{ product.id }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">Name:</span>
          <span>{{ product.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">Category:</span>
          <span>{{ product.category }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">Price:</span>
          <span>${{ product.price.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">Stock:</span>
          <span>{{ product.stock }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">Status:</span>
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
            :class="{
              'bg-green-100 text-green-800': product.status === 'In Stock',
              'bg-yellow-100 text-yellow-800': product.status === 'Low Stock',
              'bg-red-100 text-red-800': product.status === 'Out of Stock',
            }"
          >
            {{ product.status }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold text-text/70">Date Created:</span>
          <span>{{ product.dateCreated }}</span>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-5 border-border" />

      <!-- Increase Stock -->
      <div class="flex flex-col gap-3">
        <label class="text-sm font-semibold text-text/80">Increase Stock</label>
        <div class="flex items-center gap-2">
          <input
            v-model.number="newStock"
            type="number"
            min="1"
            placeholder="Enter quantity"
            class="flex-1 border border-border rounded-xl py-2 px-3 bg-background text-text focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button
            @click="handleIncreaseStock"
            class="flex items-center gap-1 bg-accent text-white font-semibold px-4 py-2 rounded-xl hover:bg-accent-hover transition"
          >
            <IconMdiPlus size="18" />
            Add
          </button>
        </div>
      </div>

      <!-- Delete Product -->
      <div class="mt-6 flex justify-end">
        <button
          @click="handleDelete"
          class="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 font-semibold py-2 px-5 rounded-xl transition"
        >
          <IconMdiDelete size="18" />
          Delete Product
        </button>
      </div>
    </div>
  </div>
</template>
