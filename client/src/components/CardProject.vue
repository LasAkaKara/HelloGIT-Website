<template>
  <div
    class="project-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    @click="handleClick"
  >
    <!-- Card Container with exact Figma styling -->
    <div class="w-full h-full rounded-3xl overflow-hidden project-gradient p-3">
      <!-- Cover Image -->
      <div class="w-full h-48 md:h-56 lg:h-60 rounded-2xl overflow-hidden mb-3 relative bg-gray-300">
        <img
          :src="projectData.imageUrl || getPlaceholderImage()"
          :alt="projectData.title || 'Project Image'"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          @error="handleImageError"
        />
      </div>

      <!-- Project Content -->
      <div class="px-3 pb-2">
        <!-- Project Title -->
        <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-white font-[Poppins] leading-8 mb-2 line-clamp-2">
          {{ projectData.title || 'Project name' }}
        </h3>

        <!-- Project Author/Team -->
        <p class="text-xs md:text-sm text-white font-[Roboto] leading-4 opacity-95">
          {{ formatAuthor() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProject',
  props: {
    projectData: {
      type: Object,
      default: () => ({
        title: 'Project name',
        author: 'AH Nguyen',
        team: 'Team A',
        imageUrl: null,
        category: 'UI/UX',
        status: 'published'
      })
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click', this.projectData);
      }
    },
    
    handleImageError(event) {
      event.target.src = this.getPlaceholderImage();
    },

    getPlaceholderImage() {
      // Return a placeholder that matches the Figma design
      return '/images/project-placeholder.png';
    },

    formatAuthor() {
      const author = this.projectData.author || 'AH Nguyen';
      const team = this.projectData.team || 'Team A';
      return `By ${author} - ${team}`;
    }
  }
}
</script>

<style scoped>
.project-card {
  width: 100%;
  max-width: 445px;
  height: 356px;
}

.project-gradient {
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.22) 0%, rgba(255, 255, 255, 0.64) 100%), #287A86;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .project-card {
    height: 320px;
  }
}

@media (min-width: 1024px) {
  .project-card {
    height: 356px;
  }
}
</style>
