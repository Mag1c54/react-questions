import { CardSkeleton, Skeleton, SkeletonText } from "@/shared/ui";
import "./CollectionHero.scss";

export const CollectionHeroSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="md"
    radius="md"
    className="collection-hero"
    role="status"
    aria-label="Загрузка коллекции"
  >
    <Skeleton width={120} height={120} radius="sm" className="collection-hero__image" />

    <div className="collection-hero__content">
      <Skeleton width="55%" height={22} />
      <SkeletonText lines={3} />
    </div>
  </CardSkeleton>
);
