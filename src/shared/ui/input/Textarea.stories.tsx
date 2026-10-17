import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CharacterCounter } from "./CharacterCounter";
import { Textarea } from "./Textarea";

const MAX = 200;

const WithCounterDemo = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      placeholder="Развёрнутое описание"
      maxLength={MAX}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      counter={<CharacterCounter length={value.length} max={MAX} />}
    />
  );
};

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Многострочное поле. Счётчик передаётся слотом `counter`: в формах на react-hook-form подписывай его на поле через `useWatch`, чтобы не перерисовывать всю форму.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: "Развёрнутое описание" } };

export const WithCounter: Story = { render: () => <WithCounterDemo /> };

export const WithError: Story = { args: { hasError: true, defaultValue: "Слишком коротко" } };
