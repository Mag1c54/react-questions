import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("по умолчанию это div с отступом md и скруглением lg", () => {
    const { container } = render(<Card>Текст</Card>);
    const card = container.firstElementChild as HTMLElement;

    expect(card.tagName).toBe("DIV");
    expect(card).toHaveClass("ui-card", "ui-card--p-md", "ui-card--r-lg");
    expect(card).toHaveTextContent("Текст");
  });

  it("меняет тег через as", () => {
    const { container } = render(<Card as="section">Текст</Card>);

    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });

  it("применяет padding и radius", () => {
    const { container } = render(
      <Card padding="none" radius="md">
        Текст
      </Card>,
    );

    expect(container.firstElementChild).toHaveClass("ui-card--p-none", "ui-card--r-md");
  });

  it("добавляет тень только с shadow", () => {
    const { container, rerender } = render(<Card>Текст</Card>);
    expect(container.firstElementChild).not.toHaveClass("ui-card--shadow");

    rerender(<Card shadow>Текст</Card>);
    expect(container.firstElementChild).toHaveClass("ui-card--shadow");
  });

  it("дописывает внешний класс и пробрасывает остальные атрибуты", () => {
    const { container } = render(
      <Card className="extra" data-testid="card" aria-label="Карточка">
        Текст
      </Card>,
    );
    const card = container.firstElementChild as HTMLElement;

    expect(card).toHaveClass("extra");
    expect(card).toHaveAttribute("data-testid", "card");
    expect(card).toHaveAttribute("aria-label", "Карточка");
  });
});
