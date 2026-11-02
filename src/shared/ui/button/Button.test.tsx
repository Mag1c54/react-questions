import { createRef, type FormEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("выводит текст и по умолчанию имеет type=button", () => {
    render(<Button>Сохранить</Button>);

    expect(screen.getByRole("button", { name: "Сохранить" })).toHaveAttribute("type", "button");
  });

  it("принимает type=submit", () => {
    render(<Button type="submit">Отправить</Button>);

    expect(screen.getByRole("button", { name: "Отправить" })).toHaveAttribute("type", "submit");
  });

  it("не отправляет форму по умолчанию, но отправляет с type=submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: FormEvent) => e.preventDefault());

    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Button>Нажать</Button>
      </form>,
    );
    await user.click(screen.getByRole("button", { name: "Нажать" }));
    expect(onSubmit).not.toHaveBeenCalled();

    rerender(
      <form onSubmit={onSubmit}>
        <Button type="submit">Нажать</Button>
      </form>,
    );
    await user.click(screen.getByRole("button", { name: "Нажать" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("вызывает onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Клик</Button>);

    await user.click(screen.getByRole("button", { name: "Клик" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("не вызывает onClick, когда кнопка отключена", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Клик
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Клик" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("в состоянии загрузки блокируется, ставит aria-busy и показывает loadingText", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button isLoading loadingText="Сохраняем..." onClick={onClick}>
        Сохранить
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Сохраняем..." });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Сохранить")).not.toBeInTheDocument();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("без loadingText в состоянии загрузки оставляет прежний текст", () => {
    render(<Button isLoading>Сохранить</Button>);

    expect(screen.getByRole("button", { name: "Сохранить" })).toBeDisabled();
  });

  it("выводит иконки до и после текста", () => {
    render(
      <Button leftIcon={<span data-testid="left" />} rightIcon={<span data-testid="right" />}>
        Далее
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Далее" });
    expect(button.firstElementChild).toBe(screen.getByTestId("left"));
    expect(button.lastElementChild).toBe(screen.getByTestId("right"));
  });

  it("применяет вариант, размер и модификаторы", () => {
    render(
      <Button variant="outline" size="sm" fullWidth iconOnly round className="extra">
        Ок
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Ок" })).toHaveClass(
      "ui-btn",
      "ui-btn--outline",
      "ui-btn--sm",
      "ui-btn--full",
      "ui-btn--icon",
      "ui-btn--round",
      "extra",
    );
  });

  it("пробрасывает ref на элемент кнопки", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
