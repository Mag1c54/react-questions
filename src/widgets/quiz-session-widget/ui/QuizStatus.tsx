import type { QuizLoadStatus } from "@/entities/quiz/model/useMockQuiz";
import { QUIZ_ROUTES } from "@/shared/config/routes";
import { Button, ButtonLink } from "@/shared/ui";
import { QuizSessionSkeleton } from "./QuizSessionSkeleton";
import "./QuizStatus.scss";

const MESSAGES: Record<Exclude<QuizLoadStatus, "ready" | "loading">, string> = {
  empty: "По выбранным параметрам вопросов не нашлось",
  error: "Не удалось загрузить вопросы",
};

interface QuizStatusProps {
  status: Exclude<QuizLoadStatus, "ready">;
  settingsSearch: string;
  onRetry: () => void;
}

export const QuizStatus = ({ status, settingsSearch, onRetry }: QuizStatusProps) => {
  if (status === "loading") {
    return <QuizSessionSkeleton />;
  }

  return (
    <div className="quiz-status">
      {MESSAGES[status]}

      {status === "error" && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Повторить
        </Button>
      )}

      <ButtonLink to={`${QUIZ_ROUTES.settings}${settingsSearch}`} variant="link">
        Изменить настройки
      </ButtonLink>
    </div>
  );
};
