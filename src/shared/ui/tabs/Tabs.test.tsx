import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TabPanel } from "./TabPanel";
import { Tabs, type TabItem } from "./Tabs";
import { panelId, tabId } from "./tabIds";

const ITEMS: TabItem[] = [
  { id: "personal", label: "Личная информация" },
  { id: "about", label: "Обо мне" },
  { id: "skills", label: "Навыки" },
  { id: "projects", label: "Проекты", disabled: true, title: "Скоро" },
];

const renderTabs = (value = "personal") => {
  const onChange = vi.fn();
  render(<Tabs items={ITEMS} value={value} onChange={onChange} idPrefix="test" label="Разделы" />);
  return onChange;
};

const press = (tabName: string, key: string) =>
  fireEvent.keyDown(screen.getByRole("tab", { name: tabName }), { key });

describe("Tabs", () => {
  it("выводит список вкладок с названием для скринридера", () => {
    renderTabs();

    expect(screen.getByRole("tablist", { name: "Разделы" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(4);
  });

  it("отмечает только выбранную вкладку", () => {
    renderTabs("about");

    expect(screen.getByRole("tab", { name: "Обо мне" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Навыки" })).toHaveAttribute("aria-selected", "false");
  });

  it("в порядок табуляции входит только выбранная вкладка", () => {
    renderTabs("about");

    expect(screen.getByRole("tab", { name: "Обо мне" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Навыки" })).toHaveAttribute("tabindex", "-1");
  });

  it("связывает вкладку с панелью через id и aria-controls", () => {
    renderTabs();

    const tab = screen.getByRole("tab", { name: "Обо мне" });
    expect(tab).toHaveAttribute("id", tabId("test", "about"));
    expect(tab).toHaveAttribute("aria-controls", panelId("test", "about"));
  });

  it("клик по вкладке вызывает onChange с её id", async () => {
    const user = userEvent.setup();
    const onChange = renderTabs();

    await user.click(screen.getByRole("tab", { name: "Навыки" }));

    expect(onChange).toHaveBeenCalledWith("skills");
  });

  it("отключённая вкладка заблокирована, имеет подсказку и не вызывает onChange", async () => {
    const user = userEvent.setup();
    const onChange = renderTabs();
    const tab = screen.getByRole("tab", { name: "Проекты" });

    expect(tab).toBeDisabled();
    expect(tab).toHaveAttribute("title", "Скоро");

    await user.click(tab);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("→ переходит к следующей вкладке и переносит на неё фокус", () => {
    const onChange = renderTabs("personal");

    press("Личная информация", "ArrowRight");

    expect(onChange).toHaveBeenCalledWith("about");
    expect(screen.getByRole("tab", { name: "Обо мне" })).toHaveFocus();
  });

  it("→ на последней доступной вкладке возвращает к первой, пропуская отключённые", () => {
    const onChange = renderTabs("skills");

    press("Навыки", "ArrowRight");

    expect(onChange).toHaveBeenCalledWith("personal");
  });

  it("← на первой вкладке переходит к последней доступной", () => {
    const onChange = renderTabs("personal");

    press("Личная информация", "ArrowLeft");

    expect(onChange).toHaveBeenCalledWith("skills");
  });

  it("Home открывает первую вкладку, End последнюю доступную", () => {
    const onChange = renderTabs("about");

    press("Обо мне", "Home");
    expect(onChange).toHaveBeenLastCalledWith("personal");

    press("Обо мне", "End");
    expect(onChange).toHaveBeenLastCalledWith("skills");
  });

  it("другие клавиши ничего не меняют", () => {
    const onChange = renderTabs("personal");

    press("Личная информация", "Enter");
    press("Личная информация", "a");

    expect(onChange).not.toHaveBeenCalled();
  });
});

const Demo = () => {
  const [value, setValue] = useState("personal");

  return (
    <>
      <Tabs items={ITEMS} value={value} onChange={setValue} idPrefix="demo" label="Разделы" />
      <TabPanel idPrefix="demo" id="personal" active={value === "personal"}>
        Личные данные
      </TabPanel>
      <TabPanel idPrefix="demo" id="about" active={value === "about"}>
        Описание
      </TabPanel>
    </>
  );
};

describe("Tabs вместе с TabPanel", () => {
  it("показывает панель выбранной вкладки и называет её по вкладке", async () => {
    const user = userEvent.setup();
    render(<Demo />);

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Личные данные");

    await user.click(screen.getByRole("tab", { name: "Обо мне" }));

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("Описание");
    expect(panel).toHaveAccessibleName("Обо мне");
  });

  it("клавиатура переключает панели по цепочке", () => {
    render(<Demo />);

    press("Личная информация", "ArrowRight");

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Описание");
  });
});
