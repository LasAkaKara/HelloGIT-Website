<template>
  <Header />
  <div>
    <p class="page-title text-tertiary">Page Title</p>
    <p class="page-subtitle">Page Subtitle</p>
    <p class="section-title">Section Title</p>
    <p class="section-subtitle">Section Subtitle</p>
    <p class="since">Button Text</p>
    <p class="small-section-title">Small Section Title</p>
    <p class="xs-title">XS Title</p>
    <p class="xs-subtitle">XS Subtitle</p>
  </div>
  <button class="button">
    Button
    <span class="arrow">→</span>
  </button>
  <Footer />
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
