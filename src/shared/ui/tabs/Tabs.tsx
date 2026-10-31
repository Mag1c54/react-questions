import type { KeyboardEvent } from "react";
import { tabId, panelId } from "./tabIds";
import "./tabs.scss";

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  title?: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  idPrefix: string;
  label: string;
}

export const Tabs = ({ items, value, onChange, idPrefix, label }: TabsProps) => {
  const enabled = items.filter((item) => !item.disabled);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = enabled.findIndex((item) => item.id === value);

    let nextIndex;

    if (e.key === "ArrowRight") nextIndex = (index + 1) % enabled.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + enabled.length) % enabled.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = enabled.length - 1;
    else return;

    e.preventDefault();
    const next = enabled[nextIndex];
    onChange(next.id);
    document.getElementById(tabId(idPrefix, next.id))?.focus();
  };

  return (
    <div className="ui-tabs" role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
      {items.map((item) => {
        const selected = item.id === value;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={tabId(idPrefix, item.id)}
            aria-selected={selected}
            aria-controls={panelId(idPrefix, item.id)}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            title={item.title}
            className={`ui-tabs__tab ${selected ? "ui-tabs__tab--active" : ""}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
