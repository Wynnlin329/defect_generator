<script setup lang="ts">
import NavigateBar from '@/views/NavigateBar.vue'
</script>

<template>
  <div class="d-flex flex-column vh-100">
    <NavigateBar />
    <RouterView />
  </div>
</template>
