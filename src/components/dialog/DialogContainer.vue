<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Modal from 'bootstrap/js/dist/modal'

const properties = defineProps({
  title: {
    type: String,
    default: 'Message',
  },

  message: {
    type: String,
    default: '',
    required: true,
  },

  isShowDefaultCloseButton: {
    type: Boolean,
    default: true,
    required: true,
  },

  isShowDefaultButton: {
    type: Boolean,
    default: false,
  },
})

const modal = ref<HTMLElement | null>(null)
const myModal = ref<Modal | null>(null)
const bIsModalShowing = ref(false)

onMounted(() => {
  if (modal.value) {
    myModal.value = new Modal(modal.value)
  }
})

const showDialog = () => {
  if (bIsModalShowing.value == true) {
    return
  }

  bIsModalShowing.value = true

  if (myModal.value != undefined) {
    myModal.value.show()
  }
}

const closeDialog = () => {
  debugger
  bIsModalShowing.value = false

  if (myModal.value != undefined) {
    myModal.value.hide()
  }
}

defineExpose({
  showDialog,
  closeDialog,
})
</script>

<template>
  <teleport to="body">
    <div class="modal fade" tabindex="-1" ref="modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ properties.title }}</h5>

            <div data-bs-theme="dark">
              <button
                class="btn-close"
                v-if="properties.isShowDefaultCloseButton === true"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
          </div>

          <div id="div-content-area">
            <slot></slot>
          </div>

          <div id="div-button-area" v-if="properties.isShowDefaultButton === true">
            <button
              class="btn btn-primary control-buttons"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
#div-content-area {
  margin: 20px;
}

#div-button-area {
  margin: 20px;
}

#div-control-buttons {
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
}

/* from previous app.vue styles */

.modal-dialog {
  display: flex;
  justify-content: center;
  max-width: 80%;
  width: auto !important;
}

.modal-header {
  background: #155cf7;
}

.modal-title {
  color: white;
  width: 100%;
}

.modal-content {
  max-width: 80%;
  width: auto;
}
</style>
