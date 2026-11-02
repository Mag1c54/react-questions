import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CheckboxField } from "./CheckboxField";

describe("CheckboxField", () => {
  it("связывает подпись с чекбоксом", () => {
    render(<CheckboxField label="Согласен с условиями" />);

    expect(screen.getByRole("checkbox", { name: "Согласен с условиями" })).not.toBeChecked();
  });

  it("клик по подписи переключает чекбокс", async () => {
    const user = userEvent.setup();
    render(<CheckboxField label="Согласен с условиями" />);

    await user.click(screen.getByText("Согласен с условиями"));

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("принимает в подписи разметку", () => {
    render(
      <CheckboxField
        label={
          <>
            Даю согласие на <a href="/privacy">обработку ПД</a>
          </>
        }
      />,
    );

    expect(screen.getByRole("link", { name: "обработку ПД" })).toHaveAttribute("href", "/privacy");
  });

  it("показывает ошибку с role=alert", () => {
    render(<CheckboxField label="Согласие" error="Нужно согласие" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Нужно согласие");
  });

  it("не выводит ошибку без error", () => {
    render(<CheckboxField label="Согласие" />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("пробрасывает обычные атрибуты и ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<CheckboxField label="Согласие" ref={ref} defaultChecked disabled name="consent" />);

    const checkbox = screen.getByRole("checkbox", { name: "Согласие" });
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("name", "consent");
    expect(ref.current).toBe(checkbox);
  });
});
