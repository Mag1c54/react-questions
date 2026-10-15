import type { ComponentType } from "react";
import { NavLink, Outlet } from "react-router-dom";
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
  FiMap,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { LogoutButton } from "@/features/logout/ui/LogoutButton";
import "./AdminLayout.scss";

interface NavItem {
  label: string;
  icon: ComponentType;
  to: string | null;
  platform?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Платформа", icon: FiGrid, to: "/", platform: true },
  { label: "Главная", icon: FiHome, to: null },
  { label: "Специализации", icon: FiLayers, to: "/admin/specializations" },
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
  const { data: profile } = useGetProfileQuery();
  const initial = profile?.username?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <span className="admin-layout__logo">Yeahub</span>

        <nav aria-label="Разделы админки">
          <ul className="admin-layout__nav">
            {NAV_ITEMS.map(({ label, icon: Icon, to, platform }) => (
              <li key={label}>
                {to ? (
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      [
                        "admin-layout__link",
                        platform ? "admin-layout__link--platform" : "",
                        isActive && !platform ? "admin-layout__link--active" : "",
                      ].join(" ")
                    }
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </NavLink>
                ) : (
                  <span
                    className="admin-layout__link admin-layout__link--disabled"
                    aria-disabled="true"
                    title="Скоро"
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <LogoutButton className="admin-layout__logout" />
      </aside>

      <div className="admin-layout__main">
        <header className="admin-layout__topbar">
          {profile?.username && <span className="admin-layout__username">{profile.username}</span>}
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" className="admin-layout__avatar" />
          ) : (
            <span className="admin-layout__avatar admin-layout__avatar--empty" aria-hidden="true">
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
