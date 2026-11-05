import type { CSSProperties, HTMLAttributes } from "react";
import "./skeleton.scss";

export type SkeletonRadius = "sm" | "md" | "lg" | "full";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: SkeletonRadius;
  circle?: boolean;
}

export const Skeleton = ({
  width,
  height = 12,
  radius = "sm",
  circle = false,
  className = "",
  style,
  ...props
}: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={[
      "ui-skeleton",
      `ui-skeleton--r-${radius}`,
      circle && "ui-skeleton--circle",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    style={{ width, height, ...style }}
    {...props}
  />
);
