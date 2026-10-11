import { QuizSettingsForm } from "@/features/quiz-settings/ui/QuizSettingsForm";
import "./QuizPage.scss";

export const QuizPage = () => (
  <main className="quiz-page">
    <section className="quiz-page__card">
      <h1 className="quiz-page__title">Собеседование</h1>
      <QuizSettingsForm />
    </section>
  </main>
);