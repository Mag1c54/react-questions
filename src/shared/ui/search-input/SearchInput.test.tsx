import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "./SearchInput";

const type = (value: string) =>
  fireEvent.change(screen.getByRole("searchbox"), { target: { value } });

const wait = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

describe("SearchInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("показывает переданное значение", () => {
    render(<SearchInput value="react" onChange={vi.fn()} />);

    expect(screen.getByRole("searchbox")).toHaveValue("react");
  });

  it("обновляет поле сразу, а onChange вызывает только после паузы", () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} delay={300} />);

    type("vue");
    expect(screen.getByRole("searchbox")).toHaveValue("vue");

    wait(299);
    expect(onChange).not.toHaveBeenCalled();

    wait(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("vue");
  });

  it("при быстром вводе отправляет только последнее значение", () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} delay={400} />);

    type("r");
    wait(200);
    type("re");
    wait(200);
    type("rea");
    wait(400);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("rea");
  });

  it("подхватывает внешнее изменение значения, например сброс фильтров", () => {
    const { rerender } = render(<SearchInput value="react" onChange={vi.fn()} />);

    rerender(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("не съедает пробел в конце, когда родитель возвращает обрезанное значение", () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchInput value="" onChange={onChange} />);

    type("ab ");
    wait(400);
    expect(onChange).toHaveBeenCalledWith("ab ");

    rerender(<SearchInput value="ab" onChange={onChange} />);

    expect(screen.getByRole("searchbox")).toHaveValue("ab ");
  });

  it("отменяет отложенный вызов при размонтировании", () => {
    const onChange = vi.fn();
    const { unmount } = render(<SearchInput value="" onChange={onChange} />);

    type("react");
    unmount();
    wait(1000);

    expect(onChange).not.toHaveBeenCalled();
  });
});
