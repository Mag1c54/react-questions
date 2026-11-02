import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("принимает ввод", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Описание" />);

    await user.type(screen.getByPlaceholderText("Описание"), "Привет");

    expect(screen.getByPlaceholderText("Описание")).toHaveValue("Привет");
  });

  it("выводит счётчик из слота counter", () => {
    render(<Textarea placeholder="Описание" counter="5/100" />);

    expect(screen.getByText("5/100")).toBeInTheDocument();
  });

  it("без counter счётчика нет", () => {
    const { container } = render(<Textarea placeholder="Описание" />);

    expect(container.querySelector(".ui-textarea__counter")).not.toBeInTheDocument();
  });

  it("hasError ставит aria-invalid и класс ошибки", () => {
    render(<Textarea hasError placeholder="Описание" />);

    const textarea = screen.getByPlaceholderText("Описание");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass("ui-textarea__control--error");
  });

  it("пробрасывает maxLength и ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} maxLength={50} placeholder="Описание" />);

    expect(screen.getByPlaceholderText("Описание")).toHaveAttribute("maxlength", "50");
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
