<template>
  <div class="blog-page">
    <AppHeader />

    <!-- Hero Section -->
    <section class="blog-hero">
      <h1 class="blog-hero-title">Blogs</h1>
    </section>

    <!-- Search Section -->
    <section class="blog-search-section">
      <div class="blog-search-container">
        <div class="blog-search-bar">
          <svg class="blog-search-icon" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="blog-search-input"
            placeholder="Search blogs..."
            @input="handleSearch"
          />
        </div>

        <div class="blog-filters">
          <div class="blog-filter-group">
            <span class="blog-filter-label">Sort by:</span>
            <button
              v-for="sortOption in sortOptions"
              :key="sortOption.value"
              class="blog-filter-btn"
              :class="{ active: currentSort === sortOption.value }"
              @click="handleSort(sortOption.value)"
            >
              {{ sortOption.label }}
            </button>
          </div>

          <div class="blog-filter-group">
            <span class="blog-filter-label">Category:</span>
            <button
              v-for="category in categories"
              :key="category"
              class="blog-filter-btn"
              :class="{ active: currentCategory === category }"
              @click="handleCategoryFilter(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="blog-results" v-if="!loading">
        <p class="blog-results-text">
          Showing
          <span class="blog-results-count">{{ paginatedBlogs.length }}</span> of
          <span class="blog-results-count">{{ filteredBlogs.length }}</span>
          blogs
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="blog-loading">
      <div class="blog-loading-spinner"></div>
      <p class="blog-loading-text">Loading blogs...</p>
    </div>

    <!-- Blog Grid -->
    <section v-else-if="paginatedBlogs.length > 0" class="blog-grid">
      <BlogCard
        v-for="blog in paginatedBlogs"
        :key="blog.id"
        :blog="blog"
        @click="handleBlogClick(blog)"
      />
    </section>

    <!-- Empty State -->
    <div v-else class="blog-empty-state">
      <svg class="blog-empty-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          stroke="currentColor"
          stroke-width="2"
        />
        <polyline
          points="14,2 14,8 20,8"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="16"
          y1="13"
          x2="8"
          y2="13"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="16"
          y1="17"
          x2="8"
          y2="17"
          stroke="currentColor"
          stroke-width="2"
        />
        <polyline
          points="10,9 9,9 8,9"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
      <h2 class="blog-empty-title">No blogs found</h2>
      <p class="blog-empty-description">
        {{
          searchQuery || currentCategory !== "All"
            ? "Try adjusting your search or filters"
            : "Check back later for new content"
        }}
      </p>
    </div>

    <!-- Pagination -->
    <PageNavigation
      v-if="totalPages > 1 && !loading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />

    <AppFooter />
  </div>
</template>

<script>
import { AppHeader, AppFooter, BlogCard, PageNavigation } from "../components";

