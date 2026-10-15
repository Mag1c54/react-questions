export interface ProfileSkill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
}

export interface SocialNetworkItem {
  code: string;
  title: string;
}

export interface Profile {
  id: string;
  userId: string;
  profileType: number;
  specializationId: number;
  markingWeight: number;
  description: string | null;
  socialNetwork?: SocialNetworkItem[];
  image_src: string | null;
  isActive: boolean;
  ratingPoints: number;
  profileSkills: ProfileSkill[];
}

export interface UpdateUserPayload {
  username?: string;
  country?: string;
  city?: string;
  birthday?: string;
  address?: string;
  avatarUrl?: string;
  avatarImage?: string;
}

export interface CreateProfilePayload {
  userId: string;
  profileType: number;
  specializationId: number;
  markingWeight: number;
  description: string;
  socialNetwork: SocialNetworkItem[];
  image_src?: string;
  profileSkills: string[];
}

export interface UpdateProfilePayload {
  userId: string;
  markingWeight: number;
  description: string;
  socialNetwork: SocialNetworkItem[];
  image_src?: string;
  profileSkills: string[];
}
