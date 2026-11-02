import { describe, expect, it } from "vitest";
import { buttonClassName } from "./buttonClassName";

describe("buttonClassName", () => {
  it("по умолчанию собирает primary и md", () => {
    expect(buttonClassName()).toBe("ui-btn ui-btn--primary ui-btn--md");
  });

  it("добавляет вариант и размер", () => {
    expect(buttonClassName({ variant: "danger-outline", size: "lg" })).toBe(
      "ui-btn ui-btn--danger-outline ui-btn--lg",
    );
  });

  it("поддерживает вариант link", () => {
    expect(buttonClassName({ variant: "link" })).toContain("ui-btn--link");
  });

  it("добавляет модификаторы только когда они включены", () => {
    const enabled = buttonClassName({ fullWidth: true, iconOnly: true, round: true }).split(" ");
    expect(enabled).toEqual(
      expect.arrayContaining(["ui-btn--full", "ui-btn--icon", "ui-btn--round"]),
    );

    const disabled = buttonClassName({ fullWidth: false, iconOnly: false, round: false });
    expect(disabled).not.toMatch(/--(full|icon|round)/);
  });

  it("дописывает внешний класс в конец без лишних пробелов", () => {
    const result = buttonClassName({ className: "custom" });

    expect(result.endsWith(" custom")).toBe(true);
    expect(result).not.toContain("  ");
  });
});
