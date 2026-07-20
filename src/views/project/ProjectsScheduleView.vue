<script setup lang="ts">
import { ref } from 'vue'

interface ScheduleData {
  id: string
  taskName: string
  taskStatus: number
  ownerUserName: string
  projectType: number
  projectName: string
  taskStartTime: string
  taskFinishedTime: string
  taskTrainingData: object
}

const sampleDatas = ref<ScheduleData[]>([
  {
    id: 'task-001',
    taskName: 'Example123',
    taskStatus: 1,
    ownerUserName: 'Alice',
    projectType: 2,
    projectName: 'AI Development',
    taskStartTime: '2025-01-01T10:00:00Z',
    taskFinishedTime: '2025-01-02T15:30:00Z',
    taskTrainingData: {
      accuracy: 0.95,
      loss: 0.05,
      epochs: 50,
    },
  },
  {
    id: 'task-002',
    taskName: 'Example123',
    taskStatus: 0,
    ownerUserName: 'Bob',
    projectType: 1,
    projectName: 'Website Redesign',
    taskStartTime: '2025-01-05T08:15:00Z',
    taskFinishedTime: '2025-01-06T12:45:00Z',
    taskTrainingData: {
      accuracy: 0.88,
      loss: 0.12,
      epochs: 30,
    },
  },
  {
    id: 'task-003',
    taskName: 'Example123',
    taskStatus: 2,
    ownerUserName: 'Charlie',
    projectType: 3,
    projectName: 'Mobile App Testing',
    taskStartTime: '2025-01-10T09:00:00Z',
    taskFinishedTime: '2025-01-11T11:00:00Z',
    taskTrainingData: {
      accuracy: 0.92,
      loss: 0.08,
      epochs: 40,
    },
  },
  {
    id: 'task-004',
    taskName: 'Example123',
    taskStatus: 1,
    ownerUserName: 'Diana',
    projectType: 2,
    projectName: 'Data Analysis',
    taskStartTime: '2025-01-15T14:00:00Z',
    taskFinishedTime: '2025-01-16T18:30:00Z',
    taskTrainingData: {
      accuracy: 0.97,
      loss: 0.03,
      epochs: 60,
    },
  },
  {
    id: 'task-005',
    taskName: 'Example123',
    taskStatus: 0,
    ownerUserName: 'Eve',
    projectType: 4,
    projectName: 'System Integration',
    taskStartTime: '2025-01-20T07:45:00Z',
    taskFinishedTime: '2025-01-21T13:15:00Z',
    taskTrainingData: {
      accuracy: 0.91,
      loss: 0.09,
      epochs: 35,
    },
  },
  {
    id: 'task-006',
    taskName: 'Example123',
    taskStatus: 1,
    ownerUserName: 'Frank',
    projectType: 1,
    projectName: 'Cloud Migration',
    taskStartTime: '2025-01-22T10:30:00Z',
    taskFinishedTime: '2025-01-23T16:00:00Z',
    taskTrainingData: {
      accuracy: 0.89,
      loss: 0.11,
      epochs: 45,
    },
  },
])
</script>

<template>
  <div class="container-fluid p-2 p-md-3 p-lg-4">
    <div class="table-responsive-lg">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">{{ $t('Task Name') }}</th>
            <th scope="col">{{ $t('Status') }}</th>
            <th scope="col">{{ $t('Project Name') }}</th>
            <th scope="col">{{ $t('Project Type') }}</th>
            <th scope="col">{{ $t('Time Spent') }}</th>
            <th scope="col">{{ $t('Started Time') }}</th>
            <th scope="col">{{ $t('Finished Time') }}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sampleDatas" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.taskName }}</td>
            <td>{{ item.taskStatus }}</td>
            <td>{{ item.projectName }}</td>
            <td>{{ item.projectType }}</td>
            <td>-</td>
            <td>{{ item.taskStartTime }}</td>
            <td>{{ item.taskFinishedTime }}</td>
            <td>
              <button class="btn text-primary me-2">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2129 9.59497L10.8639 13.944L8.54785 11.625"
                    stroke="black"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.68806 4.28205L10.4731 1.45605H12.6021L13.3831 4.28205C14.0783 4.45782 14.7442 4.73371 15.3601 5.10105L17.9101 3.66105L18.6631 4.41405L19.4161 5.16705L17.9831 7.71105C18.3504 8.32689 18.6263 8.99285 18.8021 9.68806L21.6231 10.4731V12.6021L18.8021 13.3871C18.6263 14.0823 18.3504 14.7482 17.9831 15.3641L19.4231 17.9141L18.6701 18.6671L17.9171 19.4201L15.3641 17.9821C14.7482 18.3494 14.0823 18.6253 13.3871 18.8011L12.6021 21.6221H10.4731L9.68806 18.8011C8.99285 18.6253 8.32689 18.3494 7.71105 17.9821L5.16005 19.4221L4.40905 18.6691L3.65605 17.9161L5.09605 15.3661C4.72853 14.7478 4.45266 14.0795 4.27705 13.3821L1.45605 12.6021V10.4731L4.27705 9.68806C4.45329 8.99301 4.72915 8.32711 5.09605 7.71105L3.65705 5.16205L4.41005 4.40905L5.16105 3.65605L7.71105 5.09505C8.32743 4.7302 8.99332 4.45637 9.68806 4.28205Z"
                    stroke="black"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button class="btn text-primary me-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.25 17.7497V16.1055L1.75 14.6055V17.7497H0.25ZM4.25 17.7497V12.1055L5.75 10.6055V17.7497H4.25ZM8.25 17.7497V10.6055L9.75 12.1305V17.7497H8.25ZM12.25 17.7497V12.1305L13.75 10.6305V17.7497H12.25ZM16.25 17.7497V8.10547L17.75 6.60547V17.7497H16.25ZM0.25 12.219V10.1055L7 3.35547L11 7.35547L17.75 0.605469V2.71897L11 9.46897L7 5.46897L0.25 12.219Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button class="btn text-primary">
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.30775 17.5002C2.80908 17.5002 2.38308 17.3236 2.02975 16.9705C1.67658 16.6171 1.5 16.1911 1.5 15.6925V3.00022H0.5V1.50022H5V0.615723H11V1.50022H15.5V3.00022H14.5V15.6925C14.5 16.1976 14.325 16.6252 13.975 16.9752C13.625 17.3252 13.1974 17.5002 12.6923 17.5002H3.30775ZM13 3.00022H3V15.6925C3 15.7823 3.02883 15.8561 3.0865 15.9137C3.14417 15.9714 3.21792 16.0002 3.30775 16.0002H12.6923C12.7692 16.0002 12.8398 15.9681 12.9038 15.904C12.9679 15.84 13 15.7695 13 15.6925V3.00022ZM5.404 14.0002H6.90375V5.00022H5.404V14.0002ZM9.09625 14.0002H10.596V5.00022H9.09625V14.0002Z"
                    fill="black"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
