import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const renderSelect = (props: Partial<React.ComponentProps<typeof Select>> = {}) =>
  render(
    <Select aria-label="Специализация" defaultValue="" {...props}>
      <option value="">Выберите</option>
      <option value="1">Frontend</option>
      <option value="2">Backend</option>
    </Select>,
  );

describe("Select", () => {
  it("выводит список вариантов", () => {
    renderSelect();

    expect(screen.getByRole("combobox", { name: "Специализация" })).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("вызывает onChange и меняет значение", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderSelect({ onChange });

    await user.selectOptions(screen.getByRole("combobox"), "2");

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("combobox")).toHaveValue("2");
  });

  it("по умолчанию outline, вариант filled меняется пропсом", () => {
    const { rerender } = renderSelect();
    expect(screen.getByRole("combobox")).toHaveClass("ui-select__control--outline");

    rerender(
      <Select aria-label="Специализация" variant="filled">
        <option value="1">Frontend</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveClass("ui-select__control--filled");
  });

  it("hasError ставит aria-invalid и класс ошибки", () => {
    renderSelect({ hasError: true });

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveClass("ui-select__control--error");
  });

  it("без ошибки не ставит aria-invalid", () => {
    renderSelect();

    expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-invalid");
  });

  it("поддерживает disabled, wrapperClassName и ref", () => {
    const ref = createRef<HTMLSelectElement>();
    const { container } = renderSelect({ disabled: true, wrapperClassName: "wide", ref });

    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(container.firstElementChild).toHaveClass("ui-select", "wide");
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
