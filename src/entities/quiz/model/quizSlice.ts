import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuizAnswer } from "./types";

interface QuizState {
  quizId: string | null;
  currentIndex: number;
  answers: Record<number, QuizAnswer>;
  isFinished: boolean;
}

const initialState: QuizState = {
  quizId: null,
  currentIndex: 0,
  answers: {},
  isFinished: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz(state, action: PayloadAction<string>) {
      if (state.quizId === action.payload) return;
      return { ...initialState, quizId: action.payload };
    },
    resetQuiz() {
      return initialState;
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: number; answer: QuizAnswer }>,
    ) {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    goTo(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    finishQuiz(state) {
      state.isFinished = true;
    },
  },
});

export const { startQuiz, setAnswer, goTo, finishQuiz, resetQuiz } = quizSlice.actions;

export const selectQuiz = (state: { quiz: QuizState }) => state.quiz;
