import { Skeleton } from "@/shared/ui";
import { QuestionCardSkeleton } from "@/entities/question/ui/question-card/QuestionCardSkeleton";
import "./QuestionListWidget.scss";

const ITEMS = [0, 1, 2, 3, 4, 5];

export const QuestionListWidgetSkeleton = () => (
  <section className="questions-list-widget" role="status" aria-label="Загрузка вопросов">
    <Skeleton width={230} height={14} className="questions-list-widget__total" />

    <div className="questions-list">
      {ITEMS.map((item) => (
        <QuestionCardSkeleton key={item} />
      ))}
    </div>
  </section>
);
