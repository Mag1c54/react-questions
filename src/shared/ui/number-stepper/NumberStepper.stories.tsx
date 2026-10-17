import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NumberStepper } from "./NumberStepper";

const Demo = ({ min, max }: { min: number; max: number }) => {
  const [value, setValue] = useState(10);
  return <NumberStepper value={value} min={min} max={max} onChange={setValue} />;
};

const meta = {
  title: "UI/NumberStepper",
  component: NumberStepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Выбор числа кнопками «−» и «+». На границах диапазона кнопки отключаются.",
      },
    },
  },
  args: { value: 10, onChange: () => {} },
} satisfies Meta<typeof NumberStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Demo min={1} max={100} />,
};

export const NarrowRange: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Demo min={8} max={12} />,
};
