import { forwardRef, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { buttonClassName, type ButtonStyleProps } from "./buttonClassName";

export interface ButtonLinkProps extends LinkProps, ButtonStyleProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      variant,
      size,
      fullWidth,
      iconOnly,
      round,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Link
      ref={ref}
      className={buttonClassName({ variant, size, fullWidth, iconOnly, round, className })}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  ),
);

ButtonLink.displayName = "ButtonLink";
