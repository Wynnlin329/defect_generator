<script setup lang="ts">
import { ref } from 'vue'
import GenericTable from '@/components/BaseTable.vue'

// Dump data
const userHeaders = ref([
  { label: 'No', key: 'no' },
  { label: 'ASUS Account', key: 'account' },
  { label: 'Name', key: 'name' },
  { label: 'Company', key: 'company' },
  { label: 'Times', key: 'times' },
  { label: 'Last Modification', key: 'lastModification' },
  { label: 'Usage Log', key: 'log' },
  { label: 'Edit', key: 'edit' },
  { label: 'Details', key: 'details' },
])

const userData = ref([
  {
    no: 1,
    account: 'Sam_Ku@asus.com',
    name: 'Sam Ku',
    company: 'ASUS',
    times: '10/10',
    lastModification: '2025-01-10 11:12:04',
    log: '',
    edit: '',
    details: '',
  },
])
</script>

<template>
  <GenericTable
    :headers="userHeaders"
    :data="userData"
    :searchKeys="['account', 'name', 'company', 'times', 'lastModification', 'modifiedBy']"
    :notSortableKeys="['log', 'edit', 'details']"
    :customSlotKeys="['log', 'edit', 'details']"
  >
    <template #log="{}">
      <a href="#" @click.prevent="">Usage log</a>
    </template>

    <template #edit="{}">
      <a href="#" @click.prevent="">Edit</a>
    </template>

    <template #details="{}">
      <a href="#" @click.prevent="">Details</a>
    </template>
  </GenericTable>
</template>
