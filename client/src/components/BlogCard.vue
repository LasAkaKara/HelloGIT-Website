<template>
  <div class="blog-card" @click="handleClick">
    <div class="blog-image-container">
      <img
        :src="blog.image"
        :alt="blog.title"
        class="blog-image"
        @error="handleImageError"
      />
    </div>

    <div class="blog-content">
      <div class="blog-meta">
        <div class="blog-meta-item">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path
              d="M31.6667 33.25V30.0833C31.6667 28.4036 30.9994 26.7927 29.8117 25.605C28.6239 24.4173 27.013 23.75 25.3333 23.75H12.6667C10.987 23.75 9.37605 24.4173 8.18832 25.605C7.00059 26.7927 6.33333 28.4036 6.33333 30.0833V33.25M25.3333 11.0833C25.3333 14.5811 22.4978 17.4167 19 17.4167C15.5022 17.4167 12.6667 14.5811 12.6667 11.0833C12.6667 7.58553 15.5022 4.75 19 4.75C22.4978 4.75 25.3333 7.58553 25.3333 11.0833Z"
              stroke="#757575"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="meta-text">{{ blog.author }}</span>
        </div>

        <div class="blog-meta-item">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path
              d="M25.3333 3.16669V9.50002M12.6667 3.16669V9.50002M4.75 15.8334H33.25M7.91667 6.33335H30.0833C31.8322 6.33335 33.25 7.75112 33.25 9.50002V31.6667C33.25 33.4156 31.8322 34.8334 30.0833 34.8334H7.91667C6.16776 34.8334 4.75 33.4156 4.75 31.6667V9.50002C4.75 7.75112 6.16776 6.33335 7.91667 6.33335Z"
              stroke="#757575"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="meta-text">{{ formatDate(blog.date) }}</span>
        </div>

        <div class="blog-meta-item">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M35 19.1667C35.0057 21.3664 34.4918 23.5365 33.5 25.5C32.3241 27.8529 30.5162 29.8319 28.2791 31.2155C26.0419 32.599 23.4637 33.3323 20.8333 33.3333C18.6336 33.3391 16.4635 32.8251 14.5 31.8333L5 35L8.16667 25.5C7.17489 23.5365 6.66093 21.3664 6.66667 19.1667C6.66768 16.5362 7.40102 13.9581 8.78453 11.7209C10.168 9.48373 12.1471 7.67593 14.5 6.49999C16.4635 5.50821 18.6336 4.99425 20.8333 4.99999H21.6667C25.1406 5.19164 28.4217 6.65792 30.8819 9.11808C33.3421 11.5782 34.8083 14.8594 35 18.3333V19.1667Z"
              stroke="#757575"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="meta-text">{{ formatComments(blog.comments) }}</span>
        </div>
      </div>

      <div class="blog-details">
        <div class="blog-category">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M23.75 26.25L15 20L6.25 26.25V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H21.25C21.913 3.75 22.5489 4.01339 23.0178 4.48223C23.4866 4.95107 23.75 5.58696 23.75 6.25V26.25Z"
              stroke="#1E1E1E"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ blog.category }}</span>
        </div>

        <h3 class="blog-title">{{ blog.title }}</h3>
        <p class="blog-excerpt">{{ blog.excerpt }}</p>

        <button class="blog-read-more" @click.stop="handleReadMore">
          <span>Read More</span>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M6.25 15H23.75M23.75 15L15 6.25M23.75 15L15 23.75"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    blog: {
      type: Object,
      required: true,
      validator: (blog) => {
        return (
          blog &&
          typeof blog === "object" &&
          blog.title &&
          blog.author &&
          blog.date
        );
      },
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["click", "read-more"],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.clickable) {
        emit("click", props.blog);
      }
    };

    const handleReadMore = () => {
      emit("read-more", props.blog);
    };

    const handleImageError = (event) => {
      event.target.src = "https://via.placeholder.com/827x433?text=Blog+Image";
    };

    const formatDate = (date) => {
      if (!date) return "";
      try {
        return new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch (error) {
        return date;
      }
    };

    const formatComments = (comments) => {
      if (!comments && comments !== 0) return "0 Comments";
      return `${String(comments).padStart(2, "0")} Comments`;
    };

    return {
      handleClick,
      handleReadMore,
      handleImageError,
      formatDate,
      formatComments,
    };
  },
};
</script>

<style scoped>
/* Component uses global CSS classes defined in components.css */
</style>
