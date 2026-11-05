import { Skeleton } from "@/shared/ui";
import "./QuizSettingsForm.scss";

const SPECIALIZATION_WIDTHS = [104, 132, 88, 118];
const SKILL_WIDTHS = [96, 120, 84, 108, 92, 116];
const COMPLEXITY_WIDTHS = [92, 110, 96];

export const QuizSettingsFormSkeleton = () => (
  <div className="quiz-form" role="status" aria-label="Загрузка настроек собеседования">
    <div className="quiz-form__columns">
      <div className="quiz-form__column">
        <div className="quiz-form__block">
          <Skeleton width={150} height={12} />

          <div className="quiz-form__chips">
            {SPECIALIZATION_WIDTHS.map((width) => (
              <Skeleton key={width} width={width} height={34} radius="md" />
            ))}
          </div>
        </div>

        <div className="quiz-form__block">
          <Skeleton width={140} height={12} />

          <div className="quiz-form__chips">
            {SKILL_WIDTHS.map((width) => (
              <Skeleton key={width} width={width} height={34} radius="md" />
            ))}
          </div>
        </div>
      </div>

      <div className="quiz-form__column">
        <div className="quiz-form__block">
          <Skeleton width={130} height={12} />

          <div className="quiz-form__chips">
            {COMPLEXITY_WIDTHS.map((width) => (
              <Skeleton key={width} width={width} height={34} radius="md" />
            ))}
          </div>
        </div>

        <div className="quiz-form__block">
          <Skeleton width={150} height={12} />
          <Skeleton width={130} height={40} radius="md" />
        </div>
      </div>
    </div>

    <div className="quiz-form__footer">
      <Skeleton width={120} height={40} radius="md" />
    </div>
  </div>
);
