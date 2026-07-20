<script setup lang="ts">
import { ProjectType } from '@/data_struct/ProjectType'
import { Modal } from 'bootstrap'
import { ref, onMounted } from 'vue'
import router from '@/router'

const modalInstance = ref<Modal | null>(null)

const prop = defineProps({
  elementId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['get-modal'])

// form value
const projectName = ref<string>('')
const projectType = ref<ProjectType>(ProjectType.NONE)
const projectDescription = ref<string>('')

// form limit
const projectNameLengthLimit: number = 20
const projectDescriptionLengthLimit: number = 50

// project type option
const isSegmentationHovered = ref<boolean>(false)
const isObjectDetectionHovered = ref<boolean>(false)
const isClassificationHovered = ref<boolean>(false)
const isAnomalyDetectionHovered = ref<boolean>(false)

onMounted(() => {
  modalInstance.value = new Modal(document.getElementById(prop.elementId), {
    target: prop.elementId,
  })

  emit('get-modal', modalInstance.value)
})

function createProject(): void {
  window.alert(
    `Create a new project!\nName: ${projectName.value}\nType: ${projectType.value}\nDescription: ${projectDescription.value}`,
  )
  if (modalInstance.value) {
    modalInstance.value.hide()
  }
  router.push({ name: 'project', params: { projectId: 'test-create-project' } })
}
</script>

<template>
  <div
    class="modal fade"
    :id="elementId"
    tabindex="-1"
    aria-labelledby="createProjectModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
      <form @submit.prevent="createProject" class="modal-content">
        <div class="modal-header text-bg-primary">
          <h1 class="modal-title fs-5" id="createProjectModalLabel">
            {{ $t('Create New Project') }}
          </h1>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="projectNameInput" class="form-label">
              <span class="text-danger pe-1">*</span>{{ $t('Project name') }}</label
            >
            <div class="form-group position-relative">
              <input
                type="text"
                class="form-control"
                id="projectNameInput"
                v-model="projectName"
                :placeholder="$t('My Project')"
                :maxlength="projectNameLengthLimit"
                required
              />
              <span class="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                >{{ projectName.length }}/{{ projectNameLengthLimit }}</span
              >
            </div>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label"
              ><span class="text-danger pe-1">*</span>{{ $t('Type') }}</label
            >
            <br />
            <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 mx-1">
              <div class="d-grid col">
                <input
                  type="radio"
                  class="btn-check"
                  name="projectType"
                  id="segmentation"
                  v-model="projectType"
                  :value="ProjectType.SEGMENTATION"
                  autocomplete="off"
                  required
                />
                <label class="p-0" for="segmentation"
                  ><div
                    class="card text-center text-bg-light h-100 w-100"
                    :class="{ 'card-type-checked': projectType == ProjectType.SEGMENTATION }"
                    @mouseover="isSegmentationHovered = true"
                    @mouseleave="isSegmentationHovered = false"
                  >
                    <div class="card-body">
                      <AppIconStatic
                        name="projectType_segmentation"
                        type="svg"
                        :size="58"
                      ></AppIconStatic>
                      <br />
                      <p class="fw-bolder" style="min-height: 2.5em; color: #169afb">
                        {{ $t('SEGMENTATION') }}
                      </p>
                      <small class="align-text-bottom">{{ $t('SEGMENTATION Description') }}</small>
                    </div>
                    <Transition>
                      <div v-show="isSegmentationHovered">
                        <div
                          class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 rounded-2"
                        >
                          <div class="row">
                            <div class="col d-flex flex-column px-1">
                              <h6 class="mb-1 text-white fw-bold">OK</h6>
                              <img
                                src="@/assets/images/project_types/Segmentation_OK.png"
                                alt="Segmentation OK"
                                class="img-fluid"
                              />
                            </div>
                            <div class="col d-flex flex-column px-1">
                              <h6 class="mb-1 text-white fw-bold">NG</h6>
                              <img
                                src="@/assets/images/project_types/Segmentation_NG.png"
                                alt="Segmentation NG"
                                class="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </label>
              </div>

              <div class="d-grid col">
                <input
                  type="radio"
                  class="btn-check"
                  name="projectType"
                  v-model="projectType"
                  :value="ProjectType.OBJECT_DETECTION"
                  id="objectDetection"
                  autocomplete="off"
                />
                <label class="p-0" for="objectDetection"
                  ><div
                    class="card text-center text-bg-light h-100 w-100"
                    :class="{ 'card-type-checked': projectType == ProjectType.OBJECT_DETECTION }"
                    @mouseover="isObjectDetectionHovered = true"
                    @mouseleave="isObjectDetectionHovered = false"
                  >
                    <div class="card-body">
                      <svg
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.89258 18.4439V8.85365C8.89258 8.79272 8.90458 8.73238 8.9279 8.67608C8.95122 8.61979 8.98539 8.56864 9.02848 8.52555C9.07157 8.48246 9.12272 8.44829 9.17901 8.42497C9.23531 8.40165 9.29564 8.38965 9.35658 8.38965H18.9463"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M49.1087 18.4439V8.85365C49.1087 8.73059 49.0598 8.61257 48.9728 8.52555C48.8857 8.43853 48.7677 8.38965 48.6447 8.38965H39.0549"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M8.89258 39.5562V49.1465C8.89258 49.2695 8.94146 49.3875 9.02848 49.4746C9.1155 49.5616 9.23352 49.6105 9.35658 49.6105H18.9463"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M49.1087 39.5562V49.1465C49.1087 49.2695 49.0598 49.3875 48.9728 49.4746C48.8857 49.5616 48.7677 49.6105 48.6447 49.6105H39.0549"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M41.2119 22.0518L29 29.6828L16.7881 22.0518"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M29 14.4209L41.2119 22.052V35.9482L29 43.5792L16.7881 35.9482V22.052L29 14.4209Z"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M29 29.6821V43.5795"
                          stroke="#01A05D"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                      </svg>
                      <br />
                      <p class="fw-bolder" style="min-height: 2.5em; color: #01a05d">
                        {{ $t('OBJECT_DETECTION') }}
                      </p>
                      <small class="align-text-bottom">{{
                        $t('OBJECT_DETECTION Description')
                      }}</small>
                    </div>
                    <Transition>
                      <div v-show="isObjectDetectionHovered">
                        <div
                          class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 rounded-2"
                        >
                          <div class="d-flex flex-column px-1">
                            <h6 class="mb-1 text-white fw-bold">Bread</h6>
                            <img
                              src="@/assets/images/project_types/ObjectDetection.png"
                              alt="ObjectDetection"
                              class="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </label>
              </div>

              <div class="d-grid col">
                <input
                  type="radio"
                  class="btn-check"
                  name="projectType"
                  v-model="projectType"
                  :value="ProjectType.CLASSIFICATION"
                  id="classification"
                  autocomplete="off"
                />
                <label class="p-0" for="classification"
                  ><div
                    class="card text-center text-bg-light h-100 w-100"
                    :class="{ 'card-type-checked': projectType == ProjectType.CLASSIFICATION }"
                    @mouseover="isClassificationHovered = true"
                    @mouseleave="isClassificationHovered = false"
                  >
                    <div class="card-body">
                      <svg
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29 51.91V31.1367"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M6.42456 14.0947L29.0005 32.0863"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M7.44845 23.0809L6.62543 14.5427C6.61363 14.4203 6.65093 14.2982 6.72913 14.2032C6.80733 14.1083 6.92002 14.0483 7.04245 14.0364L15.5806 13.2134"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M51.5736 14.0923L28.9983 32.0839"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M50.5516 23.0809L51.3746 14.5427C51.3864 14.4203 51.3491 14.2982 51.2709 14.2032C51.1927 14.1083 51.08 14.0483 50.9576 14.0364L42.4194 13.2134"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M48.6308 32.0815H38.3491V42.3632H48.6308V32.0815Z"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M8.46802 37.3624C8.46813 36.1316 8.83319 34.9286 9.51703 33.9053C10.2009 32.8821 11.1728 32.0846 12.3099 31.6137C13.447 31.1428 14.6981 31.0196 15.9052 31.2598C17.1123 31.5 18.221 32.0927 19.0912 32.963C19.9615 33.8333 20.5541 34.9421 20.7941 36.1492C21.0342 37.3563 20.9109 38.6074 20.4399 39.7445C19.9689 40.8815 19.1713 41.8533 18.148 42.5371C17.1247 43.2208 15.9216 43.5858 14.6908 43.5858C13.0404 43.5856 11.4576 42.9299 10.2906 41.7628C9.12362 40.5957 8.46802 39.0128 8.46802 37.3624Z"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M22.8705 19.3655H35.1288C35.1831 19.3656 35.2365 19.3514 35.2836 19.3243C35.3307 19.2972 35.3698 19.2581 35.3969 19.211C35.4241 19.1639 35.4383 19.1105 35.4382 19.0561C35.438 19.0018 35.4235 18.9484 35.3961 18.9015L29.2673 8.29038C29.2403 8.24338 29.2014 8.20434 29.1545 8.17719C29.1076 8.15004 29.0544 8.13574 29.0002 8.13574C28.946 8.13574 28.8928 8.15004 28.8459 8.17719C28.799 8.20434 28.7601 8.24338 28.7331 8.29038L22.6031 18.9044C22.5764 18.9512 22.5625 19.0043 22.5627 19.0582C22.563 19.1121 22.5773 19.1651 22.6044 19.2117C22.6314 19.2584 22.6702 19.2971 22.7169 19.3241C22.7636 19.3511 22.8165 19.3653 22.8705 19.3655Z"
                          stroke="#FF5C00"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                      </svg>

                      <br />
                      <p class="fw-bolder" style="min-height: 2.5em; color: #ff5c00">
                        {{ $t('CLASSIFICATION') }}
                      </p>
                      <small class="mt-auto align-text-bottom">{{
                        $t('CLASSIFICATION Description')
                      }}</small>
                    </div>
                    <Transition>
                      <div v-show="isClassificationHovered">
                        <div
                          class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 rounded-2"
                        >
                          <div class="row">
                            <div class="col d-flex flex-column px-1">
                              <h6 class="mb-1 text-white fw-bold">OK</h6>
                              <img
                                src="@/assets/images/project_types/Classification_OK.png"
                                alt="Classification OK"
                                class="img-fluid"
                              />
                            </div>
                            <div class="col d-flex flex-column px-1">
                              <h6 class="mb-1 text-white fw-bold">NG</h6>
                              <img
                                src="@/assets/images/project_types/Classification_NG.png"
                                alt="Classification NG"
                                class="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </label>
              </div>

              <div class="d-grid col">
                <input
                  type="radio"
                  class="btn-check"
                  name="projectType"
                  v-model="projectType"
                  :value="ProjectType.ANOMALY_DETECTION"
                  id="anomalyDetection"
                  autocomplete="off"
                />
                <label class="p-0" for="anomalyDetection"
                  ><div
                    class="card text-center text-bg-light h-100 w-100"
                    :class="{ 'card-type-checked': projectType == ProjectType.ANOMALY_DETECTION }"
                    @mouseover="isAnomalyDetectionHovered = true"
                    @mouseleave="isAnomalyDetectionHovered = false"
                  >
                    <div class="card-body">
                      <svg
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.7698 34.4107C16.2069 34.4107 18.9932 31.6244 18.9932 28.1873C18.9932 24.7502 16.2069 21.9639 12.7698 21.9639C9.3327 21.9639 6.54639 24.7502 6.54639 28.1873C6.54639 31.6244 9.3327 34.4107 12.7698 34.4107Z"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M23.6333 52.2515C27.0704 52.2515 29.8567 49.4652 29.8567 46.0281C29.8567 42.591 27.0704 39.8047 23.6333 39.8047C20.1962 39.8047 17.4099 42.591 17.4099 46.0281C17.4099 49.4652 20.1962 52.2515 23.6333 52.2515Z"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M50.6954 42.3401C50.6953 43.5708 50.3302 44.7738 49.6464 45.7971C48.9626 46.8203 47.9907 47.6178 46.8537 48.0888C45.7166 48.5597 44.4655 48.6829 43.2584 48.4427C42.0514 48.2026 40.9426 47.61 40.0724 46.7397C39.2021 45.8695 38.6095 44.7607 38.3694 43.5537C38.1292 42.3466 38.2524 41.0955 38.7233 39.9584C39.1942 38.8214 39.9918 37.8495 41.015 37.1657C42.0382 36.4819 43.2413 36.1168 44.472 36.1167C45.2893 36.1167 46.0985 36.2777 46.8536 36.5904C47.6087 36.9032 48.2947 37.3616 48.8726 37.9395C49.4505 38.5174 49.9089 39.2034 50.2217 39.9585C50.5344 40.7136 50.6954 41.5228 50.6954 42.3401Z"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M26.7212 13.8037V7.57279C26.7212 7.51437 26.7327 7.45652 26.7551 7.40255C26.7774 7.34858 26.8102 7.29954 26.8515 7.25823C26.8928 7.21692 26.9418 7.18415 26.9958 7.16179C27.0498 7.13944 27.1076 7.12793 27.1661 7.12793H33.3958"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M41.749 7.12793H47.9788C48.0968 7.12793 48.2099 7.1748 48.2934 7.25823C48.3768 7.34165 48.4237 7.45481 48.4237 7.57279V13.8037"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M48.4237 22.1558V28.3855C48.4237 28.5035 48.3768 28.6167 48.2934 28.7001C48.2099 28.7835 48.0968 28.8304 47.9788 28.8304H41.749"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M33.3958 28.8304H27.1661C27.1076 28.8304 27.0498 28.8189 26.9958 28.7965C26.9418 28.7742 26.8928 28.7414 26.8515 28.7001C26.8102 28.6588 26.7774 28.6098 26.7551 28.5558C26.7327 28.5018 26.7212 28.444 26.7212 28.3855V22.1558"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M37.3202 12.586L31.4285 22.794C31.4026 22.8381 31.3889 22.8884 31.3887 22.9396C31.3885 22.9908 31.4018 23.0411 31.4274 23.0855C31.453 23.1299 31.4899 23.1667 31.5343 23.1922C31.5787 23.2177 31.629 23.231 31.6803 23.2307H43.4641C43.5154 23.2311 43.5658 23.2179 43.6103 23.1924C43.6548 23.167 43.6918 23.1302 43.7174 23.0858C43.743 23.0414 43.7565 22.991 43.7563 22.9397C43.7561 22.8885 43.7424 22.8382 43.7164 22.794L37.8242 12.586C37.7989 12.5415 37.7622 12.5045 37.7179 12.4787C37.6737 12.453 37.6234 12.4395 37.5722 12.4395C37.521 12.4395 37.4707 12.453 37.4264 12.4787C37.3822 12.5045 37.3455 12.5415 37.3202 12.586Z"
                          stroke="#5F3DFF"
                          stroke-width="2.40242"
                          stroke-miterlimit="10"
                        />
                      </svg>
                      <br />
                      <p class="fw-bolder" style="min-height: 2.5em; color: #5f3dff">
                        {{ $t('ANOMALY_DETECTION') }}
                      </p>
                      <small class="align-text-bottom h-100">{{
                        $t('ANOMALY_DETECTION Description')
                      }}</small>
                    </div>
                    <Transition>
                      <div v-show="isAnomalyDetectionHovered">
                        <div
                          class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 rounded-2"
                        >
                          <div class="row">
                            <div class="col d-flex flex-column px-1">
                              <h6 class="mb-1 text-white fw-bold">OK</h6>
                              <img
                                src="@/assets/images/project_types/AnomalyDetection_OK.png"
                                alt="AnomalyDetection OK"
                                class="img-fluid"
                              />
                            </div>
                            <div class="col d-flex flex-column px-1">
                              <h6 class="mb-1 text-white fw-bold">NG</h6>
                              <img
                                src="@/assets/images/project_types/AnomalyDetection_NG.png"
                                alt="AnomalyDetection NG"
                                class="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">{{
              $t('Description')
            }}</label>
            <div class="form-group position-relative">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                v-model="projectDescription"
                :maxlength="projectDescriptionLengthLimit"
                placeholder="..."
              ></textarea>
              <span class="position-absolute bottom-0 end-0 mb-1 me-3 text-secondary"
                >{{ projectDescription.length }}/{{ projectDescriptionLengthLimit }}</span
              >
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="mx-auto">
            <button type="button" class="btn btn-outline-primary me-2" data-bs-dismiss="modal">
              {{ $t('Cancel') }}
            </button>
            <button type="submit" class="btn btn-primary">
              <span class="d-flex">
                <svg
                  class="align-self-center me-1"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25 7.75H0.5V6.25H6.25V0.5H7.75V6.25H13.5V7.75H7.75V13.5H6.25V7.75Z"
                    fill="white"
                  />
                </svg>
                {{ $t('Add Project') }}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.card-type-checked {
  outline: 2px solid #155cf7;
}
</style>
