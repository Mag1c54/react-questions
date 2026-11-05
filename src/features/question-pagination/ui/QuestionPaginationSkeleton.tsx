import { Skeleton } from "@/shared/ui";
import "./QuestionPagination.scss";

const PAGE_WIDTHS = [28, 28, 28];

export const QuestionPaginationSkeleton = () => (
  <div className="quest-catalog" role="status" aria-label="Загрузка пагинации">
    <Skeleton width={32} height={32} />

    {PAGE_WIDTHS.map((width, index) => (
      <Skeleton key={index} width={width} height={28} />
    ))}

    <Skeleton width={32} height={32} />
  </div>
);
