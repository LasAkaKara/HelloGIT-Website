<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <router-link
        to="/"
        class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← Back to site
      </router-link>
    </div>

    <!-- User Management Section -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-700">User Management</h2>
        <div class="space-x-2">
          <button
            @click="showInviteModal = true"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Invite User
          </button>
          <button
            @click="syncPosts"
            :disabled="syncingPosts"
            class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!syncingPosts">Sync Posts</span>
            <span v-else class="flex items-center"> Syncing... </span>
          </button>
          <button
            v-if="!loading"
            @click="fetchUsers"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- Error Message -->
      <div
        v-else-if="error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
      >
        <p>{{ error }}</p>
        <button
          @click="fetchUsers"
          class="mt-2 text-sm text-red-600 hover:underline"
        >
          Try again
        </button>
      </div>

      <!-- Success Message for Sync -->
      <div
        v-if="syncSuccess"
        class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
      >
        <p>Posts synced successfully!</p>
      </div>

      <!-- Error Message for Sync -->
      <div
        v-if="syncError"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
      >
        <p>{{ syncError }}</p>
      </div>

      <!-- Users Table -->
      <div v-else-if="users.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="editingUser && editingUser._id === user._id">
                  <input
                    v-model="editingUser.name"
                    class="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div v-else class="text-sm font-medium text-gray-900">
                  {{ user.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                    'bg-green-100 text-green-800': user.role === 'admin',
                    'bg-blue-100 text-blue-800': user.role === 'member',
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  v-if="editingUser && editingUser._id === user._id"
                  @click="saveUser(user._id)"
                  class="text-green-600 hover:text-green-900 mr-4"
                  :disabled="saving"
                >
                  <span v-if="saving">Saving...</span>
                  <span v-else>Save</span>
                </button>
                <button
                  v-else
                  @click="startEdit(user)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="
                    editingUser !== null || currentUser.id === user._id
                  "
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(user)"
                  class="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="
                    deletingUser === user._id || currentUser.id === user._id
                  "
                >
                  <span v-if="deletingUser === user._id">Deleting...</span>
                  <span v-else>Delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12 text-gray-500">
        <p>No users found</p>
      </div>
    </div>
  </div>

  <!-- Invite User Modal -->
  <div
    v-if="showInviteModal"
    class="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">Invite New User</h3>

      <form @submit.prevent="sendInvite">
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            v-model="inviteEmail"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="user@example.com"
          />
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeInviteModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            :disabled="sendingInvite"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            :disabled="sendingInvite || !inviteEmail"
          >
            <span v-if="sendingInvite">Sending...</span>
            <span v-else>Send Invite</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth.store";
import axiosInstance from "../utils/axiosInstance.js";

export default {
  name: "AdminDashboard",
  data() {
    return {
      users: [],
      loading: true,
      error: null,
      editingUser: null,
      saving: false,
      deletingUser: null,
      showInviteModal: false,
      inviteEmail: "",
      sendingInvite: false,
      syncingPosts: false,
      syncError: null,
      syncSuccess: false,
    };
  },
  computed: {
    currentUser() {
      const { state } = useAuthStore();
      console.log(state.user);
      return state.user;
    },
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosInstance.get("/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        this.error = "Failed to load users. Please try again.";
        if (error.response?.status === 401) {
          this.authStore.logout();
          this.$router.push("/login");
        }
      } finally {
        this.loading = false;
      }
    },

    startEdit(user) {
      this.editingUser = { ...user };
      console.log(this.editingUser);
      console.log(this.currentUser.id === this.editingUser._id);
    },

    cancelEdit() {
      this.editingUser = null;
    },

    closeInviteModal() {
      this.showInviteModal = false;
      this.inviteEmail = "";
    },

    async sendInvite() {
      if (!this.inviteEmail) return;

      this.sendingInvite = true;
      try {
        await axiosInstance.post("/auth/invite", { email: this.inviteEmail });
        alert("Invitation sent successfully!");
        this.closeInviteModal();
      } catch (error) {
        console.error("Error sending invite:", error);
        alert(
          error.response?.data?.message ||
            "Failed to send invitation. Please try again."
        );
      } finally {
        this.sendingInvite = false;
      }
    },

    async saveUser(userId) {
      if (!this.editingUser?.name?.trim()) return;

      this.saving = true;
      try {
        const response = await axiosInstance.put(`/users/${userId}`, {
          name: this.editingUser.name,
        });

        // Update the user in the local state
        const index = this.users.findIndex((u) => u._id === userId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...response.data };
        }
        this.editingUser = null;
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user. Please try again.");
      } finally {
        this.saving = false;
      }
    },

    confirmDelete(user) {
      if (
        confirm(
          `Are you sure you want to delete ${user.name}? This action cannot be undone.`
        )
      ) {
        this.deleteUser(user._id);
      }
    },

    async deleteUser(userId) {
      this.deletingUser = userId;
      try {
        await axiosInstance.delete(`/users/${userId}`);
        // Remove the user from the local state
        this.users = this.users.filter((user) => user._id !== userId);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
        if (error.response?.status === 401) {
          this.authStore.logout();
          this.$router.push("/login");
        }
      } finally {
        this.deletingUser = null;
      }
    },

    async syncPosts() {
      this.syncingPosts = true;
      this.syncError = null;
      this.syncSuccess = false;

      try {
        const response = await axiosInstance.get("/sync_posts");
        if (response.status === 200) {
          this.syncSuccess = true;
          // Show success message for 3 seconds
          setTimeout(() => {
            this.syncSuccess = false;
          }, 3000);
        }
      } catch (error) {
        console.error("Error syncing posts:", error);
        this.syncError =
          error.response?.data?.message ||
          "Failed to sync posts. Please try again.";
      } finally {
        this.syncingPosts = false;
      }
    },
  },
};
</script>
