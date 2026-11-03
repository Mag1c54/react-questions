import type { QuizLoadStatus } from "@/entities/quiz/model/useMockQuiz";
import { QUIZ_ROUTES } from "@/shared/config/routes";
import { Button, ButtonLink } from "@/shared/ui";
import "./QuizStatus.scss";

const MESSAGES: Record<Exclude<QuizLoadStatus, "ready">, string> = {
  loading: "Подбираем вопросы...",
  empty: "По выбранным параметрам вопросов не нашлось",
  error: "Не удалось загрузить вопросы",
};

interface QuizStatusProps {
  status: Exclude<QuizLoadStatus, "ready">;
  settingsSearch: string;
  onRetry: () => void;
}

export const QuizStatus = ({ status, settingsSearch, onRetry }: QuizStatusProps) => (
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
