<template>
  <div class="flex-1">
    <div
      class="flex items-center h-12 md:h-14 border border-primary-blue rounded-3xl bg-white px-4 w-full"
    >
      <div class="flex-1 px-2">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          @keyup.enter="$emit('search', $event.target.value)"
          type="text"
          :placeholder="placeholder"
          class="w-full text-base md:text-lg lg:text-xl font-normal text-gray-text bg-transparent border-none outline-none"
          style="font-family: Poppins"
        />
      </div>
      <div class="flex items-center">
        <button
          v-if="modelValue"
          @click="clearSearch"
          class="p-1 text-gray-400 hover:text-gray-600 mr-2"
        ></button>
        <button
          @click="$emit('search', modelValue)"
          class="p-1 text-primary-blue hover:text-blue-700 transition-colors"
        >
          <img
            src="/icons/search.png"
            alt="search"
            class="w-5 h-5 md:w-6 md:h-6"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Search...",
    },
  },
  emits: ["update:modelValue", "search"],
  methods: {
    clearSearch() {
      this.$emit("update:modelValue", "");
      this.$emit("search", "");
    },
  },
};
</script>
