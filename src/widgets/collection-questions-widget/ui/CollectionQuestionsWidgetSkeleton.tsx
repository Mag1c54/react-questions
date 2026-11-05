import { CardSkeleton, Skeleton } from "@/shared/ui";
import { QuestionCardSkeleton } from "@/entities/question";
import "./CollectionQuestionsWidget.scss";

const ITEMS = [0, 1, 2, 3];

export const CollectionQuestionsWidgetSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="lg"
    radius="md"
    className="collection-questions"
    role="status"
    aria-label="Загрузка вопросов коллекции"
  >
    <Skeleton width={220} height={20} className="collection-questions__heading" />

    <div className="collection-questions__list">
      {ITEMS.map((item) => (
        <QuestionCardSkeleton key={item} />
      ))}
    </div>
  </CardSkeleton>
);
