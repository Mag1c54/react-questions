import { QuizProgressSkeleton } from "@/entities/quiz/ui/quiz-progress/QuizProgressSkeleton";
import { QuizQuestionSkeleton } from "@/features/quiz-question/ui/QuizQuestionSkeleton";

export const QuizSessionSkeleton = () => (
  <>
    <QuizProgressSkeleton />
    <QuizQuestionSkeleton />
  </>
);
