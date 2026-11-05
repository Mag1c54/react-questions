import { CardSkeleton, Skeleton, SkeletonText } from "@/shared/ui";
import "./ExpertCard.scss";

const LINKS = [0, 1, 2];

export const ExpertCardSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="md"
    radius="md"
    shadow={false}
    className="expert-card"
    role="status"
    aria-label="Загрузка эксперта"
  >
    <div className="expert-card__head">
      <Skeleton width={36} height={36} circle />

      <div className="expert-card__person">
        <Skeleton width={130} height={14} />
        <Skeleton width={82} height={12} />
      </div>
    </div>

    <SkeletonText lines={2} lineHeight={13} />

    <div className="expert-card__links">
      {LINKS.map((link) => (
        <Skeleton key={link} width={22} height={22} circle />
      ))}
    </div>
  </CardSkeleton>
);
