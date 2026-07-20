import type { ProjectData } from '@/data_struct/ProjectData'

class TestingDataGeneratoe {
  public static SimulationDelay: number = 1500

  private static OwnerName: string[] = [
    'Wayne',
    'Olivia',
    'Mason',
    'Amelia',
    'Noah',
    'Ava',
    'James',
    'Emma',
    'Liam',
    'Isabella',
    'Lucas',
  ]

  public static async GetRecentlyProjectList(): Promise<ProjectData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lstOutputData: ProjectData[] = []

        for (let i: number = 0; i < 10; i++) {
          const data: ProjectData = {
            id: TestingDataGeneratoe.generateUUID(),
            ownerUserId: i.toString(),
            ownerUserName: TestingDataGeneratoe.OwnerName[i],
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

  public static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0
      const value = char === 'x' ? random : (random & 0x3) | 0x8

      return value.toString(16)
    })
  }
}

export default TestingDataGeneratoe
