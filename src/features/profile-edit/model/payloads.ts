import { SOCIAL_PLATFORMS } from "@/entities/profile/config/platforms";
import type {
  Profile,
  UpdateProfilePayload,
  UpdateUserPayload,
} from "@/entities/profile/model/types";
import type { AuthUser } from "@/entities/session/model/types";
import { stripDataUrlPrefix } from "@/shared/lib/isHttpUrl";
import type { ProfileEditValues } from "./schema";

export const buildDefaultValues = (user: AuthUser, profile: Profile): ProfileEditValues => {
  const savedLinks = Object.fromEntries(
    (profile.socialNetwork ?? []).map((item) => [item.code, item.title]),
  );

  return {
    username: user.username,
    country: user.country ?? "",
    city: user.city ?? "",
    newAvatar: null,
    description: profile.description ?? "",
    skills: profile.profileSkills.map((skill) => skill.id),
    links: Object.fromEntries(
      SOCIAL_PLATFORMS.map((platform) => [platform.code, savedLinks[platform.code] ?? ""]),
    ),
  };
};

export const buildUserPayload = (user: AuthUser, values: ProfileEditValues): UpdateUserPayload => {
  const body: UpdateUserPayload = {};

  if (values.username !== user.username) body.username = values.username;
  if (values.country !== (user.country ?? "")) body.country = values.country;
  if (values.city !== (user.city ?? "")) body.city = values.city;
  if (values.newAvatar) body.avatarImage = stripDataUrlPrefix(values.newAvatar);

  return body;
};

export const buildProfilePayload = (
  user: AuthUser,
  profile: Profile,
  values: ProfileEditValues,
): UpdateProfilePayload => {
  const extraLinks = (profile.socialNetwork ?? []).filter(
    (item) => !SOCIAL_PLATFORMS.some((platform) => platform.code === item.code),
  );

  return {
    userId: user.id,
    markingWeight: profile.markingWeight,
    description: values.description,
    socialNetwork: [
      ...extraLinks,
      ...SOCIAL_PLATFORMS.flatMap(({ code }) =>
        values.links[code] ? [{ code, title: values.links[code] }] : [],
      ),
    ],
    image_src: profile.image_src ?? undefined,
    profileSkills: values.skills.map(String),
  };
};
