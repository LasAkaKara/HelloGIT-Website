<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p v-if="inviteEmail" class="mt-2 text-center text-sm text-gray-600">
          You've been invited to join as {{ inviteEmail }}
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Full Name</label
            >
            <input
              id="name"
              v-model="formData.name"
              name="name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only"
              >Confirm Password</label
            >
            <input
              id="confirm-password"
              v-model="formData.confirmPassword"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span
              v-if="loading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <svg
                class="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ loading ? "Creating Account..." : "Create Account" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

export default {
  name: "RegisterView",
  data() {
    return {
      loading: false,
      error: "",
      inviteToken: "",
      inviteEmail: "",
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  created() {
    this.checkInviteToken();
  },
  methods: {
    checkInviteToken() {
      const token = this.$route.query.token;
      if (token) {
        this.inviteToken = token;
        try {
          const decoded = jwtDecode(token);
          if (decoded.email) {
            this.formData.email = decoded.email;
            this.inviteEmail = decoded.email;
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          this.error = "Invalid or expired invitation link";
        }
      } else {
        this.error = "No invitation token found";
      }
    },
    async handleRegister() {
      // Basic validation
      if (this.formData.password !== this.formData.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }

      if (this.formData.password.length < 6) {
        this.error = "Password must be at least 6 characters";
        return;
      }

      try {
        this.loading = true;
        this.error = "";

        const payload = {
          name: this.formData.name,
          password: this.formData.password,
          token: this.inviteToken,
        };

        if (!payload.token) {
          throw new Error("No invitation token found");
        }

        const response = await axiosInstance.post("/auth/register", payload);

        if (response.status === 201) {
          this.$router.push("/login");
        }
      } catch (err) {
        console.error("Registration error:", err);
        this.error = err.response?.data?.message || "Registration failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
