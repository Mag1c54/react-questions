import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("выводит содержимое", () => {
    render(<Tag>React</Tag>);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("не выводит иконку и кнопку удаления без iconSrc и onRemove", () => {
    const { container } = render(<Tag>React</Tag>);

    expect(container.querySelector(".ui-tag__icon")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("выводит иконку по iconSrc", () => {
    const { container } = render(<Tag iconSrc="/react.svg">React</Tag>);

    expect(container.querySelector("img.ui-tag__icon")).toHaveAttribute("src", "/react.svg");
  });

  it("если иконка не загрузилась, показывает пустую заглушку", () => {
    const { container } = render(<Tag iconSrc="/broken.svg">React</Tag>);

    fireEvent.error(container.querySelector("img.ui-tag__icon") as HTMLImageElement);

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector(".ui-tag__icon--empty")).toBeInTheDocument();
  });

  it("кнопка удаления вызывает onRemove и имеет подпись по умолчанию", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>React</Tag>);

    await user.click(screen.getByRole("button", { name: "Убрать" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("принимает свою подпись кнопки удаления", () => {
    render(
      <Tag onRemove={vi.fn()} removeLabel="Убрать навык React">
        React
      </Tag>,
    );

    expect(screen.getByRole("button", { name: "Убрать навык React" })).toBeInTheDocument();
  });
});
