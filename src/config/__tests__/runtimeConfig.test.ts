import { describe, expect, it } from "vitest";

import { createRuntimeConfig, type RuntimeEnvironment } from "../runtimeConfig";

const validEnvironment: RuntimeEnvironment = {
  VITE_AUTH_BASE_URL: "https://auth.example.invalid/gdai/v1",
  VITE_ALGORITHM_API_BASE_URL: "https://algorithm.example.invalid/gdai/v1/api",
  VITE_PROJECT_API_BASE_URL: "https://project.example.invalid/api",
  VITE_USE_PROJECT_TEST_DATA: "true",
  VITE_OAUTH_CLIENT_ID: "browser-client",
};

describe("createRuntimeConfig", () => {
  it("creates a normalized immutable config from valid public values", () => {
    const config = createRuntimeConfig({
      ...validEnvironment,
      VITE_AUTH_BASE_URL: " https://auth.example.invalid/gdai/v1/// ",
      VITE_USE_PROJECT_TEST_DATA: " TRUE ",
      VITE_OAUTH_CLIENT_ID: " browser-client ",
    });

    expect(config).toEqual({
      authBaseUrl: "https://auth.example.invalid/gdai/v1",
      algorithmApiBaseUrl: "https://algorithm.example.invalid/gdai/v1/api",
      projectApiBaseUrl: "https://project.example.invalid/api",
      useProjectTestData: true,
      oauthClientId: "browser-client",
    });
    expect(Object.isFrozen(config)).toBe(true);
  });

  it("accepts an explicit false testing-data flag and an omitted public client id", () => {
    const config = createRuntimeConfig({
      ...validEnvironment,
      VITE_USE_PROJECT_TEST_DATA: "false",
      VITE_OAUTH_CLIENT_ID: "   ",
    });

    expect(config.useProjectTestData).toBe(false);
    expect(config.oauthClientId).toBeNull();
  });

  it.each([
    "VITE_AUTH_BASE_URL",
    "VITE_ALGORITHM_API_BASE_URL",
    "VITE_PROJECT_API_BASE_URL",
    "VITE_USE_PROJECT_TEST_DATA",
  ] as const)("rejects a missing required value: %s", (key) => {
    expect(() =>
      createRuntimeConfig({ ...validEnvironment, [key]: undefined }),
    ).toThrow(key);
  });

  it.each([
    ["not-a-url", "Invalid URL"],
    ["ftp://files.example.invalid/api", "Unsupported URL protocol"],
    ["https://user:pass@example.invalid/api", "Credentials are not allowed"],
    [
      "https://example.invalid/api?mode=test",
      "Query strings and fragments are not allowed",
    ],
    [
      "https://example.invalid/api#section",
      "Query strings and fragments are not allowed",
    ],
  ])("rejects an unsafe or invalid base URL: %s", (value, expectedMessage) => {
    expect(() =>
      createRuntimeConfig({ ...validEnvironment, VITE_AUTH_BASE_URL: value }),
    ).toThrow(expectedMessage);
  });

  it("rejects an ambiguous testing-data flag instead of selecting live data", () => {
    expect(() =>
      createRuntimeConfig({
        ...validEnvironment,
        VITE_USE_PROJECT_TEST_DATA: "1",
      }),
    ).toThrow("VITE_USE_PROJECT_TEST_DATA");
  });
});
