import type { Specialization } from "@/entities/specialization/model/types";

export interface SkillAuthor {
  id: string;
  username: string;
}

export interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  specializations: Specialization[];
  createdBy?: SkillAuthor;
}

export interface GetSkillsResponse {
  data: Skill[];
  total: number;
  page: number;
  limit: number;
}

export interface GetSkillsParams {
  specializations: number[];
  page?: number;
  limit?: number;
  title?: string;
  authorId?: string;
}