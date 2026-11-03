import React from "react";
import { SearchInput } from "@/shared/ui";

interface QuestionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionSearch: React.FC<QuestionSearchProps> = ({ value, onChange }) => (
  <SearchInput
    value={value}
    onChange={onChange}
    delay={0}
    placeholder="Введите вопрос..."
    aria-label="Поиск вопросов"
  />
);
