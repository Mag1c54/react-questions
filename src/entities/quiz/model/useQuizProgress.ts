import type { Question } from "@/entities/question/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { finishQuiz, goTo, selectQuiz, setAnswer } from "./quizSlice";
import type { QuizAnswer } from "./types";

export const useQuizProgress = (questions: Question[]) => {
  const dispatch = useAppDispatch();
  const { currentIndex, answers, isFinished } = useAppSelector(selectQuiz);

  const total = questions.length;
  const question: Question | undefined = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= total - 1;

  const answer = (value: QuizAnswer) => {
    if (!question) return;

    dispatch(setAnswer({ questionId: question.id, answer: value }));
    if (!isLast) dispatch(goTo(currentIndex + 1));
  };

  const prev = () => {
    if (!isFirst) dispatch(goTo(currentIndex - 1));
  };

  const next = () => {
    if (!isLast) dispatch(goTo(currentIndex + 1));
  };

  const finish = () => dispatch(finishQuiz());

  return {
    question,
    index: currentIndex,
    total,
    answers,
    currentAnswer: question ? answers[question.id] : undefined,
    isFirst,
    isLast,
    isFinished,
    answer,
    prev,
    next,
    finish,
  };
};
