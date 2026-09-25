import React from 'react';

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

  return (
    <div >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Назад
      </button>

      <span>
        Страница {currentPage} из {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
};