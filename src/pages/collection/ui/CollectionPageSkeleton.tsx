import { CollectionHeroSkeleton } from "@/entities/collection";
import { CollectionInfoWidgetSkeleton } from "@/widgets/collection-info-widget";
import { ExpertCardSkeleton } from "@/widgets/collection-info-widget";
import { CollectionQuestionsWidgetSkeleton } from "@/widgets/collection-questions-widget";
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
