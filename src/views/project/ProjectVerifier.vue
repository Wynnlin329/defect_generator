<script setup lang="ts">
import { reactive, onMounted } from 'vue'

// defineProps 用來接收父元件傳入的 props
defineProps({})

// defineEmits 用來定義元件可以發出的事件
defineEmits([])

// 狀態與邏輯
const state = reactive({
  noImages: false,
  images: [
    {
      id: 1,
      src: '@/assets/images/home_page_images/01.png',
      name: 'aa',
    },
    {
      id: 2,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytytr',
    },
    {
      id: 5,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytryrt',
    },
    {
      id: 5,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytryrt',
    },
    {
      id: 5,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytryrt',
    },
    {
      id: 4,
      src: '@/assets/images/home_page_images/01.png',
      name: 'yhyyyrt',
    },
    {
      id: 5,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytryrt',
    },
    {
      id: 5,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytryrt',
    },
    {
      id: 5,
      src: '@/assets/images/home_page_images/01.png',
      name: 'trytryrt',
    },
  ],
})

onMounted(() => {
  console.log('Component mounted')
  // await API
})
</script>

<template>
  <div class="container-fluid px-2 px-md-3 px-lg-4 overflow-x-hidden">
    <div class="row">
      <div class="col-12 col-md-8 d-flex flex-column mb-2 mb-md-0">
        <div class="d-flex">
          <h5 class="fw-bolder text-truncate">AISVISION_Project_V1.0.0GUI_release</h5>
          <div class="mx-2">
            <AppIcon name="pen" type="svg" :size="30" color=""></AppIcon>
          </div>
          <div>
            <small class="badge text-info text-bg-info bg-opacity-25">Anomaly Detection</small>
          </div>
        </div>
        <small class="text-scondary">Lorem Ipsum er ganske enkelt fyldtekst fraiindustrien..</small>
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-md-end">
        <div>
          <span class="fs-6">
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </span>
        </div>
      </div>
    </div>
    <hr />
    <div class="v-content">
      <div v-if="state.noImages">
        <AppIcon name="noImages" type="svg" :size="72" color=""></AppIcon>
        <p class="fw-bold">There are no images to verify.</p>
        <p class="fw-bold">Please add images on "Labeller".</p>
      </div>
      <div class="row">
        <div class="d-flex justify-content-between align-items-center border-bottom p-3">
          <p class="fw-bold m-0">Recall Rate: 100% Accuracy: 100%</p>

          <div class="d-flex align-items-center">
            <div class="d-flex me-4">
              <div class="form-check me-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label class="form-check-label" for="flexCheckChecked">Ground Truth</label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label class="form-check-label" for="flexCheckChecked">Prediction</label>
              </div>
            </div>

            <div class="d-flex align-items-center border-start ps-4">
              <p class="fw-bold m-0">
                <span class="me-3">
                  <AppIcon name="Export" type="svg" :size="20" color="black"></AppIcon> Export
                </span>
                <span class="me-3">
                  <AppIcon name="Threshold" type="svg" :size="20" color="black"></AppIcon> Threshold
                </span>
                <span>
                  <AppIcon name="Report" type="svg" :size="20" color="black"></AppIcon> Report
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          class="v-content-left col-12 col-lg-9 mb-2 d-flex flex-column justify-content-center align-items-center mt-auto"
        >
          <img width="470" height="450" src="@/assets/images/home_page_images/01.png" alt="" />
        </div>

        <div class="v-content-right col-12 col-lg-3 mb-2">
          <p class="fw-bold mt-2">
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </p>
          <div class="row row-cols-10 border">
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">1</span>
                <span class="text-name">Image_name</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">Image_name</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">Image_name</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">2222222</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">2222222</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">2222222</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">2222222</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">2222222</span>
              </div>
            </div>
            <div class="imageCard border-1">
              <img width="120" height="100" src="@/assets/images/home_page_images/01.png" alt="" />
              <div class="text-box">
                <span class="text-id">2</span>
                <span class="text-name">2222222</span>
              </div>
            </div>
            <div v-for="item in state.images" :key="item.id" class="imageCard border-1">
              <!-- <template v-if="item.src">
                <img width="120" height="100" :src="item.src" alt="" />
                <div class="text-box">
                  <span class="text-id">{{ item.id }}</span>
                  <span class="text-name">{{ item.name }}</span>
                </div>
              </template>
              <template v-else> </template> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-content {
  height: 600px;
}
.v-content-left {
  /* width: 900px; */
  height: 600px;
}
.v-content-right {
  max-height: 550px;
  overflow-y: auto;
}
.v-content {
  height: 600px;
}
.v-content-left {
  height: 500px;
}
.imageCard {
  width: 120px;
  margin-right: auto;
  margin-top: 10px;
}
.text-box {
  background-color: #f2f2f2;
  width: 120px;
}
.text-id {
  background-color: #e3e3e3;
  display: inline-block;
  width: 20px;
}
.text-name {
  display: inline-block;
}
</style>
