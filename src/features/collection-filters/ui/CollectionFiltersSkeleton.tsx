import { CardSkeleton, Skeleton } from "@/shared/ui";
import "./CollectionFilters.scss";

const SPECIALIZATION_WIDTHS = [94, 118, 76, 132, 88];
const ACCESS_WIDTHS = [132, 92];

export const CollectionFiltersSkeleton = () => (
  <CardSkeleton
    padding="md"
    radius="lg"
    className="collection-filters"
    role="status"
    aria-label="Загрузка фильтров коллекций"
  >
    <Skeleton height={44} radius="md" />

    <div className="collection-filters__group">
      <Skeleton width={120} height={14} />

      <div className="collection-filters__options">
        {SPECIALIZATION_WIDTHS.map((width) => (
          <Skeleton key={width} width={width} height={32} radius="md" />
        ))}
      </div>
    </div>

    <div className="collection-filters__group">
      <Skeleton width={70} height={14} />

      <div className="collection-filters__options">
        {ACCESS_WIDTHS.map((width) => (
          <Skeleton key={width} width={width} height={32} radius="md" />
        ))}
      </div>
    </div>
  </CardSkeleton>
);
