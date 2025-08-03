<template>
  <div class="min-h-screen bg-white">
    <Header />

    <section class="max-w-3xl mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold mb-6" style="font-family: Poppins">
        Create Blog Post
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Title</label>
          <input v-model="form.title" type="text" class="input" required />
        </div>

        <!-- Summary -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Summary</label>
          <textarea
            v-model="form.summary"
            rows="2"
            class="input"
            required
            placeholder="A brief summary of your blog post"
          ></textarea>
        </div>

        <!-- Body Content -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Content</label>
          <textarea
            v-model="form.body"
            rows="8"
            class="input"
            required
            placeholder="Write your blog post content here..."
          ></textarea>
        </div>

        <!-- Author -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Author</label>
          <input v-model="form.author" type="text" class="input" required />
        </div>

        <!-- Category -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Category</label>
          <select v-model="form.category" class="input" required>
            <option value="" disabled>Select a category</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Publish Date -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Publish Date</label>
          <input
            v-model="form.date"
            type="datetime-local"
            class="input"
            required
          />
        </div>

        <!-- Image URL -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Featured Image URL</label>
          <input v-model="form.imageUrl" type="url" class="input" />
          <p class="text-sm text-gray-500">
            Leave empty to use the default blog image
          </p>
        </div>

        <!-- Status -->
        <div class="flex flex-col gap-2">
          <label class="font-medium">Status</label>
          <select v-model="form.status" class="input" required>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div class="pt-4 flex justify-between items-center">
          <button
            type="button"
            @click="$router.go(-1)"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="btn bg-primary-blue hover:bg-blue-700 text-white"
          >
            {{ loading ? "Publishing..." : "Publish Blog Post" }}
          </button>
        </div>
      </form>

      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-4">
        Blog post created successfully! Redirecting...
      </p>
    </section>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth.store";
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "CreateBlog",
  components: {
    Header,
    Footer,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const form = ref({
      title: "",
      summary: "",
      body: "",
      author: authStore.state.user?.name || "",
      category: "",
      date: new Date().toISOString().slice(0, 16), // Default to current date/time
      imageUrl: "",
      status: "published",
    });

    const categories = [
      "Technology",
      "Tutorial",
      "Opinion",
      "News",
      "Development",
      "Design",
      "Career",
      "Events",
    ];

    const loading = ref(false);
    const error = ref("");
    const success = ref(false);

    const handleSubmit = async () => {
      error.value = "";
      success.value = false;
      loading.value = true;

      try {
        // Convert date string to ISO format for the server
        const blogData = {
          ...form.value,
          date: new Date(form.value.date).toISOString(),
        };

        await axiosInstance.post("/posts", blogData);
        success.value = true;
        setTimeout(() => router.push("/blog"), 1000);

        success.value = true;
      } catch (err) {
        console.error("Error creating blog post:", err);
        error.value =
          err.response?.data?.message ||
          "Failed to create blog post. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      categories,
      loading,
      error,
      success,
      currentUser: authStore.state.user,
      handleSubmit,
    };
  },
};
</script>
