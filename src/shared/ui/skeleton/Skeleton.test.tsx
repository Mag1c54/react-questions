import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardSkeleton } from "./CardSkeleton";
import { Skeleton } from "./Skeleton";
import { SkeletonFormRow } from "./SkeletonFormRow";
import { SkeletonText } from "./SkeletonText";

describe("Skeleton", () => {
  it("рисует декоративный блок с размерами и модификатором радиуса", () => {
    const { container } = render(
      <Skeleton width={120} height={40} radius="lg" className="extra" />,
    );

    const skeleton = container.firstElementChild as HTMLElement;

    expect(skeleton).toHaveClass("ui-skeleton", "ui-skeleton--r-lg", "extra");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveStyle({ width: "120px", height: "40px" });
  });

  it("поддерживает круглую форму", () => {
    const { container } = render(<Skeleton width={32} height={32} circle />);

    expect(container.firstElementChild).toHaveClass("ui-skeleton--circle");
  });
});

describe("SkeletonText", () => {
  it("рисует заданное количество строк", () => {
    const { container } = render(<SkeletonText lines={4} />);

    expect(container.querySelectorAll(".ui-skeleton")).toHaveLength(4);
    expect(container.firstElementChild).toHaveClass("ui-skeleton-text");
  });
});

describe("SkeletonFormRow", () => {
  it("рисует подписи и содержимое строки", () => {
    const { container } = render(
      <SkeletonFormRow>
        <Skeleton height={44} />
      </SkeletonFormRow>,
    );

    expect(container.querySelector(".ui-skeleton-form-row__label")).toBeInTheDocument();
    expect(container.querySelector(".ui-skeleton-form-row__control")).toBeInTheDocument();
    expect(container.querySelectorAll(".ui-skeleton")).toHaveLength(3);
  });
});

describe("CardSkeleton", () => {
  it("оборачивает содержимое в карточку и добавляет тень", () => {
    const { container } = render(
      <CardSkeleton className="extra">
        <Skeleton height={80} />
      </CardSkeleton>,
    );

    const card = container.firstElementChild as HTMLElement;

    expect(card).toHaveClass(
      "ui-card",
      "ui-card--p-lg",
      "ui-card--r-lg",
      "ui-card--shadow",
      "extra",
    );
    expect(card.querySelector(".ui-skeleton")).toBeInTheDocument();
  });
});
