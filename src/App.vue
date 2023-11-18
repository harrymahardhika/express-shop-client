<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />

  <div class="container max-w-screen-md mx-auto mb-10">
    <RouterView />
  </div>
</template>
