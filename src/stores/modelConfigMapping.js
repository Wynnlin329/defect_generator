import jsYaml from "js-yaml";

export const applyDownloadedModelConfig = (
  downloadModelConfig,
  fileName,
  yamlText,
) => {
  const parsedConfig = jsYaml.load(yamlText);
  const modelName = fileName.split(".")[0];

  if (modelName === "cutpaste") {
    Object.assign(downloadModelConfig.cutPaste, parsedConfig);
  } else if (modelName === "mode1") {
    Object.assign(downloadModelConfig.geometricShapes_1, parsedConfig);
  } else if (modelName === "mode2") {
    downloadModelConfig.geometricShapes_2 = parsedConfig;
  } else if (modelName === "anomalydiffusion") {
    downloadModelConfig.anomalyDiffusion = parsedConfig;
  }

  return parsedConfig;
};
