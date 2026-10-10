import { FaFacebook, FaTelegram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./SocialAuth.scss";

type Provider = "telegram" | "google" | "facebook";

const PROVIDERS = [
  { id: "telegram", label: "Telegram", icon: FaTelegram },
  { id: "google", label: "Google", icon: FcGoogle },
  { id: "facebook", label: "Facebook", icon: FaFacebook },
] as const;

interface SocialAuthProps {
  onSelect?: (provider: Provider) => void;
}

export const SocialAuth = ({ onSelect }: SocialAuthProps) => (
  <div className="social-auth">
    <p className="social-auth__text">Зарегистрироваться через социальные сети</p>
    <div className="social-auth__list">
      {PROVIDERS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`social-auth__btn social-auth__btn--${id}`}
          aria-label={label}
          onClick={() => onSelect?.(id)}
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  </div>
);