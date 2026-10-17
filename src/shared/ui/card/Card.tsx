import type { HTMLAttributes } from "react";
import "./card.scss";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article";
  padding?: "none" | "md" | "lg";
  radius?: "md" | "lg";
  shadow?: boolean;
}

export const Card = ({
  as: Tag = "div",
  padding = "md",
  radius = "lg",
  shadow = false,
  className = "",
  ...props
}: CardProps) => (
  <Tag
    className={[
      "ui-card",
      `ui-card--p-${padding}`,
      `ui-card--r-${radius}`,
      shadow && "ui-card--shadow",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
);
