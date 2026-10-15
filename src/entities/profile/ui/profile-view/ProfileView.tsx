import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { isHttpUrl } from "@/shared/lib/isHttpUrl";
import { getPlatform } from "../../config/platforms";
import type { Profile } from "../../model/types";
import "./ProfileView.scss";

interface ProfileViewUser {
  username: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  city?: string | null;
  country?: string | null;
}

interface ProfileViewProps {
  user: ProfileViewUser;
  profile: Profile;
  specializationTitle?: string;
  readOnly?: boolean;
}
const ABOUT_COLLAPSE_LENGTH = 300;

const hideBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

const EditLink = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="profile-view__edit" aria-label={label}>
    <FiEdit2 aria-hidden="true" />
  </Link>
);

export const ProfileView = ({
  user,
  profile,
  specializationTitle,
  readOnly = false,
}: ProfileViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const editLink = (tab?: string) => {
    const params = new URLSearchParams({ profile: profile.id });
    if (tab) params.set("tab", tab);
    return `/profile/edit?${params.toString()}`;
  };

  const location = [user.city, user.country].filter(Boolean).join(", ");
  const about = profile.description?.trim() ?? "";
  const isLongAbout = about.length > ABOUT_COLLAPSE_LENGTH;
  const socialLinks = (profile.socialNetwork ?? []).filter((item) => isHttpUrl(item.title));

  return (
    <div className="profile-view">
      <section className="profile-view__card profile-view__header">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="profile-view__avatar"
            onError={hideBrokenImage}
          />
        ) : (
          <div className="profile-view__avatar profile-view__avatar--empty" aria-hidden="true">
            {user.username[0]?.toUpperCase()}
          </div>
        )}

        <div className="profile-view__info">
          <h1 className="profile-view__name">{user.username}</h1>
          {specializationTitle && <p className="profile-view__role">{specializationTitle}</p>}
          {location && <p className="profile-view__muted">{location}</p>}

          {!readOnly && (
            <p className="profile-view__contacts">
              {user.phone && <span>{user.phone}</span>}
              <span>{user.email}</span>
            </p>
          )}

          {socialLinks.length > 0 && (
            <ul className="profile-view__socials">
              {socialLinks.map((item) => {
                const platform = getPlatform(item.code);
                const Icon = platform?.icon;
                return (
                  <li key={item.code}>
                    <a
                      href={item.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-view__social"
                      aria-label={platform?.label ?? item.code}
                    >
                      {Icon ? <Icon aria-hidden="true" /> : item.code[0]}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {!readOnly && <EditLink to={editLink()} label="Редактировать профиль" />}
      </section>

      <section className="profile-view__card">
        <div className="profile-view__head">
          <h2 className="profile-view__title">Обо мне</h2>
          {!readOnly && <EditLink to={editLink("about")} label="Редактировать «Обо мне»" />}
        </div>

        {about ? (
          <>
            <p
              className={`profile-view__about ${isLongAbout && !isExpanded ? "profile-view__about--clamped" : ""}`}
            >
              {about}
            </p>
            {isLongAbout && (
              <button
                type="button"
                className="profile-view__toggle"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? "Свернуть" : "Развернуть"}
              </button>
            )}
          </>
        ) : readOnly ? (
          <p className="profile-view__empty">Пользователь пока ничего не рассказал о себе.</p>
        ) : (
          <p className="profile-view__empty">
            Расскажите о себе. <Link to={editLink("about")}>Добавить описание</Link>
          </p>
        )}
      </section>

      <section className="profile-view__card">
        <div className="profile-view__head">
          <h2 className="profile-view__title">Навыки</h2>
          {!readOnly && <EditLink to={editLink("skills")} label="Редактировать навыки" />}
        </div>

        {profile.profileSkills.length > 0 ? (
          <ul className="profile-view__skills">
            {profile.profileSkills.map((skill) => (
              <li key={skill.id} className="profile-view__skill">
                {skill.imageSrc && (
                  <img
                    src={skill.imageSrc}
                    alt=""
                    className="profile-view__skill-icon"
                    onError={hideBrokenImage}
                  />
                )}
                {skill.title}
              </li>
            ))}
          </ul>
        ) : readOnly ? (
          <p className="profile-view__empty">Навыки не указаны.</p>
        ) : (
          <p className="profile-view__empty">
            Навыки пока не добавлены. <Link to={editLink("skills")}>Выбрать навыки</Link>
          </p>
        )}
      </section>
    </div>
  );
};
