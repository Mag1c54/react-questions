import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberStepper } from "./NumberStepper";

describe("NumberStepper", () => {
  it("показывает текущее значение", () => {
    render(<NumberStepper value={10} onChange={vi.fn()} />);

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("«+» увеличивает на единицу, «−» уменьшает", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberStepper value={10} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Увеличить" }));
    expect(onChange).toHaveBeenLastCalledWith(11);

    await user.click(screen.getByRole("button", { name: "Уменьшить" }));
    expect(onChange).toHaveBeenLastCalledWith(9);
  });

  it("на нижней границе кнопка «−» отключена (по умолчанию min=1)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberStepper value={1} onChange={onChange} />);

    const minus = screen.getByRole("button", { name: "Уменьшить" });
    expect(minus).toBeDisabled();
    expect(screen.getByRole("button", { name: "Увеличить" })).toBeEnabled();

    await user.click(minus);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("на верхней границе кнопка «+» отключена (по умолчанию max=100)", () => {
    render(<NumberStepper value={100} onChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Увеличить" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Уменьшить" })).toBeEnabled();
  });

  it("учитывает свои min и max", () => {
    const { rerender } = render(<NumberStepper value={8} min={8} max={12} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Уменьшить" })).toBeDisabled();

    rerender(<NumberStepper value={12} min={8} max={12} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Увеличить" })).toBeDisabled();
  });
});
