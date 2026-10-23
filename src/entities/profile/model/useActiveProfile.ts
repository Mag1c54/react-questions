import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getActiveProfile,
  PROFILE_PARAM,
  readSavedProfileId,
  saveActiveProfileId,
} from "../lib/getActiveProfile";
import type { Profile } from "./types";

interface UserWithProfiles {
  id: string;
  profiles?: Profile[];
}

export const useActiveProfile = (user: UserWithProfiles | undefined) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const profiles = user?.profiles ?? [];
  const requestedId = searchParams.get(PROFILE_PARAM);
  const profile = getActiveProfile(
    profiles,
    requestedId,
    user ? readSavedProfileId(user.id) : null,
  );

  const userId = user?.id;
  const isRequestedValid = profiles.some((item) => item.id === requestedId);

  useEffect(() => {
    if (userId && requestedId && isRequestedValid) saveActiveProfileId(userId, requestedId);
  }, [userId, requestedId, isRequestedValid]);

  const selectProfile = (id: string) => setSearchParams({ [PROFILE_PARAM]: id });

  return { profiles, profile, selectProfile };
};
