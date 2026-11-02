import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SafeImage } from "./SafeImage";

describe("SafeImage", () => {
  it("рисует картинку по адресу", () => {
    const { container } = render(<SafeImage src="/a.png" className="pic" alt="Логотип" />);
    const img = container.querySelector("img") as HTMLImageElement;

    expect(img).toHaveAttribute("src", "/a.png");
    expect(img).toHaveAttribute("alt", "Логотип");
    expect(img).toHaveClass("pic");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("по умолчанию картинка декоративная (alt пустой)", () => {
    const { container } = render(<SafeImage src="/a.png" className="pic" />);

    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("без адреса показывает заглушку с модификатором --empty", () => {
    const { container } = render(<SafeImage src={null} className="pic" />);
    const placeholder = container.firstElementChild as HTMLElement;

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(placeholder).toHaveClass("pic", "pic--empty");
    expect(placeholder).toHaveAttribute("aria-hidden", "true");
  });

  it("пустая строка тоже считается отсутствием картинки", () => {
    const { container } = render(<SafeImage src="" className="pic" />);

    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("если картинка не загрузилась, заменяет её заглушкой", () => {
    const { container } = render(<SafeImage src="/broken.png" className="pic" />);

    fireEvent.error(container.querySelector("img") as HTMLImageElement);

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("pic--empty");
  });

  it("новый адрес после ошибки снова пробует загрузить картинку", () => {
    const { container, rerender } = render(<SafeImage src="/broken.png" className="pic" />);
    fireEvent.error(container.querySelector("img") as HTMLImageElement);

    rerender(<SafeImage src="/fixed.png" className="pic" />);

    expect(container.querySelector("img")).toHaveAttribute("src", "/fixed.png");
  });
});
