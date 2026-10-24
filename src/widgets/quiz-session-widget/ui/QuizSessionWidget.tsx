import type { QuizSettings } from "@/entities/quiz/model/types";
import { useMockQuiz } from "@/entities/quiz/model/useMockQuiz";
import { QuizRunner } from "./QuizRunner";
import { QuizStatus } from "./QuizStatus";

interface QuizSessionWidgetProps {
  settings: QuizSettings;
  settingsSearch: string;
}

export const QuizSessionWidget = ({ settings, settingsSearch }: QuizSessionWidgetProps) => {
  const session = useMockQuiz(settings);

  if (session.status !== "ready") {
    return (
      <QuizStatus status={session.status} settingsSearch={settingsSearch} onRetry={session.retry} />
    );
  }

  return (
    <QuizRunner quiz={session.quiz} settingsSearch={settingsSearch} onRestart={session.restart} />
  );
};
