import React from "react";
import { CiSearch } from "react-icons/ci";
import "./QuestionSearch.scss";

interface QuestionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionSearch: React.FC<QuestionSearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="question-search">
      <CiSearch className="question-search__icon" />
      <input
        type="text"
        placeholder="Введите вопрос..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="question-search__input"
      />
    </div>
  );
};
