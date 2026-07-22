<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../../components/dialog/DialogContainer.vue'
import type { AnnouncementItemData } from './AnnouncementItemData'

const properties = withDefaults(defineProps<AnnouncementItemData>(), {
  date_time: '0000/00/00 00:00',
  message: '',
})

const dialogShowMessage = ref<InstanceType<typeof ModalComponent> | null>(null)

function OnDownloadFileClicked() {
  console.log('doanload file')
}
</script>

<template>
  <div id="div-main">
    <div id="div-title">
      <div class="div-date-time">{{ properties.date_time }}</div>
      <button
        id="btn-view-all"
        type="button"
        class="btn"
        v-on:click="dialogShowMessage?.showDialog()"
      >
        View All →
      </button>
    </div>

    <div id="div-message-area">
      <span class="span-message-type">[SYSTEM]</span>
      <div class="div-message">{{ properties.message }}</div>
    </div>

    <div class="horizontal-divider"></div>
  </div>

  <ModalComponent
    ref="dialogShowMessage"
    title="Announcement"
    message=""
    :is-show-default-close-button="true"
  >
    <div id="div-dialog-main">
      <div class="div-date-time">{{ properties.date_time }}</div>
      <span class="span-message-type">[SYSTEM]</span>
      <div class="div-message div-message-full">{{ properties.message }}</div>

      <button id="btn-download" type="button" class="btn" v-on:click="OnDownloadFileClicked">
        <AppIcon name="file_save" type="svg" :size="22"></AppIcon>
        File Name.FileFormat
      </button>
    </div>
  </ModalComponent>
</template>

<style scoped>
#div-dialog-main {
  min-width: 400px;
  min-height: 200px;
  position: relative;
}

#div-main {
  padding: 0px;
}

#btn-download {
  color: #155cf7;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0px;
}

#img-download-file-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

#div-title {
  display: flex;
  justify-content: left;
  align-items: center;
}

.span-message-type {
  color: #0152ec;
  font-weight: 600;
}

#btn-view-all {
  min-width: 120px;
  color: #0152ec;
  font-weight: 600;
}

.div-date-time {
  width: 100%;
  font-size: 14px;
  font-weight: 900;
}

.div-message {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.div-message-full {
  -webkit-line-clamp: 999;
}
</style>
