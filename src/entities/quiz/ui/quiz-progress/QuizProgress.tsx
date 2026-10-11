import "./QuizProgress.scss";

interface QuizProgressProps {
  current: number;
  total: number;
}

export const QuizProgress = ({ current, total }: QuizProgressProps) => {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <section className="quiz-progress">
      <div className="quiz-progress__head">
        <h2 className="quiz-progress__title">Вопросы собеседования</h2>
        <span className="quiz-progress__count">
          {current}/{total}
        </span>
      </div>
      <div
        className="quiz-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div className="quiz-progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
};