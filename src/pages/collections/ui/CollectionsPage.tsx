import { useEffect, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { useGetCollectionsQuery } from "@/entities/collection/api/collectionApi";
import { useCollectionFilters } from "@/features/collection-filters/model/useCollectionFilters";
import { CollectionFilters } from "@/features/collection-filters/ui/CollectionFilters";
import { CollectionListWidget } from "@/widgets/collection-list-widget/ui/CollectionListWidget";
import "./CollectionsPage.scss";

const LIMIT = 10;

export const CollectionsPage = () => {
  const { page, search, specializations, isFree, setPage } = useCollectionFilters();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, isLoading, isFetching, isError, refetch } = useGetCollectionsQuery({
    page,
    limit: LIMIT,
    titleOrDescriptionSearch: search || undefined,
    specializations,
    isFree,
  });

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <main className="collections-page">
      <div className="collections-page__content">
        <section className="collections-page__main">
          <div className="collections-page__header">
            <h1>Коллекции</h1>
            <button
              type="button"
              className="collections-page__toggle"
              aria-label="Открыть фильтры"
              onClick={() => setIsSidebarOpen(true)}
            >
              <VscSettings />
            </button>
          </div>

          <CollectionListWidget
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            page={page}
            limit={LIMIT}
            onPageChange={setPage}
            onRetry={refetch}
          />
        </section>

        <aside
          className={`collections-page__sidebar ${isSidebarOpen ? "collections-page__sidebar--open" : ""}`}
        >
          <button
            type="button"
            className="collections-page__close"
            onClick={() => setIsSidebarOpen(false)}
          >
            Закрыть
          </button>
          <CollectionFilters />
        </aside>
      </div>
    </main>
  );
};