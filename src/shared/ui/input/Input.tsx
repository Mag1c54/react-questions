import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import "./input.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "outline" | "filled";
  hasError?: boolean;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      hasError,
      leftIcon,
      rightSlot,
      wrapperClassName = "",
      className = "",
      ...props
    },
    ref,
  ) => (
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
          `ui-input__control--${variant}`,
          leftIcon && "ui-input__control--with-icon",
          rightSlot && "ui-input__control--with-right",
          hasError && "ui-input__control--error",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={hasError || undefined}
        {...props}
      />

      {rightSlot && <span className="ui-input__right">{rightSlot}</span>}
    </span>
  ),
);

Input.displayName = "Input";
