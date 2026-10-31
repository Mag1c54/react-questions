import "./button.scss";

export type ButtonVariant = "primary" | "outline" | "danger" | "danger-outline" | "link" | "none";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconOnly?: boolean;
  round?: boolean;
}

interface ClassNameOptions extends ButtonStyleProps {
  className?: string;
}

export const buttonClassName = ({
  variant = "primary",
  size = "md",
  fullWidth,
  iconOnly,
  round,
  className,
}: ClassNameOptions = {}): string =>
  [
    "ui-btn",
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth && "ui-btn--full",
    iconOnly && "ui-btn--icon",
    round && "ui-btn--round",
    className,
  ]
    .filter(Boolean)
    .join(" ");
