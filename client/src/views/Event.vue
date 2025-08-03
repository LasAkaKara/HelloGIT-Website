<template>
  <Header />

  <div class="body-container bg-white">
    <!-- Page Header -->
    <section class="flex w-full py-8 mb-6">
      <div class="flex flex-col justify-center items-start w-full gap-2">
        <p class="page-title">Events</p>
        <p class="page-subtitle">
          Where everyone meetups together and discover unique opportunities.
        </p>
      </div>
    </section>

    <!-- Create Event Button -->
    <button class="btn mb-6" v-show="isAuthorized" @click="handleCreateEvent">
      Create Event
    </button>

    <!-- Search and Filter Section -->
    <section class="w-full mb-8">
      <!-- Search and Sort Row -->
      <div class="flex flex-col md:flex-row gap-4 w-full mb-4">
        <!-- Search Bar -->
        <SearchBar
          v-model="searchQuery"
          placeholder="Search events"
          @search="handleSearch"
        />

        <!-- Sort Button -->
        <button
          @click="toggleSort"
          class="h-12 md:h-14 px-4 md:px-6 rounded-3xl border border-primary-blue flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
          :class="
            sortByDate
              ? 'bg-primary-blue text-white'
              : 'bg-white text-primary-blue'
          "
        >
          <span class="text-sm md:text-base lg:text-lg">Sort by date</span>
          <img
            src="/icons/sort.png"
            alt="sort"
            class="w-4 h-4 md:w-5 md:h-5"
            :class="{ 'rotate-180': sortByDate }"
          />
        </button>
      </div>

      <!-- Filter Dropdowns Row -->
      <div class="flex flex-wrap gap-3 w-full">
        <div class="w-full sm:w-auto flex-1 min-w-[120px]">
          <FilterDropdown
            v-model="selectedDateFilter"
            :options="dateOptions"
            :label="selectedDateFilter === 'Any day' ? 'Date' : ''"
            :icon-src="
              selectedDateFilter === 'Any day' ? '/icons/calendar.png' : ''
            "
            variant="secondary"
          />
        </div>

        <div class="w-full sm:w-auto flex-1 min-w-[120px]">
          <FilterDropdown
            v-model="selectedTypeFilter"
            :options="uniqueEventTypes"
            :label="selectedTypeFilter === 'Any type' ? 'Type' : ''"
            :icon-src="
              selectedTypeFilter === 'Any type' ? '/icons/chat.png' : ''
            "
            variant="secondary"
          />
        </div>

        <div class="w-full sm:w-auto flex-1 min-w-[120px]">
          <FilterDropdown
            v-model="selectedOrganizerFilter"
            :options="organizerOptions"
            :label="
              selectedOrganizerFilter === 'Any organizer' ? 'Organizer' : ''
            "
            :icon-src="
              selectedOrganizerFilter === 'Any organizer'
                ? '/icons/user.png'
                : ''
            "
            variant="secondary"
          />
        </div>
      </div>
    </section>

    <!-- Featured Event Section  -->
    <section class="px-8 mb-16 w-full">
      <div class="mb-4">
        <h2
          class="text-4xl font-bold text-black leading-5 m-0"
          style="font-family: Poppins"
        >
          🔥 Upcoming event
        </h2>
      </div>

      <div class="w-full flex gap-14">
        <!-- Event Image -->
        <div class="w-[50vw] h-[50vh] rounded-3xl overflow-hidden">
          <img
            src="../../public/images/event_placeholder.png"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Event Details -->
        <div class="flex flex-col justify-center gap-4 mt-15">
          <div
            class="text-3xl font-bold text-primary-navy"
            style="font-family: Poppins"
          >
            {{
              formatFeaturedDate(
                featuredEvent.date,
                featuredEvent.startTime,
                featuredEvent.endTime
              )
            }}
          </div>

          <h3
            class="text-5xl font-bold text-black m-0"
            style="font-family: Poppins; line-height: 67px"
          >
            {{ featuredEvent.name }}
          </h3>

          <div class="flex items-center gap-3 h-8">
            <img
              :src="featuredEvent.hostIcon"
              :alt="featuredEvent.hostName"
              class="w-8 h-8 object-cover"
            />
            <span
              class="text-xl font-normal text-black"
              style="font-family: Poppins"
            >
              Host by {{ featuredEvent.hostName }}
            </span>
          </div>

          <p
            class="text-xl font-normal text-black leading-7 mb-6"
            style="font-family: Poppins"
          >
            {{ featuredEvent.description }}
          </p>

          <div class="flex gap-6 mt-auto">
            <button
              @click="handleRegister(featuredEvent)"
              class="flex items-center justify-center px-6 rounded-3xl border-4 border-gray-300"
            >
              <span
                class="text-2xl font-medium text-grey"
                style="font-family: Poppins"
                >Register Now</span
              >
            </button>
            <button
              @click="handleReadMore(featuredEvent)"
              class="flex items-center justify-center px-5 rounded-3xl bg-teal-600"
            >
              <span
                class="text-2xl font-medium text-black"
                style="font-family: Poppins"
                >Read More</span
              >
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- All Events Section -->
    <section class="w-full mb-16">
      <div class="mb-4">
        <h2 class="section-title text-black" style="font-family: Poppins">
          All events
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-80">
        <div class="text-center max-w-96">
          <div class="text-6xl mb-4 opacity-50">📅</div>
          <h3 class="text-2xl font-semibold text-gray-600 mb-2">
            Loading events...
          </h3>
          <p class="text-gray-600 mb-4">Please wait while we load the events</p>
        </div>
      </div>

      <!-- Events Grid -->
      <div v-else-if="filteredEvents.length > 0">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-10 mb-16"
        >
          <CardEvent
            v-for="event in paginatedEvents"
            :key="event.id"
            :event-data="event"
            :clickable="true"
            :delete="isAuthorized"
            @handleDelete="handleDelete"
            @click="handleEventClick"
            class="w-full max-w-537 mx-auto"
          />
        </div>
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @prev="prevPage"
          @next="nextPage"
          @goto="goToPage"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="flex justify-center items-center min-h-80 col-span-full"
      >
        <div class="text-center max-w-96">
          <div class="text-6xl mb-4 opacity-50">📅</div>
          <h3 class="text-2xl font-semibold text-gray-600 mb-2">
            No events found
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
          <button @click="showEvents">Show events</button>
        </div>
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
import CardEvent from "../components/CardEvent.vue";
import SearchBar from "../components/SearchBar.vue";
import Pagination from "../components/Pagination.vue";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuthStore } from "../store/auth.store.js";
import { filteredEvents } from "../composables/filterEvents.composables.js";
import { goToPage } from "../composables/pagination.composables.js";
import { ref } from "vue";

