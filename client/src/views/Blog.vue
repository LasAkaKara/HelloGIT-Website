<template>
  <Header />

  <div class="body-container bg-white">
    <!-- Page Header -->
    <section class="flex w-full py-8 mb-6">
      <div class="flex flex-col justify-center items-start w-full gap-2">
        <p class="page-title">Blogs</p>
        <p class="page-subtitle">
          Explore the latest updates, tech insights and stories from our
          writers.
        </p>
      </div>
    </section>

    <!-- Create Blog Button -->
    <button v-if="isAuthorized" @click="handleCreateBlog" class="btn mb-6">
      Create Blog Post
    </button>

    <!-- Search + Sort + Filter -->
    <section class="w-full mb-8">
      <!-- Search & Sort Row -->
      <div class="flex flex-col md:flex-row gap-4 w-full mb-4">
        <!-- Search Bar -->
        <SearchBar
          v-model="searchQuery"
          placeholder="Search blogs..."
          @search="handleSearch"
        />

        <!-- Sort Button -->
        <button
          @click="toggleSort"
          class="h-12 md:h-14 px-4 md:px-6 rounded-3xl border border-primary-blue flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
          :class="
            sortByNewest
              ? 'bg-primary-blue text-white'
              : 'bg-white text-primary-blue'
          "
        >
          <span class="text-sm md:text-base lg:text-lg">Sort by newest</span>
          <img
            src="/icons/sort.png"
            alt="sort"
            class="w-4 h-4 md:w-5 md:h-5"
            :class="{ 'rotate-180': !sortByNewest }"
          />
        </button>
      </div>

      <!-- Filters Row -->
      <div class="flex flex-wrap gap-3 w-full">
        <div class="w-full sm:w-auto flex-1 min-w-[120px]">
          <FilterDropdown
            v-model="selectedCategory"
            :options="categoryOptions"
            :label="selectedCategory === 'All categories' ? 'Category' : ''"
            :icon-src="
              selectedCategory === 'All categories' ? '/icons/tag.png' : ''
            "
            variant="secondary"
          />
        </div>
      </div>
    </section>

    <!-- Blog List -->
    <section class="w-full mb-16">
      <div class="mb-4">
        <h2 class="section-title text-black" style="font-family: Poppins">
          All blogs
        </h2>
      </div>

      <!-- Cards Grid -->
      <div v-if="paginatedBlogs.length > 0" class="flex flex-col gap-12 mb-16">
        <BlogCard
          v-for="blog in paginatedBlogs"
          :key="blog.id || blog._id"
          :blog="blog"
          :delete="isAuthorized"
          @click="handleBlogClick"
          @handleReadMore="handleBlogClick"
          @handleDelete="handleDeleteBlog"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="flex justify-center items-center min-h-80">
        <div class="text-center max-w-96">
          <div class="text-6xl mb-4 opacity-50">📰</div>
          <h3 class="text-2xl font-semibold text-gray-600 mb-2">
            No blogs found
          </h3>
          <p class="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            @click="clearAllFilters"
            class="bg-primary-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-teal-dark transition-colors"
          >
            Clear all filters
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-4" v-if="totalPages > 1">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @goto="goToPage"
          @next="nextPage"
          @prev="prevPage"
        />
      </div>
    </section>
  </div>

  <Footer />
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import FilterDropdown from "../components/FilterDropdown.vue";
import BlogCard from "../components/BlogCard.vue";
import SearchBar from "../components/SearchBar.vue";
import Pagination from "../components/Pagination.vue";
import { useAuthStore } from "../store/auth.store";
import axiosInstance from "../utils/axiosInstance.js";

export default {
  name: "Blog",
  components: {
    Header,
    Footer,
    FilterDropdown,
    BlogCard,
    SearchBar,
    Pagination,
  },
  data() {
    return {
      searchQuery: "",
      selectedCategory: "All categories",
      sortByNewest: true,
      currentPage: 1,
      itemsPerPage: 5,
      loading: false,

      blogs: [],

      categoryOptions: [
        "All categories",
        "Technology",
        "Tutorial",
        "Opinion",
        "News",
      ],
    };
  },
  mounted() {
    this.loadBlogs();
  },
  computed: {
    isAuthorized() {
      const { state } = useAuthStore();
      return (
        state.user &&
        (state.user.role === "admin" || state.user.role === "member")
      );
    },

    filteredBlogs() {
      let list = [...this.blogs];

      // search
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter((b) => b.title.toLowerCase().includes(q));
      }

      // category
      if (this.selectedCategory !== "All categories") {
        list = list.filter((b) => b.category === this.selectedCategory);
      }

      // sort
      list = list.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date);
        const dateB = new Date(b.createdAt || b.date);
        return this.sortByNewest ? dateB - dateA : dateA - dateB;
      });

      return list;
    },
    totalPages() {
      return Math.ceil(this.filteredBlogs.length / this.itemsPerPage);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredBlogs.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async loadBlogs() {
      this.loading = true;
      try {
        const res = await axios.get("http://localhost:8000/api/posts");
        this.blogs = res.data;
      } catch (e) {
        console.error("Failed to load blogs", e);
        // Show error to user
        this.$toast.error("Failed to load blog posts");
      } finally {
        this.loading = false;
      }
    },

    handleCreateBlog() {
      this.$router.push("/blog/create");
    },

    async handleDeleteBlog(blogId) {
      await axiosInstance.delete(`/posts/${blogId}`);
      this.loadBlogs();
    },
    clearAllFilters() {
      this.searchQuery = "";
      this.selectedCategory = "All categories";
    },
    toggleSort() {
      this.sortByNewest = !this.sortByNewest;
    },
    handleSearch(q) {
      this.searchQuery = q;
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    handleBlogClick(blog) {
      this.$router.push(`/blog/${blog._id || blog.id}`);
    },
  },
};
</script>
