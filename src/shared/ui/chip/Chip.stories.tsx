import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiStar } from "react-icons/fi";
import { Chip } from "./Chip";

const SKILLS = ["React", "TypeScript", "Redux", "SCSS"];

const CheckboxGroupDemo = () => {
  const [selected, setSelected] = useState<string[]>(["React"]);

  const toggle = (skill: string) =>
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill],
    );

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {SKILLS.map((skill) => (
        <Chip key={skill} checked={selected.includes(skill)} onChange={() => toggle(skill)}>
          {skill}
        </Chip>
      ))}
    </div>
  );
};

const RadioGroupDemo = () => {
  const [selected, setSelected] = useState("Frontend");

  return (
    <div role="radiogroup" aria-label="Специализация" style={{ display: "flex", gap: 8 }}>
      {["Frontend", "Backend", "QA"].map((title) => (
        <Chip
          key={title}
          type="radio"
          name="specialization"
          checked={selected === title}
          onChange={() => setSelected(title)}
        >
          {title}
        </Chip>
      ))}
    </div>
  );
};

const meta = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Выбираемая «таблетка» на настоящем `<input>`: работает с клавиатуры и читается скринридерами. `type="checkbox"` для нескольких вариантов, `type="radio"` для одного. Иконка может быть адресом картинки или React-элементом.',
      },
    },
  },
  args: { checked: false, onChange: () => {}, children: "React" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { checked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = { args: { icon: <FiStar aria-hidden="true" /> } };

export const CheckboxGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => <CheckboxGroupDemo />,
};

export const RadioGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => <RadioGroupDemo />,
};