export default {
  name: "Event",
  components: {
    Header,
    Footer,
    FilterDropdown,
    CardEvent,
    SearchBar,
    Pagination,
  },
  data() {
    return {
      searchQuery: "",
      selectedDateFilter: "Any day",
      selectedTypeFilter: "Any type",
      selectedOrganizerFilter: "Any organizer",
      currentPage: 1,
      itemsPerPage: 9,
      sortByDate: false,

      Events: [],
      loading: true,

      dateOptions: [
        "Any day",
        "Today",
        "This week",
        "This month",
        "Next week",
        "Next month",
      ],
      organizerOptions: ["Any organizer", "HelloGIT", "TechClub", "DevGroup"],

      featuredEvent: ref({
        id: "featured",
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon: "/icons/user.png",
        image: "/images/event_placeholder.png",
        date: "2024-12-28",
        startTime: "15:30",
        endTime: "16:30",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt orci vitae tortor maximus rutrum. Mauris sodales imperdiet dictum. Praesent luctus ipsum vel ligula mattis ultrices. Sed aliquet metus ut diam pellentesque sagittis. Praesent facilisis condimentum vestibulum. Vestibulum placerat quam ligula, non pulvinar magna imperdiet sit amet. Ut eget felis.",
        type: "Open House",
        organizer: "HelloGIT",
      }),
    };
  },

  mounted() {
    console.log("mounted");
    this.loadEvents();
  },

  computed: {
    filteredEvents() {
      return filteredEvents({
        events: this.Events,
        searchQuery: this.searchQuery,
        selectedTypeFilter: this.selectedTypeFilter,
        selectedOrganizerFilter: this.selectedOrganizerFilter,
        selectedDateFilter: this.selectedDateFilter,
        sortByDate: this.sortByDate,
      });
    },

    isAuthorized() {
      const { state } = useAuthStore();
      return (
        state.user &&
        (state.user.role === "admin" || state.user.role === "member")
      );
    },

    // Add this computed property to get unique event types for the filter dropdown
    uniqueEventTypes() {
      const types = new Set();
      this.Events.forEach((event) => {
        if (event.status) types.add(event.status);
      });
      return ["Any type", ...Array.from(types)];
    },

    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    },

    paginatedEvents() {
      return goToPage({
        events: this.filteredEvents,
        itemsPerPage: this.itemsPerPage,
        targetPage: this.currentPage,
        totalPages: this.totalPages,
      });
    },
  },

  methods: {
    formatFeaturedDate(date, startTime, endTime) {
      if (!date || !startTime || !endTime) return "";
      try {
        const eventDate = new Date(date);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return `${startTime} - ${endTime}, ${formattedDate}`;
      } catch (error) {
        return `${startTime} - ${endTime}, ${date}`;
      }
    },

    toggleSort() {
      this.sortByDate = !this.sortByDate;
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

    handleEventClick(event) {
      // Navigate to event detail page
      console.log("Event clicked:", event);
      const eventId = event._id || event.id;
      this.$router.push(`/event/${eventId}`);
    },

    handleReadMore(event) {
      // Navigate to event detail page for featured event
      console.log("Read more clicked:", event);
      const eventId = event._id || event.id || "featured";
      this.$router.push(`/event/${eventId}`);
    },

    handleRegister(event) {
      // Navigate to event detail page for registration
      console.log("Register clicked:", event);
      const eventId = event._id || event.id || "featured";
      this.$router.push(`/event/${eventId}`);
    },

    handleCreateEvent() {
      this.$router.push("/event/create");
    },

    async handleDelete(event_id) {
      await axiosInstance.delete(`/events/${event_id}`);
      this.loadEvents();
    },

    clearAllFilters() {
      this.searchQuery = "";
      this.selectedDateFilter = "Any day";
      this.selectedTypeFilter = "Any type";
      this.selectedOrganizerFilter = "Any organizer";
      this.sortByDate = false;
    },

    handleSearch(query) {
      // Debounce could be added here if needed
      this.searchQuery = query;
      console.log("Search query:", query);
    },

    async loadEvents() {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        const data = await response.data;
        console.log("loaded: ", data);
        this.Events = data;
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
