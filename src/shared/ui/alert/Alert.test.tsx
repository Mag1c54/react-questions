import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("ошибка объявляется скринридером сразу (role=alert)", () => {
    render(<Alert>Нужны права администратора</Alert>);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Нужны права администратора");
    expect(alert).toHaveClass("ui-alert--error");
  });

  it("информационное сообщение имеет role=status", () => {
    render(<Alert tone="info">Изменения сохранятся позже</Alert>);

    expect(screen.getByRole("status")).toHaveClass("ui-alert--info");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("показывает заголовок", () => {
    render(<Alert title="Не удалось удалить:">Подробности</Alert>);

    expect(screen.getByText("Не удалось удалить:")).toBeInTheDocument();
  });

  it("кнопка закрытия есть только при onClose и вызывает его", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<Alert>Текст</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(<Alert onClose={onClose}>Текст</Alert>);
    await user.click(screen.getByRole("button", { name: "Закрыть уведомление" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("добавляет внешний класс", () => {
    render(<Alert className="extra">Текст</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("extra");
  });
});
