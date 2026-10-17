import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiArrowLeft, FiArrowRight, FiTrash2 } from "react-icons/fi";
import { Button } from "./Button";

const VARIANTS = ["primary", "outline", "danger", "danger-outline"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Основная кнопка. По умолчанию `type="button"`, поэтому не отправляет форму случайно. Для отправки формы передай `type="submit"`. Для ссылок, выглядящих как кнопка, используй `ButtonLink`.',
      },
    },
  },
  args: { children: "Сохранить" },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = { args: { variant: "outline" } };

export const Danger: Story = { args: { variant: "danger", children: "Удалить" } };

export const DangerOutline: Story = {
  args: {
    variant: "danger-outline",
    children: "Удалить выбранное",
    leftIcon: <FiTrash2 aria-hidden="true" />,
  },
};

export const WithRightIcon: Story = {
  args: { children: "Далее", rightIcon: <FiArrowRight aria-hidden="true" /> },
};

export const Loading: Story = {
  args: { isLoading: true, loadingText: "Сохраняем..." },
};

export const Disabled: Story = { args: { disabled: true } };

export const IconOnly: Story = {
  args: {
    variant: "outline",
    size: "sm",
    iconOnly: true,
    round: true,
    "aria-label": "Назад",
    children: <FiArrowLeft aria-hidden="true" />,
  },
};

export const FullWidth: Story = { args: { fullWidth: true } };

export const AllVariantsAndSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size={size}>
              {variant} / {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
