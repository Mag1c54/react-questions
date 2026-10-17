import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImageUploader } from "./ImageUploader";

const Demo = ({ requireSquare, maxSizeKb }: { requireSquare: boolean; maxSizeKb: number }) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 640 }}>
      <ImageUploader
        value={value}
        onChange={setValue}
        requireSquare={requireSquare}
        maxSizeKb={maxSizeKb}
      />
    </div>
  );
};

const meta = {
  title: "UI/ImageUploader",
  component: ImageUploader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Загрузка картинки кликом или перетаскиванием. Проверяет формат (JPG и PNG), размер и, если нужно, что картинка квадратная. Значение возвращается как data URL: перед отправкой на сервер отрежь префикс `data:...;base64,`.",
      },
    },
  },
  args: { value: null, onChange: () => {} },
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Demo requireSquare maxSizeKb={150} />,
};

export const AnyShape: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Demo requireSquare={false} maxSizeKb={500} />,
};

export const WithError: Story = { args: { error: "Добавьте картинку" } };
