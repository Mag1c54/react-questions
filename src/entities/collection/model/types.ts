import type { Specialization } from "@/entities/specialization/model/types";

interface UserShort {
  id: string;
  username: string;
}

export interface Company {
  id: string;
  title: string;
  legalName: string;
  description: string;
  imageSrc: string | null;
  inn: string;
  kpp: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserShort;
}

export interface Collection {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: UserShort;
  isFree: boolean;
  keywords: string[];
  company: Company | null;
  questionsCount: number;
  tasksCount: number;
  testQuestionsCount: number;
  specializations: Specialization[];
}

export interface GetCollectionsResponse {
  data: Collection[];
  total: number;
  page: number;
  limit: number;
}

export interface GetCollectionsParams {
  page?: number;
  limit?: number;
  titleOrDescriptionSearch?: string;
  specializations?: number[];
  keywords?: string[];
  isFree?: boolean;
  companies?: string[];
  authorId?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
}