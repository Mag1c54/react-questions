import type { ReactNode } from "react";
import "./field.scss";

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export const Field = ({ label, htmlFor, hint, error, className = "", children }: FieldProps) => (
  <div className={`ui-field ${className}`}>
    <label htmlFor={htmlFor} className="ui-field__label">
      {label}
    </label>

    {children}

    {hint && !error && <span className="ui-field__hint">{hint}</span>}
    {error && (
      <span id={`${htmlFor}-error`} className="ui-field__error" role="alert">
        {error}
      </span>
    )}
  </div>
);
