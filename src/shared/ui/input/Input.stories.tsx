import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiSearch } from "react-icons/fi";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Текстовое поле. Ширина и отступы задаются через `wrapperClassName`, состояние ошибки через `hasError`. Подпись и текст ошибки выводит `FormRow`.",
      },
    },
  },
  args: { placeholder: "Название специализации" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { type: "search", placeholder: "Поиск", leftIcon: <FiSearch /> },
};

export const WithError: Story = { args: { hasError: true, defaultValue: "Неверное значение" } };

export const Disabled: Story = { args: { disabled: true, defaultValue: "Нельзя изменить" } };
