<template>
  <Header />

  <div class="space-y-8 md:space-y-20" id="home">
    <section
      class="md:mx-6 lg:mx-12 relative w-full h-[35vh] md:h-[87vh] md:rounded-4xl overflow-hidden bg-cover bg-center"
      style="background-image: url('../../public/images/hero-background.png')"
      id="hero"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/0"
      ></div>

      <!-- Texts -->
      <div
        class="relative z-10 flex flex-col gap-4 text-white px-6 sm:px-12 top-1/2 -translate-y-1/2"
      >
        <p class="since text-left">Since 2021</p>
        <p class="page-title text-center md:text-left text-white">HELLOGIT</p>
        <p class="page-subtitle text-right md:text-left text-white">
          We are University of Greenwich
        </p>
        <p class="page-subtitle text-right md:text-left text-white">
          Information Technology club.
        </p>
      </div>

      <button
        class="hidden absolute z-50 bottom-20 right-30"
        @click="navigateToAbout"
      >
        About Us]
        <span class="arrow">→</span>
      </button>
    </section>

    <section class="body-container" id="highlights">
      <div class="container grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="flex flex-col items-center">
          <img
            src="../../public/images/lastest_event.png"
            alt="Latest Event"
            class="rounded-3xl md:max-h-[87vh] w-full object-cover"
          />
        </div>

        <div
          class="flex flex-col items-center justify-center md:items-start px-5 mx-auto text-center md:text-left"
        >
          <p class="xs-title bg-primary text-white px-5 py-2 mb-4">
            LATEST EVENT
          </p>
          <h2 class="section-title">Code Challenge 2025</h2>

          <p class="mt-3 section-subtitle line-clamp-5 md:line-clamp-7">
            Huynh Tan Canh is the host of this show, he is Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Aliquam rhoncus bibendum congue.
            Proin aliquet quam pulvinar risus mollis, eu tincidunt purus varius.
            Duis auctor neque magna, in facilisis nisi sollicitudin a.
            Vestibulum mattis sem ut felis tempor egestas at id nunc. Phasellus
            non convallis arcu. Suspendisse fermentum blandit risus, sit amet
            egestas neque vehicula vitae.
          </p>

          <a
            href="#"
            class="inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-gray-700 transition-colors duration-300 transform bg-white border border-gray-200 rounded-lg hover:bg-gray-100 sm:w-auto focus:ring focus:ring-gray-200 focus:ring-opacity-80"
          >
            Start now
          </a>
        </div>
      </div>
    </section>

    <!-- Banner Section -->
    <section class="body-container py-12 md:py-16">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
      >
        <div class="md:w-2/3">
          <h2 class="section-title text-gray-800 mb-4">Explore Our Project</h2>
          <h3 class="section-title text-gray-800 mb-6">Collection</h3>
          <p class="section-subtitle text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            rhoncus bibendum congue. Proin aliquet quam pulvinar risus mollis,
            eu tincidunt purus varius. Duis auctor neque magna, in
          </p>
          <button
            class="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition"
          >
            <span class="button-text">View More</span>
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
              <path
                d="M6.25 15H23.75M23.75 15L15 6.25M23.75 15L15 23.75"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="body-container py-12 md:py-16">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <!-- Large featured card -->
        <div class="md:col-span-1 lg:col-span-1">
          <div
            class="relative bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white h-full min-h-[300px] md:min-h-[400px]"
          >
            <div class="absolute top-4 left-4">
              <span
                class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full"
                >TRAINING SESSION</span
              >
            </div>
            <div class="absolute bottom-6 left-6 right-6">
              <p class="text-sm mb-2">
                Beyond the Pixel: Dive into Computer Vision
              </p>
              <div class="flex items-center gap-2 text-xs mb-4">
                <span>🕐 09 AM - 12 AM</span>
                <span>📅 EVERY SATURDAY</span>
                <span>📍 IT INNOVATION TECH LAB</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs">TUTOR BY</p>
                  <p class="font-semibold">DR. HO HAI VAN</p>
                </div>
                <div
                  class="bg-white text-purple-800 px-3 py-1 rounded text-xs font-medium"
                >
                  SCAN ME
                </div>
              </div>
            </div>
            <div
              class="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Medium cards -->
        <div class="md:col-span-1 lg:col-span-1">
          <div
            class="relative rounded-2xl overflow-hidden h-full min-h-[300px] md:min-h-[400px]"
          >
            <img
              src="../../public/images/gallery-1.jpg"
              alt="Students working"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>

        <div class="md:col-span-1 lg:col-span-1">
          <div
            class="relative rounded-2xl overflow-hidden h-full min-h-[300px] md:min-h-[400px]"
          >
            <img
              src="../../public/images/gallery-2.jpg"
              alt="Architecture"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Bottom row -->
        <div class="md:col-span-1">
          <div
            class="relative rounded-2xl overflow-hidden h-full min-h-[250px]"
          >
            <img
              src="../../public/images/gallery-3.jpg"
              alt="Student working"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>

        <div class="md:col-span-1">
          <div
            class="relative rounded-2xl overflow-hidden h-full min-h-[250px]"
          >
            <img
              src="../../public/images/gallery-4.jpg"
              alt="Architecture view"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>

        <div class="md:col-span-1">
          <div
            class="relative rounded-2xl overflow-hidden h-full min-h-[250px]"
          >
            <img
              src="../../public/images/gallery-5.jpg"
              alt="Student portrait"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <Footer />
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
