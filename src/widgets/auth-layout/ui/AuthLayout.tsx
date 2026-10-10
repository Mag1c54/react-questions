import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import "./AuthLayout.scss";

const BENEFITS = [
  "Пошаговый план обучения",
  "Карьерный рост",
  "Большое сообщество специалистов",
  "Обучение с ментором",
  "Возможность прохождения стажировки",
];

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  switchText: string;
  switchLinkText: string;
  switchTo: string;
}

export const AuthLayout = ({
  title,
  children,
  switchText,
  switchLinkText,
  switchTo,
}: AuthLayoutProps) => (
  <main className="auth-layout">
    <aside className="auth-layout__aside">
      <div className="auth-layout__brand">
        <Link to="/" className="auth-layout__logo">
          <img src='/logo.svg' alt="" className="auth-layout__logo-img" />
          <span className="auth-layout__logo-text">Yeahub</span>
        </Link>
        <p className="auth-layout__slogan">YeaHub объединяет IT-специалистов</p>
      </div>

      <div className="auth-layout__benefits-block">
        <h2 className="auth-layout__benefits-title">
          Стань частью сообщества YeaHub и получи:
        </h2>
        <ul className="auth-layout__benefits">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="auth-layout__benefit">
              <FiCheckCircle className="auth-layout__benefit-icon" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </aside>

    <section className="auth-layout__main">
      <div className="auth-layout__content">
        <h1 className="auth-layout__title">{title}</h1>
        {children}
      </div>

      <div className="auth-layout__switch">
        <span>{switchText}</span>
        <Link to={switchTo}>{switchLinkText}</Link>
      </div>
    </section>
  </main>
);