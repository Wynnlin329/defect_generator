/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_AUTH_BASE_URL: string;
  readonly VITE_ALGORITHM_API_BASE_URL: string;
  readonly VITE_PROJECT_API_BASE_URL: string;
  readonly VITE_USE_PROJECT_TEST_DATA: "true" | "false";
  readonly VITE_OAUTH_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
