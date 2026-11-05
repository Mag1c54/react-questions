import { CardSkeleton, Skeleton } from "@/shared/ui";
import "./QuestionCard.scss";

export const QuestionCardSkeleton = () => (
  <CardSkeleton
    as="article"
    padding="none"
    radius="md"
    className="question-accordion"
    role="status"
    aria-label="Загрузка вопроса"
  >
    <div className="question-accordion__header">
      <div className="question-accordion__title-group">
        <Skeleton width={6} height={6} radius="full" />
        <Skeleton width="65%" height={16} />
      </div>

      <Skeleton width={20} height={20} />
    </div>
  </CardSkeleton>
);
