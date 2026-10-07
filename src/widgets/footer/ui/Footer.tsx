import { Link } from "react-router-dom";
import {
  FaFigma,
  FaTelegramPlane,
  FaYoutube,
  FaTiktok,
  FaGithub,
} from "react-icons/fa";
import "./Footer.scss";

const SOCIALS = [
  { href: "https://www.figma.com/", label: "Figma", icon: FaFigma },
  { href: "https://t.me/", label: "Telegram", icon: FaTelegramPlane },
  { href: "https://www.youtube.com/", label: "YouTube", icon: FaYoutube },
  { href: "https://www.tiktok.com/", label: "TikTok", icon: FaTiktok },
  { href: "https://github.com/", label: "GitHub", icon: FaGithub },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <Link to="/" className="footer__logo">
            Yeahub
          </Link>
          <p className="footer__slogan">
            Выбери, каким будет IT завтра, вместе с нами
          </p>
          <p className="footer__description">
            YeaHub — это полностью открытый проект, призванный объединить и
            улучшить IT-сферу. Наш исходный код доступен для просмотра на
            GitHub. Дизайн проекта также открыт для ознакомления в Figma.
          </p>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            <span>© {new Date().getFullYear()} YeaHub</span>
            <Link to="/documents" className="footer__link">
              Документы
            </Link>
          </div>

          <div className="footer__socials">
            <span className="footer__socials-text">
              Ищите нас и в других соцсетях @yeahub_it
            </span>
            <ul className="footer__socials-list">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="footer__social"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
