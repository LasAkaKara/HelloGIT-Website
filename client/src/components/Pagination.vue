<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center items-center gap-2 mt-6"
  >
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Prev
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('goto', page)"
      :class="[
        'px-3 py-1 rounded',
        page === currentPage
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 hover:bg-gray-300',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
};
</script>
