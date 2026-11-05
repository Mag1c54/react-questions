import { Skeleton } from "@/shared/ui";
import { CollectionCardSkeleton } from "@/entities/collection/ui/collection-card/CollectionCardSkeleton";
import "./CollectionListWidget.scss";

const ITEMS = [0, 1, 2, 3, 4];

export const CollectionListWidgetSkeleton = () => (
  <section className="collection-list" role="status" aria-label="Загрузка коллекций">
    <Skeleton width={230} height={14} className="collection-list__total" />

    <div className="collection-list__items">
      {ITEMS.map((item) => (
        <CollectionCardSkeleton key={item} />
      ))}
    </div>
  </section>
);
