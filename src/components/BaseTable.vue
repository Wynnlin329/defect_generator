<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Define props
const props = defineProps<{
  headers: { key: string; label: string }[]
  data: Record<string, unknown>[]
  searchKeys: string[]
  notSortableKeys: string[]
  customSlotKeys: string[]
}>()

const searchQuery = ref('')
const sortField = ref<string | null>(props.headers.length ? props.headers[0].key : null)
const sortOrder = ref(1)
const currentPage = ref(1)
const rowsPerPage = ref(10)
const visibleColumns = ref(props.headers.map((header) => header.key))

// Watchers for resetting pagination
watch(searchQuery, () => (currentPage.value = 1))
watch(rowsPerPage, () => (currentPage.value = 1))

// Filtered and sorted data
const filteredData = computed(() =>
  props.data
    .filter((row) =>
      props.searchKeys.some((key) =>
        row[key]?.toString().toLowerCase().includes(searchQuery.value.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      if (!sortField.value || props.notSortableKeys?.includes(sortField.value)) return 0
      return a[sortField.value] > b[sortField.value] ? sortOrder.value : -sortOrder.value
    }),
)

// Column visibility
const filteredHeaders = computed(() =>
  props.headers.filter((header) => visibleColumns.value.includes(header.key)),
)

// Sorting function
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = -sortOrder.value
  } else {
    sortField.value = field
    sortOrder.value = 1
  }
}

// Pagination logic
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return filteredData.value.slice(start, start + rowsPerPage.value)
})
const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage.value))
const prevPage = () => currentPage.value > 1 && currentPage.value--
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++

// Utility functions
const highlightText = (text: string | number) => {
  if (!searchQuery.value) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.toString().replace(regex, `<span style="background-color: pink;">$1</span>`)
}

const reloadTable = () => {
  searchQuery.value = '' // Placeholder for fetching new data
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<template>
  <div container-fluid w-100>
    <!-- Toolbar Buttons -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <!-- Left: Button Sets -->
      <div class="btn-group dropend">
        <!-- Reload button -->
        <button class="btn btn-primary" @click="reloadTable">↻</button>
        <!-- Full Screen button -->
        <button class="btn btn-primary" @click="toggleFullScreen">⛶</button>
        <!-- Toggle display button -->
        <button
          class="btn btn-primary last-group-btn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          ☰
        </button>
        <ul class="dropdown-menu" data-bs-auto-close="outside">
          <li v-for="header in headers" :key="header.key">
            <label class="dropdown-item" @click.stop>
              <input type="checkbox" v-model="visibleColumns" :value="header.key" @click.stop />
              {{ header.label }}
            </label>
          </li>
        </ul>
      </div>

      <!-- Right: Search Bar -->
      <div class="search-container">
        <div class="position-relative">
          <input
            v-model="searchQuery"
            class="form-control clearable-input"
            placeholder="Search..."
          />
          <span v-if="searchQuery" class="clear-icon" @click="searchQuery = ''">×</span>
        </div>
      </div>
    </div>

    <!-- Dynamic Table -->
    <table class="table table-striped table-hover table-borderness text-center">
      <thead>
        <tr>
          <th
            v-for="header in filteredHeaders"
            :key="header.key"
            @click="!notSortableKeys.includes(header.key) && sortBy(header.key)"
            :class="{ sortable: !notSortableKeys.includes(header.key) }"
          >
            {{ header.label }}
            <span v-if="sortField === header.key">
              <span v-if="sortOrder === 1"> ▼ </span>
              <span v-else> ▲ </span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Show filtered results -->
        <template v-if="paginatedData.length">
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td v-for="header in filteredHeaders" :key="header.key">
              <span
                v-if="!customSlotKeys.includes(header.key)"
                v-html="highlightText(row[header.key])"
              ></span>
              <slot v-else :name="header.key" :row="row"></slot>
            </td>
          </tr>
        </template>

        <!-- No matching records found -->
        <tr v-else>
          <td :colspan="filteredHeaders.length" class="text-center">No matching records found</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <label>Showing &nbsp;</label>
        <select v-model="rowsPerPage" class="form-select form-select-sm w-auto">
          <option v-for="option in [10, 25]" :key="option" :value="option">{{ option }}</option>
        </select>
        <label> &nbsp;rows per page</label>
      </div>
      <div class="pagination-container">
        <!-- Previous Button -->
        <button class="page-btn page-prev-btn" @click="prevPage" :disabled="currentPage === 1">
          &lt;
        </button>

        <!-- Page Numbers -->
        <button
          v-for="page in totalPages"
          :key="page"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <!-- Next Button -->
        <button
          class="page-btn page-next-btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* tool bar group button */
.btn-group .btn {
  margin-right: 0px;
}

.btn-group .last-group-btn {
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}

/* table search input */
.search-container {
  width: 150px;
}

/* table style */
th {
  cursor: pointer;
  user-select: none; /* Prevent text selection when clicking */
  padding-right: 5px;
}

th span {
  font-size: 12px;
  color: #007bff;
}

th.sortable {
  cursor: pointer;
}

th:not(.sortable) {
  cursor: default;
}
.table-borderness {
  border-collapse: collapse;
}

.table-borderness th,
.table-borderness td {
  border-left: none !important;
  border-right: none !important;
}

.table-borderness thead th {
  border-top: 1px solid #dee2e6 !important; /* Keeps header top border */
  border-bottom: 2px solid #dee2e6 !important; /* Keeps header bottom border */
  font-size: 16px;
  vertical-align: middle;
}

.table-borderness tbody tr {
  border-bottom: 1px solid #dee2e6 !important; /* Keeps row separators */
  font-size: 14px;
  vertical-align: middle;
}

/* pagination style */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-next-btn {
  width: 30px !important;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}

.page-prev-btn {
  width: 30px !important;
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
}

.page-btn {
  width: 34px;
  height: 34px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ddd;
  background-color: white;
  color: #007bff;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.page-btn:hover {
  background-color: #f0f0f0;
}

.page-btn.active {
  background-color: #0057ff;
  color: white;
  border: none;
}

.clearable-input {
  padding-right: 30px; /* Space for the clear button */
}

.clear-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #888;
}

.clear-icon:hover {
  color: black;
}
</style>
