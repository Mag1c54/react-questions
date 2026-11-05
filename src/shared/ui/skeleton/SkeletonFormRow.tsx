import type { CSSProperties, ReactNode } from "react";
import { Skeleton } from "./Skeleton";

interface SkeletonFormRowProps {
  children: ReactNode;
  labelWidth?: CSSProperties["width"];
  hintWidth?: CSSProperties["width"];
  stacked?: boolean;
  className?: string;
}

export const SkeletonFormRow = ({
  children,
  labelWidth = 140,
  hintWidth = 180,
  stacked = false,
  className = "",
}: SkeletonFormRowProps) => (
  <div
    className={["ui-skeleton-form-row", stacked && "ui-skeleton-form-row--stacked", className]
      .filter(Boolean)
      .join(" ")}
  >
    <div className="ui-skeleton-form-row__label">
      <Skeleton width={labelWidth} height={15} />
      <Skeleton width={hintWidth} height={12} />
    </div>

    <div className="ui-skeleton-form-row__control">{children}</div>
  </div>
);
