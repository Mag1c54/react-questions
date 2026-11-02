import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageUploader } from "./ImageUploader";

const makeFile = (name: string, type: string, size = 10) =>
  new File([new Uint8Array(size)], name, { type });

const stubImage = (width: number, height: number) => {
  class FakeImage {
    naturalWidth = width;
    naturalHeight = height;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;

    set src(_value: string) {
      queueMicrotask(() => this.onload?.());
    }
  }

  vi.stubGlobal("Image", FakeImage);
};

const getFileInput = () => screen.getByLabelText(/Кликни для изменения/) as HTMLInputElement;

const upload = (file: File) => fireEvent.change(getFileInput(), { target: { files: [file] } });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ImageUploader", () => {
  describe("отображение", () => {
    it("показывает подсказки по умолчанию, включая про квадрат", () => {
      render(<ImageUploader value={null} onChange={vi.fn()} />);

      expect(
        screen.getByText("JPG, PNG, JPEG (максимальный размер файла 150КБ)"),
      ).toBeInTheDocument();
      expect(screen.getByText("Рекомендуемый размер — 800×800 px")).toBeInTheDocument();
      expect(screen.getByText("Принимаем только квадратные картинки")).toBeInTheDocument();
    });

    it("без требования квадрата подсказки про квадрат нет", () => {
      render(<ImageUploader value={null} onChange={vi.fn()} requireSquare={false} />);

      expect(screen.queryByText("Принимаем только квадратные картинки")).not.toBeInTheDocument();
    });

    it("свои подсказки заменяют стандартные", () => {
      render(<ImageUploader value={null} onChange={vi.fn()} hints={["Только фото лица"]} />);

      expect(screen.getByText("Только фото лица")).toBeInTheDocument();
      expect(screen.queryByText(/Рекомендуемый размер/)).not.toBeInTheDocument();
    });

    it("без картинки нет предпросмотра и кнопки удаления", () => {
      render(<ImageUploader value={null} onChange={vi.fn()} />);

      expect(screen.queryByAltText("Предпросмотр картинки")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Удалить картинку" })).not.toBeInTheDocument();
    });

    it("рисует свою иконку, когда картинки нет", () => {
      render(
        <ImageUploader
          value={null}
          onChange={vi.fn()}
          placeholderIcon={<span data-testid="placeholder" />}
        />,
      );

      expect(screen.getByTestId("placeholder")).toBeInTheDocument();
    });

    it("с картинкой показывает предпросмотр и кнопку удаления", () => {
      render(<ImageUploader value="data:image/png;base64,AAAA" onChange={vi.fn()} />);

      expect(screen.getByAltText("Предпросмотр картинки")).toHaveAttribute(
        "src",
        "data:image/png;base64,AAAA",
      );
      expect(screen.getByRole("button", { name: "Удалить картинку" })).toBeInTheDocument();
    });

    it("removable управляет кнопкой удаления независимо от значения", () => {
      const { rerender } = render(
        <ImageUploader value="/a.png" onChange={vi.fn()} removable={false} />,
      );
      expect(screen.queryByRole("button", { name: "Удалить картинку" })).not.toBeInTheDocument();

      rerender(<ImageUploader value={null} onChange={vi.fn()} removable />);
      expect(screen.getByRole("button", { name: "Удалить картинку" })).toBeInTheDocument();
    });

    it("показывает внешнюю ошибку", () => {
      render(<ImageUploader value={null} onChange={vi.fn()} error="Добавьте картинку" />);

      expect(screen.getByRole("alert")).toHaveTextContent("Добавьте картинку");
    });
  });

  describe("удаление", () => {
    it("кнопка удаления вызывает onChange(null)", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ImageUploader value="/a.png" onChange={onChange} />);

      await user.click(screen.getByRole("button", { name: "Удалить картинку" }));

      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe("проверка файла", () => {
    it("отклоняет неподходящий формат", async () => {
      const onChange = vi.fn();
      render(<ImageUploader value={null} onChange={onChange} />);

      upload(makeFile("anim.gif", "image/gif"));

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Допустимые форматы: JPG, PNG, JPEG",
      );
      expect(onChange).not.toHaveBeenCalled();
    });

    it("отклоняет слишком большой файл", async () => {
      const onChange = vi.fn();
      render(<ImageUploader value={null} onChange={onChange} />);

      upload(makeFile("big.png", "image/png", 150 * 1024 + 1));

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Максимальный размер файла 150 КБ",
      );
      expect(onChange).not.toHaveBeenCalled();
    });

    it("учитывает свой лимит размера", async () => {
      render(<ImageUploader value={null} onChange={vi.fn()} maxSizeKb={1} />);

      upload(makeFile("a.png", "image/png", 2 * 1024));

      expect(await screen.findByRole("alert")).toHaveTextContent("Максимальный размер файла 1 КБ");
    });

    it("отклоняет неквадратную картинку", async () => {
      stubImage(100, 80);
      const onChange = vi.fn();
      render(<ImageUploader value={null} onChange={onChange} />);

      upload(makeFile("wide.png", "image/png"));

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Принимаем только квадратные картинки",
      );
      expect(onChange).not.toHaveBeenCalled();
    });

    it("принимает квадратную картинку и отдаёт data URL", async () => {
      stubImage(100, 100);
      const onChange = vi.fn();
      render(<ImageUploader value={null} onChange={onChange} />);

      upload(makeFile("square.png", "image/png"));

      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
      expect(onChange.mock.calls[0][0]).toMatch(/^data:image\/png;base64,/);
    });

    it("без требования квадрата принимает картинку любой формы", async () => {
      const onChange = vi.fn();
      render(<ImageUploader value={null} onChange={onChange} requireSquare={false} />);

      upload(makeFile("photo.jpg", "image/jpeg"));

      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
      expect(onChange.mock.calls[0][0]).toMatch(/^data:image\/jpeg;base64,/);
    });

    it("ошибка файла важнее внешней ошибки", async () => {
      render(<ImageUploader value={null} onChange={vi.fn()} error="Добавьте картинку" />);

      upload(makeFile("anim.gif", "image/gif"));

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Допустимые форматы: JPG, PNG, JPEG",
      );
    });

    it("после удачной загрузки прежняя ошибка файла пропадает", async () => {
      const onChange = vi.fn();
      render(<ImageUploader value={null} onChange={onChange} requireSquare={false} />);

      upload(makeFile("anim.gif", "image/gif"));
      expect(await screen.findByRole("alert")).toBeInTheDocument();

      upload(makeFile("photo.png", "image/png"));

      await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
    });
  });

  describe("перетаскивание", () => {
    const getDropZone = (container: HTMLElement) =>
      container.querySelector(".image-uploader__drop") as HTMLElement;

    it("подсвечивает зону, пока файл над ней, и убирает подсветку при уходе", () => {
      const { container } = render(<ImageUploader value={null} onChange={vi.fn()} />);
      const zone = getDropZone(container);

      fireEvent.dragOver(zone);
      expect(zone).toHaveClass("image-uploader__drop--dragging");

      fireEvent.dragLeave(zone);
      expect(zone).not.toHaveClass("image-uploader__drop--dragging");
    });

    it("принимает файл, брошенный на зону", async () => {
      const onChange = vi.fn();
      const { container } = render(
        <ImageUploader value={null} onChange={onChange} requireSquare={false} />,
      );
      const zone = getDropZone(container);

      fireEvent.dragOver(zone);
      fireEvent.drop(zone, { dataTransfer: { files: [makeFile("photo.png", "image/png")] } });

      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
      expect(zone).not.toHaveClass("image-uploader__drop--dragging");
    });
  });
});
