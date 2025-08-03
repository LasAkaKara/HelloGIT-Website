<template>
  <div
    class="inline-flex flex-col gap-3 items-start rounded-3xl relative hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
    @click="handleClick"
  >
    <!-- Upper Frame - Event Image -->
    <div class="w-full relative mb-4" style="aspect-ratio: 537/344">
      <img
        :src="eventData.imageUrl || '/public/images/event_placeholder.png'"
        :alt="eventData.title || 'Event Image'"
        class="absolute inset-0 w-full h-full object-cover rounded-3xl"
        @error="handleImageError"
      />
    </div>

    <!-- Lower Frame - Event Details -->
    <div
      class="w-full h-auto relative flex items-center justify-between px-1 pb-4"
    >
      <!-- Left Frame - Event Name and Host -->
      <div class="flex flex-col gap-2 flex-1 max-w-[60%]">
        <h3
          class="text-2xl font-bold text-black leading-tight font-[Poppins] truncate"
        >
          {{ eventData.title || "Open Day" }}
        </h3>
        <div class="flex items-center gap-3">
          <img src="/icons/user.png" class="w-6 h-6 object-cover rounded" />
          <span class="text-xl text-black font-[Poppins] font-normal truncate">
            {{ eventData.location || "HelloGIT" }}
          </span>
        </div>
      </div>

      <!-- Center Frame - Time -->
      <div
        class="flex flex-col items-center justify-center text-center min-w-[62px] mx-4"
      >
        <div
          class="text-2xl text-black font-[Poppins] font-normal leading-[78%] whitespace-pre-line"
        >
          {{ formatTime() }}
        </div>
      </div>

      <!-- Right Frame - Date Badge -->
      <div
        class="flex flex-col items-center justify-center w-14 h-[68px] rounded-[10px] bg-black bg-opacity-15 relative overflow-hidden"
      >
        <!-- Blue header section -->
        <div class="w-full h-8 bg-[#225072] absolute top-0 z-10"></div>

        <!-- Date content -->
        <div
          class="flex flex-col items-center bg-[#d9d9d9] justify-center w-full h-full text-center relative px-1"
        >
          <div
            class="text-2xl font-[Poppins] font-normal leading-none text-white z-20"
          >
            {{ formatMonth() }}
          </div>
          <div
            class="text-2xl text-black font-[Poppins] font-normal leading-none"
          >
            {{ formatDay() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Button -->
    <button
      v-show="delete"
      @click.stop="$emit('handleDelete', eventData._id)"
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Delete
    </button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CardEvent",
  props: {
    eventData: {
      type: Object,
      default: () => ({
        name: "Open Day",
        hostName: "HelloGIT",
        image: "/images/event_placeholder.png",
        startTime: "15:30",
        endTime: "16:30",
        date: new Date("2024-12-28"),
      }),
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
  emits: ["click"],
  setup(props, { emit }) {
    const imageLoaded = ref(true);

    const handleClick = () => {
      if (props.clickable) {
        emit("click", props.eventData);
      }
    };

    const handleImageError = (event) => {
      imageLoaded.value = false;
      event.target.src = "/images/event_placeholder.png";
    };

    const formatTime = () => {
      if (!props.eventData.dateStart) return "15:30\n-\n16:30";

      const startDate = new Date(props.eventData.dateStart);
      const endDate = props.eventData.dateEnd
        ? new Date(props.eventData.dateEnd)
        : startDate;

      const startTime = startDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const endTime = endDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return `${startTime}\n-\n${endTime}`;
    };

    const formatMonth = () => {
      if (!props.eventData.dateStart) return "Dec";
      try {
        return new Date(props.eventData.dateStart).toLocaleDateString("en-US", {
          month: "short",
        });
      } catch (error) {
        return "Dec";
      }
    };

    const formatDay = () => {
      if (!props.eventData.dateStart) return "28";
      try {
        return new Date(props.eventData.dateStart).getDate().toString();
      } catch (error) {
        return "28";
      }
    };

    return {
      imageLoaded,
      handleClick,
      handleImageError,
      formatTime,
      formatMonth,
      formatDay,
    };
  },
};
</script>
