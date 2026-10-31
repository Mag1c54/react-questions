import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import "./QuestionPagination.scss";
import { Button } from "@/shared/ui";

interface QuestionPaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const QuestionPagination: React.FC<QuestionPaginationProps> = ({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  if (totalPages <= 1) return null;

  const page = Math.min(Math.max(1, Math.trunc(currentPage) || 1), totalPages);

  const startPage = Math.max(1, page);
  const endPage = Math.min(totalPages, page + 2);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="quest-catalog">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
        className="quest-catalog__arrow"
      >
        <FaLongArrowAltLeft />
      </Button>

      {startPage > 1 && (
        <>
          <Button onClick={() => onPageChange(1)} variant="none">
            1
          </Button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "quest-catalog__active btn-outline" : ""}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Страница ${page}`}
          variant="none"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <Button onClick={() => onPageChange(totalPages)} variant="none">
            {totalPages}
          </Button>
        </>
      )}

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Следующая страница"
        className="quest-catalog__arrow"
        variant="none"
      >
        <FaLongArrowAltRight />
      </Button>
    </div>
  );
};
