import { createRef } from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "@/test/utils";
import { ButtonLink } from "./ButtonLink";

describe("ButtonLink", () => {
  it("рендерит ссылку с нужным адресом", () => {
    renderWithRouter(<ButtonLink to="/admin/specializations/create">Добавить</ButtonLink>);

    expect(screen.getByRole("link", { name: "Добавить" })).toHaveAttribute(
      "href",
      "/admin/specializations/create",
    );
  });

  it("выглядит как кнопка: получает классы кнопки", () => {
    renderWithRouter(
      <ButtonLink to="/" variant="outline" size="lg" className="extra">
        Домой
      </ButtonLink>,
    );

    expect(screen.getByRole("link", { name: "Домой" })).toHaveClass(
      "ui-btn",
      "ui-btn--outline",
      "ui-btn--lg",
      "extra",
    );
  });

  it("выводит иконки до и после текста", () => {
    renderWithRouter(
      <ButtonLink
        to="/"
        leftIcon={<span data-testid="left" />}
        rightIcon={<span data-testid="right" />}
      >
        Далее
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Далее" });
    expect(link.firstElementChild).toBe(screen.getByTestId("left"));
    expect(link.lastElementChild).toBe(screen.getByTestId("right"));
  });

  it("пробрасывает ref на элемент ссылки", () => {
    const ref = createRef<HTMLAnchorElement>();
    renderWithRouter(
      <ButtonLink to="/" ref={ref}>
        Ref
      </ButtonLink>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
