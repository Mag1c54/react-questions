import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("связывает подпись с полем через htmlFor", () => {
    render(
      <Field label="Почта" htmlFor="email">
        <input id="email" />
      </Field>,
    );

    expect(screen.getByLabelText("Почта")).toBeInTheDocument();
  });

  it("показывает подсказку, когда ошибки нет", () => {
    render(
      <Field label="Почта" htmlFor="email" hint="Пример: name@mail.ru">
        <input id="email" />
      </Field>,
    );

    expect(screen.getByText("Пример: name@mail.ru")).toBeInTheDocument();
  });

  it("при ошибке показывает её с role=alert и прячет подсказку", () => {
    render(
      <Field label="Почта" htmlFor="email" hint="Пример: name@mail.ru" error="Введите почту">
        <input id="email" />
      </Field>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Введите почту");
    expect(alert).toHaveAttribute("id", "email-error");
    expect(screen.queryByText("Пример: name@mail.ru")).not.toBeInTheDocument();
  });

  it("добавляет внешний класс", () => {
    const { container } = render(
      <Field label="Почта" htmlFor="email" className="extra">
        <input id="email" />
      </Field>,
    );

    expect(container.firstElementChild).toHaveClass("ui-field", "extra");
  });
});
