import { Navigate, useSearchParams } from "react-router-dom";
import { parseQuizSettings } from "@/entities/quiz";
import { QUIZ_ROUTES } from "@/shared/config";
import { QuizSessionWidget } from "@/widgets/quiz-session-widget";
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
