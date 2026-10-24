import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetMockQuizQuery } from "../api/quizApi";
import { resetQuiz, selectQuiz, startQuiz } from "./quizSlice";
import type { MockQuiz, QuizSettings } from "./types";

type MockQuizState =
  { status: "loading" | "empty" | "error"; quiz?: undefined } | { status: "ready"; quiz: MockQuiz };

export type QuizLoadStatus = MockQuizState["status"];

interface ResolveInput {
  quiz?: MockQuiz;
  storeQuizId: string | null;
  isFetching: boolean;
  isError: boolean;
  isNotFound: boolean;
}

export const resolveMockQuizState = ({
  quiz,
  storeQuizId,
  isFetching,
  isError,
  isNotFound,
}: ResolveInput): MockQuizState => {
  if (isFetching) return { status: "loading" };
  if (isNotFound) return { status: "empty" };
  if (isError) return { status: "error" };
  if (!quiz || quiz.questions.length === 0) return { status: "empty" };
  if (storeQuizId !== quiz.id) return { status: "loading" };
  return { status: "ready", quiz };
};

export const useMockQuiz = (settings: QuizSettings) => {
  const dispatch = useAppDispatch();
  const storeQuizId = useAppSelector((state) => selectQuiz(state).quizId);

  const { data: quiz, isFetching, isError, error, refetch } = useGetMockQuizQuery(settings);

  useEffect(() => {
    if (quiz) dispatch(startQuiz(quiz.id));
  }, [quiz, dispatch]);

  const state = resolveMockQuizState({
    quiz,
    storeQuizId,
    isFetching,
    isError,
    isNotFound: !!error && "status" in error && error.status === 404,
  });

  const retry = () => void refetch();

  const restart = () => {
    dispatch(resetQuiz());
    void refetch();
  };

  return { ...state, retry, restart };
};
