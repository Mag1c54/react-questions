import { QuizSettingsForm } from "@/features/quiz-settings/ui/QuizSettingsForm";
import { Card } from "@/shared/ui";
import "./QuizPage.scss";

export const QuizPage = () => (
  <main className="quiz-page">
    <Card as="section" padding="lg" radius="lg" shadow className="quiz-page__card">
      <h1 className="quiz-page__title">Собеседование</h1>
      <QuizSettingsForm />
    </Card>
  </main>
);
