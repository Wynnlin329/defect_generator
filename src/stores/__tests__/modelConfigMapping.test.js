import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import jsYaml from "js-yaml";
import { describe, expect, it } from "vitest";

import { applyDownloadedModelConfig } from "../modelConfigMapping";

const fixtureText = (name) =>
  readFileSync(
    resolve(process.cwd(), `src/test/fixtures/model-config/${name}.yaml`),
    "utf8",
  );

const createConfigState = () => ({
  cutPaste: { preserved: "cutpaste-default", generation: { num_images: 3 } },
  geometricShapes_1: { preserved: "mode1-default" },
  geometricShapes_2: { preserved: "mode2-default" },
  anomalyDiffusion: { preserved: "diffusion-default" },
});

describe("applyDownloadedModelConfig", () => {
  it.each([
    ["cutpaste", "cutpaste.yaml", "cutPaste", "result/cutpaste_fixture"],
    ["mode1", "mode1.yaml", "geometricShapes_1", "result/mode1_fixture"],
    ["mode2", "mode2.yaml", "geometricShapes_2", "result/mode2_fixture"],
    [
      "anomalydiffusion",
      "anomalydiffusion.yaml",
      "anomalyDiffusion",
      "result/diffusion_fixture",
    ],
  ])(
    "maps the %s fixture to the observed store key",
    (_name, fileName, storeKey, outputDir) => {
      const state = createConfigState();

      applyDownloadedModelConfig(
        state,
        fileName,
        fixtureText(fileName.replace(".yaml", "")),
      );

      expect(state[storeKey].output_dir).toBe(outputDir);
    },
  );

  it("preserves existing CutPaste defaults when a downloaded YAML key is missing", () => {
    const state = createConfigState();

    applyDownloadedModelConfig(
      state,
      "cutpaste.yaml",
      "output_dir: result/minimal\n",
    );

    expect(state.cutPaste).toEqual({
      preserved: "cutpaste-default",
      generation: { num_images: 3 },
      output_dir: "result/minimal",
    });
  });

  it("records the current Mode 2 wrong-type outcome without claiming schema validation", () => {
    const state = createConfigState();

    applyDownloadedModelConfig(state, "mode2.yaml", "generation: wrong-type\n");

    expect(state.geometricShapes_2).toEqual({ generation: "wrong-type" });
  });

  it("surfaces malformed YAML from the parser", () => {
    const state = createConfigState();

    expect(() =>
      applyDownloadedModelConfig(state, "mode1.yaml", "generation: ["),
    ).toThrow();
  });

  it.each(["cutpaste", "mode1", "mode2", "anomalydiffusion"])(
    "round-trips the %s fixture through js-yaml without semantic drift",
    (name) => {
      const parsed = jsYaml.load(fixtureText(name));
      expect(jsYaml.load(jsYaml.dump(parsed))).toEqual(parsed);
    },
  );
});
