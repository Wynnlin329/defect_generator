import type { ProjectData } from "@/data_struct/ProjectData";
import {
  ProjectDataListSchema,
  GetProjectDataFromSchema,
} from "@/data_struct/ProjectData";
import { getRuntimeConfig } from "@/config/runtimeConfig";
import axios from "axios";
import TestingDataGeneratoe from "./TestingDataGenerator";

class HttpServiceCommunicator {
  public static async GetRecentlyProjectList(): Promise<ProjectData[]> {
    const runtimeConfig = getRuntimeConfig();

    if (runtimeConfig.useProjectTestData) {
      return await TestingDataGeneratoe.GetRecentlyProjectList();
    }

    const apiName: string = "get_recently_project_list/";

    try {
      const lstOutputData: ProjectData[] = [];
      const response = await axios.get(
        `${runtimeConfig.projectApiBaseUrl}/${apiName}`,
      );

      const lstProjectDataSchema = ProjectDataListSchema.parse(response.data);

      for (const projectData of lstProjectDataSchema) {
        lstOutputData.push(GetProjectDataFromSchema(projectData));
      }

      return lstOutputData;
    } catch (error) {
      throw error;
    }
  }
}

export default HttpServiceCommunicator;