export default {
  name: "Blog",
  components: {
    AppHeader,
    AppFooter,
    BlogCard,
    PageNavigation,
  },
  data() {
    return {
      loading: false,
      searchQuery: "",
      currentSort: "newest",
      currentCategory: "All",
      currentPage: 1,
      blogsPerPage: 9,
      blogs: [
        {
          id: 1,
          title: "Getting Started with Vue.js 3: A Comprehensive Guide",
          excerpt:
            "Learn the fundamentals of Vue.js 3 and how to build modern web applications with the Composition API.",
          content: "Vue.js 3 brings many exciting features...",
          author: "Sarah Johnson",
          date: "2024-01-15",
          category: "Development",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog1.jpg",
          comments: 24,
          readTime: 8,
        },
        {
          id: 2,
          title: "The Future of Web Development: Trends to Watch in 2024",
          excerpt:
            "Explore the latest trends and technologies shaping the future of web development.",
          content: "The web development landscape continues to evolve...",
          author: "Mike Chen",
          date: "2024-01-12",
          category: "Technology",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog2.jpg",
          comments: 18,
          readTime: 6,
        },
        {
          id: 3,
          title: "Building Responsive Layouts with CSS Grid and Flexbox",
          excerpt:
            "Master the art of creating flexible and responsive web layouts using modern CSS techniques.",
          content: "CSS Grid and Flexbox are powerful layout tools...",
          author: "Emily Rodriguez",
          date: "2024-01-10",
          category: "Design",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog3.jpg",
          comments: 31,
          readTime: 10,
        },
        {
          id: 4,
          title: "JavaScript ES2024: New Features and Updates",
          excerpt:
            "Discover the latest JavaScript features and how they can improve your development workflow.",
          content: "ECMAScript 2024 introduces several new features...",
          author: "David Kim",
          date: "2024-01-08",
          category: "Development",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog4.jpg",
          comments: 15,
          readTime: 7,
        },
        {
          id: 5,
          title: "UX Design Principles for Better User Engagement",
          excerpt:
            "Learn essential UX design principles that can help create more engaging user experiences.",
          content: "Good UX design is crucial for user engagement...",
          author: "Lisa Park",
          date: "2024-01-05",
          category: "Design",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog5.jpg",
          comments: 22,
          readTime: 9,
        },
        {
          id: 6,
          title: "Optimizing Web Performance: Tips and Best Practices",
          excerpt:
            "Improve your website's performance with these proven optimization techniques and strategies.",
          content: "Web performance optimization is essential...",
          author: "Tom Wilson",
          date: "2024-01-03",
          category: "Performance",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog6.jpg",
          comments: 27,
          readTime: 12,
        },
        {
          id: 7,
          title: "Introduction to TypeScript for JavaScript Developers",
          excerpt:
            "Get started with TypeScript and learn how it can improve your JavaScript development experience.",
          content: "TypeScript adds static typing to JavaScript...",
          author: "Anna Martinez",
          date: "2024-01-01",
          category: "Development",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog7.jpg",
          comments: 19,
          readTime: 8,
        },
        {
          id: 8,
          title: "Modern CSS: Custom Properties and Logical Properties",
          excerpt:
            "Explore the power of CSS custom properties and logical properties for more maintainable styles.",
          content: "CSS custom properties revolutionize styling...",
          author: "James Brown",
          date: "2023-12-28",
          category: "Design",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog8.jpg",
          comments: 16,
          readTime: 6,
        },
        {
          id: 9,
          title: "API Design Best Practices for Modern Applications",
          excerpt:
            "Learn how to design robust and scalable APIs that provide great developer experience.",
          content: "Well-designed APIs are the backbone...",
          author: "Rachel Green",
          date: "2023-12-25",
          category: "Technology",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog9.jpg",
          comments: 33,
          readTime: 11,
        },
        {
          id: 10,
          title: "Mobile-First Design: Creating Better Mobile Experiences",
          excerpt:
            "Understand the importance of mobile-first design and how to implement it effectively.",
          content: "Mobile-first design is more important than ever...",
          author: "Alex Turner",
          date: "2023-12-22",
          category: "Design",
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/blog10.jpg",
          comments: 21,
          readTime: 9,
        },
      ],
      sortOptions: [
        { label: "Newest", value: "newest" },
        { label: "Oldest", value: "oldest" },
        { label: "Most Popular", value: "popular" },
        { label: "Title A-Z", value: "title-asc" },
        { label: "Title Z-A", value: "title-desc" },
      ],
    };
  },
  computed: {
    categories() {
      const uniqueCategories = [
        ...new Set(this.blogs.map((blog) => blog.category)),
      ];
      return ["All", ...uniqueCategories.sort()];
    },
    filteredBlogs() {
      let filtered = [...this.blogs];

      // Apply search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          (blog) =>
            blog.title.toLowerCase().includes(query) ||
            blog.excerpt.toLowerCase().includes(query) ||
            blog.author.toLowerCase().includes(query) ||
            blog.category.toLowerCase().includes(query),
        );
      }

      // Apply category filter
      if (this.currentCategory !== "All") {
        filtered = filtered.filter(
          (blog) => blog.category === this.currentCategory,
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (this.currentSort) {
          case "newest":
            return new Date(b.date) - new Date(a.date);
          case "oldest":
            return new Date(a.date) - new Date(b.date);
          case "popular":
            return b.comments - a.comments;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });

      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredBlogs.length / this.blogsPerPage);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.blogsPerPage;
      const end = start + this.blogsPerPage;
      return this.filteredBlogs.slice(start, end);
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    currentCategory() {
      this.currentPage = 1;
    },
    currentSort() {
      this.currentPage = 1;
    },
  },
  mounted() {
    this.loadBlogs();
  },
  methods: {
    async loadBlogs() {
      this.loading = true;
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      this.loading = false;
    },
    handleSearch() {
      // Search is handled by the computed property
      // This method can be used for debouncing in the future
    },
    handleSort(sortValue) {
      this.currentSort = sortValue;
    },
    handleCategoryFilter(category) {
      this.currentCategory = category;
    },
    handlePageChange(page) {
      this.currentPage = page;
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleBlogClick(blog) {
      // Navigate to blog detail page
      this.$router.push(`/blog/${blog.id}`);
    },
  },
};
</script>
