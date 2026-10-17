import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { buttonClassName, type ButtonStyleProps } from "./buttonClassName";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      fullWidth,
      iconOnly,
      round,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={buttonClassName({ variant, size, fullWidth, iconOnly, round, className })}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {leftIcon}
      {isLoading && loadingText ? loadingText : children}
      {rightIcon}
    </button>
  ),
);

Button.displayName = "Button";
