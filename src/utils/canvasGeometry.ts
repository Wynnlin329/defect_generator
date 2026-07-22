export type ClientPoint = {
  clientX: number;
  clientY: number;
};

export type DisplayRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type BitmapSize = {
  width: number;
  height: number;
};

export const mapClientPointToBitmap = (
  point: ClientPoint,
  displayRect: DisplayRect,
  bitmapSize: BitmapSize,
) => ({
  x:
    (point.clientX - displayRect.left) * (bitmapSize.width / displayRect.width),
  y:
    (point.clientY - displayRect.top) *
    (bitmapSize.height / displayRect.height),
});
