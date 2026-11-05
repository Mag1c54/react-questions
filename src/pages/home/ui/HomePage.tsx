import { selectSessionStatus } from "@/entities/session";
import { useSelector } from "react-redux";
import { ButtonLink } from "@/shared/ui";
import "./HomePage.scss";

const STATS: { value?: string; label: string }[] = [
  { value: "10\u00A0000+", label: "вопросов" },
  { value: "150+", label: "задач" },
  { value: "300+", label: "компаний" },
  { value: "20+", label: "специальностей" },
  { value: "100+", label: "навыков" },
  { label: "Обновляется каждую неделю" },
];

export const HomePage = () => {
  const isAuth = useSelector(selectSessionStatus) === "authenticated";

  return (
    <div className="home">
      <main className="home__hero">
        <h1 className="home__title">
          Подготовка к собеседованию в IT: вопросы, задачи и база собеседований
        </h1>

        <p className="home__subtitle">
          База вопросов и задач для IT собеседований, тренажёр интервью и лайвкодинг. Подготовка к
          техническому собеседованию и прохождению отбора в IT компании.
        </p>

        <ButtonLink to={isAuth ? "/interview" : "/register"} size="lg" className="home__btn">
          {isAuth ? "Начать подготовку" : "Присоединиться"}
        </ButtonLink>
      </main>

      <ul className="home__stats" aria-label="Yeahub в цифрах">
        {STATS.map(({ value, label }) => (
          <li key={label} className={`home__stat ${value ? "" : "home__stat--note"}`}>
            {value && <span className="home__stat-value">{value}</span>}
            <span className="home__stat-label">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
