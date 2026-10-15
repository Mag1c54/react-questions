import type { Profile } from "../model/types";

export const PROFILE_PARAM = "profile";

export const getActiveProfile = (
  profiles: Profile[] | undefined,
  profileId: string | null,
): Profile | undefined => profiles?.find((item) => item.id === profileId) ?? profiles?.[0];
