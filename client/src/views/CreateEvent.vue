<template>
  <div class="min-h-screen bg-white">
    <Header />

    <section class="max-w-3xl mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold mb-6" style="font-family: Poppins">
        Create Event
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col gap-2">
          <label class="font-medium">Title</label>
          <input v-model="form.title" type="text" class="input" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium">Short Description</label>
          <textarea
            v-model="form.shortDesc"
            rows="2"
            class="input"
            required
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium">Full Description</label>
          <textarea v-model="form.fullDesc" rows="4" class="input"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium">Start Date</label>
            <input
              v-model="form.dateStart"
              type="datetime-local"
              class="input"
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium">End Date</label>
            <input v-model="form.dateEnd" type="datetime-local" class="input" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium">Location</label>
          <input v-model="form.location" type="text" class="input" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium">Host</label>
          <input v-model="form.host" type="text" class="input" required />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium">Image URL</label>
          <input v-model="form.imageUrl" type="text" class="input" />
        </div>

        <div class="pt-4">
          <button :disabled="loading" class="btn">
            {{ loading ? "Creating..." : "Create Event" }}
          </button>
        </div>
      </form>

      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-4">
        Event created successfully!
      </p>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useAuthStore } from "../store/auth.store.js";

const router = useRouter();
const { state } = useAuthStore();

const form = reactive({
  title: "",
  shortDesc: "",
  fullDesc: "",
  dateStart: "",
  dateEnd: "",
  location: "",
  host: "",
  imageUrl: "",
});

const loading = ref(false);
const error = ref("");
const success = ref(false);

const handleSubmit = async () => {
  error.value = "";
  success.value = false;
  loading.value = true;

  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8000/api/events", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    success.value = true;
    // redirect to Events list after a short delay
    setTimeout(() => router.push("/event"), 1000);
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.msg || "Failed to create event";
  } finally {
    loading.value = false;
  }
};
</script>
