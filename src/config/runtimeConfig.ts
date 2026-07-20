export interface RuntimeEnvironment {
  readonly [key: string]: string | boolean | undefined;
  readonly VITE_AUTH_BASE_URL?: string;
  readonly VITE_ALGORITHM_API_BASE_URL?: string;
  readonly VITE_PROJECT_API_BASE_URL?: string;
  readonly VITE_USE_PROJECT_TEST_DATA?: string;
  readonly VITE_OAUTH_CLIENT_ID?: string;
}

export interface RuntimeConfig {
  readonly authBaseUrl: string;
  readonly algorithmApiBaseUrl: string;
  readonly projectApiBaseUrl: string;
  readonly useProjectTestData: boolean;
  readonly oauthClientId: string | null;
}

function requirePublicValue(
  value: string | undefined,
  key: keyof RuntimeEnvironment,
): string {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    throw new Error(`Missing required public runtime configuration: ${key}`);
  }

  return normalizedValue;
}

function normalizeBaseUrl(
  value: string | undefined,
  key: keyof RuntimeEnvironment,
): string {
  const rawValue = requirePublicValue(value, key);
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(rawValue);
  } catch {
    throw new Error(`Invalid URL in public runtime configuration: ${key}`);
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error(
      `Unsupported URL protocol in public runtime configuration: ${key}`,
    );
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error(
      `Credentials are not allowed in public runtime configuration: ${key}`,
    );
  }

  if (parsedUrl.search || parsedUrl.hash) {
    throw new Error(
      `Query strings and fragments are not allowed in public runtime configuration: ${key}`,
    );
  }

  const normalizedPath = parsedUrl.pathname.replace(/\/+$/, "");
  return `${parsedUrl.origin}${normalizedPath}`;
}

function parseRequiredBoolean(
  value: string | undefined,
  key: keyof RuntimeEnvironment,
): boolean {
  const normalizedValue = requirePublicValue(value, key).toLowerCase();

  if (normalizedValue === "true") {
    return true;
  }

  if (normalizedValue === "false") {
    return false;
  }

  throw new Error(
    `Expected true or false in public runtime configuration: ${key}`,
  );
}

function readOptionalPublicValue(value: string | undefined): string | null {
  const normalizedValue = value?.trim();
  return normalizedValue || null;
}

export function createRuntimeConfig(
  environment: RuntimeEnvironment,
): RuntimeConfig {
  return Object.freeze({
    authBaseUrl: normalizeBaseUrl(
      environment.VITE_AUTH_BASE_URL,
      "VITE_AUTH_BASE_URL",
    ),
    algorithmApiBaseUrl: normalizeBaseUrl(
      environment.VITE_ALGORITHM_API_BASE_URL,
      "VITE_ALGORITHM_API_BASE_URL",
    ),
    projectApiBaseUrl: normalizeBaseUrl(
      environment.VITE_PROJECT_API_BASE_URL,
      "VITE_PROJECT_API_BASE_URL",
    ),
    useProjectTestData: parseRequiredBoolean(
      environment.VITE_USE_PROJECT_TEST_DATA,
      "VITE_USE_PROJECT_TEST_DATA",
    ),
    oauthClientId: readOptionalPublicValue(environment.VITE_OAUTH_CLIENT_ID),
  });
}

let cachedRuntimeConfig: RuntimeConfig | undefined;

export function getRuntimeConfig(): RuntimeConfig {
  cachedRuntimeConfig ??= createRuntimeConfig(import.meta.env);
  return cachedRuntimeConfig;
}
