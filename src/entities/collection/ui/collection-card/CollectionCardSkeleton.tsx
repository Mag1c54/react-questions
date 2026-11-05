import { Skeleton } from "@/shared/ui";
import "./CollectionCard.scss";

const TAG_WIDTHS = [64, 84, 52];

export const CollectionCardSkeleton = () => (
  <div className="collection-card" role="status" aria-label="Загрузка коллекции">
    <Skeleton width={140} height={140} radius="sm" className="collection-card__image" />

    <div className="collection-card__content">
      <div className="collection-card__tags">
        {TAG_WIDTHS.map((width) => (
          <Skeleton key={width} width={width} height={22} />
        ))}
      </div>

      <Skeleton width="70%" height={20} />

      <div className="collection-card__meta">
        <Skeleton width={96} height={14} />
        <Skeleton width={90} height={14} />
      </div>

      <Skeleton width="45%" height={13} />
    </div>
  </div>
);
