import type { HTMLAttributes, ReactNode } from "react";
import { Card } from "../card/Card";
import { Skeleton } from "./Skeleton";

interface CardSkeletonProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article";
  padding?: "none" | "md" | "lg";
  radius?: "md" | "lg";
  shadow?: boolean;
  children?: ReactNode;
}

export const CardSkeleton = ({
  children,
  padding = "lg",
  radius = "lg",
  shadow = true,
  ...props
}: CardSkeletonProps) => (
  <Card padding={padding} radius={radius} shadow={shadow} {...props}>
    {children ?? <Skeleton height={120} radius="md" />}
  </Card>
);
