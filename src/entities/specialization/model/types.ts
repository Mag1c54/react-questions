export interface Specialization {
  id: number;
  title: string;
  slug?: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetSpecializationsResponse {
  data: Specialization[];
  total: number;
  page: number;
  limit: number;
}