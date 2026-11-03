import { FaTelegram } from "react-icons/fa";
import { Button } from "@/shared/ui";
import "./SocialAuth.scss";

type Provider = "telegram";

const PROVIDERS = [{ id: "telegram", label: "Telegram", icon: FaTelegram }] as const;

interface SocialAuthProps {
  onSelect?: (provider: Provider) => void;
}

export const SocialAuth = ({ onSelect }: SocialAuthProps) => (
  <div className="social-auth">
    <p className="social-auth__text">Зарегистрироваться через социальные сети</p>
    <div className="social-auth__list">
      {PROVIDERS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          type="button"
          variant="none"
          className={`social-auth__btn social-auth__btn--${id}`}
          aria-label={label}
          onClick={() => onSelect?.(id)}
        >
          <Icon aria-hidden="true" />
        </Button>
      ))}
    </div>
  </div>
);
