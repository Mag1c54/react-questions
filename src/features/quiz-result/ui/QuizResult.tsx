import { Link } from "react-router-dom";
import type { Question } from "@/entities/question/model/types";
import type { QuizAnswer } from "@/entities/quiz/model/types";
import "./QuizResult.scss";
import { QUIZ_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui";
interface QuizResultProps {
  questions: Question[];
  answers: Record<number, QuizAnswer>;
  settingsSearch: string;
  onRestart: () => void;
}

export const QuizResult = ({ questions, answers, settingsSearch, onRestart }: QuizResultProps) => {
  const known = questions.filter((q) => answers[q.id] === "KNOWN").length;
  const unknownQuestions = questions.filter((q) => answers[q.id] === "UNKNOWN");
  const skipped = questions.length - known - unknownQuestions.length;

  return (
    <section className="quiz-result">
      <h1 className="quiz-result__title">Результаты собеседования</h1>

      <ul className="quiz-result__stats">
        <li className="quiz-result__stat">
          <span className="quiz-result__stat-value">{known}</span>
          Знаю
        </li>
        <li className="quiz-result__stat">
          <span className="quiz-result__stat-value">{unknownQuestions.length}</span>
          Не знаю
        </li>
        <li className="quiz-result__stat">
          <span className="quiz-result__stat-value">{skipped}</span>
          Без ответа
        </li>
      </ul>

      {unknownQuestions.length > 0 && (
        <div className="quiz-result__review">
          <h2 className="quiz-result__subtitle">Что стоит повторить</h2>
          <ul className="quiz-result__list">
            {unknownQuestions.map((q) => (
              <li key={q.id}>{q.title}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="quiz-result__actions">
        <Button type="button" className="quiz-result__btn" onClick={onRestart}>
          Пройти заново
        </Button>
        <Link to={`${QUIZ_ROUTES.settings}${settingsSearch}`} className="quiz-result__link">
          Изменить настройки
        </Link>
      </div>
    </section>
  );
};
