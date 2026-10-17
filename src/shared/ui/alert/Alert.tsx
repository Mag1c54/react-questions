import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import "./alert.scss";

interface AlertProps {
  tone?: "error" | "info";
  title?: string;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

export const Alert = ({ tone = "error", title, onClose, className = "", children }: AlertProps) => (
  <div
    role={tone === "error" ? "alert" : "status"}
    className={`ui-alert ui-alert--${tone} ${className}`}
  >
    <div className="ui-alert__body">
      {title && <p className="ui-alert__title">{title}</p>}
      {children}
    </div>

    {onClose && (
      <button
        type="button"
        className="ui-alert__close"
        aria-label="Закрыть уведомление"
        onClick={onClose}
      >
        <FiX aria-hidden="true" />
      </button>
    )}
  </div>
);
