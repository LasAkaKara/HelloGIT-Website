<template>
  <div class="project-page">
    <!-- Reusable Header Component -->
    <AppHeader active-link="Project" />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section mb-5">
        <div class="hero-content">
          <h1 class="text-hero-title text-inverse m-0 mb-2">PROJECTS</h1>
          <p class="text-hero-subtitle text-inverse m-0">
            Where everyone start or plan a project :)
          </p>
        </div>
      </section>

      <!-- Content Section -->
      <section class="content-section flex gap-5 items-start flex-responsive">
        <!-- Sidebar -->
        <aside class="sidebar">
          <!-- Search -->
          <div class="search-container mb-5">
            <div class="search-input">
              <input
                type="text"
                placeholder="Search"
                class="search-field text-input"
                v-model="searchQuery"
                @input="handleSearch"
              />
              <svg
                class="search-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
                  stroke="#1E1E1E"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- Categories -->
          <div class="categories-container flex flex-col gap-2">
            <h3 class="text-category-title text-primary m-0">Categories</h3>
            <div class="dropdown-container">
              <button @click="toggleDropdown" class="dropdown-button">
                <span class="text-input">{{ selectedCategory }}</span>
                <div class="dropdown-icon flex items-center justify-center">
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="rgba(0, 0, 0, 0.25)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div v-if="dropdownOpen" class="dropdown-menu">
                <button
                  v-for="category in categories"
                  :key="category"
                  @click="selectCategory(category)"
                  class="dropdown-item text-pagination"
                  :class="{ active: selectedCategory === category }"
                >
                  {{ category }}
                </button>
              </div>
            </div>
          </div>

          <!-- Filter Summary -->
          <div v-if="hasActiveFilters" class="filter-summary">
            <h4 class="text-sm font-medium text-secondary mb-2">
              Active Filters:
            </h4>
            <div class="flex flex-wrap gap-1">
              <span v-if="selectedCategory !== 'Select'" class="filter-tag">
                {{ selectedCategory }}
                <button @click="clearCategoryFilter" class="filter-remove">
                  ×
                </button>
              </span>
              <span v-if="searchQuery" class="filter-tag">
                "{{ searchQuery }}"
                <button @click="clearSearchFilter" class="filter-remove">
                  ×
                </button>
              </span>
            </div>
            <button @click="clearAllFilters" class="clear-all-btn">
              Clear All
            </button>
          </div>
        </aside>

        <!-- Project Grid -->
        <div class="projects-container flex flex-col gap-5 flex-1">
          <!-- Results Summary -->
          <div class="results-summary">
            <p class="text-secondary">
              Showing {{ filteredProjects.length }} of
              {{ projects.length }} projects
            </p>
          </div>

          <!-- Project Cards Grid -->
          <div class="project-grid grid grid-cols-3 gap-5 grid-responsive">
            <ProjectCard
              v-for="project in paginatedProjects"
              :key="project.id"
              :project="project"
              :clickable="true"
              :show-overlay="true"
              @click="handleProjectClick"
              @tag-click="handleTagClick"
            />
          </div>

          <!-- Empty State -->
          <div v-if="filteredProjects.length === 0" class="empty-state">
            <div class="empty-content">
              <div class="empty-icon">📁</div>
              <h3 class="text-section-subtitle text-secondary mb-2">
                No projects found
              </h3>
              <p class="text-secondary">
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
                class="pagination-prev"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path
                    d="M9.33962 2.06621V1.03094C9.33962 0.941211 9.2365 0.891658 9.16685 0.946568L3.12935 5.66219C3.07805 5.70209 3.03655 5.75317 3.00799 5.81154C2.97944 5.86992 2.9646 5.93404 2.9646 5.99902C2.9646 6.06401 2.97944 6.12813 3.00799 6.18651C3.03655 6.24488 3.07805 6.29596 3.12935 6.33585L9.16685 11.0515C9.23783 11.1064 9.33962 11.0568 9.33962 10.9671V9.93184C9.33962 9.86621 9.30882 9.80327 9.25792 9.76309L4.43649 5.99969L9.25792 2.23496C9.30882 2.19478 9.33962 2.13184 9.33962 2.06621Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </button>

              <button
                v-for="page in visiblePages"
                :key="page"
                class="pagination-item text-pagination"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>

              <button
                class="pagination-next"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path
                    d="M9.89777 5.66281L3.86027 0.947189C3.84449 0.934768 3.82553 0.92705 3.80557 0.924919C3.7856 0.922788 3.76544 0.926332 3.7474 0.935143C3.72936 0.943955 3.71417 0.957676 3.70357 0.974732C3.69298 0.991787 3.68741 1.01149 3.6875 1.03156V2.06683C3.6875 2.13246 3.7183 2.1954 3.7692 2.23558L8.59063 6.00031L3.7692 9.76505C3.71697 9.80522 3.6875 9.86817 3.6875 9.9338V10.9691C3.6875 11.0588 3.79063 11.1083 3.86027 11.0534L9.89777 6.33781C9.94908 6.29779 9.9906 6.24658 10.0191 6.1881C10.0477 6.12962 10.0625 6.06539 10.0625 6.00031C10.0625 5.93523 10.0477 5.87101 10.0191 5.81253C9.9906 5.75404 9.94908 5.70284 9.89777 5.66281Z"
                    fill="black"
                    fill-opacity="0.85"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Reusable Footer Component -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { AppHeader, AppFooter, ProjectCard } from "../components";

