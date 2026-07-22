import { describe, expect, it, vi } from "vitest";

import { releaseObjectUrl, replaceObjectUrl } from "../objectUrl";

const createUrlApi = () => ({
  createObjectURL: vi.fn(() => "blob:offline-next"),
  revokeObjectURL: vi.fn(),
});

describe("object URL lifecycle", () => {
  it("creates a URL without revoking when there is no previous URL", () => {
    const urlApi = createUrlApi();
    const blob = new Blob(["preview"], { type: "image/png" });

    expect(replaceObjectUrl(null, blob, urlApi)).toBe("blob:offline-next");
    expect(urlApi.revokeObjectURL).not.toHaveBeenCalled();
    expect(urlApi.createObjectURL).toHaveBeenCalledWith(blob);
  });

  it("revokes the previous URL before creating its replacement", () => {
    const urlApi = createUrlApi();
    const blob = new Blob(["preview"], { type: "image/png" });

    replaceObjectUrl("blob:offline-previous", blob, urlApi);

    expect(urlApi.revokeObjectURL).toHaveBeenCalledWith(
      "blob:offline-previous",
    );
    expect(urlApi.revokeObjectURL.mock.invocationCallOrder[0]).toBeLessThan(
      urlApi.createObjectURL.mock.invocationCallOrder[0],
    );
  });

  it("does not call revoke for an empty URL", () => {
    const urlApi = createUrlApi();

    releaseObjectUrl(undefined, urlApi);

    expect(urlApi.revokeObjectURL).not.toHaveBeenCalled();
  });
});
