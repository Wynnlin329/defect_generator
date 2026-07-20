<script setup lang="ts">
import { ref } from 'vue'
import GenericTable from '@/components/BaseTable.vue'

// Dump data
const announceHeaders = ref([
  { label: 'Pic', key: 'pic' },
  { label: 'Title', key: 'title' },
  { label: 'Published date', key: 'publish' },
  { label: 'Removal date', key: 'removal' },
  { label: 'Language', key: 'language' },
  { label: 'Last Modification', key: 'lastModification' },
  { label: 'Modified By', key: 'modifiedBy' },
  { label: 'Edit', key: 'edit' },
])

const announceData = ref([])
</script>

<template>
  <GenericTable
    :headers="announceHeaders"
    :data="announceData"
    :searchKeys="[
      'pic',
      'name',
      'publish',
      'removal',
      'language',
      'lastModification',
      'modifiedBy',
      'edit',
    ]"
    :notSortableKeys="['pic', 'edit']"
    :customSlotKeys="['pic', 'edit']"
  >
    <template #edit="{}">
      <a href="#" @click.prevent="">Edit</a>
    </template>
  </GenericTable>
</template>
