import { API_BASE_URL } from '@/shared/api/config';
import type { FetchQuestionsParams, GetPublicQuestionsResponse } from '../model/types';

export async function fetchQuestions(
  params: FetchQuestionsParams,
  signal?: AbortSignal
): Promise<GetPublicQuestionsResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        queryParams.append(key, value.join(','));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/questions/public-questions?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }

  return response.json();
}