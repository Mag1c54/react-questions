import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ErrorFallback } from "./ErrorFallback";

const ERROR = new Error("Не удалось загрузить данные");

const renderFallback = (props: Partial<ComponentProps<typeof ErrorFallback>> = {}) =>
  render(<ErrorFallback error={ERROR} resetErrorBoundary={vi.fn()} {...props} />);

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("ErrorFallback", () => {
  it("объявляет ошибку скринридеру и показывает заголовок с описанием", () => {
    const { container } = renderFallback();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Что-то пошло не так");
    expect(alert).toHaveTextContent("Произошла непредвиденная ошибка");
    expect(container.firstElementChild).toHaveClass("error-fallback");
    expect(container.firstElementChild).not.toHaveClass("error-fallback--fullscreen");
  });

  it("всегда предлагает вернуться на главную", () => {
    renderFallback();

    expect(screen.getByRole("link", { name: "На главную" })).toHaveAttribute("href", "/");
  });

  it("без fullScreen не предлагает перезагрузить страницу", () => {
    renderFallback();

    expect(
      screen.queryByRole("button", { name: "Перезагрузить страницу" }),
    ).not.toBeInTheDocument();
  });

  it("вызывает resetErrorBoundary по кнопке «Попробовать снова»", async () => {
    const user = userEvent.setup();
    const resetErrorBoundary = vi.fn();
    renderFallback({ resetErrorBoundary });

    await user.click(screen.getByRole("button", { name: "Попробовать снова" }));

    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it("в режиме разработки показывает текст ошибки", () => {
    renderFallback();

    expect(screen.getByText(ERROR.message)).toBeInTheDocument();
  });

  it("приводит выброшенное значение не-Error к строке", () => {
    renderFallback({ error: "сломано" });

    expect(screen.getByText("сломано")).toBeInTheDocument();
  });

  it("в production скрывает текст ошибки", () => {
    vi.stubEnv("DEV", false);
    renderFallback();

    expect(screen.queryByText(ERROR.message)).not.toBeInTheDocument();
  });

  it("в полноэкранном режиме добавляет модификатор и кнопку перезагрузки", () => {
    const { container } = renderFallback({ fullScreen: true });

    expect(container.firstElementChild).toHaveClass("error-fallback--fullscreen");
    expect(screen.getByRole("button", { name: "Перезагрузить страницу" })).toBeInTheDocument();
  });

  it("перезагружает страницу по кнопке в полноэкранном режиме", async () => {
    const user = userEvent.setup();
    const reload = vi.fn();
    vi.stubGlobal("location", { reload });
    renderFallback({ fullScreen: true });

    await user.click(screen.getByRole("button", { name: "Перезагрузить страницу" }));

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
