import { CollectionCard } from "@/entities/collection/ui/collection-card/CollectionCard";
import type { GetCollectionsResponse } from "@/entities/collection/model/types";
import { QuestionPagination } from "@/features/question-pagination/ui/QuestionPagination";
import "./CollectionListWidget.scss";

interface CollectionListWidgetProps {
  data?: GetCollectionsResponse;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

export const CollectionListWidget = ({
  data,
  isLoading,
  isFetching,
  isError,
  page,
  limit,
  onPageChange,
  onRetry,
}: CollectionListWidgetProps) => {
  if (isLoading) {
    return <div className="collection-list__status">Загрузка коллекций...</div>;
  }

  if (isError) {
    return (
      <div className="collection-list__status collection-list__status--error">
        Не удалось загрузить коллекции
        <button type="button" className="collection-list__retry" onClick={onRetry}>
          Повторить
        </button>
      </div>
    );
  }

  const total = data?.total ?? 0;

  if (!data || data.data.length === 0) {
    return <div className="collection-list__status">Ничего не найдено</div>;
  }

  return (
    <section className="collection-list">
      <p className="collection-list__total">
        Всего коллекций найдено: <span>{total}</span>
      </p>

      <div
        className={`collection-list__items ${isFetching ? "collection-list__items--loading" : ""}`}
      >
        {data.data.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      {total > limit && (
        <QuestionPagination
          currentPage={page}
          totalCount={total}
          limit={limit}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
};