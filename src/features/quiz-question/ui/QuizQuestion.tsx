import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import type { Question } from "@/entities/question/model/types";
import type { QuizAnswer } from "@/entities/quiz/model/types";
import { Button } from "@/shared/ui";
import "./QuizQuestion.scss";

interface QuizQuestionProps {
  question: Question;
  isFirst: boolean;
  isLast: boolean;
  answer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export const QuizQuestion = ({
  question,
  isFirst,
  isLast,
  answer,
  onAnswer,
  onPrev,
  onNext,
  onFinish,
}: QuizQuestionProps) => {
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  return (
    <section className="quiz-question">
      <div className="quiz-question__nav">
        <Button
          type="button"
          className="quiz-question__nav-btn"
          disabled={isFirst}
          onClick={onPrev}
        >
          <FiChevronLeft aria-hidden="true" />
          Назад
        </Button>
        <Button type="button" className="quiz-question__nav-btn" disabled={isLast} onClick={onNext}>
          Далее
          <FiChevronRight aria-hidden="true" />
        </Button>
      </div>

      <div
        className={`quiz-question__body ${question.imageSrc ? "" : "quiz-question__body--no-image"}`}
      >
        <div className="quiz-question__content">
          <h2 className="quiz-question__title">{question.title}</h2>

          <Button
            type="button"
            className="quiz-question__toggle"
            aria-expanded={isAnswerShown}
            onClick={() => setIsAnswerShown((prev) => !prev)}
          >
            {isAnswerShown ? "Скрыть ответ" : "Посмотреть ответ"}
          </Button>

          {isAnswerShown && (
            <p className="quiz-question__answer">
              {question.shortAnswer || "Ответ на этот вопрос пока не добавлен"}
            </p>
          )}

          <div className="quiz-question__rate">
            <Button
              type="button"
              aria-pressed={answer === "UNKNOWN"}
              className={`quiz-question__rate-btn ${answer === "UNKNOWN" ? "quiz-question__rate-btn--active" : ""}`}
              onClick={() => onAnswer("UNKNOWN")}
            >
              <FiThumbsDown aria-hidden="true" />
              Не знаю
            </Button>
            <Button
              type="button"
              aria-pressed={answer === "KNOWN"}
              className={`quiz-question__rate-btn ${answer === "KNOWN" ? "quiz-question__rate-btn--active" : ""}`}
              onClick={() => onAnswer("KNOWN")}
            >
              <FiThumbsUp aria-hidden="true" />
              Знаю
            </Button>
          </div>
        </div>

        {question.imageSrc && (
          <img src={question.imageSrc} alt="" className="quiz-question__image" />
        )}
      </div>

      <div className="quiz-question__footer">
        <Button type="button" className="quiz-question__finish" onClick={onFinish}>
          Завершить
        </Button>
      </div>
    </section>
  );
};
