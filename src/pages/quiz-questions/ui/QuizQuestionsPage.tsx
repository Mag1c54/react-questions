import { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetMockQuizQuery } from "@/entities/quiz/api/quizApi";
import { parseQuizSettings } from "@/entities/quiz/lib/quizParams";
import {
  finishQuiz,
  goTo,
  resetQuiz,
  selectQuiz,
  setAnswer,
  startQuiz,
} from "@/entities/quiz/model/quizSlice";
import type { QuizAnswer } from "@/entities/quiz/model/types";
import { QuizProgress } from "@/entities/quiz/ui/quiz-progress/QuizProgress";
import { QuizQuestion } from "@/features/quiz-question/ui/QuizQuestion";
import { QuizResult } from "@/features/quiz-result/ui/QuizResult";
import "./QuizQuestionsPage.scss";

export const QuizQuestionsPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { quizId, currentIndex, answers, isFinished } = useAppSelector(selectQuiz);

  const settings = parseQuizSettings(searchParams);
  const settingsSearch = `?${searchParams.toString()}`;

  const {
    data: quiz,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMockQuizQuery(settings ?? skipToken);

  useEffect(() => {
    if (quiz) dispatch(startQuiz(quiz.id));
  }, [quiz, dispatch]);

  if (!settings) return <Navigate to="/quiz" replace />;

  const handleRestart = () => {
    dispatch(resetQuiz());
    refetch();
  };

  const renderStatus = (text: string, withRetry = false) => (
    <main className="quiz-questions-page">
      <div className="quiz-questions-page__status">
        {text}
        {withRetry && (
          <button type="button" className="quiz-questions-page__btn" onClick={refetch}>
            Повторить
          </button>
        )}
        <Link to={`/quiz${settingsSearch}`} className="quiz-questions-page__link">
          Изменить настройки
        </Link>
      </div>
    </main>
  );

  const isNotFound = !!error && "status" in error && error.status === 404;

  if (isFetching) return renderStatus("Подбираем вопросы...");
  if (isNotFound) return renderStatus("По выбранным параметрам вопросов не нашлось");
  if (isError) return renderStatus("Не удалось загрузить вопросы", true);
  if (!quiz || quiz.questions.length === 0) {
    return renderStatus("По выбранным параметрам вопросов не нашлось");
  }
  if (quizId !== quiz.id) return renderStatus("Подбираем вопросы...");

  const total = quiz.questions.length;
  const question = quiz.questions[currentIndex];

  if (isFinished) {
    return (
      <main className="quiz-questions-page">
        <QuizResult
          questions={quiz.questions}
          answers={answers}
          settingsSearch={settingsSearch}
          onRestart={handleRestart}
        />
      </main>
    );
  }

  const handleAnswer = (answer: QuizAnswer) => {
    dispatch(setAnswer({ questionId: question.id, answer }));
    if (currentIndex < total - 1) dispatch(goTo(currentIndex + 1));
  };

  return (
    <main className="quiz-questions-page">
      <QuizProgress current={currentIndex + 1} total={total} />

      <QuizQuestion
        key={question.id}
        question={question}
        isFirst={currentIndex === 0}
        isLast={currentIndex === total - 1}
        answer={answers[question.id]}
        onAnswer={handleAnswer}
        onPrev={() => dispatch(goTo(currentIndex - 1))}
        onNext={() => dispatch(goTo(currentIndex + 1))}
        onFinish={() => dispatch(finishQuiz())}
      />
    </main>
  );
};