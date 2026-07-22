type ObjectUrlApi = Pick<typeof URL, "createObjectURL" | "revokeObjectURL">;

export const releaseObjectUrl = (
  objectUrl: string | null | undefined,
  urlApi: ObjectUrlApi = URL,
) => {
  if (objectUrl) {
    urlApi.revokeObjectURL(objectUrl);
  }
};

export const replaceObjectUrl = (
  currentUrl: string | null | undefined,
  blob: Blob,
  urlApi: ObjectUrlApi = URL,
) => {
  releaseObjectUrl(currentUrl, urlApi);
  return urlApi.createObjectURL(blob);
};
