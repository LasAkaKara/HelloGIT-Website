<template>
  <div class="min-h-screen bg-white">
    <Header />

    <!-- Page Breadcrumb -->
    <div class="w-full bg-white pt-6 pb-4">
      <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <p class="text-lg md:text-xl font-normal text-black font-[Poppins]">
          Home / Events
        </p>
      </div>
    </div>

    <!-- Page Header Section -->
    <div class="w-full bg-white pb-8">
      <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div
          class="flex flex-col lg:flex-row items-start justify-between gap-8"
        >
          <!-- Left side - Month -->
          <div class="flex-shrink-0">
            <h1
              class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-[Poppins] leading-tight"
            >
              {{ formatMonth() }}
            </h1>
          </div>

          <!-- Right side - Event Title -->
          <div
            v-if="editingField === 'title'"
            class="flex-1 text-center lg:text-right"
          >
            <input
              type="text"
              v-model="editedValue"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <button
              @click="submitEdit('title')"
              class="bg-green-600 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button @click="editingField = null" class="text-sm text-gray-500">
              Cancel
            </button>
          </div>
          <div v-else class="flex-1 text-center lg:text-right">
            <h1
              class="text-4xl md:text-6xl lg:text-8xl font-bold text-[#183E57] font-[Poppins] leading-tight"
            >
              {{ event.title }}
            </h1>
            <button
              v-show="canEdit"
              @click="startEdit('title', event.title)"
              class="ml-2 text-blue-600 text-4xl"
            >
              edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <!-- Left Sidebar -->
          <div class="w-full lg:w-96 lg:flex-shrink-0">
            <!-- Search Bar -->
            <div class="mb-6">
              <SearchBar
                v-model="searchQuery"
                placeholder="Search events"
                @search="handleSearch"
              />
            </div>

            <!-- Event Info Card -->
            <div
              class="bg-white border-2 border-[#C7D3DB] rounded-3xl p-6 lg:p-8 mb-6"
            >
              <!-- Date & Time -->
              <div class="flex items-start gap-4 mb-6">
                <div
                  class="w-7 h-7 mt-1 flex-shrink-0 bg-gray-300 rounded flex items-center justify-center"
                >
                  <span class="text-sm">📅</span>
                </div>
                <div class="flex-1">
                  <div v-if="editingField === 'date'" class="space-y-3">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Start Date & Time</label
                      >
                      <input
                        type="datetime-local"
                        v-model="editedStartDate"
                        class="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >End Date & Time (Optional)</label
                      >
                      <input
                        type="datetime-local"
                        v-model="editedEndDate"
                        class="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div class="flex space-x-2">
                      <button
                        @click="saveDate"
                        class="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        @click="editingField = null"
                        class="bg-gray-200 px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <h3
                      class="text-lg md:text-xl lg:text-2xl font-bold text-black font-[Poppins] leading-tight cursor-pointer"
                      @dblclick="startDateEdit"
                    >
                      {{ formatEventDateTime() }}
                      <span
                        v-show="canEdit"
                        class="text-blue-600 text-sm ml-2"
                        @click.stop="startDateEdit"
                      >
                        Edit
                      </span>
                    </h3>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start gap-4">
                <div
                  class="w-7 h-7 mt-1 flex-shrink-0 bg-gray-300 rounded flex items-center justify-center"
                >
                  <span class="text-sm">📍</span>
                </div>
                <div class="flex-1">
                  <div
                    v-if="editingField === 'location'"
                    class="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      v-model="editedValue"
                      class="flex-1 p-2 border border-gray-300 rounded text-lg md:text-xl font-bold text-black font-[Poppins]"
                      placeholder="Enter location"
                    />
                    <div class="flex space-x-1">
                      <button
                        @click="submitEdit('location')"
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
                  </div>
                  <div v-else>
                    <h3
                      class="text-lg md:text-xl font-bold text-black font-[Poppins] mb-2 cursor-pointer"
                      @dblclick="
                        startEdit(
                          'location',
                          event.location ||
                            'IT Innovation Lab, Greenwich VN - HCM Campus'
                        )
                      "
                    >
                      {{
                        event.location ||
                        "IT Innovation Lab, Greenwich VN - HCM Campus"
                      }}
                      <span
                        v-show="canEdit"
                        class="text-blue-600 text-sm ml-2"
                        @click.stop="
                          startEdit(
                            'location',
                            event.location ||
                              'IT Innovation Lab, Greenwich VN - HCM Campus'
                          )
                        "
                      >
                        Edit
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map placeholder -->
            <div
              class="w-full h-64 lg:h-72 bg-gray-200 rounded-b-3xl overflow-hidden flex items-center justify-center"
            >
              <div class="text-center">
                <div class="text-4xl mb-2">🗺️</div>
                <p class="text-gray-600">Map View</p>
              </div>
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="flex-1">
            <!-- Event Host Info -->
            <div class="mb-6 pb-6 border-b border-black">
              <div class="flex items-center gap-4">
                <div
                  class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
                >
                  H
                </div>
                <div
                  v-if="editingField === 'host'"
                  class="flex items-center flex-1"
                >
                  <input
                    type="text"
                    v-model="editedValue"
                    class="text-lg md:text-xl lg:text-2xl font-normal text-[#767272] font-[Poppins] border-b border-gray-300 px-2 py-1 mr-2 flex-1"
                  />
                  <div class="flex space-x-2">
                    <button
                      @click="submitEdit('host')"
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
                </div>
                <div v-else class="flex items-center flex-1">
                  <span
                    class="text-lg md:text-xl lg:text-2xl font-normal text-[#767272] font-[Poppins]"
                  >
                    {{ event.host || "HelloGIT" }}
                  </span>
                  <button
                    v-show="canEdit"
                    @click="startEdit('host', event.host || 'HelloGIT')"
                    class="ml-2 text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <!-- Hero Image -->
            <div class="w-full aspect-video rounded-3xl overflow-hidden mb-8">
              <img
                :src="event.imageUrl || '/images/event_placeholder.png'"
                :alt="event.title || 'Event Image'"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>

            <!-- Event Details -->
            <div class="mb-12">
              <h2
                class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-[Poppins] mb-6"
              >
                Details
              </h2>
              <div class="prose prose-lg max-w-none">
                <div v-if="editingField === 'fullDesc'" class="mb-4">
                  <textarea
                    v-model="editedValue"
                    class="w-full p-3 border border-gray-300 rounded-lg text-lg md:text-xl lg:text-2xl font-normal text-black font-[Poppins] leading-relaxed min-h-[200px]"
                  ></textarea>
                  <div class="flex justify-end space-x-2 mt-2">
                    <button
                      @click="submitEdit('fullDesc')"
                      class="bg-green-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      @click="editingField = null"
                      class="bg-gray-200 px-4 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div v-else>
                  <p
                    class="text-lg md:text-xl lg:text-2xl font-normal text-black font-[Poppins] leading-relaxed mb-6 whitespace-pre-line"
                    :class="{ 'cursor-pointer': canEdit }"
                    @dblclick="startEdit('fullDesc', event.fullDesc)"
                  >
                    {{ event.fullDesc }}
                  </p>
                  <button
                    v-show="canEdit"
                    @click="startEdit('fullDesc', event.fullDesc)"
                    class="text-blue-600 text-sm -mt-4 mb-6 block"
                  >
                    Edit Description
                  </button>
                </div>
              </div>
            </div>

            <!-- Event Banner Image -->
            <div
              class="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-12 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <div class="text-6xl mb-4">🎥</div>
                <h3 class="text-2xl font-bold">Workshop Banner</h3>
              </div>
            </div>

            <!-- Attendees Section -->
            <div class="mb-12">
              <h2
                class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-[Poppins] mb-8"
              >
                Attendees ({{ attendeesCount }})
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Host Card -->
                <div class="relative">
                  <!-- Host Badge -->
                  <div
                    class="absolute -top-2 left-4 z-10 bg-[#205172] text-white px-3 py-1 rounded-lg"
                  >
                    <span class="text-lg md:text-xl font-bold font-[Poppins]"
                      >Host</span
                    >
                  </div>

                  <div
                    class="bg-white border-2 border-[#E1E1E1] rounded-3xl p-6 pt-8"
                  >
                    <div
                      class="w-24 h-24 mx-auto mb-4 bg-[#F6F7F8] border border-[#E1E1E1] rounded-full flex items-center justify-center overflow-hidden"
                    >
                      <div
                        class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                      >
                        H
                      </div>
                    </div>
                    <h3
                      class="text-lg md:text-xl font-bold text-black font-[Poppins] text-center mb-2"
                    >
                      HelloGIT
                    </h3>
                    <p
                      class="text-lg md:text-xl font-normal text-black font-[Poppins] text-center"
                    >
                      Organizer
                    </p>
                  </div>
                </div>

                <!-- Attendee Cards -->
                <div class="bg-white border-2 border-[#E1E1E1] rounded-3xl p-6">
                  <div
                    class="w-24 h-24 mx-auto mb-4 bg-[#F6F7F8] border border-[#E1E1E1] rounded-full flex items-center justify-center overflow-hidden"
                  >
                    <div
                      class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    >
                      M
                    </div>
                  </div>
                  <h3
                    class="text-lg md:text-xl font-bold text-black font-[Poppins] text-center mb-2"
                  >
                    HelloGIT
                  </h3>
                  <p
                    class="text-lg md:text-xl font-normal text-black font-[Poppins] text-center"
                  >
                    Member
                  </p>
                </div>

                <div class="bg-white border-2 border-[#E1E1E1] rounded-3xl p-6">
                  <div
                    class="w-24 h-24 mx-auto mb-4 bg-[#F6F7F8] border border-[#E1E1E1] rounded-full flex items-center justify-center overflow-hidden"
                  >
                    <div
                      class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    >
                      M
                    </div>
                  </div>
                  <h3
                    class="text-lg md:text-xl font-bold text-black font-[Poppins] text-center mb-2"
                  >
                    HelloGIT
                  </h3>
                  <p
                    class="text-lg md:text-xl font-normal text-black font-[Poppins] text-center"
                  >
                    Member
                  </p>
                </div>

                <!-- More Attendees Card -->
                <div
                  class="bg-white border-2 border-[#E1E1E1] rounded-3xl p-6 relative"
                >
                  <div
                    class="w-24 h-24 mx-auto mb-4 bg-[#F6F7F8] border border-[#E1E1E1] rounded-full flex items-center justify-center overflow-hidden relative"
                  >
                    <!-- Blurred background avatars -->
                    <div
                      class="absolute inset-0 flex items-center justify-center opacity-30"
                    >
                      <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div
                        class="w-12 h-12 bg-gray-400 rounded-full -ml-6"
                      ></div>
                    </div>
                    <!-- Main count -->
                    <span
                      class="text-2xl md:text-3xl lg:text-4xl font-bold text-black font-[Poppins] relative z-10"
                    >
                      +43
                    </span>
                  </div>
                  <p
                    class="text-lg md:text-xl font-bold text-[#205172] font-[Poppins] text-center"
                  >
                    + 43 more
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Events Section -->
    <div class="w-full bg-white border-t border-black py-12">
      <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-[Poppins] mb-8"
        >
          Latest Events
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardEvent
            v-for="latestEvent in latestEvents"
            :key="latestEvent.id"
            :event-data="latestEvent"
            :clickable="true"
            @click="handleEventClick"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-[#7C7C7D] shadow-lg z-50"
    >
      <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <!-- Event Info -->
          <div class="flex-1 text-center md:text-left">
            <p
              class="text-lg md:text-xl font-normal text-black font-[Poppins] mb-1"
            >
              SAT, DEC 28 | 15:30 - 16:30
            </p>
            <h3 class="text-lg md:text-xl font-bold text-black font-[Poppins]">
              Open Day
            </h3>
          </div>

          <!-- Price -->
          <div class="text-center">
            <p class="text-lg md:text-xl font-bold text-black font-[Poppins]">
              FREE
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              class="flex items-center gap-2 px-6 py-3 bg-[#E1E1E1] rounded-3xl hover:bg-gray-300 transition-colors"
            >
              <span
                class="text-lg md:text-xl font-medium text-black font-[Poppins]"
                >Share</span
              >
              <span class="text-lg">🔗</span>
            </button>

            <button
              class="px-6 py-3 bg-[#349C9D] text-white rounded-3xl hover:bg-[#2a7d7e] transition-colors"
            >
              <span class="text-lg md:text-xl font-medium font-[Poppins]"
                >Attend</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom spacing for fixed bar -->
    <div class="h-32"></div>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SearchBar from "../components/SearchBar.vue";
import CardEvent from "../components/CardEvent.vue";
import { useAuthStore } from "../store/auth.store.js";
import axiosInstance from "../utils/axiosInstance.js";

export default {
  name: "EventDetail",
  components: {
    Header,
    Footer,
    SearchBar,
    CardEvent,
  },
  data() {
    return {
      event: {},
      latestEvents: [],
      loading: true,
      searchQuery: "",
      attendeesCount: 45,
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

  mounted() {
    this.loadEvent();
    this.loadLatestEvents();
  },

  watch: {
    "$route.params": {
      handler() {
        this.loadEvent();
        window.scrollTo(0, 0);
      },
      immediate: true,
    },
  },

  methods: {
    async loadEvent() {
      try {
        const eventId = this.$route.params.id;
        if (eventId) {
          const response = await axios.get(
            `http://localhost:8000/api/events/${eventId}`
          );
          this.event = response.data;
        }
      } catch (error) {
        console.error("Error loading event:", error);
        this.$router.push("/event");
      } finally {
        this.loading = false;
      }
    },
    async loadLatestEvents() {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        this.latestEvents = response.data
          .filter((e) => e._id !== this.$route.params.id)
          .slice(0, 3)
          .map((e) => ({ ...e, id: e._id, eventData: e }));
      } catch (error) {
        console.error("Error loading latest events:", error);
      }
    },
    formatMonth() {
      if (!this.event.dateStart) return "December";
      try {
        return new Date(this.event.dateStart).toLocaleDateString("en-US", {
          month: "long",
        });
      } catch (_) {
        return "December";
      }
    },
    formatEventDateTime() {
      if (!this.event.dateStart) {
        return "Saturday, December 28, 2024 from 15:30 to 16:30";
      }
      try {
        const startDate = new Date(this.event.dateStart);
        const endDate = this.event.dateEnd
          ? new Date(this.event.dateEnd)
          : startDate;
        const dayName = startDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const fullDate = startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const startTime = startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const endTime = endDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return `${dayName}, ${fullDate} from ${startTime} to ${endTime}`;
      } catch (_) {
        return "Saturday, December 28, 2024 from 15:30 to 16:30";
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    handleEventClick(eventData) {
      this.$router.push(`/event/${eventData.id}`);
    },
    handleImageError(e) {
      e.target.src = "/images/event_placeholder.png";
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
        await axiosInstance.put(`/events/${this.event._id}`, update);
        this.event[field] = this.editedValue;
        this.editingField = null;
      } catch (error) {
        console.error("Error updating event:", error);
      }
    },
    startDateEdit() {
      this.editingField = "date";
      this.editedStartDate = this.formatDateForInput(this.event.dateStart);
      this.editedEndDate = this.event.dateEnd
        ? this.formatDateForInput(this.event.dateEnd)
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

        await axiosInstance.put(`/events/${this.event._id}`, update);

        // Update local state
        this.event.dateStart = update.dateStart;
        this.event.dateEnd = update.dateEnd;
        this.editingField = null;
      } catch (error) {
        console.error("Error updating event date:", error);
      }
    },
  },
};
</script>
