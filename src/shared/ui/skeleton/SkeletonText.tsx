import type { CSSProperties, HTMLAttributes } from "react";
import { Skeleton } from "./Skeleton";

export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lineHeight?: CSSProperties["height"];
  gap?: CSSProperties["gap"];
  lastLineWidth?: CSSProperties["width"];
}

export const SkeletonText = ({
  lines = 3,
  lineHeight = 12,
  gap = 8,
  lastLineWidth = "60%",
  className = "",
  style,
  ...props
}: SkeletonTextProps) => (
  <div
    aria-hidden="true"
    className={["ui-skeleton-text", className].filter(Boolean).join(" ")}
    style={{ gap, ...style }}
    {...props}
  >
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton
        key={index}
        width={index === lines - 1 ? lastLineWidth : "100%"}
        height={lineHeight}
      />
    ))}
  </div>
);
