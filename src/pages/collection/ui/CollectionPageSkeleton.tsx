import { CollectionHeroSkeleton } from "@/entities/collection/ui/collection-hero/CollectionHeroSkeleton";
import { CollectionInfoWidgetSkeleton } from "@/widgets/collection-info-widget/ui/CollectionInfoWidgetSkeleton";
import { ExpertCardSkeleton } from "@/widgets/collection-info-widget/ui/ExpertCardSkeleton";
import { CollectionQuestionsWidgetSkeleton } from "@/widgets/collection-questions-widget/ui/CollectionQuestionsWidgetSkeleton";
import "./CollectionPage.scss";

export const CollectionPageSkeleton = () => (
  <div className="collection-page__content" aria-busy="true">
    <div className="collection-page__main">
      <CollectionHeroSkeleton />
      <CollectionQuestionsWidgetSkeleton />
    </div>

    <aside className="collection-page__sidebar">
      <CollectionInfoWidgetSkeleton />
      <ExpertCardSkeleton />
    </aside>
  </div>
);
