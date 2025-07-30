<template>
  <div class="project-card" @click="handleClick">
    <div class="card-content">
      <div class="card-cover">
        <img
          :src="project.image"
          :alt="project.name"
          class="project-image"
          @error="handleImageError"
        />
        <div v-if="showOverlay" class="card-overlay">
          <slot name="overlay">
            <div class="overlay-content">
              <button class="view-button">View Project</button>
            </div>
          </slot>
        </div>
      </div>
      <div class="card-body">
        <h3 class="text-card-title text-inverse m-0">{{ project.name }}</h3>
        <p class="text-card-subtitle text-inverse m-0">{{ project.author }}</p>
        <div v-if="project.tags && project.tags.length" class="card-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <div v-if="project.date" class="card-meta">
          <span class="text-card-subtitle text-inverse">{{
            formatDate(project.date)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true,
      validator: (project) => {
        return (
          project &&
          typeof project === "object" &&
          project.name &&
          project.author
        );
      },
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    showOverlay: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "compact", "featured"].includes(value),
    },
  },
  emits: ["click", "tag-click"],
  setup(props, { emit }) {
    const imageLoaded = ref(true);

    const cardClasses = computed(() => {
      return [
        "project-card",
        `project-card--${props.variant}`,
        {
          "project-card--clickable": props.clickable,
          "project-card--interactive": props.showOverlay,
        },
      ];
    });

    const handleClick = () => {
      if (props.clickable) {
        emit("click", props.project);
      }
    };

    const handleImageError = () => {
      imageLoaded.value = false;
    };

    const formatDate = (date) => {
      if (!date) return "";

      try {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch (error) {
        return date;
      }
    };

    const handleTagClick = (tag, event) => {
      event.stopPropagation();
      emit("tag-click", tag);
    };

    return {
      cardClasses,
      imageLoaded,
      handleClick,
      handleImageError,
      formatDate,
      handleTagClick,
    };
  },
};
</script>

<style scoped>
/* Base card styles - extends global project-card class */
.project-card {
  cursor: default;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.project-card--clickable {
  cursor: pointer;
}

.project-card--clickable:hover {
  transform: translateY(-0.125rem);
  box-shadow: var(--shadow-lg);
}

.project-card--interactive .card-cover {
  position: relative;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card--interactive:hover .card-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: var(--color-text-inverse);
}

.view-button {
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

.view-button:hover {
  background: var(--color-primary-600);
}

/* Card variants */
.project-card--compact .card-content {
  height: 18rem;
}

.project-card--compact .card-cover {
  height: 10rem;
}

.project-card--featured {
  grid-column: span 2;
}

.project-card--featured .card-content {
  height: 26rem;
}

.project-card--featured .card-cover {
  height: 18rem;
}

/* Card tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
  margin-top: var(--spacing-2);
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-text-inverse);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Card meta */
.card-meta {
  margin-top: var(--spacing-1);
  opacity: 0.8;
}

/* Image error handling */
.project-image {
  transition: opacity 0.3s ease;
}

.project-image[src=""],
.project-image:not([src]) {
  background: var(--color-neutral-200);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image[src=""]:before,
.project-image:not([src]):before {
  content: "📁";
  font-size: 2rem;
  opacity: 0.5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .project-card--featured {
    grid-column: span 1;
  }

  .project-card--featured .card-content {
    height: 22.25rem;
  }

  .project-card--featured .card-cover {
    height: 14.9375rem;
  }
}

/* Loading and error states */
.project-card--loading .card-cover {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.project-card--error .card-cover {
  background: var(--color-neutral-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
}

.project-card--error .card-cover:before {
  content: "⚠️ Image not available";
  font-size: 0.875rem;
}
</style>
