import { useState, type ReactNode } from "react";
import { FiImage } from "react-icons/fi";
import "./ImageUploader.scss";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Не удалось загрузить картинку"));
    image.src = src;
  });

interface ImageUploaderProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  error?: string;
  maxSizeKb?: number;
  requireSquare?: boolean;
  removable?: boolean;
  placeholderIcon?: ReactNode;
  hints?: string[];
}

export const ImageUploader = ({
  value,
  onChange,
  error,
  maxSizeKb = 150,
  requireSquare = true,
  removable,
  placeholderIcon,
  hints,
}: ImageUploaderProps) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const showRemove = removable ?? Boolean(value);

  const defaultHints = [
    `JPG, PNG, JPEG (максимальный размер файла ${maxSizeKb}КБ)`,
    "Рекомендуемый размер — 800×800 px",
    ...(requireSquare ? ["Принимаем только квадратные картинки"] : []),
  ];

  const processFile = async (file: File) => {
    setFileError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Допустимые форматы: JPG, PNG, JPEG");
      return;
    }
    if (file.size > maxSizeKb * 1024) {
      setFileError(`Максимальный размер файла ${maxSizeKb} КБ`);
      return;
    }

    try {
      const dataUrl = await readAsDataUrl(file);

      if (requireSquare) {
        const image = await loadImage(dataUrl);
        if (image.naturalWidth !== image.naturalHeight) {
          setFileError("Принимаем только квадратные картинки");
          return;
        }
      }

      onChange(dataUrl);
    } catch {
      setFileError("Не удалось прочитать файл");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void processFile(file);
  };

  const handleRemove = () => {
    setFileError(null);
    onChange(null);
  };

  const message = fileError ?? error;

  return (
    <div className="image-uploader">
      <div className="image-uploader__preview-col">
        <div className="image-uploader__preview">
          {value ? (
            <img src={value} alt="Предпросмотр картинки" />
          ) : (
            (placeholderIcon ?? <FiImage aria-hidden="true" />)
          )}
        </div>

        {showRemove && (
          <button type="button" className="image-uploader__remove" onClick={handleRemove}>
            Удалить картинку
          </button>
        )}
      </div>

      <label
        className={`image-uploader__drop ${isDragging ? "image-uploader__drop--dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="image-uploader__input"
          onChange={handleInputChange}
        />
        <FiImage className="image-uploader__drop-icon" aria-hidden="true" />
        <span className="image-uploader__drop-title">
          <span className="image-uploader__link">Кликни для изменения</span> или перетащи сюда
          картинку
        </span>
        {(hints ?? defaultHints).map((hint) => (
          <span key={hint} className="image-uploader__hint">
            {hint}
          </span>
        ))}
      </label>

      {message && (
        <p className="image-uploader__error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
};
