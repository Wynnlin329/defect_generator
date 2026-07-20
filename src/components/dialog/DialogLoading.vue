<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Modal from 'bootstrap/js/dist/modal'

// const properties = defineProps({
//   title: {
//     type: String,
//     default: 'Message',
//   },

//   message: {
//     type: String,
//     default: '',
//     required: true,
//   },

//   isShowDefaultCloseButton: {
//     type: Boolean,
//     default: true,
//     required: true,
//   },

//   isShowDefaultButton: {
//     type: Boolean,
//     default: false,
//   },
// })

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
    <div
      class="modal fade"
      tabindex="-1"
      ref="modal"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="spinner-border text-primary" role="status"></div>
          <div id="div-content">Loading</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
#div-content {
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-content {
  position: relative;
  border-radius: 50%;
  padding: 10px;
}

.spinner-border {
  min-width: 300px;
  min-height: 300px;
  border: 50%;
}
</style>
