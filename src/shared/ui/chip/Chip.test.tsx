import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("по умолчанию это чекбокс с подписью", () => {
    render(
      <Chip checked={false} onChange={vi.fn()}>
        React
      </Chip>,
    );

    expect(screen.getByRole("checkbox", { name: "React" })).not.toBeChecked();
  });

  it("отражает состояние checked классом и атрибутом", () => {
    const { container } = render(
      <Chip checked onChange={vi.fn()}>
        React
      </Chip>,
    );

    expect(screen.getByRole("checkbox", { name: "React" })).toBeChecked();
    expect(container.firstElementChild).toHaveClass("chip", "chip--checked");
  });

  it("клик по подписи вызывает onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Chip checked={false} onChange={onChange}>
        React
      </Chip>,
    );

    await user.click(screen.getByText("React"));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("type=radio создаёт переключатель с общим именем группы", () => {
    render(
      <Chip type="radio" name="specialization" checked onChange={vi.fn()}>
        Frontend
      </Chip>,
    );

    const radio = screen.getByRole("radio", { name: "Frontend" });
    expect(radio).toBeChecked();
    expect(radio).toHaveAttribute("name", "specialization");
  });

  it("отключённый чип не реагирует на клики", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Chip checked={false} disabled onChange={onChange}>
        React
      </Chip>,
    );

    await user.click(screen.getByText("React"));

    expect(screen.getByRole("checkbox", { name: "React" })).toBeDisabled();
    expect(container.firstElementChild).toHaveClass("chip--disabled");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("строка в icon рисуется картинкой, которая скрывается при ошибке", () => {
    const { container } = render(
      <Chip checked={false} onChange={vi.fn()} icon="/icons/react.svg">
        React
      </Chip>,
    );
    const img = container.querySelector("img.chip__icon") as HTMLImageElement;

    expect(img).toHaveAttribute("src", "/icons/react.svg");

    fireEvent.error(img);
    expect(img.style.display).toBe("none");
  });

  it("React-элемент в icon выводится как есть", () => {
    render(
      <Chip checked={false} onChange={vi.fn()} icon={<svg data-testid="icon" />}>
        React
      </Chip>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("добавляет внешний класс", () => {
    const { container } = render(
      <Chip checked={false} onChange={vi.fn()} className="extra">
        React
      </Chip>,
    );

    expect(container.firstElementChild).toHaveClass("extra");
  });
});
