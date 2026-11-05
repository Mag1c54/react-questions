import { CardSkeleton, Skeleton } from "@/shared/ui";
import "./CollectionInfoWidget.scss";

const GROUPS = [0, 1, 2];
const GROUP_CHIP_WIDTHS = [[108, 92], [132], [86, 104]];

export const CollectionInfoWidgetSkeleton = () => (
  <CardSkeleton
    padding="none"
    radius="md"
    className="collection-info"
    role="status"
    aria-label="Загрузка информации о коллекции"
  >
    {GROUPS.map((group) => (
      <div key={group} className="collection-info__group">
        <Skeleton width={110} height={12} />

        <div className="collection-info__chips">
          {GROUP_CHIP_WIDTHS[group].map((width) => (
            <Skeleton key={width} width={width} height={30} />
          ))}
        </div>
      </div>
    ))}

    <Skeleton height={56} radius="sm" />
  </CardSkeleton>
);
