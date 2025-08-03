<template>
  <Header />

  <div class="body-container bg-white">
    <!-- Hero Section -->
    <section class="w-full mb-8">
      <div 
        class="h-80 md:h-96 lg:h-[350px] rounded-[var(--radius-base)] bg-cover bg-center bg-no-repeat flex flex-col justify-end px-8 py-12 md:px-12 md:py-16 relative overflow-hidden"
        style="background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/e63f12ce8d0ad4a064f41ec92c80cfa39730db1d?width=3776')"
      >
        <!-- Overlay for better text readability -->
        <div class="absolute inset-0 bg-black/20"></div>
        
        <!-- Hero Content -->
        <div class="relative z-10 max-w-4xl">
          <h1 class="page-title text-white mb-2 drop-shadow-lg">
            PROJECTS
          </h1>
          <p class="text-2xl md:text-3xl lg:text-4xl font-medium text-white font-[Poppins] leading-tight drop-shadow-md">
            Where everyone start or plan a project :)
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      
      <!-- Left Sidebar - Search and Filters -->
      <aside class="w-full lg:w-96 lg:flex-shrink-0">
        <!-- Search Bar -->
        <div class="mb-6">
          <SearchBar
            v-model="searchQuery"
            placeholder="Search"
            @search="handleSearch"
          />
        </div>

        <!-- Categories Filter -->
        <div class="mb-6">
          <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-black font-[Poppins] mb-4">
            Categories
          </h3>
          <FilterDropdown
            v-model="selectedCategoryFilter"
            :options="categoryOptions"
            :label="selectedCategoryFilter === 'All categories' ? 'Select' : ''"
            variant="primary"
            class="w-full"
          />
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-80">
          <div class="text-center max-w-96">
            <div class="text-6xl mb-4 opacity-50">🚀</div>
            <h3 class="text-2xl font-semibold text-gray-600 mb-2">
              Loading projects...
            </h3>
            <p class="text-gray-600 mb-4">Please wait while we load the projects</p>
          </div>
        </div>

        <!-- Projects Grid -->
        <div v-else-if="filteredProjects.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <CardProject
              v-for="project in paginatedProjects"
              :key="project._id || project.id"
              :project-data="project"
              :clickable="true"
              @click="handleProjectClick"
              class="w-full mx-auto"
            />
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-8" v-if="totalPages > 1">
            <Pagination
              :currentPage="currentPage"
              :totalPages="totalPages"
              @prev="prevPage"
              @next="nextPage"
              @goto="goToPage"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="flex justify-center items-center min-h-80"
        >
          <div class="text-center max-w-96">
            <div class="text-6xl mb-4 opacity-50">🚀</div>
            <h3 class="text-2xl font-semibold text-gray-600 mb-2">
              No projects found
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
          </div>
        </div>
      </main>
    </div>
  </div>

  <Footer />
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import FilterDropdown from "../components/FilterDropdown.vue";
import CardProject from "../components/CardProject.vue";
import SearchBar from "../components/SearchBar.vue";
import Pagination from "../components/Pagination.vue";
import { goToPage } from "../composables/pagination.composables.js";

export default {
  name: "Project",
  components: {
    Header,
    Footer,
    FilterDropdown,
    CardProject,
    SearchBar,
    Pagination,
  },
  data() {
    return {
      searchQuery: "",
      selectedCategoryFilter: "All categories",
      currentPage: 1,
      itemsPerPage: 12,

      projects: [],
      loading: true,

      categoryOptions: [
        "All categories",
        "UI/UX",
        "AI",
        "IOT",
        "Web Development",
        "Mobile Development",
        "Machine Learning",
        "Blockchain"
      ],
    };
  },
  mounted() {
    this.loadProjects();
  },
  computed: {
    filteredProjects() {
      let filtered = [...this.projects];

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(project => 
          project.title?.toLowerCase().includes(query) ||
          project.author?.toLowerCase().includes(query) ||
          project.category?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (this.selectedCategoryFilter !== "All categories") {
        filtered = filtered.filter(project => 
          project.category === this.selectedCategoryFilter
        );
      }

      return filtered;
    },

    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    },

    paginatedProjects() {
      return goToPage({
        events: this.filteredProjects,
        itemsPerPage: this.itemsPerPage,
        targetPage: this.currentPage,
        totalPages: this.totalPages,
      });
    },
  },
  methods: {
    async loadProjects() {
      try {
        // Try to load from API first, fall back to mock data if needed
        const response = await axios.get("http://localhost:8000/api/projects");
        this.projects = response.data;
      } catch (error) {
        console.error("Error loading projects:", error);
        // Fallback to mock data
        this.projects = this.generateMockProjects();
      } finally {
        this.loading = false;
      }
    },

    generateMockProjects() {
      // Generate mock projects for demonstration
      const mockProjects = [];
      const categories = ["UI/UX", "AI", "IOT", "Web Development", "Mobile Development"];
      const authors = ["AH Nguyen", "B Tran", "C Le", "D Pham", "E Vo"];
      const teams = ["Team A", "Team B", "Team C", "Team D", "Team E"];

      for (let i = 1; i <= 15; i++) {
        mockProjects.push({
          _id: `project-${i}`,
          title: `Project name ${i}`,
          author: authors[Math.floor(Math.random() * authors.length)],
          team: teams[Math.floor(Math.random() * teams.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          description: `This is a sample project description for project ${i}`,
          imageUrl: null,
          status: 'published',
          createdAt: new Date()
        });
      }
      return mockProjects;
    },

    handleProjectClick(project) {
      console.log("Project clicked:", project);
      // Navigate to project detail page when implemented
      // this.$router.push(`/projects/${project._id || project.id}`);
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

    clearAllFilters() {
      this.searchQuery = "";
      this.selectedCategoryFilter = "All categories";
      this.currentPage = 1;
    },

    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1; // Reset to first page when searching
    },
  },
};
</script>

<style scoped>
/* Additional component-specific styles if needed */
.body-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 1024px) {
  .body-container {
    padding: 1.5rem;
  }
}
</style>
