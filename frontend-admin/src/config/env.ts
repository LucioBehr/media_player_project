type AppMode = "development" | "production" | "test";

const DEFAULT_API_BASE_URL = "http://localhost:5000/api";

function resolveAppMode(): AppMode {
  const mode = import.meta.env.MODE;

  if (mode === "production" || mode === "test") {
    return mode;
  }

  return "development";
}

function resolveUseMock(appMode: AppMode): boolean {
  const value = import.meta.env.VITE_USE_MOCK;

  if (value === "true") return true;
  if (value === "false") return false;

  // Sem .env definido: comportamento padrão de dev (API), exceto em test
  return appMode === "test";
}

function resolveApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

const APP_MODE = resolveAppMode();
const USE_MOCK = resolveUseMock(APP_MODE);
const API_BASE_URL = resolveApiBaseUrl();

export type { AppMode };
export { APP_MODE, USE_MOCK, API_BASE_URL, DEFAULT_API_BASE_URL };
