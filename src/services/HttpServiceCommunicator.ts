import type { ProjectData } from '@/data_struct/ProjectData'
import { ProjectDataListSchema, GetProjectDataFromSchema } from '@/data_struct/ProjectData'
import axios from 'axios'
import TestingDataGeneratoe from './TestingDataGenerator'

class HttpServiceCommunicator {
  // 1 = open 、 0 = close
  public static IsUsingTestingData: number = 1
  private static baseUrl: string = 'http://127.0.0.1:8000/api/'

  public static async GetRecentlyProjectList(): Promise<ProjectData[]> {
    if (HttpServiceCommunicator.IsUsingTestingData == 1) {
      return await TestingDataGeneratoe.GetRecentlyProjectList()
    }

    const apiName: string = 'get_recently_project_list/'

    try {
      const lstOutputData: ProjectData[] = []
      const response = await axios.get(HttpServiceCommunicator.baseUrl + apiName)

      const lstProjectDataSchema = ProjectDataListSchema.parse(response.data)

      for (const projectData of lstProjectDataSchema) {
        lstOutputData.push(GetProjectDataFromSchema(projectData))
      }

      return lstOutputData
    } catch (error) {
      throw error
    }
  }
}

export default HttpServiceCommunicator
