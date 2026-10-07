import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.scss";

const NAV_ITEMS = [
  { to: "/collections", label: "База Вопросов" },
  { to: "/trainer", label: "Тренажер" },
  { to: "/questions", label: "Материалы" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleChange = () => {
      setIsMenuOpen(false);
    };
    handleChange();
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src=" /logo.svg" alt="logo" className="header__logo-img" />
          <span className="header__title">Yeahub</span>
        </Link>

        <div
          id="header-menu"
          className={`header__menu ${isMenuOpen ? "header__menu--open" : ""}`}
        >
          <nav className="header__navigation" aria-label="Основная навигация">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="header__auth">
            <Link to="/login" className="header__btn header__btn--outline">
              Вход
            </Link>
            <Link to="/register" className="header__btn header__btn--primary">
              Регистрация
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="header__burger"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};
