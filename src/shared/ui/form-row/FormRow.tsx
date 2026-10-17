import type { ReactNode } from "react";
import "./form-row.scss";

interface FormRowProps {
  title: string;
  hint?: string;
  htmlFor?: string;
  error?: string;
  stacked?: boolean;
  children: ReactNode;
}

export const FormRow = ({
  title,
  hint,
  htmlFor,
  error,
  stacked = false,
  children,
}: FormRowProps) => (
  <div className={`ui-form-row ${stacked ? "ui-form-row--stacked" : ""}`}>
    <div className="ui-form-row__label">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="ui-form-row__title">
          {title}
        </label>
      ) : (
        <span className="ui-form-row__title">{title}</span>
      )}
      {hint && <span className="ui-form-row__hint">{hint}</span>}
    </div>

    <div className="ui-form-row__control">
      {children}
      {error && (
        <span
          id={htmlFor ? `${htmlFor}-error` : undefined}
          className="ui-form-row__error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  </div>
);
