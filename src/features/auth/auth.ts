import type { UserProfile } from "./types/user.types";

export const AUTH_STORAGE_KEY = "task_manager_auth";
export const PROFILE_STORAGE_KEY = "task_manager_profile";

const DEFAULT_PROFILE: UserProfile = {
  name: "Amir",
  username: "Admin",
  email: "admin@example.com",
  password: "123456",
  avatar: null,
};

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function ensureDefaultProfile(): UserProfile {
  const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (savedProfile) {
    try {
      return JSON.parse(savedProfile) as UserProfile;
    } catch {
      // Continue with default profile
    }
  }

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));

  return DEFAULT_PROFILE;
}

export function login(email: string, password: string): boolean {
  const profile = ensureDefaultProfile();

  if (profile.email !== email || profile.password !== password) {
    return false;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, "true");

  return true;
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getProfile(): UserProfile {
  return ensureDefaultProfile();
}

export function updateProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
