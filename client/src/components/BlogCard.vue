<template>
  <div
    class="flex flex-col lg:flex-row justify-center items-center gap-6 bg-white"
    @click="handleClick"
  >
    <!-- Image Container -->
    <div class="w-full lg:w-[827px] h-64 lg:h-[433px] relative">
      <img
        :src="blog.imageUrl || '/images/blog_placeholder.jpg'"
        :alt="blog.title"
        class="w-full h-full object-cover rounded-[20px]"
        @error="handleImageError"
      />
    </div>

    <!-- Content Container -->
    <div class="w-full lg:w-[814px] flex flex-col gap-4">
      <!-- Top Meta Information -->
      <div
        class="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-start text-[#767272]"
      >
        <!-- Author -->
        <div class="flex items-center gap-3">
          <img src="/icons/user_grey.png" alt="user" class="w-6 h-6" />
          <span
            class="text-xl lg:text-[21px] font-bold leading-[120%]"
            style="
              font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
            "
            >{{ blog.author }}</span
          >
        </div>

        <!-- Date -->
        <div class="flex items-center gap-3">
          <img src="/icons/calendar_grey.png" alt="calendar" class="w-6 h-6" />
          <span
            class="text-xl lg:text-[23px] font-bold leading-[120%]"
            style="
              font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
            "
            >{{ formatDate(blog.date) }}</span
          >
        </div>

        <!-- Comments -->
        <div class="flex items-center gap-3">
          <img src="/icons/comment_grey.png" alt="comment" class="w-6 h-6" />
          <span
            class="text-xl lg:text-[23px] font-bold leading-[120%]"
            style="
              font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
            "
            >{{ formatComments(blog.comments) }}</span
          >
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col gap-4">
        <!-- Category Badge -->
        <div
          class="inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-b from-[#E1E1E1] to-[#E1E1E1] rounded-full w-fit"
        >
          <img src="/icons/bookmark.png" alt="bookmark" class="w-6 h-6" />
          <span
            class="text-sm font-bold text-[#333]"
            style="
              font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
            "
            >{{ blog.category }}</span
          >
        </div>

        <!-- Title -->
        <h2
          class="small-section-title text-black"
          style="
            font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
          "
        >
          {{ blog.title }}
        </h2>

        <!-- Description -->
        <p
          class="xs-subtitle text-[#606060]"
          style="
            font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
          "
        >
          {{ blog.summary }}
        </p>

        <!-- Read More Button -->
        <button
          class="flex items-center justify-center gap-3 w-[200px] h-[57px] bg-[#205172] rounded-full text-white text-xl font-normal hover:bg-[#1e4357] transition-colors duration-300"
          style="
            font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
          "
          @click.stop="$emit('handleReadMore', blog)"
        >
          <span>Read More</span>
          <span class="arrow">→</span>
        </button>

        <!-- Delete Button -->
        <button
          v-show="delete"
          @click.stop="$emit('handleDelete', blog._id)"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
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
    delete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click", "handleReadMore", "handleDelete"],
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit("click", this.blog);
      }
    },
    handleImageError(event) {
      event.target.src = "https://via.placeholder.com/827x433?text=Blog+Image";
    },
    formatDate(date) {
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
    },
    formatComments(comments) {
      if (!comments && comments !== 0) return "0 Comments";
      return `${String(comments).padStart(2, "0")} Comments`;
    },
  },
};
</script>
