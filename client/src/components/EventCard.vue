<template>
  <div class="event-card" @click="handleClick">
    <div class="event-image-container">
      <img
        :src="event.image"
        :alt="event.name"
        class="event-image"
        @error="handleImageError"
      />
      <div v-if="showOverlay" class="event-overlay">
        <slot name="overlay">
          <div class="overlay-content">
            <button class="view-event-button">View Event</button>
          </div>
        </slot>
      </div>
    </div>

    <div class="event-info">
      <div class="event-left">
        <h3 class="event-title">{{ event.name }}</h3>
        <div class="event-host">
          <img
            :src="event.hostIcon"
            :alt="event.hostName"
            class="host-icon"
            @error="setDefaultHostIcon"
          />
          <span class="host-name">{{ event.hostName }}</span>
        </div>
      </div>

      <div class="event-center">
        <div class="event-time">
          {{ formatTime(event.startTime, event.endTime) }}
        </div>
      </div>

      <div class="event-right">
        <div class="event-date-badge">
          <div class="date-header"></div>
          <div class="date-content">
            <div class="date-month">{{ formatMonth(event.date) }}</div>
            <div class="date-day">{{ formatDay(event.date) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true,
      validator: (event) => {
        return (
          event &&
          typeof event === "object" &&
          event.name &&
          event.hostName &&
          event.date
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
      validator: (value) => ["default", "featured"].includes(value),
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const imageLoaded = ref(true);

    const handleClick = () => {
      if (props.clickable) {
        emit("click", props.event);
      }
    };

    const handleImageError = () => {
      imageLoaded.value = false;
    };

    const setDefaultHostIcon = (event) => {
      event.target.src =
        "https://cdn.builder.io/api/v1/image/assets/TEMP/eec1278a9f9d25b24068cfd37a6181846fb44173?width=65";
    };

    const formatTime = (startTime, endTime) => {
      if (!startTime || !endTime) return "";
      return `${startTime}\n-\n${endTime}`;
    };

    const formatMonth = (date) => {
      if (!date) return "";
      try {
        return new Date(date).toLocaleDateString("en-US", { month: "short" });
      } catch (error) {
        return "Dec";
      }
    };

    const formatDay = (date) => {
      if (!date) return "";
      try {
        return new Date(date).getDate().toString();
      } catch (error) {
        return "28";
      }
    };

    return {
      imageLoaded,
      handleClick,
      handleImageError,
      setDefaultHostIcon,
      formatTime,
      formatMonth,
      formatDay,
    };
  },
};
</script>

<style scoped>
/* Component now uses global CSS classes defined in components.css */
/* Only component-specific overrides are kept here */
</style>
