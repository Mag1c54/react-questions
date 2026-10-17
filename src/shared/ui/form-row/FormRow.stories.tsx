import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input/Input";
import { FormRow } from "./FormRow";

const meta = {
  title: "UI/FormRow",
  component: FormRow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Строка формы: слева подпись и подсказка, справа поле и текст ошибки. Если передан `htmlFor`, подпись становится `<label>`, а ошибка получает id `${htmlFor}-error` для `aria-describedby`.",
      },
    },
  },
  args: {
    title: "Название специализации",
    hint: "Добавьте название специализации",
    htmlFor: "story-title",
    children: <Input id="story-title" placeholder="Название специализации" />,
  },
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stacked: Story = { args: { stacked: true } };

export const WithError: Story = {
  args: {
    error: "Введите название",
    children: <Input id="story-title" placeholder="Название специализации" hasError />,
  },
};
