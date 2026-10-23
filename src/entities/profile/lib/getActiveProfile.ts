import type { Profile } from "../model/types";

export const PROFILE_PARAM = "profile";

const storageKey = (userId: string) => `active-profile:${userId}`;

export const readSavedProfileId = (userId: string): string | null => {
  try {
    return localStorage.getItem(storageKey(userId));
  } catch {
    return null;
  }
};

export const saveActiveProfileId = (userId: string, profileId: string): void => {
  try {
    localStorage.setItem(storageKey(userId), profileId);
  } catch {
    // didnt bond userid and profileID
  }
};

const completeness = (profile: Profile): number =>
  profile.profileSkills.length * 1000 + Math.min(profile.description?.length ?? 0, 999);

export const getActiveProfile = (
  profiles: Profile[] | undefined,
  requestedId: string | null,
  savedId: string | null = null,
): Profile | undefined => {
  if (!profiles?.length) return undefined;

  return (
    profiles.find((item) => item.id === requestedId) ??
    profiles.find((item) => item.id === savedId) ??
    [...profiles].sort((a, b) => completeness(b) - completeness(a))[0]
  );
};
