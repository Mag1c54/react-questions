import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxField } from "./CheckboxField";
import { PasswordField } from "./PasswordField";
import { TextField } from "./TextField";

const meta = {
  title: "UI/Form fields",
  component: TextField,
  subcomponents: { PasswordField, CheckboxField },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Поля форм авторизации с подписью и текстом ошибки. Работают с `register` из react-hook-form (передают `ref`). Позже их стоит перевести на `Input`, чтобы в проекте остался один вид полей.",
      },
    },
  },
  args: { label: "Электронная почта", placeholder: "Введите электронную почту" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const TextWithError: Story = { args: { error: "Введите корректную почту" } };

export const Password: Story = {
  render: () => <PasswordField label="Пароль" placeholder="Введите пароль" />,
};

export const Checkbox: Story = {
  render: () => <CheckboxField label="Даю согласие на обработку персональных данных" />,
};

export const CheckboxWithError: Story = {
  render: () => (
    <CheckboxField label="Даю согласие на обработку ПД" error="Нужно согласие на обработку ПД" />
  ),
};
