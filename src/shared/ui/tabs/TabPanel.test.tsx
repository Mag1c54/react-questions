import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TabPanel } from "./TabPanel";
import { panelId, tabId } from "./tabIds";

describe("TabPanel", () => {
  it("активная панель видна и доступна по роли", () => {
    render(
      <TabPanel idPrefix="test" id="about" active>
        Описание
      </TabPanel>,
    );

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Описание");
  });

  it("неактивная панель остаётся в разметке, но скрыта", () => {
    render(
      <TabPanel idPrefix="test" id="about" active={false}>
        Описание
      </TabPanel>,
    );

    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
    expect(screen.getByRole("tabpanel", { hidden: true })).toHaveAttribute("hidden");
    expect(screen.getByText("Описание", { ignore: "none" })).toBeInTheDocument();
  });

  it("получает id панели и ссылается на вкладку через aria-labelledby", () => {
    render(
      <TabPanel idPrefix="test" id="about" active>
        Описание
      </TabPanel>,
    );

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("id", panelId("test", "about"));
    expect(panel).toHaveAttribute("aria-labelledby", tabId("test", "about"));
  });

  it("добавляет внешний класс", () => {
    render(
      <TabPanel idPrefix="test" id="about" active className="extra">
        Описание
      </TabPanel>,
    );

    expect(screen.getByRole("tabpanel")).toHaveClass("ui-tab-panel", "extra");
  });
});
