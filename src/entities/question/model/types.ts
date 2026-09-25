export interface User {
  id: string;
  username: string;
}

export interface QuestionSpecialization {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export interface QuestionSkill {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionTopic {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string;
  imageSrc: string;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: 'public' | 'draft' | string;
  rate: number;
  complexity: number;
  createdById: string;
  updatedById: string;
  questionSpecializations: QuestionSpecialization[];
  questionSkills: QuestionSkill[];
  questionTopics: QuestionTopic[];
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}


export interface GetPublicQuestionsResponse {
  total: number;
  page: number;
  limit: number;
  data: Question[];
}

export interface FetchQuestionsParams {
  page?: number;
  limit?: number;
  title?: string;
  order?: 'ASC' | 'DESC';
  orderBy?: 'createdAt' | 'title' | 'complexity';
  complexity?: string;
  specializationId?: number;
  skills?: string;
  rate?: string;
  [key: string]: unknown;
}

export type QuestionsResponse = PaginatedResponse<Question>;