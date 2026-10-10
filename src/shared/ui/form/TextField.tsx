import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import "./form.scss";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  endAdornment?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, endAdornment, ...props }, ref) => {
    const id = useId();

    return (
      <div className="text-field">
        <label htmlFor={id} className="text-field__label">
          {label}
        </label>

        <div className="text-field__control">
          <input
            ref={ref}
            id={id}
            className={[
              "text-field__input",
              error ? "text-field__input--error" : "",
              endAdornment ? "text-field__input--with-adornment" : "",
            ].join(" ")}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />
          {endAdornment && <div className="text-field__adornment">{endAdornment}</div>}
        </div>

        {error && (
          <span id={`${id}-error`} className="text-field__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";