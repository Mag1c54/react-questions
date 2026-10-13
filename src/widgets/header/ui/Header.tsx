import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGetProfileQuery } from "@/entities/session/api/authApi";
import { selectSessionStatus } from "@/entities/session/model/sessionSlice";
import { LogoutButton } from "@/features/logout/ui/LogoutButton";
import { useAppSelector } from "@/store/hooks";
import "./Header.scss";

const NAV_ITEMS = [
  { to: "/collections", label: "База Вопросов" },
  { to: "/interview", label: "Тренажер" },
  { to: "/questions", label: "Материалы" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const status = useAppSelector(selectSessionStatus);

  const { data: profile } = useGetProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  const closeMenu = () => setIsMenuOpen(false);

  const renderAuth = () => {
    if (status === "checking") return null;

    if (status === "authenticated") {
      return (
        <div className="header__auth">
          {profile && <span className="header__user">{profile.username}</span>}
          <LogoutButton className="header__btn header__btn--outline" />
        </div>
      );
    }

    return (
      <div className="header__auth">
        <Link to="/login" className="header__btn header__btn--outline" onClick={closeMenu}>
          Вход
        </Link>
        <Link to="/register" className="header__btn header__btn--primary" onClick={closeMenu}>
          Регистрация
        </Link>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img src="/logo.svg" alt="" className="header__logo-img" />
          <span className="header__title">Yeahub</span>
        </Link>

        <div id="header-menu" className={`header__menu ${isMenuOpen ? "header__menu--open" : ""}`}>
          <nav className="header__navigation" aria-label="Основная навигация">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {renderAuth()}
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
