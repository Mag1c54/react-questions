import { CardSkeleton, Skeleton } from "@/shared/ui";
import "./QuizQuestion.scss";

export const QuizQuestionSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="none"
    radius="md"
    className="quiz-question"
    role="status"
    aria-label="Загрузка вопроса собеседования"
  >
    <div className="quiz-question__nav">
      <Skeleton width={68} height={16} />
      <Skeleton width={68} height={16} />
    </div>

    <div className="quiz-question__body">
      <div className="quiz-question__content">
        <Skeleton width="80%" height={16} />
        <Skeleton width="52%" height={16} />
        <Skeleton width={110} height={12} />

        <div className="quiz-question__rate">
          <Skeleton width={100} height={32} />
          <Skeleton width={88} height={32} />
        </div>
      </div>

      <Skeleton height={240} radius="lg" className="quiz-question__image" />
    </div>

    <div className="quiz-question__footer">
      <Skeleton width={100} height={34} />
    </div>
  </CardSkeleton>
);
