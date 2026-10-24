import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { useGetSkillsQuery } from "@/entities/skill/api/skillApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetQuiz } from "@/entities/quiz/model/quizSlice";
import { selectSessionStatus } from "@/entities/session/model/sessionSlice";
import { QUIZ_ROUTES } from "@/shared/config/routes";
import {
  buildQuizSearch,
  COMPLEXITY_RANGES,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  parseQuizSettings,
} from "@/entities/quiz/lib/quizParams";
import { Chip } from "@/shared/ui/chip/Chip";
import { NumberStepper } from "@/shared/ui/number-stepper/NumberStepper";
import "./QuizSettingsForm.scss";
import { Button, Popup } from "@/shared/ui";
interface QuizFormValues {
  specialization: number | null;
  skills: number[];
  complexity: number[];
  limit: number;
}

export const QuizSettingsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const initial = parseQuizSettings(searchParams);
  const sessionStatus = useAppSelector(selectSessionStatus);
  const isAuthenticated = sessionStatus === "authenticated";

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizFormValues>({
    defaultValues: {
      specialization: initial?.specialization ?? null,
      skills: initial?.skills ?? [],
      complexity: initial?.complexity ?? [],
      limit: initial?.limit ?? DEFAULT_LIMIT,
    },
  });

  const specialization = watch("specialization");

  const {
    data: specsData,
    isLoading: isSpecsLoading,
    isError: isSpecsError,
  } = useGetSpecializationsQuery();

  const { data: skillsData, isFetching: isSkillsFetching } = useGetSkillsQuery(
    { specializations: specialization === null ? [] : [specialization] },
    { skip: specialization === null },
  );

  const onSubmit = (values: QuizFormValues) => {
    if (values.specialization === null) return;
    dispatch(resetQuiz());
    navigate({
      pathname: QUIZ_ROUTES.questions,
      search: buildQuizSearch({ ...values, specialization: values.specialization }),
    });
  };

  const renderSkills = () => {
    if (specialization === null) {
      return <p className="quiz-form__hint">Сначала выберите специализацию</p>;
    }
    if (isSkillsFetching) return <p className="quiz-form__hint">Загрузка категорий...</p>;

    const skills = skillsData?.data ?? [];
    if (skills.length === 0) {
      return <p className="quiz-form__hint">Для этой специализации категорий нет</p>;
    }

    return (
      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <div className="quiz-form__chips">
            {skills.map((skill) => {
              const checked = field.value.includes(skill.id);

              const chipNode = (
                <Chip
                  key={skill.id}
                  checked={checked}
                  disabled={!isAuthenticated}
                  icon={skill.imageSrc ?? "/logo.svg"}
                  onChange={() => {
                    if (!isAuthenticated) return;
                    field.onChange(
                      checked
                        ? field.value.filter((id) => id !== skill.id)
                        : [...field.value, skill.id],
                    );
                  }}
                >
                  {skill.title}
                </Chip>
              );

              if (!isAuthenticated) {
                return (
                  <Popup
                    key={skill.id}
                    content="Доступно только для зарегистрированных пользователей"
                  >
                    {chipNode}
                  </Popup>
                );
              }

              return chipNode;
            })}
          </div>
        )}
      />
    );
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="quiz-form__columns">
        <div className="quiz-form__column">
          <div className="quiz-form__block">
            <h2 className="quiz-form__title">Выбор специализации</h2>

            {isSpecsLoading && <p className="quiz-form__hint">Загрузка...</p>}
            {isSpecsError && <p className="quiz-form__error">Не удалось загрузить специализации</p>}

            <Controller
              name="specialization"
              control={control}
              rules={{
                validate: (value) => value !== null || "Выберите специализацию",
              }}
              render={({ field }) => (
                <div className="quiz-form__chips" role="radiogroup">
                  {specsData?.data.map((spec) => (
                    <Chip
                      key={spec.id}
                      type="radio"
                      name="specialization"
                      checked={field.value === spec.id}
                      onChange={() => {
                        field.onChange(spec.id);
                        setValue("skills", []);
                      }}
                    >
                      {spec.title}
                    </Chip>
                  ))}
                </div>
              )}
            />

            {errors.specialization && (
              <p className="quiz-form__error" role="alert">
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div className="quiz-form__block">
            <h2 className="quiz-form__title">Категории вопросов</h2>
            {renderSkills()}
          </div>
        </div>

        <div className="quiz-form__column">
          <div className="quiz-form__block">
            <h2 className="quiz-form__title">Уровень сложности</h2>
            <Controller
              name="complexity"
              control={control}
              render={({ field }) => (
                <div className="quiz-form__chips">
                  {COMPLEXITY_RANGES.map((range) => {
                    const checked = range.levels.every((level) => field.value.includes(level));
                    return (
                      <Chip
                        key={range.label}
                        checked={checked}
                        onChange={() =>
                          field.onChange(
                            checked
                              ? field.value.filter((level) => !range.levels.includes(level))
                              : Array.from(new Set([...field.value, ...range.levels])),
                          )
                        }
                      >
                        {range.label}
                      </Chip>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="quiz-form__block">
            <h2 className="quiz-form__title">Количество вопросов</h2>
            <Controller
              name="limit"
              control={control}
              render={({ field }) => (
                <NumberStepper
                  value={field.value}
                  min={1}
                  max={MAX_LIMIT}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="quiz-form__footer">
        <Button type="submit" className="quiz-form__submit">
          Начать
          <FiArrowRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
};
