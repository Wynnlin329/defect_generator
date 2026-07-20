<script setup lang="ts">
import { ref } from 'vue'
// const props = defineProps({
//   projectId: String,
// })

interface RangeDataInterface {
  min_value: number
  max_value: number
  default_value: number
  step: number
  value: number
}

interface ImageAugmentation {
  gamma: RangeDataInterface
  scale: RangeDataInterface
  rotate: RangeDataInterface
  flip: boolean
  color_jitter: boolean
}

interface TrainingDataInterface {
  ratio: RangeDataInterface
  training_data: Array<string>
  validation_data: Array<string>
}

const taskName = ref<string>('')
const taskImageAugmentation = ref<ImageAugmentation>({
  gamma: { min_value: 0.0, max_value: 1.0, default_value: 0.0, step: 0.01, value: 0.0 },
  scale: { min_value: 0.0, max_value: 1.0, default_value: 0.0, step: 0.01, value: 0.0 },
  rotate: { min_value: 0.0, max_value: 360, default_value: 0.0, step: 1, value: 0.0 },
  flip: false,
  color_jitter: false,
})
const taskTrainingData = ref<TrainingDataInterface>({
  ratio: { min_value: 0.0, max_value: 1.0, default_value: 0.8, step: 0.01, value: 0.8 },
  training_data: [],
  validation_data: [],
})

function validateValue(currentValue: RangeDataInterface): void {
  /**
   * Validates and adjusts the numeric value in the provided object to ensure it falls within the allowed range.
   *
   * @param currentValue - An object conforming to the RangeDataInterface interface, which includes:
   *   - value: The numeric value to validate.
   *   - default_value: The default value to set if `value` is invalid.
   *   - step: The smallest increment allowed (e.g., 0.01). This is used to determine the allowed number of decimal places.
   *   - max_value: The maximum allowed value.
   *   - min_value: The minimum allowed value.
   */
  if (
    currentValue.value === null ||
    currentValue.value === undefined ||
    typeof currentValue.value !== 'number'
  ) {
    currentValue.value = currentValue.default_value
    return
  }

  // Trim decimals based on the 'step' property.
  const stepDecimals = (currentValue.step.toString().split('.')[1] || '').length
  if (stepDecimals > 0) {
    const valueDecimals = (currentValue.value.toString().split('.')[1] || '').length
    if (valueDecimals > stepDecimals) {
      currentValue.value = Number(currentValue.value.toFixed(stepDecimals))
    }
  }

  if (currentValue.value > currentValue.max_value) currentValue.value = currentValue.max_value
  if (currentValue.value < currentValue.min_value) currentValue.value = currentValue.min_value
}
</script>

