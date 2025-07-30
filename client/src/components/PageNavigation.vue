<template>
  <nav class="page-navigation" v-if="totalPages > 1">
    <button
      class="nav-btn nav-btn-prev"
      :disabled="currentPage === 1"
      @click="onPageChange(currentPage - 1)"
    >
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="m15 18-6-6 6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Previous
    </button>

    <div class="page-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="page-btn"
        :class="{
          'page-btn-active': page === currentPage,
          'page-btn-ellipsis': page === '...',
        }"
        :disabled="page === '...'"
        @click="page !== '...' && onPageChange(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="nav-btn nav-btn-next"
      :disabled="currentPage === totalPages"
      @click="onPageChange(currentPage + 1)"
    >
      Next
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="m9 18 6-6-6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </nav>
</template>

<script>
export default {
  name: "PageNavigation",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxVisible: {
      type: Number,
      default: 5,
    },
  },
  emits: ["page-change"],
  computed: {
    visiblePages() {
      const { currentPage, totalPages, maxVisible } = this;
      const pages = [];

      if (totalPages <= maxVisible) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate range around current page
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisible - 1);

        // Adjust start if we're near the end
        if (end - start + 1 < maxVisible) {
          start = Math.max(1, end - maxVisible + 1);
        }

        // Add first page and ellipsis if needed
        if (start > 1) {
          pages.push(1);
          if (start > 2) {
            pages.push("...");
          }
        }

        // Add pages in range
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        // Add ellipsis and last page if needed
        if (end < totalPages) {
          if (end < totalPages - 1) {
            pages.push("...");
          }
          pages.push(totalPages);
        }
      }

      return pages;
    },
  },
  methods: {
    onPageChange(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit("page-change", page);
      }
    },
  },
};
</script>
