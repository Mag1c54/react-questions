import type { MockQuiz } from "@/entities/quiz";
import { useQuizProgress } from "@/entities/quiz";
import { QuizProgress } from "@/entities/quiz";
import { QuizQuestion } from "@/features/quiz-question";
import { QuizResult } from "@/features/quiz-result";

interface QuizRunnerProps {
  quiz: MockQuiz;
  settingsSearch: string;
  onRestart: () => void;
}

export const QuizRunner = ({ quiz, settingsSearch, onRestart }: QuizRunnerProps) => {
  const progress = useQuizProgress(quiz.questions);

  if (progress.isFinished) {
    return (
      <QuizResult
        questions={quiz.questions}
        answers={progress.answers}
        settingsSearch={settingsSearch}
        onRestart={onRestart}
      />
    );
  }

  if (!progress.question) return null;

  return (
    <>
      <QuizProgress current={progress.index + 1} total={progress.total} />

      <QuizQuestion
        key={progress.question.id}
        question={progress.question}
        isFirst={progress.isFirst}
        isLast={progress.isLast}
        answer={progress.currentAnswer}
        onAnswer={progress.answer}
        onPrev={progress.prev}
        onNext={progress.next}
        onFinish={progress.finish}
      />
    </>
  );
};
