import type { Question } from "@/entities/question";
import type { QuizAnswer } from "@/entities/quiz";
import { QUIZ_ROUTES } from "@/shared/config";
import { Button, ButtonLink, Card } from "@/shared/ui";
import "./QuizResult.scss";
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
    <Card as="section" padding="lg" radius="lg" shadow className="quiz-result">
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
        <Button type="button" onClick={onRestart}>
          Пройти заново
        </Button>
        <ButtonLink to={`${QUIZ_ROUTES.settings}${settingsSearch}`} variant="link">
          Изменить настройки
        </ButtonLink>
      </div>
    </Card>
  );
};
