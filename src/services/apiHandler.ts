// import axios from 'axios'
import type { ProjectData } from '@/data_struct/ProjectData'
import TestingDataGeneratoe from '@/services/TestingDataGenerator'

export enum RequestStatus {
  Pending = 'PENDING',
  InProgress = 'IN_PROGRESS',
  Success = 'SUCCESS',
  Failed = 'FAILED',
  Canceled = 'CANCELED',
}

export default class ApiHandler {
  public static async GetRecentlyProjectList(): Promise<ProjectData[]> {
    const OwnerName: string[] = ['Wayne', 'Olivia', 'Mason', 'Amelia']

    return new Promise((resolve) => {
      setTimeout(() => {
        const lstOutputData: ProjectData[] = []

        for (let i: number = 0; i < 4; i++) {
          const data: ProjectData = {
            id: TestingDataGeneratoe.generateUUID(),
            ownerUserId: i.toString(),
            ownerUserName: OwnerName[i],
            projectType: Math.floor(Math.random() * 4 + 1),
            projectName: 'Project ' + i,
            projectDescription: '',
            projectProfile: `https://dummyjson.com/icon/${i}/150`,
            imageCount: Math.floor(Math.random() * 299 + 1),
            taskCount: Math.floor(Math.random() * 10 + 1),
            createDatetime: new Date().toDateString(),
            lastEditDatetime: new Date().toDateString(),
            lastEditUserId: i.toString(),
            deleteDatetime: null,
            isActive: true,
          }

          lstOutputData.push(data)
        }

        resolve(lstOutputData)
      }, TestingDataGeneratoe.SimulationDelay)
    })
  }
}
