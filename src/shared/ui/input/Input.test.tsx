import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("по умолчанию это поле вида outline", () => {
    render(<Input placeholder="Название" />);

    const input = screen.getByPlaceholderText("Название");
    expect(input).toHaveClass("ui-input__control", "ui-input__control--outline");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("поддерживает вариант filled", () => {
    render(<Input variant="filled" placeholder="Название" />);

    expect(screen.getByPlaceholderText("Название")).toHaveClass("ui-input__control--filled");
  });

  it("hasError ставит aria-invalid и класс ошибки", () => {
    render(<Input hasError placeholder="Название" />);

    const input = screen.getByPlaceholderText("Название");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("ui-input__control--error");
  });

  it("выводит иконку слева и добавляет отступ под неё", () => {
    render(<Input placeholder="Поиск" leftIcon={<svg data-testid="icon" />} />);

    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByPlaceholderText("Поиск")).toHaveClass("ui-input__control--with-icon");
  });

  it("выводит слот справа и добавляет отступ под него", () => {
    render(<Input placeholder="Пароль" rightSlot={<button type="button">Показать</button>} />);

    expect(screen.getByRole("button", { name: "Показать" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Пароль")).toHaveClass("ui-input__control--with-right");
  });

  it("класс обёртки задаётся через wrapperClassName", () => {
    const { container } = render(<Input wrapperClassName="narrow" />);

    expect(container.firstElementChild).toHaveClass("ui-input", "narrow");
  });

  it("принимает ввод и вызывает onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input placeholder="Название" onChange={onChange} />);

    await user.type(screen.getByPlaceholderText("Название"), "abc");

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(screen.getByPlaceholderText("Название")).toHaveValue("abc");
  });

  it("поддерживает disabled и ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} disabled placeholder="Название" />);

    expect(screen.getByPlaceholderText("Название")).toBeDisabled();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
