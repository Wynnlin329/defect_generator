import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

const mocks = vi.hoisted(() => ({
  getRuntimeConfig: vi.fn(),
  post: vi.fn(),
}));

vi.mock("@/config/runtimeConfig", () => ({
  getRuntimeConfig: mocks.getRuntimeConfig,
}));

vi.mock("axios", () => ({
  default: {
    post: mocks.post,
  },
}));

import { useAuthStore } from "../auth";

describe("auth store login", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mocks.getRuntimeConfig.mockReset();
    mocks.post.mockReset();
    mocks.getRuntimeConfig.mockReturnValue({
      authBaseUrl: "https://auth.example.invalid/gdai/v1",
      oauthClientId: null,
    });
    mocks.post.mockResolvedValue({
      data: {
        access_token: "test-access-token",
        token_type: "bearer",
      },
    });
  });

  it("sends user input without a browser-side client secret", async () => {
    const store = useAuthStore();

    await store.login("test-user", "test-password");

    expect(mocks.post).toHaveBeenCalledTimes(1);
    expect(mocks.post.mock.calls[0][0]).toBe(
      "https://auth.example.invalid/gdai/v1/api/oauth2/token",
    );

    const requestBody = new URLSearchParams(mocks.post.mock.calls[0][1]);
    expect(requestBody.get("username")).toBe("test-user");
    expect(requestBody.get("password")).toBe("test-password");
    expect(requestBody.has("client_id")).toBe(false);
    expect(requestBody.has("client_secret")).toBe(false);
    expect(store.isLoggedIn).toBe(true);
  });

  it("includes an optional public client id without adding a client secret", async () => {
    mocks.getRuntimeConfig.mockReturnValue({
      authBaseUrl: "https://auth.example.invalid/gdai/v1",
      oauthClientId: "browser-client",
    });
    const store = useAuthStore();

    await store.login("test-user", "test-password");

    const requestBody = new URLSearchParams(mocks.post.mock.calls[0][1]);
    expect(requestBody.get("client_id")).toBe("browser-client");
    expect(requestBody.has("client_secret")).toBe(false);
  });
});
