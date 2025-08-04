<template>
  <div class="min-h-screen bg-white">
    <Header />

    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Sidebar -->
        <aside class="w-full lg:w-96 lg:flex-shrink-0 order-2 lg:order-1">
          <!-- Breadcrumb -->
          <div class="mb-6">
            <p
              class="text-lg md:text-xl font-light italic text-black font-[Poppins]"
            >
              Home / Blogs
            </p>
          </div>

          <!-- Page Title -->
          <div class="mb-8">
            <h1
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-black font-[Poppins] mb-2"
            >
              Tech News
            </h1>
          </div>

          <!-- Search Bar -->
          <div class="mb-8">
            <div class="relative">
              <div
                class="flex items-center h-16 md:h-18 border-2 border-[#757575] rounded-full bg-white px-4 md:px-8"
              >
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch(searchQuery)"
                  type="text"
                  placeholder="Search Blogs..."
                  class="flex-1 text-lg md:text-xl font-normal text-[#757575] font-[Poppins] border-none outline-none bg-transparent placeholder-[#757575]"
                />
                <button
                  @click="handleSearch(searchQuery)"
                  class="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.75 39.375L24.9375 27.5625C24 28.3125 22.9219 28.9063 21.7031 29.3438C20.4844 29.7813 19.1875 30 17.8125 30C14.4062 30 11.5234 28.8203 9.16406 26.4609C6.80469 24.1016 5.625 21.2188 5.625 17.8125C5.625 14.4062 6.80469 11.5234 9.16406 9.16406C11.5234 6.80469 14.4062 5.625 17.8125 5.625C21.2188 5.625 24.1016 6.80469 26.4609 9.16406C28.8203 11.5234 30 14.4062 30 17.8125C30 19.1875 29.7813 20.4844 29.3438 21.7031C28.9063 22.9219 28.3125 24 27.5625 24.9375L39.375 36.75L36.75 39.375ZM17.8125 26.25C20.1562 26.25 22.1484 25.4297 23.7891 23.7891C25.4297 22.1484 26.25 20.1562 26.25 17.8125C26.25 15.4688 25.4297 13.4766 23.7891 11.8359C22.1484 10.1953 20.1562 9.375 17.8125 9.375C15.4688 9.375 13.4766 10.1953 11.8359 11.8359C10.1953 13.4766 9.375 15.4688 9.375 17.8125C9.375 20.1562 10.1953 22.1484 11.8359 23.7891C13.4766 25.4297 15.4688 26.25 17.8125 26.25Z"
                      fill="#79747E"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Categories Section -->
          <div class="mb-8">
            <div
              class="bg-white border border-[#757575] border-opacity-80 rounded-3xl shadow-lg"
            >
              <div class="p-6 md:p-8">
                <h2
                  class="text-2xl md:text-3xl font-bold text-[#205172] font-[Poppins] mb-6"
                >
                  Categories
                </h2>

                <div class="space-y-0">
                  <div class="border-b border-black py-4"></div>
                  <div
                    v-for="(category, index) in categories"
                    :key="index"
                    class="flex justify-between items-center py-4 border-b border-black last:border-b-0"
                  >
                    <span
                      class="text-lg md:text-xl lg:text-2xl font-normal text-[#757575] font-[Poppins]"
                    >
                      {{ category.name }}
                    </span>
                    <span
                      class="text-lg md:text-xl lg:text-2xl font-normal text-[#757575] font-[Poppins]"
                    >
                      [{{ String(category.count).padStart(2, "0") }}]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Posts Section -->
          <div class="mb-8">
            <div
              class="bg-white border border-[#757575] border-opacity-80 rounded-3xl shadow-lg"
            >
              <div class="p-6 md:p-8">
                <h2
                  class="text-2xl md:text-3xl font-bold text-[#205172] font-[Poppins] mb-6"
                >
                  Recent Posts
                </h2>

                <div class="space-y-6">
                  <div
                    v-for="recentPost in recentPosts"
                    :key="recentPost._id"
                    class="flex gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                    @click="navigateToPost(recentPost._id)"
                  >
                    <div class="w-32 md:w-36 h-20 md:h-24 flex-shrink-0">
                      <img
                        :src="
                          recentPost.imageUrl || '/images/blog-placeholder.png'
                        "
                        :alt="recentPost.title"
                        class="w-full h-full object-cover rounded-lg"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="flex-1 flex flex-col justify-between">
                      <h3
                        class="text-lg md:text-xl lg:text-2xl font-bold text-black font-[Poppins] leading-tight mb-3 line-clamp-2"
                      >
                        {{ recentPost.title }}
                      </h3>
                      <button
                        class="bg-[#205172] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#1e4357] transition-colors self-start"
                        @click.stop="navigateToPost(recentPost._id)"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 order-1 lg:order-2">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center min-h-96">
            <div class="text-center">
              <div class="text-6xl mb-4 opacity-50">📄</div>
              <h3 class="text-2xl font-semibold text-gray-600">
                Loading post...
              </h3>
            </div>
          </div>

          <!-- Error State -->
          <div
            v-else-if="error"
            class="flex justify-center items-center min-h-96"
          >
            <div class="text-center">
              <div class="text-6xl mb-4 opacity-50">❌</div>
              <h3 class="text-2xl font-semibold text-gray-600 mb-2">
                Post not found
              </h3>
              <p class="text-gray-600 mb-4">
                The blog post you're looking for doesn't exist.
              </p>
              <button
                @click="$router.push('/blog')"
                class="bg-[#205172] text-white px-6 py-2 rounded-lg hover:bg-[#1e4357] transition-colors"
              >
                Back to Blogs
              </button>
            </div>
          </div>

          <!-- Post Content -->
          <article v-else-if="post">
            <!-- Post Header -->
            <header class="mb-8">
              <!-- Title -->
              <div v-if="editingField === 'title'" class="mb-8">
                <input
                  v-model="editedValue"
                  class="w-full text-4xl md:text-6xl lg:text-8xl font-bold text-[#183E57] font-[Poppins] border-b border-gray-300 p-2"
                  @keyup.enter="submitEdit('title')"
                  @keyup.esc="editingField = null"
                  autofocus
                />
                <div class="flex gap-2 mt-2">
                  <button
                    @click="submitEdit('title')"
                    class="bg-green-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    @click="editingField = null"
                    class="bg-gray-200 px-4 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <h1
                  class="text-4xl md:text-6xl lg:text-8xl font-bold text-[#183E57] font-[Poppins] leading-tight mb-8"
                >
                  {{ post.title }}
                </h1>
                <button
                  v-if="canEdit"
                  @click="startEdit('title', post.title)"
                  class="text-blue-600 text-sm mb-8"
                >
                  Edit
                </button>
              </div>

              <!-- Meta Information -->
              <div class="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
                <!-- Author -->
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center"
                  >
                    <span class="text-sm">👤</span>
                  </div>
                  <div
                    v-if="editingField === 'author'"
                    class="flex items-center gap-2"
                  >
                    <input
                      v-model="editedValue"
                      class="text-lg md:text-xl font-bold text-[#767272] font-[Poppins] border-b border-gray-300 p-1"
                      @keyup.enter="submitEdit('author')"
                      @keyup.esc="editingField = null"
                      autofocus
                    />
                    <button
                      @click="submitEdit('author')"
                      class="text-green-600 text-sm"
                    >
                      Save
                    </button>
                    <button
                      @click="editingField = null"
                      class="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <span
                      class="text-lg md:text-xl font-bold text-[#767272] font-[Poppins]"
                    >
                      {{ post.author || "Anonymous" }}
                    </span>
                    <button
                      v-if="canEdit"
                      @click="startEdit('author', post.author)"
                      class="text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <!-- Date -->
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center"
                  >
                    <span class="text-sm">📅</span>
                  </div>
                  <div
                    v-if="editingField === 'createdAt'"
                    class="flex items-center gap-2"
                  >
                    <input
                      type="datetime-local"
                      v-model="editedStartDate"
                      class="text-lg md:text-xl font-bold text-[#767272] font-[Poppins] border-b border-gray-300 p-1"
                    />
                    <button @click="saveDate" class="text-green-600 text-sm">
                      Save
                    </button>
                    <button
                      @click="editingField = null"
                      class="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <span
                      class="text-lg md:text-xl font-bold text-[#767272] font-[Poppins]"
                    >
                      {{ formatDate(post.createdAt) }}
                    </span>
                    <button
                      v-if="canEdit"
                      @click="startDateEdit"
                      class="text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <!-- Comments -->
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center"
                  >
                    <span class="text-sm">💬</span>
                  </div>
                  <span
                    class="text-lg md:text-xl font-bold text-[#767272] font-[Poppins]"
                  >
                    {{ formatComments(post.comments || 4) }}
                  </span>
                </div>
              </div>
            </header>

            <!-- Hero Image -->
            <div
              class="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8"
            >
              <img
                :src="post.imageUrl || '/images/blog-placeholder.png'"
                :alt="post.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>

            <!-- Post Content -->
            <div class="prose prose-lg max-w-none mb-12">
              <div v-if="editingField === 'content'" class="mb-6">
                <textarea
                  v-model="editedValue"
                  class="w-full min-h-[300px] p-3 border border-gray-300 rounded-lg text-lg md:text-xl lg:text-2xl font-light text-black font-[Poppins] leading-relaxed"
                  @keyup.esc="editingField = null"
                  autofocus
                ></textarea>
                <div class="flex justify-end gap-2 mt-2">
                  <button
                    @click="submitEdit('content')"
                    class="bg-green-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    @click="editingField = null"
                    class="bg-gray-200 px-4 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div v-else class="mb-6">
                <div
                  class="text-lg md:text-xl lg:text-2xl font-light text-black font-[Poppins] leading-relaxed space-y-6"
                  v-html="formatPostContent(post.body)"
                ></div>
                <button
                  v-if="canEdit"
                  @click="startEdit('content', post.content)"
                  class="text-blue-600 text-sm mt-2"
                >
                  Edit Content
                </button>
              </div>
            </div>

            <!-- Comments Section -->
            <section class="border-t border-gray-200 pt-8">
              <h2
                class="text-2xl md:text-3xl font-bold text-black font-[Poppins] mb-6"
              >
                Comments
              </h2>

              <!-- Comment Form -->
              <div class="mb-8">
                <div
                  class="flex items-center gap-4 p-4 border-2 border-[#757575] rounded-lg"
                >
                  <input
                    v-model="newComment"
                    type="text"
                    placeholder="Add a comment..."
                    class="flex-1 text-lg font-light text-black font-[Poppins] border-none outline-none bg-transparent"
                    @keyup.enter="submitComment"
                  />
                  <button
                    @click="submitComment"
                    class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M44 4L22 26M44 4L30 44L22 26M44 4L4 18L22 26"
                        stroke="#205172"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Comments List -->
              <div class="space-y-4">
                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="bg-gray-50 p-4 rounded-lg"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                    >
                      {{ comment.author.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-bold text-black font-[Poppins]">{{
                      comment.author
                    }}</span>
                    <span class="text-sm text-gray-500">{{
                      formatDate(comment.date)
                    }}</span>
                  </div>
                  <p class="text-gray-700 font-[Poppins]">
                    {{ comment.content }}
                  </p>
                </div>
              </div>

              <!-- Empty Comments State -->
              <div v-if="comments.length === 0" class="text-center py-8">
                <p class="text-gray-500 font-[Poppins]">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            </section>
          </article>
        </main>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SearchBar from "../components/SearchBar.vue";
