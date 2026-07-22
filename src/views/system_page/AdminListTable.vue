<script setup lang="ts">
import { ref, computed } from 'vue'
import { Modal } from 'bootstrap'
import GenericTable from '@/components/BaseTable.vue'

interface AdminRow {
  no: number
  account: string
  name: string
  role: string
  permission: number
  lastModification: string
  modifiedBy: string
  edit: string
}

// Dump data
const adminHeaders = ref([
  { key: 'no', label: 'No.' },
  { key: 'account', label: 'ASUS Account' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'permission', label: 'Permission' },
  { key: 'lastModification', label: 'Last Modification' },
  { key: 'modifiedBy', label: 'Modified By' },
  { key: 'edit', label: 'Edit' },
])

const adminData = ref<AdminRow[]>([
  {
    no: 1,
    account: 'Sam_Ku@asus.com',
    name: 'Sam Ku',
    role: 'Superadmin',
    permission: 1,
    lastModification: '2025-01-10 11:12:04',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 2,
    account: 'iot@asus.com',
    name: 'System Admin',
    role: 'Admin',
    permission: 1,
    lastModification: '2025-01-10 11:12:04',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 3,
    account: 'Claire_Teng@asus.com',
    name: 'Claire Teng',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-25 03:34:18',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 4,
    account: 'John_Lee@asus.com',
    name: 'John Lee',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-25 03:34:18',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 5,
    account: 'Chris_Tseng@asus.com',
    name: 'Chris Tseng',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-25 03:34:18',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 6,
    account: 'Edward_Kuo@asus.com',
    name: 'Edward Kuo',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-25 03:34:18',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 7,
    account: 'Fuxiong_Xu@asus.com',
    name: 'Fuxiong Xu',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:49:02',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 8,
    account: 'Kelvin_Hong@asus.com',
    name: 'Kelvin Hong',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:48:17',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 9,
    account: 'Sean4_Chen@asus.com',
    name: 'Sean4 Chen',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:48:17',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 10,
    account: 'Yanru_Su@asus.com',
    name: 'Yanru Su',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:46:59',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 11,
    account: 'Cindy1_Chen@asus.com',
    name: 'Cindy1 Chen',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:46:15',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 12,
    account: 'Tina1_Liao@asus.com',
    name: 'Tina1 Liao',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:46:15',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 13,
    account: 'Ivy5_Yang@asus.com',
    name: 'Ivy5 Yang',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:44:06',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 14,
    account: 'Rueng_Tsai@asus.com',
    name: 'Rueng Tsai',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:43:22',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 15,
    account: 'William_Xiang@asus.com',
    name: 'William Xiang',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:42:36',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 16,
    account: 'Lillian1_Li@asus.com',
    name: 'Lillian1 Li',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:41:45',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 17,
    account: 'Eliana_Zhou@asus.com',
    name: 'Eliana Zhou',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:40:57',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 18,
    account: 'Rico_Lee@asus.com',
    name: 'Rico Lee',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:40:09',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 19,
    account: 'May_Lin@asus.com',
    name: 'May Lin',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:39:14',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 20,
    account: 'Irisa_Lin@asus.com',
    name: 'Irisa Lin',
    role: 'Admin',
    permission: 1,
    lastModification: '2024-12-24 02:39:14',
    modifiedBy: 'System Admin',
    edit: '',
  },
  {
    no: 21,
    account: 'Laurence_Cheng@asus.com',
    name: 'Laurence Cheng',
    role: 'Admin',
    permission: 0,
    lastModification: '2024-12-24 02:35:54',
    modifiedBy: 'System Admin',
    edit: '',
  },
])

// Edit Modal
const selectedRow = ref<AdminRow>({
  no: 0,
  account: '',
  name: '',
  role: '',
  permission: 0,
  lastModification: '',
  modifiedBy: '',
  edit: '',
})

let modalInstance: Modal | null = null
const openEditModal = (row: Record<string, unknown>) => {
  selectedRow.value = { ...(row as unknown as AdminRow) } // Clone row data to prevent direct modification
  console.log(selectedRow.value.permission)
  if (!modalInstance) {
    modalInstance = new Modal(document.getElementById('editModal') as HTMLElement)
  }
  modalInstance.show()
}

const isPermissionDeactivated = computed({
  get: () => selectedRow.value.permission === 0, // Convert string to boolean
  set: (value) => {
    selectedRow.value.permission = value ? 0 : 1 // Convert back to string
  },
})

const saveChanges = () => {
  console.log('Updated Data:', selectedRow.value)
  const index = adminData.value.findIndex((row) => row.account === selectedRow.value.account)
  if (index !== -1) {
    adminData.value[index] = { ...selectedRow.value }
  }
  modalInstance?.hide() // Close modal after saving
}
</script>

<template>
  <GenericTable
    :headers="adminHeaders"
    :data="adminData"
    :searchKeys="['account', 'name', 'role', 'lastModification', 'modifiedBy']"
    :notSortableKeys="['edit']"
    :customSlotKeys="['permission', 'edit']"
  >
    <template #permission="{ row }">
      <label class="activate" :class="{ deactive: row.permission === 0 }">
        {{ row.permission === 1 ? 'Activate' : 'Deactivate' }}
      </label>
    </template>

    <template #edit="{ row }">
      <a href="#" @click.prevent="openEditModal(row)">Edit</a>
    </template>
  </GenericTable>

  <!-- Edit Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered edit-modal">
      <div class="modal-content">
        <div class="modal-header text-white">
          <h6 class="modal-title fw-bold">Edit</h6>
          <button
            type="button"
            class="btn text-white fw-bold"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            x
          </button>
        </div>

        <div class="modal-body" style="font-size: 14px">
          <!-- ASUS Account (Read-Only) -->
          <div class="mb-3">
            <label class="form-label fw-bold">ASUS Account</label>
            <input type="text" class="form-control" :value="selectedRow.account" disabled />
          </div>

          <!-- Role Selection -->
          <div class="mb-3">
            <label class="form-label fw-bold"><span class="text-danger">*</span>Role</label>
            <select v-model="selectedRow.role" class="form-select" style="font-size: 14px">
              <option value="Admin" style="font-size: 14px">Admin</option>
              <option value="Superadmin" style="font-size: 14px">Superadmin</option>
            </select>
          </div>

          <!-- Deactivate Permission Checkbox -->
          <div class="mb-3">
            <label class="form-label fw-bold"><span class="text-danger">*</span>Permission</label>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="isPermissionDeactivated" />
              <label class="form-check-label">Deactivate</label>
            </div>
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-center gap-3">
          <button type="button" class="cancel-button text-primary fw-bold" data-bs-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="save-button text-white fw-bold" @click="saveChanges">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activate {
  display: inline-block;
  background-color: #e6f4ea;
  color: #008d61;
  font-weight: bold;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  cursor: default;
}

.deactive {
  background-color: #fdecec;
  color: #d32f2f;
}

.btn-close {
  font-size: 1 rem;
  color: white !important; /* Make text white */
  text-shadow: none; /* Remove any shadow */
  opacity: 1; /* Ensure full visibility */
}

.edit-modal {
  max-width: 400px !important;
}

.modal-header {
  height: 50px;
  background-color: #007bff;
}

.cancel-button {
  font-size: 12px;
  border: 2px solid #007bff;
  background-color: transparent;
  color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
}

.save-button {
  font-size: 12px;
  border: 2px solid #007bff;
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
}
</style>
