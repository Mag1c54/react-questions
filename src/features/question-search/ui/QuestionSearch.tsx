import React from 'react';

interface QuestionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionSearch: React.FC<QuestionSearchProps> = ({ value, onChange }) => {
  return (
    <div >
      <input
        type="text"
        placeholder="Поиск вопроса по названию..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};