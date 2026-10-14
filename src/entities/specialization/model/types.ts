export interface SpecializationAuthor {
  id: string;
  username: string;
}

export interface Specialization {
  id: number;
  title: string;
  slug?: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: SpecializationAuthor;
}

export interface GetSpecializationsResponse {
  data: Specialization[];
  total: number;
  page: number;
  limit: number;
}

export interface GetSpecializationsParams {
  page?: number;
  limit?: number;
  title?: string;
  authorId?: string;
}

export interface SpecializationPayload {
  title: string;
  description: string;
  imageSrc?: string;
  specializationImage?: string;
}

export interface DeleteResponse {
  affected: number;
  raw: unknown[];
}
