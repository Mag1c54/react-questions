import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PasswordField } from "./PasswordField";

describe("PasswordField", () => {
  it("по умолчанию скрывает ввод", () => {
    render(<PasswordField label="Пароль" />);

    expect(screen.getByLabelText("Пароль")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Показать пароль" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("кнопка показывает и снова скрывает пароль", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Пароль" />);

    await user.click(screen.getByRole("button", { name: "Показать пароль" }));
    expect(screen.getByLabelText("Пароль")).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Скрыть пароль" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Скрыть пароль" }));
    expect(screen.getByLabelText("Пароль")).toHaveAttribute("type", "password");
  });

  it("кнопка не отправляет форму", () => {
    render(<PasswordField label="Пароль" />);

    expect(screen.getByRole("button", { name: "Показать пароль" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("не теряет введённое значение при переключении видимости", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Пароль" />);

    await user.type(screen.getByLabelText("Пароль"), "Qwerty1!");
    await user.click(screen.getByRole("button", { name: "Показать пароль" }));

    expect(screen.getByLabelText("Пароль")).toHaveValue("Qwerty1!");
  });

  it("показывает ошибку", () => {
    render(<PasswordField label="Пароль" error="Минимум 8 символов" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Минимум 8 символов");
    expect(screen.getByLabelText("Пароль")).toHaveAttribute("aria-invalid", "true");
  });

  it("пробрасывает ref на поле", () => {
    const ref = createRef<HTMLInputElement>();
    render(<PasswordField label="Пароль" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText("Пароль"));
  });
});
