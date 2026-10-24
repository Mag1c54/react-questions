import { Navigate, useSearchParams } from "react-router-dom";
import { parseQuizSettings } from "@/entities/quiz/lib/quizParams";
import { QUIZ_ROUTES } from "@/shared/config/routes";
import { QuizSessionWidget } from "@/widgets/quiz-session-widget/ui/QuizSessionWidget";
import "./QuizQuestionsPage.scss";

export const QuizQuestionsPage = () => {
  const [searchParams] = useSearchParams();
  const settings = parseQuizSettings(searchParams);

  if (!settings) return <Navigate to={QUIZ_ROUTES.settings} replace />;

  return (
    <main className="quiz-questions-page">
      <QuizSessionWidget settings={settings} settingsSearch={`?${searchParams.toString()}`} />
    </main>
  );
};
