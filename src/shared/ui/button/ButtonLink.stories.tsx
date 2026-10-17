import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiPlus } from "react-icons/fi";
import { ButtonLink } from "./ButtonLink";

const meta = {
  title: "UI/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ссылка роутера с внешним видом кнопки. Принимает те же `variant`, `size`, `iconOnly`, что и `Button`. Для внешних адресов используй обычный `<a>` с `buttonClassName(...)`.",
      },
    },
  },
  args: { to: "/admin/specializations/create", children: "Добавить" },
  argTypes: {
    variant: { control: "select", options: ["primary", "outline", "danger", "danger-outline"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithIcon: Story = {
  args: { rightIcon: <FiPlus aria-hidden="true" /> },
};

export const Outline: Story = { args: { variant: "outline" } };
