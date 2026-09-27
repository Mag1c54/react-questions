import React from "react";
import { useSearchParams } from "react-router-dom";
import { QuestionSearch } from "@/features/question-search/ui/QuestionSearch";
import "@/styles/question-page/QuestionNavigationWidget.scss";
import { CheckboxChip } from "@/shared/ui/CheckboxChip";


interface FilterState {
  rate: string[];
  skills: string[];
  complexity: string[];
}

const skills = [
  { id: 6, title: "React", icon: "/tech-icon.svg" },
  { id: 22, title: "TypeScript", icon: "/tech-icon.svg" },
  { id: 2, title: "JavaScript", icon: "/tech-icon.svg" },
  { id: 28, title: "CSS", icon: "/design-icon.svg" },
  { id: 3, title: "Redux", icon: "/tech-icon.svg" },
  { id: 27, title: "HTML", icon: "/design-icon.svg" },
  { id: 7, title: "Git", icon: "/tech-icon.svg" },
  { id: 15, title: "React Router", icon: "/tech-icon.svg" },
];

const complexityGroups = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9, 10],
];

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

  const handleComplexityGroupToggle = (group: number[]) => {
    const groupStr = group.map(String);
    const isChecked = groupStr.every((n) =>
      currentFilters.complexity.includes(n),
    );

    const nextValues = isChecked
      ? currentFilters.complexity.filter((n) => !groupStr.includes(n))
      : Array.from(new Set([...currentFilters.complexity, ...groupStr]));

    const newParams = new URLSearchParams(searchParams);

    if (nextValues.length > 0) {
      newParams.set("complexity", nextValues.join(","));
    } else {
      newParams.delete("complexity");
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
        <h3 className="question-nav__title">Навыки (Skills)</h3>
        <div className="question-nav__options">
          {skills.map((skill) => {
            const strId = String(skill.id);
            const isChecked = currentFilters.skills.includes(strId);
            return (
              <CheckboxChip
                key={skill.id}
                checked={isChecked}
                onChange={() => handleCheckboxToggle("skills", strId)}
                icon={skill.icon}
              >
                {skill.title}
              </CheckboxChip>
            );
          })}
        </div>
      </div>

      <div className="question-nav__group">
        <h3 className="question-nav__title">Сложность</h3>
        <div className="question-nav__options">
          {complexityGroups.map((group, idx) => {
            const groupStr = group.map(String);
            const isChecked = groupStr.every((n) =>
              currentFilters.complexity.includes(n),
            );

            return (
              <CheckboxChip
                key={idx}
                checked={isChecked}
                onChange={() => handleComplexityGroupToggle(group)}
              >
                {group[0]}–{group[group.length - 1]}
              </CheckboxChip>
            );
          })}
        </div>
      </div>

      <div className="question-nav__group">
        <h3 className="question-nav__title">Рейтинг</h3>
        <div className="question-nav__options">
          {[1, 2, 3, 4, 5].map((num) => {
            const strNum = String(num);
            const isChecked = currentFilters.rate.includes(strNum);
            return (
              <CheckboxChip
                key={num}
                checked={isChecked}
                onChange={() => handleCheckboxToggle("rate", strNum)}
              >
              {num}
              </CheckboxChip>
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
