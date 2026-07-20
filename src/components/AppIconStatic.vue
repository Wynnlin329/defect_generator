<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 30,
  },
})

const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg?skipsvgo`))
</script>

<template>
  <component :is="icon" :width="`${size}`" :height="`${size}`" aria-hidden="true" />
</template>
