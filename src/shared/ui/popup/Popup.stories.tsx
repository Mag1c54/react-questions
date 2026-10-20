import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup } from "./Popup";

const meta = {
  title: "UI/Popup",
  component: Popup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Компонент всплывающей подсказки (попапа), который появляется при наведении на дочерний элемент (например, кнопку или чипс).",
      },
    },
  },
  args: {
    content: "Доступно только для зарегистрированных пользователей",
    children: (
      <button
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "1px solid #bababa",
          background: "#ffffff",
          cursor: "pointer",
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
        }}
      >
        Наведи на меня
      </button>
    ),
    isOpen: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "60px 20px", display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    content: "Только для пользователей со статусом Pro",
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