import { useAuthStore } from "../store/auth.store.js";
import axiosInstance from "../utils/axiosInstance.js";

export default {
  name: "BlogDetail",
  components: {
    Header,
    Footer,
    SearchBar,
  },
  data() {
    return {
      post: null,
      recentPosts: [],
      categories: [
        { name: "Tech News", count: 3 },
        { name: "Tech News", count: 3 },
        { name: "Tech News", count: 3 },
        { name: "Tech News", count: 3 },
        { name: "Tech News", count: 3 },
      ],
      comments: [],
      newComment: "",
      searchQuery: "",
      loading: true,
      error: false,
      editingField: null,
      editedValue: "",
      editedStartDate: "",
      editedEndDate: "",
    };
  },

  computed: {
    canEdit() {
      const { state } = useAuthStore();
      return (
        state.user &&
        (state.user.role === "admin" || state.user.role === "member")
      );
    },
  },

  methods: {
    // Load post data
    async loadPost() {
      try {
        const postId = this.$route.params.id;
        if (postId) {
          const response = await axios.get(
            `http://localhost:8000/api/posts/${postId}`
          );
          this.post = response.data;
        }
      } catch (err) {
        console.error("Error loading post:", err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    // Load recent posts
    async loadRecentPosts() {
      try {
        const response = await axios.get("http://localhost:8000/api/posts");
        // Get latest 3 posts excluding current post
        this.recentPosts = response.data
          .filter((p) => p._id !== this.$route.params.id)
          .slice(0, 3);
      } catch (err) {
        console.error("Error loading recent posts:", err);
      }
    },

    // Initialize mock comments
    initializeComments() {
      this.comments = [
        {
          id: 1,
          author: "John Doe",
          content: "Great article! Very insightful.",
          date: new Date().toISOString(),
        },
        {
          id: 2,
          author: "Jane Smith",
          content: "Thanks for sharing this. Really helpful.",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
    },

    // Format functions
    formatDate(date) {
      if (!date) return "";
      try {
        return new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch (error) {
        return date;
      }
    },

    formatComments(count) {
      if (!count && count !== 0) return "04 Comments";
      return `${String(count).padStart(2, "0")} Comments`;
    },

    formatPostContent(content) {
      if (!content) return "";
      // Convert line breaks to paragraphs
      return content
        .split("\n\n")
        .map((paragraph) => `<p class="mb-6">${paragraph.trim()}</p>`)
        .join("");
    },

    // Event handlers
    handleSearch(query) {
      this.searchQuery = query;
      // Navigate to blog page with search query
      this.$router.push({ path: "/blog", query: { search: query } });
    },

    navigateToPost(postId) {
      this.$router.push(`/blog/${postId}`);
    },

    submitComment() {
      if (this.newComment.trim()) {
        const comment = {
          id: Date.now(),
          author: "Anonymous User", // In real app, get from auth store
          content: this.newComment.trim(),
          date: new Date().toISOString(),
        };
        this.comments.unshift(comment);
        this.newComment = "";
      }
    },

    handleImageError(event) {
      event.target.src = "/images/blog-placeholder.png";
    },

    startEdit(field, value) {
      this.editingField = field;
      this.editedValue = value;
    },

    async submitEdit(field) {
      try {
        const update = {
          [field]: this.editedValue,
        };
        await axiosInstance.put(`/posts/${this.post._id}`, update);
        this.post[field] = this.editedValue;
        this.editingField = null;
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },

    startDateEdit() {
      this.editingField = "date";
      this.editedStartDate = this.formatDateForInput(this.post.dateStart);
      this.editedEndDate = this.post.dateEnd
        ? this.formatDateForInput(this.post.dateEnd)
        : "";
    },
    formatDateForInput(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      // Format as YYYY-MM-DDTHH:mm for datetime-local input
      return date.toISOString().slice(0, 16);
    },
    async saveDate() {
      try {
        const update = {
          dateStart: new Date(this.editedStartDate).toISOString(),
          dateEnd: this.editedEndDate
            ? new Date(this.editedEndDate).toISOString()
            : null,
        };

        await axiosInstance.put(`/posts/${this.post._id}`, update);
        this.post.dateStart = this.editedStartDate;
        this.post.dateEnd = this.editedEndDate;
        this.editingField = null;
      } catch (error) {
        console.error("Error updating post date:", error);
      }
    },
  },
  created() {
    this.loadPost();
    this.loadRecentPosts();
    this.initializeComments();
  },
  watch: {
    "$route.params": {
      handler() {
        this.loadPost();
        window.scrollTo(0, 0);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose p {
  margin-bottom: 1.5rem;
}
</style>
