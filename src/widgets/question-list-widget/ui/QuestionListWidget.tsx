import React from "react";
import type { Question, GetPublicQuestionsResponse } from "@/entities/question/model/types";
import { QuestionCard } from "@/entities/question/ui/question-card/QuestionCard";
import { QuestionPagination } from "@/features/question-pagination/ui/QuestionPagination";
import "@/styles/question-page/QuestionPage.scss";

interface QuestionsListWidgetProps {
  data: GetPublicQuestionsResponse | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const QuestionsListWidget: React.FC<QuestionsListWidgetProps> = ({
  data,
  loading,
  error,
  page,
  limit,
  onPageChange,
}) => {
  if (loading) return <div className="questions-list-widget__status">Загрузка вопросов...</div>;
  if (error) return <div className="questions-list-widget__status questions-list-widget__status--error">Ошибка: {error}</div>;

  return (
    <section className="questions-list-widget">
      <p className="questions-list-widget__total">
        Всего вопросов найдено: <span>{data?.total ?? 0}</span>
      </p>

      <div className="questions-list">
        {data?.data.map((q: Question) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>

      {(data?.total ?? 0) > limit && (
        <div className="pagination">
          <QuestionPagination
            currentPage={page}
            totalCount={data?.total ?? 0}
            limit={limit}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
};