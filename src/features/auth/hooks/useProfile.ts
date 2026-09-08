import { useState } from "react";

import { getProfile, updateProfile } from "../auth";

import type { UserProfile } from "../types/user.types";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => getProfile());

  const saveProfile = (nextProfile: UserProfile) => {
    updateProfile(nextProfile);
    setProfile(nextProfile);
  };

  return {
    profile,
    saveProfile,
  };
}
