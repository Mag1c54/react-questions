import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import "./form.scss";

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  error?: string;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, ...props }, ref) => (
    <div className="checkbox-field">
      <label className="checkbox-field__label">
        <input ref={ref} type="checkbox" className="checkbox-field__input" {...props} />
        <span>{label}</span>
      </label>
      {error && (
        <span className="checkbox-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  ),
);

CheckboxField.displayName = "CheckboxField";