<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import type { ProjectData } from '@/data_struct/ProjectData'
import ApiHandler, { RequestStatus } from '@/services/apiHandler'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import ProjectCreateModalComponent from '@/views/project/ProjectCreateModalComponent.vue'

interface ProjectDataInterface {
  projectDataStatus: RequestStatus
  projectDataList: ProjectData[]
}

const projectData = ref<ProjectDataInterface>({
  projectDataStatus: RequestStatus.Pending,
  projectDataList: [],
})

onMounted(async () => {
  projectData.value.projectDataList = await ApiHandler.GetRecentlyProjectList()
  // projectData.value.projectDataList = []
  projectData.value.projectDataStatus = RequestStatus.Success
})

// for create project modal
const createProjectModalInstance = ref<Modal | null>(null)

function getProjectCreateModal(modal: Modal | null) {
  createProjectModalInstance.value = modal // set the modal
}

function showProjectCreateModal() {
  if (createProjectModalInstance.value) {
    createProjectModalInstance.value.show() //show the modal
  }
}
</script>

<template>
  <div class="container-fluid flex-grow-1 p-2 p-md-3 p-lg-4 d-flex flex-column">
    <div class="row">
      <h6
        v-if="projectData.projectDataStatus == RequestStatus.Pending"
        class="card-title placeholder-glow"
      >
        <span class="placeholder col-2 col-md-1"></span>
      </h6>
      <div v-else class="col-12 col-md-6">
        <h6 class="fw-bold">
          {{ $t('My Project') }} (<span class="text-primary">{{
            projectData.projectDataList.length
          }}</span
          >/8)
        </h6>
      </div>

      <div class="col-12 col-md-6">
        <div
          v-if="projectData.projectDataStatus == RequestStatus.Success"
          class="gap-2 d-flex justify-content-end mb-3"
        >
          <RouterLink class="btn text-primary" to="trash-can"
            ><span class="d-flex fs-6">
              <svg
                class="align-self-center me-1"
                width="24"
                height="24"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.30775 17.5002C2.80908 17.5002 2.38308 17.3236 2.02975 16.9705C1.67658 16.6171 1.5 16.1911 1.5 15.6925V3.00022H0.5V1.50022H5V0.615723H11V1.50022H15.5V3.00022H14.5V15.6925C14.5 16.1976 14.325 16.6252 13.975 16.9752C13.625 17.3252 13.1974 17.5002 12.6923 17.5002H3.30775ZM13 3.00022H3V15.6925C3 15.7823 3.02883 15.8561 3.0865 15.9137C3.14417 15.9714 3.21792 16.0002 3.30775 16.0002H12.6923C12.7692 16.0002 12.8398 15.9681 12.9038 15.904C12.9679 15.84 13 15.7695 13 15.6925V3.00022ZM5.404 14.0002H6.90375V5.00022H5.404V14.0002ZM9.09625 14.0002H10.596V5.00022H9.09625V14.0002Z"
                  fill="#155CF7"
                />
              </svg>
              <span class="fw-bold">{{ $t('Trash') }} (0)</span>
            </span></RouterLink
          >
          <button
            v-show="projectData.projectDataList.length != 0"
            class="btn btn-primary"
            type="button"
            @click="showProjectCreateModal"
          >
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
              {{ $t('New Project') }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="projectData.projectDataStatus == RequestStatus.Pending" class="row mb-2">
      <div
        v-for="n in Array(12).keys()"
        :key="n"
        class="col-12 col-sm-6 col-lg-4 col-xl-3 col-xl-2 p-2"
      >
        <ProjectCard :is-placeholder="true"></ProjectCard>
      </div>
    </div>
    <div
      v-else-if="projectData.projectDataStatus == RequestStatus.Success"
      class="d-flex flex-column h-100"
    >
      <div v-if="projectData.projectDataList.length == 0" class="flex-grow-1">
        <div class="d-flex justify-content-center h-100">
          <div class="align-self-center text-center">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_568_15183"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="72"
                height="72"
              >
                <path
                  d="M0 0V72H72V0H0ZM58.32 55.08C57.84 57.93 55.56 60 52.89 60H14.52C11.07 60 8.49 56.61 9.09 52.92L15 27H63L58.32 55.08Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_568_15183)">
                <path
                  d="M27.42 15L31.86 19.98L32.76 21H54V54C54 55.62 52.92 57 51.66 57H14.34C13.08 57 12 55.62 12 54V15H27.42ZM27.66 12H9V54C9 57.3 11.4 60 14.34 60H51.66C54.6 60 57 57.3 57 54V18H34.11L29.55 12.87C29.04 12.3 28.38 12 27.66 12Z"
                  fill="#155CF7"
                />
              </g>
              <path d="M46 53H62" stroke="#155CF7" stroke-width="3" />
              <path d="M54 61V45" stroke="#155CF7" stroke-width="3" />
              <circle cx="54" cy="53" r="12" stroke="#155CF7" stroke-width="3" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.6641 32H56.9995L56.1086 37.2186C55.2605 37.0748 54.389 37 53.5 37C44.9396 37 38 43.9396 38 52.5C38 53.3511 38.0686 54.1862 38.2006 55H16.9994C14.9996 55 13.932 54.4345 14.9996 51L19.6641 32Z"
                fill="#155CF7"
                fill-opacity="0.23"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M58.1702 37.7159L59.4609 30H17.4009L12.0309 53.49C11.8809 54.48 12.1509 55.41 12.7509 56.13C13.0509 56.46 13.6209 57 14.5209 57H38.6633C38.9819 58.0516 39.4091 59.056 39.9321 60H14.5209C11.0709 60 8.49086 56.61 9.09086 52.92L15.0009 27H63.0009L61.0111 38.9383C60.1149 38.4408 59.1642 38.0296 58.1702 37.7159Z"
                fill="#155CF7"
              />
            </svg>

            <p class="fs-6 fw-bold mb-0">
              {{ $t('There are no project.') }}<br />
              {{ $t('You can add “New Project” to start.') }}
            </p>
            <br />
            <button class="btn btn-primary" type="button" @click="showProjectCreateModal">
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
                {{ $t('New Project') }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4">
          <div
            class="col mb-2"
            v-for="projectData in projectData.projectDataList"
            :key="projectData.id"
          >
            <ProjectCard :project-info="projectData"></ProjectCard>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ProjectCreateModalComponent
    @get-modal="getProjectCreateModal"
    :id="'createProjectModal'"
    :elementId="'createProjectModal'"
  >
  </ProjectCreateModalComponent>
</template>
