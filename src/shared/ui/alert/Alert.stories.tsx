import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Сообщение об ошибке или подсказка. Ошибка объявляется скринридером сразу (`role="alert"`), информационное сообщение вежливо (`role="status"`).',
      },
    },
  },
  args: { children: "Нужны права администратора" },
  argTypes: {
    tone: { control: "inline-radio", options: ["error", "info"] },
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};

export const Info: Story = {
  args: { tone: "info", children: "Изменения сохранятся после нажатия «Сохранить»" },
};

export const WithTitleAndClose: Story = {
  args: {
    title: "Не удалось удалить:",
    children: (
      <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
        <li>«React»: используется в вопросах</li>
        <li>«Vue»: используется в коллекциях</li>
      </ul>
    ),
  },
};
