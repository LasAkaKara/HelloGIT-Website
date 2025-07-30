<template>
  <div class="about-card">
    <div class="about-card-image-container">
      <img
        :src="member.image"
        :alt="member.name"
        class="about-card-image"
        @error="handleImageError"
      />
    </div>
    <div class="about-card-content">
      <div class="about-card-header">
        <h3 class="about-card-name">{{ member.name }}</h3>
        <p class="about-card-role">{{ member.role }}</p>
      </div>
      <div class="about-card-body">
        <p class="about-card-description">{{ member.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUsCard",
  props: {
    member: {
      type: Object,
      required: true,
      validator(value) {
        return (
          value &&
          typeof value.name === "string" &&
          typeof value.role === "string" &&
          typeof value.description === "string" &&
          typeof value.image === "string"
        );
      },
    },
  },
  methods: {
    handleImageError(event) {
      // Set a default placeholder image if the original fails to load
      event.target.src =
        "https://cdn.builder.io/api/v1/image/assets/TEMP/placeholder-avatar.jpg";
    },
  },
};
</script>
