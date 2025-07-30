<template>
  <div class="events-page">
    <!-- Reusable Header Component -->
    <AppHeader active-link="Event" />

    <!-- Main Content -->
    <main class="events-main-content">
      <!-- Page Header -->
      <section class="page-header">
        <div class="page-header-content">
          <h1 class="text-hero-title text-primary m-0">Events</h1>
          <p class="text-hero-subtitle text-primary m-0">
            Where everyone meetups together, connects each other, and discover
            unique opportunities.
          </p>
        </div>
      </section>

      <!-- Search Section -->
      <section class="events-search-section">
        <div class="events-search-bar">
          <input
            type="text"
            placeholder="Search events"
            class="events-search-input"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <div class="events-search-icon">
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
              <path
                d="M27.6667 30.5L17.1667 20C16.3333 20.6667 15.375 21.1944 14.2917 21.5833C13.2083 21.9722 12.0556 22.1667 10.8333 22.1667C7.80556 22.1667 5.24306 21.1181 3.14583 19.0208C1.04861 16.9236 0 14.3611 0 11.3333C0 8.30556 1.04861 5.74306 3.14583 3.64583C5.24306 1.54861 7.80556 0.5 10.8333 0.5C13.8611 0.5 16.4236 1.54861 18.5208 3.64583C20.6181 5.74306 21.6667 8.30556 21.6667 11.3333C21.6667 12.5556 21.4722 13.7083 21.0833 14.7917C20.6944 15.875 20.1667 16.8333 19.5 17.6667L30 28.1667L27.6667 30.5ZM10.8333 18.8333C12.9167 18.8333 14.6875 18.1042 16.1458 16.6458C17.6042 15.1875 18.3333 13.4167 18.3333 11.3333C18.3333 9.25 17.6042 7.47917 16.1458 6.02083C14.6875 4.5625 12.9167 3.83333 10.8333 3.83333C8.75 3.83333 6.97917 4.5625 5.52083 6.02083C4.0625 7.47917 3.33333 9.25 3.33333 11.3333C3.33333 13.4167 4.0625 15.1875 5.52083 16.6458C6.97917 18.1042 8.75 18.8333 10.8333 18.8333Z"
                fill="#49454F"
              />
            </svg>
          </div>
        </div>

        <div class="events-filter-buttons">
          <button class="events-filter-button" @click="toggleDateFilter">
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                d="M26.6667 3.83334V10.5M13.3333 3.83334V10.5M5 17.1667H35M8.33333 7.16668H31.6667C33.5076 7.16668 35 8.65906 35 10.5V33.8333C35 35.6743 33.5076 37.1667 31.6667 37.1667H8.33333C6.49238 37.1667 5 35.6743 5 33.8333V10.5C5 8.65906 6.49238 7.16668 8.33333 7.16668Z"
                stroke="#1E1E1E"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ selectedDateFilter }}</span>
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                d="M20 25.5L11.6667 17.1667H28.3333L20 25.5Z"
                fill="#1D1B20"
              />
            </svg>
          </button>

          <button class="events-filter-button" @click="toggleTypeFilter">
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                d="M3.33333 37.1667V7.16668C3.33333 6.25001 3.65972 5.46529 4.3125 4.81251C4.96527 4.15973 5.75 3.83334 6.66666 3.83334H33.3333C34.25 3.83334 35.0347 4.15973 35.6875 4.81251C36.3403 5.46529 36.6667 6.25001 36.6667 7.16668V27.1667C36.6667 28.0833 36.3403 28.8681 35.6875 29.5208C35.0347 30.1736 34.25 30.5 33.3333 30.5H10L3.33333 37.1667ZM8.58333 27.1667H33.3333V7.16668H6.66666V29.0417L8.58333 27.1667Z"
                fill="#1D1B20"
              />
            </svg>
            <span>{{ selectedTypeFilter }}</span>
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                d="M20 25.5L11.6667 17.1667H28.3333L20 25.5Z"
                fill="#1D1B20"
              />
            </svg>
          </button>

          <button class="events-filter-button" @click="toggleOrganizerFilter">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/74cf18ab8f206eb928208a319a6eb1a93faec687?width=70"
              alt="organizer"
              width="35"
              height="35"
            />
            <span>{{ selectedOrganizerFilter }}</span>
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                d="M20 25.5L11.6667 17.1667H28.3333L20 25.5Z"
                fill="#1D1B20"
              />
            </svg>
          </button>

          <button class="events-sort-button" @click="toggleSort">
            <span>Sort by date</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ec4da275601508ad35202673724472f86462c28?width=80"
              alt="sort"
              width="40"
              height="40"
            />
          </button>
        </div>
      </section>

      <!-- Featured Event Section -->
      <section class="featured-event-section">
        <div class="section-header">
          <h2 class="featured-title">🔥 Upcoming event</h2>
        </div>

        <div class="featured-event-content">
          <div class="featured-event-image">
            <img :src="featuredEvent.image" :alt="featuredEvent.name" />
          </div>

          <div class="featured-event-details">
            <div class="featured-date">
              {{
                formatFeaturedDate(
                  featuredEvent.date,
                  featuredEvent.startTime,
                  featuredEvent.endTime,
                )
              }}
            </div>
            <h3 class="featured-event-title">{{ featuredEvent.name }}</h3>
            <div class="featured-host">
              <img
                :src="featuredEvent.hostIcon"
                :alt="featuredEvent.hostName"
                class="host-icon"
              />
              <span>Host by {{ featuredEvent.hostName }}</span>
            </div>
            <p class="featured-description">{{ featuredEvent.description }}</p>
            <div class="featured-actions">
              <button
                class="register-button"
                @click="handleRegister(featuredEvent)"
              >
                Register Now
              </button>
              <button
                class="read-more-button"
                @click="handleReadMore(featuredEvent)"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- All Events Section -->
      <section class="all-events-section">
        <div class="section-header">
          <h2 class="section-title">All events</h2>
        </div>

        <div class="events-grid">
          <EventCard
            v-for="event in paginatedEvents"
            :key="event.id"
            :event="event"
            :clickable="true"
            :show-overlay="true"
            @click="handleEventClick"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">📅</div>
            <h3 class="empty-title">No events found</h3>
            <p class="empty-subtitle">
              Try adjusting your search or filter criteria
            </p>
            <button @click="clearAllFilters" class="clear-filters-btn">
              Clear all filters
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-container">
          <div class="pagination">
            <button
              class="pagination-nav"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              <svg width="19" height="30" viewBox="0 0 19 30" fill="none">
                <path
                  d="M0.585773 13.5858C-0.195276 14.3668 -0.195276 15.6332 0.585773 16.4142L13.3137 29.1421C14.0947 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82841 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768156 14.0947 0.0768156 13.3137 0.857864L0.585773 13.5858ZM19 13L1.99999 13V17L19 17V13Z"
                  fill="#757575"
                />
              </svg>
            </button>

            <button
              v-for="page in visiblePages"
              :key="page"
              class="pagination-item"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <button
              class="pagination-nav"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
                <path
                  d="M17.4142 16.4142C18.1953 15.6332 18.1953 14.3668 17.4142 13.5858L4.68631 0.857864C3.90526 0.0768156 2.63893 0.0768156 1.85788 0.857864C1.07683 1.63891 1.07683 2.90524 1.85788 3.68629L13.1716 15L1.85788 26.3137C1.07683 27.0948 1.07683 28.3611 1.85788 29.1421C2.63893 29.9232 3.90526 29.9232 4.68631 29.1421L17.4142 16.4142ZM1.08867e-05 17H16V13H1.08867e-05L1.08867e-05 17Z"
                  fill="#757575"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Reusable Footer Component -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { AppHeader, AppFooter, EventCard } from "../components";