<template>
  <div class="container-fluid px-2 px-md-3 px-lg-4 overflow-x-hidden">
    <div class="row">
      <div class="col-12 col-md-8 d-flex flex-column mb-2 mb-md-0">
        <div class="d-flex">
          <h5 class="fw-bolder text-truncate">AISVISION_Project_V1.0.0 Test Project</h5>
          <div class="mx-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_568_6473)">
                <path
                  d="M16.8801 4.99999C17.4501 4.99999 17.9801 5.21999 18.3801 5.61999C18.7801 6.01999 19.0001 6.54999 19.0001 7.11999C19.0001 7.68999 18.7801 8.21999 18.3801 8.61999L10.8801 16.12L8.99006 18L4.99006 19L5.99006 15L7.87006 13.12L15.3701 5.61999C15.7701 5.21999 16.3001 4.99999 16.8701 4.99999M16.8701 3.99999C16.0401 3.99999 15.2501 4.31999 14.6601 4.90999L7.16006 12.41L5.27006 14.29C5.14006 14.42 5.05007 14.58 5.01007 14.75L4.01007 18.75C3.92007 19.09 4.02006 19.45 4.27006 19.7C4.46006 19.89 4.72006 19.99 4.98006 19.99C5.06006 19.99 5.14006 19.99 5.22006 19.96L9.22007 18.96C9.40006 18.92 9.56007 18.83 9.68007 18.7L11.5601 16.82L19.0601 9.31999C19.6501 8.72999 19.9701 7.94999 19.9701 7.10999C19.9701 6.26999 19.6501 5.48999 19.0601 4.89999C18.4701 4.30999 17.6901 3.98999 16.8501 3.98999L16.8701 3.99999Z"
                  fill="black"
                />
                <path d="M6 15L9 18" stroke="black" stroke-linejoin="round" />
                <path d="M14.5 6.5L17.5 9.5" stroke="black" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_568_6473">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <small class="badge text-info text-bg-info bg-opacity-25">Anomaly Detection</small>
          </div>
        </div>
        <small class="text-scondary"
          >Lorem Ipsum er ganske enkelt fyldtekst fraiindustrien.Lorem Ipsum er ganske enkelt
          fyldtekst fraiindustrien.</small
        >
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-md-end">
        <div>
          <RouterLink class="btn btn-primary" to="/schedule"
            ><span class="fs-6">
              {{ $t('Add to schedule') }}
            </span></RouterLink
          >
        </div>
      </div>
    </div>
    <hr />
    <div class="d-flex">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_568_6914"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_568_6914)">
          <path
            d="M11.25 16.75H12.75V11H11.25V16.75ZM12 9.2885C12.2288 9.2885 12.4207 9.21108 12.5755 9.05625C12.7303 8.90142 12.8077 8.70958 12.8077 8.48075C12.8077 8.25192 12.7303 8.06008 12.5755 7.90525C12.4207 7.75058 12.2288 7.67325 12 7.67325C11.7712 7.67325 11.5793 7.75058 11.4245 7.90525C11.2697 8.06008 11.1923 8.25192 11.1923 8.48075C11.1923 8.70958 11.2697 8.90142 11.4245 9.05625C11.5793 9.21108 11.7712 9.2885 12 9.2885ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
            fill="#1C1B1F"
          />
        </g>
      </svg>
      <span class="mx-1">{{ $t('Remaining training times') }}: 10/10</span>
    </div>
    <form class="my-2" @submit.prevent>
      <div class="row">
        <div class="col-12 col-lg-5 mb-2">
          <div class="mb-3">
            <label for="taskNameInput" class="form-label fw-bold">
              <span class="text-danger pe-1">*</span>{{ $t('Task name') }}</label
            >
            <div class="form-group position-relative">
              <input
                type="text"
                class="form-control trainer-input-border"
                id="taskNameInput"
                v-model="taskName"
                maxlength="10"
                required
              />
              <span class="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                >{{ taskName.length }}/10</span
              >
            </div>
          </div>
          <div class="mb-3">
            <label for="taskGeneralSwitch" class="form-label fw-bold">
              {{ $t('General') }}
            </label>
            <div class="row row-cols-1 row-cols-xl-2">
              <div class="col pe-xl-1">
                <div class="trainer-input-border d-flex align-items-center p-2 mb-2">
                  <div class="form-check form-switch flex-fill d-flex p-0">
                    <label class="form-check-label flex-fill" for="flexSwitchEarlyStopping">{{
                      $t('Early Stopping')
                    }}</label>
                    <input
                      class="form-check-input form-select-lg"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchEarlyStopping"
                    />
                  </div>
                </div>
              </div>

              <div class="col ps-xl-1">
                <div class="trainer-input-border d-flex align-items-center p-2 mb-2">
                  <div class="form-check form-switch flex-fill d-flex align-items-center p-0">
                    <label class="form-check-label flex-fill" for="flexSwitchDataBalance">{{
                      $t('Data Balance')
                    }}</label>
                    <input
                      class="form-check-input form-select-lg"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchDataBalance"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="taskImageAugmentation" class="form-label fw-bold">
              {{ $t('Image Augmentation') }}
            </label>
            <div id="taskImageAugmentation">
              <div class="d-flex trainer-input-border p-2 mb-2">
                <label
                  for="imageAugmentationGammaRange"
                  class="form-label align-self-center flex-fill mb-0 me-2"
                  style="min-width: 4rem"
                  >{{ $t('Gamma') }}</label
                >
                <div class="d-flex" style="width: 16rem">
                  <span class="align-self-center text-center" style="min-width: 3em">{{
                    taskImageAugmentation.gamma.min_value
                  }}</span>
                  <input
                    type="range"
                    class="form-range align-self-center"
                    :min="taskImageAugmentation.gamma.min_value"
                    :max="taskImageAugmentation.gamma.max_value"
                    :step="taskImageAugmentation.gamma.step"
                    id="imageAugmentationGammaRange"
                    v-model.number="taskImageAugmentation.gamma.value"
                  />
                  <span class="align-self-center text-center" style="min-width: 3em">{{
                    taskImageAugmentation.gamma.max_value
                  }}</span>
                </div>
                <input
                  type="number"
                  class="form-control align-self-center"
                  :min="taskImageAugmentation.gamma.min_value"
                  :max="taskImageAugmentation.gamma.max_value"
                  :step="taskImageAugmentation.gamma.step"
                  v-model.number="taskImageAugmentation.gamma.value"
                  @blur="validateValue(taskImageAugmentation.gamma)"
                  style="max-width: 5rem"
                />
              </div>
              <div class="d-flex trainer-input-border p-2 mb-2">
                <label
                  for="imageAugmentationScaleRange"
                  class="form-label align-self-center flex-fill mb-0 me-2"
                  style="min-width: 4rem"
                  >{{ $t('Scale') }}</label
                >
                <div class="d-flex" style="width: 16rem">
                  <span class="align-self-center text-center" style="min-width: 3em">{{
                    taskImageAugmentation.scale.min_value
                  }}</span>
                  <input
                    type="range"
                    class="form-range align-self-center"
                    :min="taskImageAugmentation.scale.min_value"
                    :max="taskImageAugmentation.scale.max_value"
                    :step="taskImageAugmentation.scale.step"
                    id="imageAugmentationScaleRange"
                    v-model.number="taskImageAugmentation.scale.value"
                  />
                  <span class="align-self-center text-center" style="min-width: 3em">{{
                    taskImageAugmentation.scale.max_value
                  }}</span>
                </div>
                <input
                  type="number"
                  class="form-control align-self-center"
                  :min="taskImageAugmentation.scale.min_value"
                  :max="taskImageAugmentation.scale.max_value"
                  :step="taskImageAugmentation.scale.step"
                  v-model.number="taskImageAugmentation.scale.value"
                  @blur="validateValue(taskImageAugmentation.scale)"
                  style="max-width: 5rem"
                />
              </div>
              <div class="d-flex trainer-input-border p-2 mb-2">
                <label
                  for="imageAugmentationRotateRange"
                  class="form-label align-self-center flex-fill mb-0 me-2"
                  style="min-width: 4rem"
                  >{{ $t('Rotate') }}</label
                >
                <div class="d-flex" style="width: 16rem">
                  <span class="align-self-center text-center" style="min-width: 3em"
                    >{{ taskImageAugmentation.rotate.min_value }}&#176;</span
                  >
                  <input
                    type="range"
                    class="form-range align-self-center"
                    :min="taskImageAugmentation.rotate.min_value"
                    :max="taskImageAugmentation.rotate.max_value"
                    :step="taskImageAugmentation.rotate.step"
                    id="imageAugmentationRotateRange"
                    v-model.number="taskImageAugmentation.rotate.value"
                  />
                  <span class="align-self-center text-center" style="min-width: 3em"
                    >{{ taskImageAugmentation.rotate.max_value }}&#176;</span
                  >
                </div>
                <input
                  type="number"
                  class="form-control align-self-center"
                  :min="taskImageAugmentation.rotate.min_value"
                  :max="taskImageAugmentation.rotate.max_value"
                  :step="taskImageAugmentation.rotate.step"
                  v-model.number="taskImageAugmentation.rotate.value"
                  @blur="validateValue(taskImageAugmentation.rotate)"
                  style="max-width: 5rem"
                />
              </div>

              <div class="row row-cols-1 row-cols-xl-2">
                <div class="col pe-xl-1">
                  <div class="trainer-input-border d-flex align-items-center p-2 mb-2">
                    <div class="form-check form-switch flex-fill d-flex p-0">
                      <label class="form-check-label flex-fill" for="flexSwitchFlip">{{
                        $t('Flip')
                      }}</label>
                      <input
                        class="form-check-input form-select-lg"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchFlip"
                        v-model="taskImageAugmentation.flip"
                      />
                    </div>
                  </div>
                </div>

                <div class="col ps-xl-1">
                  <div class="trainer-input-border d-flex align-items-center p-2 mb-2">
                    <div class="form-check form-switch flex-fill d-flex align-items-center p-0">
                      <label class="form-check-label flex-fill" for="flexSwitchColorJitter">{{
                        $t('Color Jitter')
                      }}</label>
                      <input
                        class="form-check-input form-select-lg"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchColorJitter"
                        v-model="taskImageAugmentation.color_jitter"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-7 mb-3">
          <div class="mb-3">
            <label for="taskTrainingData" class="form-label fw-bold">
              {{ $t('Training Data') }}
            </label>
            <div id="taskTrainingData">
              <div class="row">
                <div class="col-3 col-lg-2 pe-0 mb-2">
                  <div class="d-grid">
                    <button type="button" class="btn trainer-input-border py-0 align-middle">
                      {{ $t('Shuffle Data') }}
                    </button>
                  </div>
                </div>
                <div class="col-3 col-lg-2 pe-0 mb-2">
                  <div class="d-grid">
                    <button type="button" class="btn trainer-input-border py-0 align-middle">
                      {{ $t('Default') }}
                    </button>
                  </div>
                </div>
                <div class="col-12 col-lg-8 mb-2">
                  <div class="d-flex trainer-input-border p-2 mb-2">
                    <label
                      for="trainingDataRatioRange"
                      class="form-label align-self-center flex-fill mb-0 me-2"
                      style="min-width: 4rem"
                      >{{ $t('Ratio') }}</label
                    >
                    <div class="d-flex" style="width: 16rem">
                      <span class="align-self-center text-center" style="min-width: 3em">{{
                        taskTrainingData.ratio.min_value
                      }}</span>
                      <input
                        type="range"
                        class="form-range align-self-center"
                        :min="taskTrainingData.ratio.min_value"
                        :max="taskTrainingData.ratio.max_value"
                        :step="taskTrainingData.ratio.step"
                        id="trainingDataRatioRange"
                        v-model.number="taskTrainingData.ratio.value"
                      />
                      <span class="align-self-center text-center" style="min-width: 3em">{{
                        taskTrainingData.ratio.max_value
                      }}</span>
                    </div>
                    <input
                      type="number"
                      class="form-control align-self-center"
                      :min="taskTrainingData.ratio.min_value"
                      :max="taskTrainingData.ratio.max_value"
                      :step="taskTrainingData.ratio.step"
                      v-model.number="taskTrainingData.ratio.value"
                      @blur="validateValue(taskTrainingData.ratio)"
                      style="max-width: 5rem"
                    />
                  </div>
                </div>
                <div class="col-12 d-flex flex-lg-row">
                  <div>123</div>
                  <div>123</div>
                  <div>123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.trainer-input-border {
  height: 3.5em;
  border: 1px solid #dee2e6;
  border-radius: 0.2rem;
}
</style>
