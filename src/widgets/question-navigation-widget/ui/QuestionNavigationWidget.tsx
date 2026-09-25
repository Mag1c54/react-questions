import React from "react";
import { useSearchParams } from "react-router-dom";
import { QuestionSearch } from "@/features/question-search/ui/QuestionSearch";
import "@/styles/question-page/QuestionNavigationWidget.scss";

interface FilterState {
  rate: string[];
  skills: string[];
  complexity: string[];
}

export const QuestionNavigationWidget: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters: FilterState = {
    rate: searchParams.get("rate")?.split(",").filter(Boolean) || [],
    skills: searchParams.get("skills")?.split(",").filter(Boolean) || [],
    complexity:
      searchParams.get("complexity")?.split(",").filter(Boolean) || [],
  };

  const handleSearchChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set("title", val.trim());
    } else {
      newParams.delete("title");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleCheckboxToggle = (category: keyof FilterState, value: string) => {
    const currentValues = currentFilters[category];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((val) => val !== value)
      : [...currentValues, value];

    const newParams = new URLSearchParams(searchParams);

    if (nextValues.length > 0) {
      newParams.set(category, nextValues.join(","));
    } else {
      newParams.delete(category);
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <div className="question-nav">
      <QuestionSearch
        value={searchParams.get("title") || ""}
        onChange={handleSearchChange}
      />

      <div className="question-nav__group">
        <h3 className="question-nav__title">Сложность</h3>
        <div className="question-nav__options">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const strNum = String(num);
            const isChecked = currentFilters.complexity.includes(strNum);
            return (
              <label key={num} className="question-nav__checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("complexity", strNum)}
                />
                Сложность {num}
              </label>
            );
          })}
        </div>
      </div>

      <div className="question-nav__group">
        <h3 className="question-nav__title">Навыки (Skills)</h3>
        <div className="question-nav__options">
          {[
            { id: 6, title: "React" },
            { id: 22, title: "TypeScript" },
            { id: 2, title: "JavaScript" },
            { id: 28, title: "CSS" },
            { id: 3, title: "Redux" },
            { id: 27, title: "HTML" },
            { id: 7, title: "Git" },
            { id: 15, title: "React Router" },
          ].map((skill) => {
            const strId = String(skill.id);
            const isChecked = currentFilters.skills.includes(strId);
            return (
              <label key={skill.id} className="question-nav__checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("skills", strId)}
                />
                {skill.title}
              </label>
            );
          })}
        </div>
      </div>

      <button
        className="question-nav__reset"
        onClick={() => setSearchParams(new URLSearchParams())}
      >
        Сбросить все фильтры
      </button>
    </div>
  );
};