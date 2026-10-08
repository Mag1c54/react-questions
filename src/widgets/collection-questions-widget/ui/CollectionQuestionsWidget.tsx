import { useSearchParams } from "react-router-dom";
import type { Collection } from "@/entities/collection/model/types";
import { useGetPublicQuestionsQuery } from "@/entities/question/api/questionApi";
import type { Question } from "@/entities/question/model/types";
import { QuestionCard } from "@/entities/question/ui/question-card/QuestionCard";
import { QuestionPagination } from "@/features/question-pagination/ui/QuestionPagination";
import "./CollectionQuestionsWidget.scss";

const LIMIT = 10;

interface CollectionQuestionsWidgetProps {
  collection: Collection;
}

export const CollectionQuestionsWidget = ({
  collection,
}: CollectionQuestionsWidgetProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isFetching, isError, refetch } = useGetPublicQuestionsQuery({
    collection: collection.id,
    page,
    limit: LIMIT,
    order: "ASC",
    orderBy: "createdAt",
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  const heading = collection.keywords.length
    ? `Вопросы ${collection.keywords.join(", ")}`
    : "Вопросы";

  const renderBody = () => {
    if (isLoading) {
      return <p className="collection-questions__status">Загрузка вопросов...</p>;
    }

    if (isError) {
      return (
        <div className="collection-questions__status collection-questions__status--error">
          Не удалось загрузить вопросы
          <button type="button" className="collection-questions__retry" onClick={refetch}>
            Повторить
          </button>
        </div>
      );
    }

    if (!data || data.data.length === 0) {
      return <p className="collection-questions__status">В коллекции пока нет вопросов</p>;
    }

    return (
      <>
        <div
          className={`collection-questions__list ${isFetching ? "collection-questions__list--loading" : ""}`}
        >
          {data.data.map((question: Question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {data.total > LIMIT && (
          <QuestionPagination
            currentPage={page}
            totalCount={data.total}
            limit={LIMIT}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <section className="collection-questions">
      <h2 className="collection-questions__heading">{heading}</h2>
      {renderBody()}
    </section>
  );
};