import { FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import "./ExpertCard.scss";

const EXPERT = {
  name: "Руслан Куянец",
  role: "Python Guru",
  about: "Guru - это эксперты YeaHub, которые помогают развивать комьюнити.",
  avatarSrc: "",
  links: [
    { href: "https://t.me/", label: "Telegram", icon: FaTelegramPlane },
    { href: "https://www.youtube.com/", label: "YouTube", icon: FaYoutube },
    { href: "https://yeahub.ru/", label: "Сайт", icon: FiLink },
  ],
};

export const ExpertCard = () => {
  const { name, role, about, avatarSrc, links } = EXPERT;

  return (
    <section className="expert-card">
      <div className="expert-card__head">
        {avatarSrc ? (
          <img src={avatarSrc} alt="" className="expert-card__avatar" />
        ) : (
          <div className="expert-card__avatar expert-card__avatar--empty" aria-hidden="true">
            {name[0]}
          </div>
        )}
        <div className="expert-card__person">
          <span className="expert-card__name">{name}</span>
          <span className="expert-card__role">{role}</span>
        </div>
      </div>

      <p className="expert-card__about">{about}</p>

      <ul className="expert-card__links">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              className="expert-card__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};