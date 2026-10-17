import type { Meta, StoryObj } from "@storybook/react-vite";

const PALETTE = [
  { name: "$color-accent", value: "#6A0BFF", note: "основной акцент, кнопки" },
  { name: "$color-accent-link", value: "#5509CC", note: "ссылки, наведение" },
  { name: "$color-text-primary", value: "#191919", note: "основной текст" },
  { name: "$color-text-dark", value: "#303030", note: "тёмный текст" },
  { name: "$color-text-secondary", value: "#474747", note: "второстепенный текст" },
  { name: "$color-text-muted", value: "#8C8C8C", note: "подсказки" },
  { name: "$color-border-light", value: "#E8E8E8", note: "светлые рамки" },
  { name: "$color-border-gray", value: "#BABABA", note: "рамки элементов" },
  { name: "$color-bg-page", value: "#F4F4F4", note: "фон страниц" },
  { name: "$color-bg-footer", value: "#18003E", note: "подвал" },
  { name: "$color-white", value: "#FFFFFF", note: "фон карточек" },
  { name: "$color-error", value: "#D92D20", note: "ошибки, удаление (сверь со своим значением)" },
];

const Colors = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 16,
    }}
  >
    {PALETTE.map(({ name, value, note }) => (
      <div key={name} style={{ border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ height: 64, background: value }} />
        <div style={{ padding: 12, fontSize: 13, lineHeight: 1.4 }}>
          <strong>{name}</strong>
          <div>{value}</div>
          <div style={{ color: "#8c8c8c" }}>{note}</div>
        </div>
      </div>
    ))}
  </div>
);

const meta = {
  title: "Основы/Цвета",
  component: Colors,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