export default {
  name: "Events",
  components: {
    AppHeader,
    AppFooter,
    EventCard,
  },
  setup() {
    // Reactive state
    const searchQuery = ref("");
    const selectedDateFilter = ref("Any day");
    const selectedTypeFilter = ref("Any type");
    const selectedOrganizerFilter = ref("Any organizer");
    const currentPage = ref(1);
    const itemsPerPage = 9;
    const sortByDate = ref(false);

    // Featured event data
    const featuredEvent = ref({
      id: "featured",
      name: "Open Day",
      hostName: "HelloGIT",
      hostIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/eec1278a9f9d25b24068cfd37a6181846fb44173?width=65",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aa85ad067f1a52bcf9bd07048f5911e5cc7c71d7?width=1684",
      date: "2024-12-28",
      startTime: "15:30",
      endTime: "16:30",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt orci vitae tortor maximus rutrum. Mauris sodales imperdiet dictum. Praesent luctus ipsum vel ligula mattis ultrices. Sed aliquet metus ut diam pellentesque sagittis. Praesent facilisis condimentum vestibulum. Vestibulum placerat quam ligula, non pulvinar magna imperdiet sit amet. Ut eget felis.",
      type: "Open House",
      organizer: "HelloGIT",
    });

    // Sample events data
    const events = ref([
      {
        id: 1,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/eec1278a9f9d25b24068cfd37a6181846fb44173?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/55fa04c215ee7fd7af0b8b6421f5f06e15a1f20d?width=1074",
        date: "2024-12-28",
        startTime: "15:30",
        endTime: "16:30",
        type: "Open House",
        organizer: "HelloGIT",
      },
      {
        id: 2,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/1de0ea95889b8b794d5703874da0a1d8e33a6812?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ff805b39efb30fb7ab904f9726fc30055494984d?width=1074",
        date: "2024-12-29",
        startTime: "15:30",
        endTime: "16:30",
        type: "Workshop",
        organizer: "HelloGIT",
      },
      {
        id: 3,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/e4782065658eabcf3942dae413c5f6a862e44ab8?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/b704b757988d4eb350bbb9b3da2a547704023fac?width=1074",
        date: "2024-12-30",
        startTime: "15:30",
        endTime: "16:30",
        type: "Seminar",
        organizer: "TechClub",
      },
      {
        id: 4,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/cd299c96213c98e058d1a1fee2dcb66707390b77?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/66620318196dfc18351dff57d913ab2530f4be4c?width=1074",
        date: "2024-12-31",
        startTime: "15:30",
        endTime: "16:30",
        type: "Conference",
        organizer: "HelloGIT",
      },
      {
        id: 5,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/05c47f82c6e49f70e55a8669e61944b3dbb30e90?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/67477f9e6a9f1a634b5b866d1dd3adc8f2b7ab14?width=1074",
        date: "2025-01-01",
        startTime: "15:30",
        endTime: "16:30",
        type: "Workshop",
        organizer: "DevGroup",
      },
      {
        id: 6,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/d687f718f5473b0964ccd67457bb8fa02c08e71e?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/25eedb9db84cc4c11fc5bffcc3fabb8134d5f4b9?width=1074",
        date: "2025-01-02",
        startTime: "15:30",
        endTime: "16:30",
        type: "Open House",
        organizer: "HelloGIT",
      },
      {
        id: 7,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/3f6542a1260fe11fe9db05caf93894ef533149bd?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/d7334a74f96fa68d7c91b49cf83a3c81dd26d991?width=1074",
        date: "2025-01-03",
        startTime: "15:30",
        endTime: "16:30",
        type: "Seminar",
        organizer: "TechClub",
      },
      {
        id: 8,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/e5f242c6301f2817a2e13a3e2276381e5961c359?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/eedbb64cab57883e2a3086d0ef207bdd469a7dc4?width=1074",
        date: "2025-01-04",
        startTime: "15:30",
        endTime: "16:30",
        type: "Conference",
        organizer: "DevGroup",
      },
      {
        id: 9,
        name: "Open Day",
        hostName: "HelloGIT",
        hostIcon:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ba322feda335f8ce6e9af78c05f5aca71a347ebd?width=65",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/eec754340cb3deef41d4e45b13e84193d3fafd04?width=1074",
        date: "2025-01-05",
        startTime: "15:30",
        endTime: "16:30",
        type: "Workshop",
        organizer: "HelloGIT",
      },
    ]);

    // Computed properties
    const filteredEvents = computed(() => {
      let filtered = events.value;

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (event) =>
            event.name.toLowerCase().includes(query) ||
            event.hostName.toLowerCase().includes(query) ||
            event.type.toLowerCase().includes(query),
        );
      }

      // Filter by type
      if (selectedTypeFilter.value !== "Any type") {
        filtered = filtered.filter(
          (event) => event.type === selectedTypeFilter.value,
        );
      }

      // Filter by organizer
      if (selectedOrganizerFilter.value !== "Any organizer") {
        filtered = filtered.filter(
          (event) => event.organizer === selectedOrganizerFilter.value,
        );
      }

      // Sort by date if enabled
      if (sortByDate.value) {
        filtered = [...filtered].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
      }

      return filtered;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredEvents.value.length / itemsPerPage),
    );

    const paginatedEvents = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredEvents.value.slice(start, end);
    });

    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 3;
      let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisible / 2),
      );
      let endPage = Math.min(totalPages.value, startPage + maxVisible - 1);

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    });

    // Methods
    const handleSearch = () => {
      currentPage.value = 1;
    };

    const toggleDateFilter = () => {
      console.log("Date filter clicked");
      // Implement date filter logic
    };

    const toggleTypeFilter = () => {
      console.log("Type filter clicked");
      // Implement type filter logic
    };

    const toggleOrganizerFilter = () => {
      console.log("Organizer filter clicked");
      // Implement organizer filter logic
    };

    const toggleSort = () => {
      sortByDate.value = !sortByDate.value;
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const handleEventClick = (event) => {
      console.log("Event clicked:", event);
      // Navigate to event detail page
    };

    const handleRegister = (event) => {
      console.log("Register for event:", event);
      // Handle event registration
    };

    const handleReadMore = (event) => {
      console.log("Read more about event:", event);
      // Navigate to event detail page
    };

    const clearAllFilters = () => {
      searchQuery.value = "";
      selectedDateFilter.value = "Any day";
      selectedTypeFilter.value = "Any type";
      selectedOrganizerFilter.value = "Any organizer";
      sortByDate.value = false;
      currentPage.value = 1;
    };

    const formatFeaturedDate = (date, startTime, endTime) => {
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
    };

    return {
      // State
      searchQuery,
      selectedDateFilter,
      selectedTypeFilter,
      selectedOrganizerFilter,
      currentPage,
      sortByDate,
      featuredEvent,
      events,

      // Computed
      filteredEvents,
      totalPages,
      paginatedEvents,
      visiblePages,

      // Methods
      handleSearch,
      toggleDateFilter,
      toggleTypeFilter,
      toggleOrganizerFilter,
      toggleSort,
      goToPage,
      handleEventClick,
      handleRegister,
      handleReadMore,
      clearAllFilters,
      formatFeaturedDate,
    };
  },
};
</script>

