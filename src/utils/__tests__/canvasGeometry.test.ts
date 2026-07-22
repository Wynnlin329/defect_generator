import { describe, expect, it } from "vitest";

import { mapClientPointToBitmap } from "../canvasGeometry";

describe("mapClientPointToBitmap", () => {
  it("maps a displayed point to bitmap coordinates", () => {
    expect(
      mapClientPointToBitmap(
        { clientX: 110, clientY: 70 },
        { left: 10, top: 20, width: 200, height: 100 },
        { width: 1000, height: 500 },
      ),
    ).toEqual({ x: 500, y: 250 });
  });

  it("preserves top-left and bottom-right boundaries", () => {
    const rect = { left: 12, top: 24, width: 320, height: 180 };
    const bitmap = { width: 640, height: 360 };

    expect(
      mapClientPointToBitmap({ clientX: 12, clientY: 24 }, rect, bitmap),
    ).toEqual({
      x: 0,
      y: 0,
    });
    expect(
      mapClientPointToBitmap({ clientX: 332, clientY: 204 }, rect, bitmap),
    ).toEqual({
      x: 640,
      y: 360,
    });
  });

  it("characterises non-uniform scaling and points outside the display rect", () => {
    expect(
      mapClientPointToBitmap(
        { clientX: 0, clientY: 300 },
        { left: 50, top: 100, width: 100, height: 100 },
        { width: 200, height: 400 },
      ),
    ).toEqual({ x: -100, y: 800 });
  });
});
