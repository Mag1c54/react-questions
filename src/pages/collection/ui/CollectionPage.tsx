import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetCollectionByIdQuery } from "@/entities/collection/api/collectionApi";
import { CollectionHero } from "@/entities/collection/ui/collection-hero/CollectionHero";
import { CollectionInfoWidget } from "@/widgets/collection-info-widget/ui/CollectionInfoWidget";
import { ExpertCard } from "@/widgets/collection-info-widget/ui/ExpertCard";
import { CollectionQuestionsWidget } from "@/widgets/collection-questions-widget/ui/CollectionQuestionsWidget";
import "./CollectionPage.scss";

export const CollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch } = useGetCollectionByIdQuery(
    id ?? "",
    { skip: !id },
  );

  const isNotFound = isError && !!error && "status" in error && error.status === 404;

  const renderBody = () => {
    if (isLoading) {
      return <div className="collection-page__status">Загрузка коллекции...</div>;
    }

    if (isNotFound) {
      return <div className="collection-page__status">Коллекция не найдена</div>;
    }

    if (isError || !data) {
      return (
        <div className="collection-page__status collection-page__status--error">
          Не удалось загрузить коллекцию
          <button type="button" className="collection-page__retry" onClick={refetch}>
            Повторить
          </button>
        </div>
      );
    }

    return (
      <div className="collection-page__content">
        <div className="collection-page__main">
          <CollectionHero collection={data} />
          <CollectionQuestionsWidget collection={data} />
        </div>

        <aside className="collection-page__sidebar">
          <CollectionInfoWidget collection={data} />
          <ExpertCard />
        </aside>
      </div>
    );
  };

  return (
    <main className="collection-page">
      <Link to="/collections" className="collection-page__back">
        <FiArrowLeft aria-hidden="true" />
        Все коллекции
      </Link>
      {renderBody()}
    </main>
  );
};