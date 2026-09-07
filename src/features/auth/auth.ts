export const AUTH_STORAGE_KEY = "task_manager_auth";

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function login(): void {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
