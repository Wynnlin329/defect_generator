import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const client = {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  };

  return {
    client,
    create: vi.fn(() => client),
    getRuntimeConfig: vi.fn(() => ({
      algorithmApiBaseUrl: "https://algorithm.example.invalid/api",
    })),
  };
});

vi.mock("@/config/runtimeConfig", () => ({
  getRuntimeConfig: mocks.getRuntimeConfig,
}));

vi.mock("axios", () => ({
  default: {
    create: mocks.create,
  },
}));

import {
  downloadResult,
  editConfig,
  generateCutPasteImage,
  generateDiffusion,
  generateShapeMode1,
  generateShapeMode2,
  getModelYaml,
  getResultData,
  getResultDir,
  reviewResultData,
  uploadImages,
} from "../index";

const imageFile = new File(["image"], "image.png", { type: "image/png" });
const maskFile = new File(["mask"], "mask.png", { type: "image/png" });
const authHeaders = {
  Accept: "application/json",
  Authorization: "Bearer offline-token",
};

describe("algorithm API offline contract", () => {
  beforeEach(() => {
    mocks.client.get.mockReset();
    mocks.client.post.mockReset();
  });

  it("creates a client from public runtime config without making a request", () => {
    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "https://algorithm.example.invalid/api",
      }),
    );
  });

  it("downloads a model config using the observed query key", async () => {
    mocks.client.get.mockResolvedValueOnce({
      data: "output_dir: result/offline",
    });

    await expect(getModelYaml("cutpaste.yaml")).resolves.toContain(
      "output_dir",
    );
    expect(mocks.client.get).toHaveBeenCalledWith(
      "/algorithms/configs/base/download",
      {
        params: { ai_model: "cutpaste.yaml" },
      },
    );
  });

  it("edits YAML using the observed content type and authorization header", async () => {
    mocks.client.post.mockResolvedValueOnce({ data: { saved: true } });

    await expect(
      editConfig(
        "generation:\n  num_images: 1\n",
        "cutpasteGenerator",
        "Bearer",
        "offline-token",
      ),
    ).resolves.toEqual({ saved: true });
    expect(mocks.client.post).toHaveBeenCalledWith(
      "/algorithms/configs/cutpasteGenerator/edit",
      "generation:\n  num_images: 1\n",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer offline-token",
          "Content-Type": "application/x-yaml",
        },
      },
    );
  });

  it("characterises CutPaste multipart fields and output-folder parsing", async () => {
    mocks.client.post.mockResolvedValueOnce({
      data: {
        message:
          "Output images are saved in users/offline/result/cutpaste_outputDir",
      },
    });

    await expect(
      generateCutPasteImage(imageFile, "false", "Bearer", "offline-token"),
    ).resolves.toBe("cutpaste_outputDir");

    const [path, body, config] = mocks.client.post.mock.calls[0];
    expect(path).toBe("/cutpasteGenerator/generator");
    expect(body.get("draw_bboxes")).toBe("false");
    expect(body.get("img")).toBe(imageFile);
    expect(config.headers).toEqual({
      ...authHeaders,
      "Content-Type": "multipart/form-data",
    });
  });

  it("characterises Shape Mode 1 query, multipart field and output folder", async () => {
    mocks.client.post.mockResolvedValueOnce({
      data: {
        message:
          "Output images are saved in users/offline/result/mode1_outputDir",
      },
    });

    await expect(
      generateShapeMode1(imageFile, "false", "Bearer", "offline-token"),
    ).resolves.toBe("mode1_outputDir");

    const [path, body, config] = mocks.client.post.mock.calls[0];
    expect(path).toBe("/shapeGenerator/mode1/generator");
    expect(body.getAll("img")).toEqual([imageFile]);
    expect(config.params).toEqual({ draw_bboxes: "false" });
    expect(config.headers).toEqual({
      ...authHeaders,
      "Content-Type": "multipart/form-data",
    });
  });

  it("characterises Shape Mode 2 image/mask pairing order and output folder", async () => {
    mocks.client.post.mockResolvedValueOnce({
      data: {
        message:
          "Output images are saved in users/offline/result/mode2_outputDir",
      },
    });

    await expect(
      generateShapeMode2(
        imageFile,
        maskFile,
        "false",
        "Bearer",
        "offline-token",
      ),
    ).resolves.toBe("mode2_outputDir");

    const [path, body, config] = mocks.client.post.mock.calls[0];
    expect(path).toBe("/shapeGenerator/mode2/generator");
    expect([...body.keys()]).toEqual(["img", "mask"]);
    expect(body.get("img")).toBe(imageFile);
    expect(body.get("mask")).toBe(maskFile);
    expect(config.params).toEqual({ draw_bboxes: "false" });
  });

  it("characterises Diffusion query fields and output folder", async () => {
    mocks.client.post.mockResolvedValueOnce({
      data: {
        message:
          "Output images are saved in users/offline/result/diffusion_outputDir",
      },
    });

    await expect(
      generateDiffusion("false", "offline-upload", "Bearer", "offline-token"),
    ).resolves.toBe("diffusion_outputDir");
    expect(mocks.client.post).toHaveBeenCalledWith(
      "/diffusionGenerator/generator",
      null,
      {
        params: {
          draw_bboxes: "false",
          upload_id: "offline-upload",
        },
        headers: authHeaders,
      },
    );
  });

  it.each([
    [
      "CutPaste",
      () =>
        generateCutPasteImage(imageFile, "false", "Bearer", "offline-token"),
      /無法從響應中提取 message/,
    ],
    [
      "Shape Mode 1",
      () => generateShapeMode1(imageFile, "false", "Bearer", "offline-token"),
      /Cannot read properties of undefined.*split/,
    ],
    [
      "Shape Mode 2",
      () =>
        generateShapeMode2(
          imageFile,
          maskFile,
          "false",
          "Bearer",
          "offline-token",
        ),
      /Cannot read properties of undefined.*split/,
    ],
    [
      "Diffusion",
      () =>
        generateDiffusion("false", "offline-upload", "Bearer", "offline-token"),
      /Cannot read properties of undefined.*split/,
    ],
  ])(
    "rejects a malformed %s response without making a live request",
    async (_name, invoke, expectedMessage) => {
      mocks.client.post.mockResolvedValueOnce({ data: {} });

      await expect(invoke()).rejects.toThrow(expectedMessage);
    },
  );

  it("preserves repeated upload image/mask ordering and returns upload_id", async () => {
    const image2 = new File(["image-2"], "image-2.png", { type: "image/png" });
    const mask2 = new File(["mask-2"], "mask-2.png", { type: "image/png" });
    mocks.client.post.mockResolvedValueOnce({
      data: { upload_id: "offline-upload" },
    });

    await expect(
      uploadImages(
        [imageFile, image2],
        [maskFile, mask2],
        "offline-group",
        "Bearer",
        "offline-token",
      ),
    ).resolves.toBe("offline-upload");

    const [path, body, config] = mocks.client.post.mock.calls[0];
    expect(path).toBe("/upload_images");
    expect(body.getAll("image")).toEqual([imageFile, image2]);
    expect(body.getAll("mask")).toEqual([maskFile, mask2]);
    expect(config.params).toEqual({ groupName: "offline-group" });
  });

  it("returns result directory and folder data with observed request shapes", async () => {
    mocks.client.get
      .mockResolvedValueOnce({ data: ["folder-a"] })
      .mockResolvedValueOnce({ data: { img_list: ["image-a.png"] } });

    await expect(getResultDir("Bearer", "offline-token")).resolves.toEqual([
      "folder-a",
    ]);
    await expect(
      getResultData("folder-a", "Bearer", "offline-token"),
    ).resolves.toEqual({
      img_list: ["image-a.png"],
    });
    expect(mocks.client.get).toHaveBeenNthCalledWith(1, "/get_result_dir", {
      headers: authHeaders,
    });
    expect(mocks.client.get).toHaveBeenNthCalledWith(2, "/get_result_data", {
      params: { folder_name: "folder-a" },
      headers: authHeaders,
    });
  });

  it("returns a blob preview with responseType=blob", async () => {
    const blob = new Blob(["preview"], { type: "image/png" });
    mocks.client.get.mockResolvedValueOnce({ data: blob });

    await expect(
      reviewResultData("folder/image.png", "Bearer", "offline-token"),
    ).resolves.toBe(blob);
    expect(mocks.client.get).toHaveBeenCalledWith("/review_result_data", {
      params: { image_path: "folder/image.png" },
      headers: authHeaders,
      responseType: "blob",
    });
  });

  it.each([
    ['attachment; filename="offline-results.zip"', "offline-results.zip"],
    [undefined, "downloaded_file.zip"],
  ])(
    "uses the observed download filename behavior for %s",
    async (header, expectedFilename) => {
      const blob = new Blob(["zip"], { type: "application/zip" });
      mocks.client.get.mockResolvedValueOnce({
        data: blob,
        headers: { "content-disposition": header },
      });

      await expect(
        downloadResult("folder-a", "Bearer", "offline-token"),
      ).resolves.toEqual({
        blob,
        filename: expectedFilename,
      });
    },
  );
});
