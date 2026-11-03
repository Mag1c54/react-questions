import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { selectSessionStatus } from "@/entities/session/model/sessionSlice";
import { LogoutButton } from "@/features/logout/ui/LogoutButton";
import { useAppSelector } from "@/store/hooks";
import { Button, ButtonLink, SafeImage } from "@/shared/ui";
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
          {profile && (
            <Link to="/profile" className="header__user" onClick={closeMenu}>
              {profile.username}
            </Link>
          )}
          <LogoutButton variant="outline" />
        </div>
      );
    }

    return (
      <div className="header__auth">
        <ButtonLink to="/login" variant="outline" onClick={closeMenu}>
          Вход
        </ButtonLink>
        <ButtonLink to="/register" onClick={closeMenu}>
          Регистрация
        </ButtonLink>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <SafeImage src="/logo.svg" alt="" className="header__logo-img" />
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
        </div>
        {renderAuth()}

        <Button
          type="button"
          variant="outline"
          iconOnly
          className="header__burger"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>
    </header>
  );
};
