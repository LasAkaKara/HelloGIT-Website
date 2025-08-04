<template>
  <div class="relative w-full">
    <button
      @click="toggleDropdown"
      :class="[
        'flex items-center justify-between w-full h-full px-3 sm:px-4 py-2 rounded-3xl border transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        variant === 'primary'
          ? 'bg-primary-blue text-white border-primary-blue hover:bg-primary-blue-dark'
          : 'bg-white text-primary-blue border-primary-blue hover:bg-gray-50',
      ]"
    >
      <div class="flex items-center gap-2">
        <!-- Icon -->
        <component :is="'div'" v-if="icon" v-html="icon"></component>
        <img
          v-else-if="iconSrc"
          :src="iconSrc"
          :alt="label"
          class="w-4 h-4 sm:w-5 sm:h-5"
        />

        <!-- Label -->
        <span
          class="text-sm sm:text-base font-medium whitespace-nowrap"
          style="font-family: Poppins"
        >
          {{ selectedValue || label }}
        </span>
      </div>

      <!-- Dropdown Arrow -->
      <img src="/icons/arrow_down.png" alt="arrow_down" class="w-4 h-4" />
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-auto"
      >
        <div class="py-1">
          <button
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            :class="[
              'w-full text-left px-4 py-2.5 text-sm sm:text-base hover:bg-gray-50 transition-colors',
              selectedValue === option
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700',
            ]"
            style="font-family: Poppins"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Backdrop -->
    <div v-if="isOpen" @click="closeDropdown" class="fixed inset-0 z-40"></div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "FilterDropdown",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    iconSrc: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "secondary",
      validator: (value) => ["primary", "secondary"].includes(value),
    },
    icon: {
      type: String,
      default: null,
    },
    iconSrc: {
      type: String,
      default: null,
    },
    iconWidth: {
      type: [String, Number],
      default: 35,
    },
    iconHeight: {
      type: [String, Number],
      default: 35,
    },
    variant: {
      type: String,
      default: "secondary", // 'primary' or 'secondary'
      validator: (value) => ["primary", "secondary"].includes(value),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isOpen = ref(false);

    const selectedValue = computed(() => props.modelValue);

    const backgroundColor = computed(() => {
      return props.variant === "primary"
        ? "bg-primary-teal"
        : "bg-gradient-to-b from-gray-medium to-gray-medium";
    });

    const textColor = computed(() => {
      return props.variant === "primary" ? "text-white" : "text-black";
    });

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const closeDropdown = () => {
      isOpen.value = false;
    };

    const selectOption = (option) => {
      emit("update:modelValue", option);
      closeDropdown();
    };

    return {
      isOpen,
      selectedValue,
      backgroundColor,
      textColor,
      toggleDropdown,
      closeDropdown,
      selectOption,
    };
  },
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
