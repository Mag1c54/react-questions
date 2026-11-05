import { QuizProgressSkeleton } from "@/entities/quiz";
import { QuizQuestionSkeleton } from "@/features/quiz-question";

export const QuizSessionSkeleton = () => (
  <>
    <QuizProgressSkeleton />
    <QuizQuestionSkeleton />
  </>
);
