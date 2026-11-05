import { Skeleton } from "@/shared/ui";

export const QuestionSearchSkeleton = () => (
  <div className="ui-skeleton-field" role="status" aria-label="Загрузка поиска">
    <Skeleton height={44} radius="md" />
  </div>
);
