import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("связывает подпись с полем без ручного id", () => {
    render(<TextField label="Электронная почта" />);

    expect(screen.getByLabelText("Электронная почта")).toBeInstanceOf(HTMLInputElement);
  });

  it("по умолчанию вид filled", () => {
    render(<TextField label="Почта" />);

    expect(screen.getByLabelText("Почта")).toHaveClass("ui-input__control--filled");
  });

  it("позволяет выбрать вид outline", () => {
    render(<TextField label="Почта" variant="outline" />);

    expect(screen.getByLabelText("Почта")).toHaveClass("ui-input__control--outline");
  });

  it("при ошибке показывает её и связывает с полем", () => {
    render(<TextField label="Почта" error="Введите корректную почту" />);

    const input = screen.getByLabelText("Почта");
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("Введите корректную почту");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", alert.id);
  });

  it("без ошибки нет aria-invalid и aria-describedby", () => {
    render(<TextField label="Почта" />);

    const input = screen.getByLabelText("Почта");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("показывает подсказку, пока нет ошибки", () => {
    const { rerender } = render(<TextField label="Почта" hint="Рабочая почта" />);
    expect(screen.getByText("Рабочая почта")).toBeInTheDocument();

    rerender(<TextField label="Почта" hint="Рабочая почта" error="Ошибка" />);
    expect(screen.queryByText("Рабочая почта")).not.toBeInTheDocument();
  });

  it("принимает ввод и вызывает onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextField label="Почта" onChange={onChange} />);

    await user.type(screen.getByLabelText("Почта"), "a@b.ru");

    expect(screen.getByLabelText("Почта")).toHaveValue("a@b.ru");
    expect(onChange).toHaveBeenCalled();
  });

  it("пробрасывает ref (нужно для register из react-hook-form)", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField label="Почта" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText("Почта"));
  });
});
