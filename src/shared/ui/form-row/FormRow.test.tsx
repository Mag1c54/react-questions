import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormRow } from "./FormRow";

describe("FormRow", () => {
  it("выводит заголовок, подсказку и содержимое", () => {
    render(
      <FormRow title="Название" hint="Добавьте название">
        <input aria-label="поле" />
      </FormRow>,
    );

    expect(screen.getByText("Название")).toBeInTheDocument();
    expect(screen.getByText("Добавьте название")).toBeInTheDocument();
    expect(screen.getByLabelText("поле")).toBeInTheDocument();
  });

  it("с htmlFor заголовок становится подписью поля", () => {
    render(
      <FormRow title="Название" htmlFor="title">
        <input id="title" />
      </FormRow>,
    );

    expect(screen.getByLabelText("Название")).toHaveAttribute("id", "title");
  });

  it("без htmlFor заголовок это обычный текст, а не label", () => {
    const { container } = render(
      <FormRow title="Фото">
        <div />
      </FormRow>,
    );

    expect(container.querySelector("label")).not.toBeInTheDocument();
    expect(screen.getByText("Фото")).toBeInTheDocument();
  });

  it("ошибка выводится с role=alert и id для aria-describedby", () => {
    render(
      <FormRow title="Название" htmlFor="title" error="Введите название">
        <input id="title" />
      </FormRow>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Введите название");
    expect(alert).toHaveAttribute("id", "title-error");
  });

  it("без htmlFor у ошибки нет id", () => {
    render(
      <FormRow title="Фото" error="Добавьте фото">
        <div />
      </FormRow>,
    );

    expect(screen.getByRole("alert")).not.toHaveAttribute("id");
  });

  it("без ошибки блока ошибки нет", () => {
    render(
      <FormRow title="Название">
        <div />
      </FormRow>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("stacked добавляет модификатор раскладки", () => {
    const { container } = render(
      <FormRow title="Описание" stacked>
        <div />
      </FormRow>,
    );

    expect(container.firstElementChild).toHaveClass("ui-form-row", "ui-form-row--stacked");
  });
});