<style scoped>
/* Page Header */
.page-header {
  display: flex;
  width: 100%;
  padding: var(--spacing-8) 0;
  margin-bottom: var(--spacing-6);
}

.page-header-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 105.25rem;
  gap: var(--spacing-2);
}

.section-header {
  margin-bottom: var(--spacing-4);
}

.section-title {
  color: var(--color-text-primary);
  font-family: var(--font-primary);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 var(--spacing-4) var(--spacing-1);
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  grid-column: 1 / -1;
}

.empty-content {
  text-align: center;
  max-width: 24rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-2) 0;
}

.empty-subtitle {
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-4) 0;
}

.clear-filters-btn {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  font-family: var(--font-primary);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-filters-btn:hover {
  background: var(--color-primary-600);
}

/* Pagination - using existing global styles but with specific styling */
.pagination-nav {
  width: 2.75rem;
  height: 2.75rem;
  padding: var(--spacing-3);
  background: #f3f3f3;
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-nav:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-item {
  width: 2.8125rem;
  height: 2.75rem;
  padding: var(--spacing-3);
  background: #f3f3f3;
  color: rgba(117, 117, 117, 1);
  font-family:
    "Pragati Narrow",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-item.active {
  background: #349b9d;
  color: rgba(245, 245, 245, 1);
}

.pagination-item:hover:not(.active) {
  background: #e1e1e1;
}

/* Responsive Design Overrides */
@media (max-width: 480px) {
  .page-header-content h1 {
    font-size: 4rem;
    line-height: 1.15;
  }

  .page-header-content p {
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style>
