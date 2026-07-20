import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getRuntimeConfig: vi.fn(),
  getRecentlyProjectList: vi.fn(),
  parseProjectList: vi.fn(),
  getProjectDataFromSchema: vi.fn(),
  get: vi.fn(),
}));

vi.mock("@/config/runtimeConfig", () => ({
  getRuntimeConfig: mocks.getRuntimeConfig,
}));

vi.mock("@/data_struct/ProjectData", () => ({
  ProjectDataListSchema: {
    parse: mocks.parseProjectList,
  },
  GetProjectDataFromSchema: mocks.getProjectDataFromSchema,
}));

vi.mock("axios", () => ({
  default: {
    get: mocks.get,
  },
}));

vi.mock("../TestingDataGenerator", () => ({
  default: {
    GetRecentlyProjectList: mocks.getRecentlyProjectList,
  },
}));

import HttpServiceCommunicator from "../HttpServiceCommunicator";

describe("HttpServiceCommunicator runtime routing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getRuntimeConfig.mockReturnValue({
      projectApiBaseUrl: "https://project.example.invalid/api",
      useProjectTestData: true,
    });
  });

  it("does not call the project API when testing data is enabled", async () => {
    const testingProjects = [{ uuid: "offline-project" }];
    mocks.getRecentlyProjectList.mockResolvedValue(testingProjects);

    await expect(
      HttpServiceCommunicator.GetRecentlyProjectList(),
    ).resolves.toBe(testingProjects);
    expect(mocks.get).not.toHaveBeenCalled();
  });

  it("uses the normalized project API base URL when live routing is explicit", async () => {
    mocks.getRuntimeConfig.mockReturnValue({
      projectApiBaseUrl: "https://project.example.invalid/api",
      useProjectTestData: false,
    });
    mocks.get.mockResolvedValue({ data: [] });
    mocks.parseProjectList.mockReturnValue([]);

    await expect(
      HttpServiceCommunicator.GetRecentlyProjectList(),
    ).resolves.toEqual([]);
    expect(mocks.get).toHaveBeenCalledWith(
      "https://project.example.invalid/api/get_recently_project_list/",
    );
  });
});