export default {
  name: "Project",
  components: {
    AppHeader,
    AppFooter,
    ProjectCard,
  },
  setup() {
    // Reactive state
    const dropdownOpen = ref(false);
    const selectedCategory = ref("Select");
    const currentPage = ref(1);
    const searchQuery = ref("");
    const itemsPerPage = 12;

    const categories = ref([
      "All",
      "UI/UX",
      "AI",
      "IoT",
      "Web Development",
      "Mobile App",
    ]);

    // Sample projects with more detailed data
    const projects = ref([
      {
        id: 1,
        name: "E-Commerce Platform",
        author: "By AH Nguyen - Team A",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F43964e3473c248c0aca5ba13b608d744%2Ff83b08924fbf4b3fa5e1f1a05d481c03?format=webp&width=800",
        category: "Web Development",
        tags: ["React", "Node.js", "MongoDB"],
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Mobile Banking App",
        author: "By Sarah Kim - Team B",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F43964e3473c248c0aca5ba13b608d744%2Ff83b08924fbf4b3fa5e1f1a05d481c03?format=webp&width=800",
        category: "Mobile App",
        tags: ["React Native", "Firebase"],
        date: "2024-01-10",
      },
      {
        id: 3,
        name: "AI Chatbot Interface",
        author: "By John Smith - Team C",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F43964e3473c248c0aca5ba13b608d744%2Ff83b08924fbf4b3fa5e1f1a05d481c03?format=webp&width=800",
        category: "AI",
        tags: ["Python", "TensorFlow", "NLP"],
        date: "2024-01-08",
      },
      {
        id: 4,
        name: "Smart Home Dashboard",
        author: "By Maria Garcia - Team D",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F43964e3473c248c0aca5ba13b608d744%2Ff83b08924fbf4b3fa5e1f1a05d481c03?format=webp&width=800",
        category: "IoT",
        tags: ["Arduino", "Raspberry Pi", "Python"],
        date: "2024-01-05",
      },
      {
        id: 5,
        name: "Portfolio Website Design",
        author: "By Alex Wong - Team A",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F43964e3473c248c0aca5ba13b608d744%2Ff83b08924fbf4b3fa5e1f1a05d481c03?format=webp&width=800",
        category: "UI/UX",
        tags: ["Figma", "Adobe XD", "CSS"],
        date: "2024-01-03",
      },
      {
        id: 6,
        name: "Social Media Analytics",
        author: "By David Chen - Team B",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F43964e3473c248c0aca5ba13b608d744%2Ff83b08924fbf4b3fa5e1f1a05d481c03?format=webp&width=800",
        category: "AI",
        tags: ["Python", "Pandas", "Machine Learning"],
        date: "2024-01-01",
      },
    ]);

    // Computed properties
    const filteredProjects = computed(() => {
      let filtered = projects.value;

      // Filter by category
      if (
        selectedCategory.value !== "Select" &&
        selectedCategory.value !== "All"
      ) {
        filtered = filtered.filter(
          (project) => project.category === selectedCategory.value,
        );
      }

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (project) =>
            project.name.toLowerCase().includes(query) ||
            project.author.toLowerCase().includes(query) ||
            project.tags.some((tag) => tag.toLowerCase().includes(query)),
        );
      }

      return filtered;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredProjects.value.length / itemsPerPage),
    );

    const paginatedProjects = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProjects.value.slice(start, end);
    });

    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;
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

    const hasActiveFilters = computed(
      () =>
        selectedCategory.value !== "Select" || searchQuery.value.trim() !== "",
    );

    // Methods
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const selectCategory = (category) => {
      selectedCategory.value = category;
      dropdownOpen.value = false;
      currentPage.value = 1;
    };

    const handleSearch = () => {
      currentPage.value = 1;
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const handleProjectClick = (project) => {
      console.log("Project clicked:", project);
      // Navigate to project detail page or open modal
    };

    const handleTagClick = (tag) => {
      searchQuery.value = tag;
    };

    const clearCategoryFilter = () => {
      selectedCategory.value = "Select";
    };

    const clearSearchFilter = () => {
      searchQuery.value = "";
    };

    const clearAllFilters = () => {
      selectedCategory.value = "Select";
      searchQuery.value = "";
      currentPage.value = 1;
    };

    // Watchers
    watch(filteredProjects, () => {
      if (currentPage.value > totalPages.value) {
        currentPage.value = 1;
      }
    });

    // Lifecycle
    onMounted(() => {
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown-container")) {
          dropdownOpen.value = false;
        }
      });
    });

    return {
      // State
      dropdownOpen,
      selectedCategory,
      currentPage,
      searchQuery,
      categories,
      projects,

      // Computed
      filteredProjects,
      totalPages,
      paginatedProjects,
      visiblePages,
      hasActiveFilters,

      // Methods
      toggleDropdown,
      selectCategory,
      handleSearch,
      goToPage,
      handleProjectClick,
      handleTagClick,
      clearCategoryFilter,
      clearSearchFilter,
      clearAllFilters,
    };
  },
};
</script>

<style scoped>
/* Component-specific styles that extend the global component classes */
.project-page {
  min-height: 100vh;
  background: var(--color-background);
  font-family: var(--font-primary);
}

.main-content {
  padding: var(--spacing-5) var(--spacing-4);
}

.sidebar {
  width: 27.8125rem;
  flex-shrink: 0;
  padding: var(--spacing-2) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.dropdown-icon {
  width: 1rem;
  height: 1rem;
}

.flex-1 {
  flex: 1;
}

/* Filter Summary */
.filter-summary {
  padding: var(--spacing-3);
  background: var(--color-neutral-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
}

.filter-remove {
  background: none;
  border: none;
  color: var(--color-text-inverse);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  margin-left: var(--spacing-1);
}

.clear-all-btn,
.clear-filters-btn {
  background: none;
  border: 1px solid var(--color-primary-500);
  color: var(--color-primary-500);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-default);
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: var(--spacing-2);
  transition: all 0.3s ease;
}

.clear-all-btn:hover,
.clear-filters-btn:hover {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
}

/* Results Summary */
.results-summary {
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid var(--color-border-light);
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }

  .filter-summary {
    margin-top: var(--spacing-4);
  }
}
</style>
