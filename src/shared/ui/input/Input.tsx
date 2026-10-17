import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import "./input.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftIcon?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, leftIcon, wrapperClassName = "", className = "", ...props }, ref) => (
    <span className={`ui-input ${wrapperClassName}`}>
      {leftIcon && (
        <span className="ui-input__icon" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={[
          "ui-input__control",
          leftIcon && "ui-input__control--with-icon",
          hasError && "ui-input__control--error",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={hasError || undefined}
        {...props}
      />
    </span>
  ),
);

Input.displayName = "Input";
