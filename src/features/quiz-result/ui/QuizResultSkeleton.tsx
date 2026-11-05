import { CardSkeleton, Skeleton, SkeletonText } from "@/shared/ui";
import "./QuizResult.scss";

const STATS = [0, 1, 2];

export const QuizResultSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="lg"
    radius="lg"
    className="quiz-result"
    role="status"
    aria-label="Загрузка результатов собеседования"
  >
    <Skeleton width={280} height={28} />

    <div className="quiz-result__stats">
      {STATS.map((stat) => (
        <div key={stat} className="quiz-result__stat">
          <Skeleton width={40} height={24} />
          <Skeleton width={62} height={13} />
        </div>
      ))}
    </div>

    <div className="quiz-result__review">
      <Skeleton width={180} height={16} />
      <SkeletonText lines={3} />
    </div>

    <div className="quiz-result__actions">
      <Skeleton width={130} height={40} radius="md" />
      <Skeleton width={150} height={20} />
    </div>
  </CardSkeleton>
);
