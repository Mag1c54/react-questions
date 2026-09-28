import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import './QuestionPagination.scss'

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
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="quest-catalog">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
        className="quest-catalog__arrow"
      >
        <FaLongArrowAltLeft />
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "quest-catalog__active" : ""}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Страница ${page}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Следующая страница"
         className="quest-catalog__arrow"
      >
        <FaLongArrowAltRight />
      </button>
    </div>
  );
};
