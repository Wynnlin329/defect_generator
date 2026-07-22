<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProjectData } from '../../data_struct/ProjectData'
import type { AnnouncementItemData } from './AnnouncementItemData'

import { Modal } from 'bootstrap'

import RoundedProgressBar from '@/components/RoundedProgressBar.vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import ProjectCreateModalComponent from '@/views/project/ProjectCreateModalComponent.vue'
import AnnouncementItem from './AnnouncementItem.vue'

import HttpServiceCommunicator from '@/services/HttpServiceCommunicator'

const announcementDataList = ref<AnnouncementItemData[]>([])

const projectDataList = ref<ProjectData[]>([])

onMounted(async () => {
  projectDataList.value = await HttpServiceCommunicator.GetRecentlyProjectList()
})

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
  <div></div>
  <div class="div-main">
    <div class="div-top-area">
      <div class="div-top-area-column-1">
        <div class="aisv-card">
          <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                aria-label="Slide 1"
                class="active"
                aria-current="true"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="../../assets/images/home_page_images/01.png"
                  class="d-block w-100"
                  alt="..."
                />
              </div>

              <div class="carousel-item">
                <img
                  src="../../assets/images/home_page_images/02.png"
                  class="d-block w-100"
                  alt="..."
                />
              </div>

              <div class="carousel-item">
                <img
                  src="../../assets/images/home_page_images/03.png"
                  class="d-block w-100"
                  alt="..."
                />
              </div>
            </div>

            <button
              class="carousel-control-prev carousel-control-button"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>

            <button
              class="carousel-control-next carousel-control-button"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div class="div-top-area-column-2">
        <div class="aisv-card div-top-area-column-2-item">
          <RoundedProgressBar class="progressbar-training" :progress="80" />
          <div class="title-text">Training</div>
          <div class="regular-text">ProjectName</div>
        </div>

        <div class="aisv-card div-top-area-column-2-item">
          <img
            class="img-waiting-task"
            src="../../assets/images/home_page_images/waiting_task.png"
          />
          <div class="title-text">Your Waiting Tasks</div>
          <div class="regular-text">0 Tasks</div>
        </div>
      </div>

      <div class="div-top-area-column-3">
        <div id="div-announcement" class="aisv-card">
          <h5>Announcement</h5>

          <div id="div-announcement-list" v-for="item in announcementDataList" :key="item.uuid">
            <AnnouncementItem
              class="announcement-item"
              v-bind:uuid="item.uuid"
              v-bind:date_time="item.date_time"
              v-bind:message="item.message"
            ></AnnouncementItem>
          </div>
        </div>
      </div>
    </div>

    <div class="div-recently-projects">
      <div class="d-flex mb-3">
        <h4 id="h4-recently-projects-title">Recently Projects</h4>
        <button
          class="btn btn-primary ms-auto"
          type="button"
          @click="showProjectCreateModal"
          v-if="projectDataList.length > 0"
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

      <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4" v-if="projectDataList.length > 0">
        <div class="col mb-2" v-for="projectData in projectDataList" :key="projectData.id">
          <ProjectCard :project-info="projectData"></ProjectCard>
        </div>
      </div>

      <div id="div-no-recently-project" v-if="projectDataList.length == 0">
        <div class="d-flex justify-content-center h-100">
          <div class="align-self-center text-center">
            <button class="btn btn-primary mb-2" type="button" @click="showProjectCreateModal">
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
            <p class="fs-6 fw-bold mb-0">
              {{ $t('There are no project.') }}<br />
              {{ $t('You can add “New Project” to start.') }}
            </p>
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

<style scoped>
#dialog-create-new-project {
  width: 500px;
}

.div-main {
  padding: 0px 20px;
  grid-template-rows: 2;
  justify-content: stretch;
  align-items: center;
}

.title-text {
  font-size: 18px;
  font-weight: 700;
}

.regular-text {
  font-size: 14px;
  font-weight: 400;
}

.description-text {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.9;
}

h5 {
  font-size: 18px;
  font-weight: 700;
}

/***********  Top Area ***********/

.div-top-area {
  margin-top: 20px;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr 0.66fr 1fr;
}

.div-top-area-column-1 {
  display: grid;
  justify-content: stretch;
  align-items: stretch;
  padding: 0px;
  margin: 0px;
  grid-column: 1;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ※※※ need to be optimized */
.carousel-item {
  max-height: 350px;
  height: 350px;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel-control-button {
  margin: auto;
  opacity: 0.3;
  width: 54px;
  height: 54px;
  background-color: #1f1f1f;
  color: black;
}

.carousel-control-button:hover {
  opacity: 1;
}

.div-top-area-column-2 {
  grid-column: 2;
  min-width: 250px;
  padding: 0;
  margin: 0px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.div-top-area-column-2-item {
  padding: 30px;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
}

.progressbar-training {
  width: 50px;
  height: 50px;
}

.img-waiting-task {
  margin-left: -5px;
  width: 60px;
  height: 60px;
}

.div-top-area-column-3 {
  padding: 0;
  margin: 0px;
  grid-column: 3;
  display: grid;
  justify-content: stretch;
  align-items: stretch;
}

#div-announcement-list {
  padding: 0px;
}

#div-announcement {
  padding: 30px;
}

/***********  Recently Projects ***********/

.div-recently-projects {
  margin-top: 30px;
  grid-row: 2;
  height: 300px;
  padding: 0;
}

/* ※※※ */
#div-recently-project-list {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

#div-no-recently-project {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#h4-recently-projects-title {
  color: #808080;
  font-weight: 500;
}

.div-recently-projects-title {
  display: flex;
  justify-content: left;
  align-items: center;
}

.div-recently-projects-title > h4 {
  width: 100%;
}

.btn-new-project {
  min-width: 150px;
}

/*********** PageIn Animation ***********/

.div-top-area {
  animation: div-top-area-fadeinup 0.5s forwards;
}

@keyframes div-top-area-fadeinup {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.div-recently-projects {
  animation: div-recently-projects-fadeinup 0.5s forwards;
}

@keyframes div-recently-projects-fadeinup {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
