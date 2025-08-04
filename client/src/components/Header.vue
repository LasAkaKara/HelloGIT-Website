<script>
export default {
  data() {
    return {
      isOpen: false,
      navLinks: [
        { path: "/", name: "Home" },
        { path: "/event", name: "Event" },
        { path: "/blog", name: "Blog" },
        { path: "/project", name: "Project" },
        { path: "/about", name: "About Us" },
      ],
    };
  },
  computed: {
    isActive() {
      return (path) =>
        this.$route.path === path ||
        (path !== "/" && this.$route.path.startsWith(path));
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<template>
  <nav class="sticky top-0 bg-white z-50">
    <div
      class="px-4 md:px-10 py-4 mx-auto md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <a href="#" class="flex items-center">
          <img
            class="max-h-6 w-auto md:max-h-8 object-contain"
            src="../../icons/logo.png"
            alt="Logo"
          />
          <img
            class="max-h-5 mx-1 w-auto md:max-h-6 object-contain"
            src="../../icons/name.png"
          />
        </a>
        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button
            @click="toggleMenu"
            type="button"
            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            :aria-expanded="isOpen"
            aria-label="Toggle menu"
          >
            <!-- Hamburger icon -->
            <img
              v-if="!isOpen"
              src="../../public/icons/menu.png"
              alt="menu"
              class="w-6 h-6"
            />
            <!-- Close icon -->
            <img
              v-else
              src="../../public/icons/close.png"
              alt="close"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Navigation Links -->
      <div
        :class="[
          'absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white',
          'md:relative md:flex md:items-center md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:p-0',
          isOpen
            ? 'translate-x-0 opacity-100'
            : 'opacity-0 -translate-x-full md:translate-x-0 md:opacity-100',
        ]"
      >
        <div
          class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block mx-5 navigation-text"
            :class="{
              'font-medium text-[#0640ae]': isActive(link.path),
              'text-grey-500': !isActive(link.path),
            }"
            @click="isOpen = false"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
