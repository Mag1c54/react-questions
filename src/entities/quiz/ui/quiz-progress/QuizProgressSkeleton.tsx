import { CardSkeleton, Skeleton } from "@/shared/ui";
import "./QuizProgress.scss";

export const QuizProgressSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="none"
    radius="md"
    className="quiz-progress"
    role="status"
    aria-label="Загрузка прогресса собеседования"
  >
    <div className="quiz-progress__head">
      <Skeleton width={220} height={16} />
      <Skeleton width={36} height={12} />
    </div>

    <Skeleton height={6} radius="full" />
  </CardSkeleton>
);
