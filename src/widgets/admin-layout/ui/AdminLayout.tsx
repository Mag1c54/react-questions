import { useState, type ComponentType } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiFolder,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiLayers,
  FiLogOut,
  FiMap,
  FiMessageCircle,
  FiSidebar,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { LogoutButton } from "@/features/logout/ui/LogoutButton";
import { ADMIN_ROUTES } from "@/shared/config/routes";
import { buttonClassName } from "@/shared/ui";
import "./AdminLayout.scss";

const SUPPORT_URL = "https://t.me/yeahub_it";

interface NavItem {
  label: string;
  icon: ComponentType;
  to: string | null;
  platform?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Платформа", icon: FiGrid, to: "/", platform: true },
  { label: "Главная", icon: FiHome, to: null },
  { label: "Специализации", icon: FiLayers, to: ADMIN_ROUTES.specializations },
  { label: "Верификация", icon: FiCheckCircle, to: null },
  { label: "Навыки", icon: FiAward, to: null },
  { label: "Вопросы", icon: FiHelpCircle, to: null },
  { label: "Мероприятия", icon: FiCalendar, to: null },
  { label: "Roadmap", icon: FiMap, to: null },
  { label: "Пользователь", icon: FiUser, to: null },
  { label: "Коллекции", icon: FiFolder, to: null },
  { label: "Компания", icon: FiBriefcase, to: null },
  { label: "Ресурсы", icon: FiBookOpen, to: null },
  { label: "Темы", icon: FiTag, to: null },
];

export const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: profile } = useGetProfileQuery();
  const initial = profile?.username?.[0]?.toUpperCase() ?? "?";

  return (
    <div className={`admin-layout ${isCollapsed ? "admin-layout--collapsed" : ""}`}>
      <aside className="admin-layout__sidebar">
        <div className="admin-layout__brand">
          <Link to="/" className="admin-layout__logo">
            <img src="/logo.svg" alt="" className="admin-layout__logo-img" />
            <span className="admin-layout__label">Yeahub</span>
          </Link>

          <button
            type="button"
            className="admin-layout__collapse"
            aria-label={isCollapsed ? "Развернуть меню" : "Свернуть меню"}
            aria-expanded={!isCollapsed}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <FiSidebar aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Разделы админки">
          <ul className="admin-layout__nav">
            {NAV_ITEMS.map(({ label, icon: Icon, to, platform }) => (
              <li key={label}>
                {to ? (
                  <NavLink
                    to={to}
                    end={to === "/"}
                    title={isCollapsed ? label : undefined}
                    className={({ isActive }) =>
                      [
                        "admin-layout__link",
                        platform ? "admin-layout__link--platform" : "",
                        isActive && !platform ? "admin-layout__link--active" : "",
                      ].join(" ")
                    }
                  >
                    <Icon aria-hidden="true" />
                    <span className="admin-layout__label">{label}</span>
                  </NavLink>
                ) : (
                  <span
                    className="admin-layout__link admin-layout__link--disabled"
                    aria-disabled="true"
                    title="Скоро"
                  >
                    <Icon aria-hidden="true" />
                    <span className="admin-layout__label">{label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-layout__bottom">
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName({ variant: "primary", fullWidth: true })}
          >
            <FiMessageCircle aria-hidden="true" />
            <span className="admin-layout__label">Поддержка</span>
          </a>

          <LogoutButton className={buttonClassName({ variant: "danger-outline", fullWidth: true })}>
            <FiLogOut aria-hidden="true" />
            <span className="admin-layout__label">Выход</span>
          </LogoutButton>
        </div>
      </aside>

      <div className="admin-layout__main">
        <header className="admin-layout__topbar">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt=""
              title={profile.username}
              className="admin-layout__avatar"
            />
          ) : (
            <span
              className="admin-layout__avatar admin-layout__avatar--empty"
              title={profile?.username}
              aria-hidden="true"
            >
              {initial}
            </span>
          )}
        </header>

        <div className="admin-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
