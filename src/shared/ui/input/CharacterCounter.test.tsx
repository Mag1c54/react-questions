import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharacterCounter } from "./CharacterCounter";

describe("CharacterCounter", () => {
  it("выводит текущую длину и максимум через дробь", () => {
    const { container } = render(<CharacterCounter length={12} max={100} />);

    expect(container).toHaveTextContent("12/100");
  });

  it("работает с нулём", () => {
    const { container } = render(<CharacterCounter length={0} max={1000} />);

    expect(container).toHaveTextContent("0/1000");
  });
});
