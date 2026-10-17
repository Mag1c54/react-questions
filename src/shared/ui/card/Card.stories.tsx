import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Белая карточка-контейнер. Размеры отступов и скругления задаются пропсами.",
      },
    },
  },
  args: { children: "Содержимое карточки" },
  argTypes: {
    padding: { control: "inline-radio", options: ["none", "md", "lg"] },
    radius: { control: "inline-radio", options: ["md", "lg"] },
    as: { control: "inline-radio", options: ["div", "section", "article"] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#f4f4f4" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithShadow: Story = { args: { shadow: true } };

export const Compact: Story = { args: { padding: "md", radius: "md" } };
