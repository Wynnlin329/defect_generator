<script lang="ts" setup>
defineProps({
  progress: {
    type: Number,
    default: 0,
    required: true,
    validator: (value: number) => value >= 0 && value <= 100,
  },
})
</script>

<template>
  <div class="progress-circle" :style="{ '--progress': progress + '%' }">
    <span>{{ progress }}%</span>
  </div>
</template>

<style scoped>
.progress-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(#0152ec var(--progress), #d4d4d4 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  position: relative;
}

.progress-circle::before {
  content: '';
  position: absolute;
  width: 80%;
  height: 80%;
  background-color: #efefef;
  border-radius: 50%;
}

.progress-circle span {
  position: relative;
}
</style>
