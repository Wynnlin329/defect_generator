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
  color: {
    type: String,
    default: 'currentColor',
  },
})

const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg`))
</script>

<template>
  <component
    :is="icon"
    class="svg-icon"
    :width="`${size}`"
    :height="`${size}`"
    aria-hidden="true"
  />
</template>

<style scoped>
.svg-icon {
  color: v-bind(color);
}
</style>
