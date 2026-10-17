import type { Meta, StoryObj } from "@storybook/react-vite";
import { SafeImage } from "./SafeImage";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#6a0bff"/></svg>',
  );

const meta = {
  title: "UI/SafeImage",
  component: SafeImage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Картинка с заглушкой. Если адрес пустой или файл не загрузился (битая ссылка), вместо неё выводится блок с классом `${className}--empty`.",
      },
    },
  },
  args: { className: "story-image", src: PLACEHOLDER },
  decorators: [
    (Story) => (
      <>
        <style>{`.story-image{display:block;width:96px;height:96px;border-radius:12px;object-fit:cover}.story-image--empty{background:#e8e8e8}`}</style>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof SafeImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

export const BrokenLink: Story = { args: { src: "https://example.invalid/missing.png" } };

export const NoSource: Story = { args: { src: null } };
