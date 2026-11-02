import { describe, expect, it } from "vitest";
import * as ui from "./index";

const EXPECTED_EXPORTS = [
  "Alert",
  "Button",
  "ButtonLink",
  "buttonClassName",
  "Card",
  "Chip",
  "CheckboxField",
  "PasswordField",
  "TextField",
  "FormRow",
  "ImageUploader",
  "CharacterCounter",
  "Input",
  "Textarea",
  "NumberStepper",
  "SafeImage",
  "Popup",
  "Field",
  "SearchInput",
  "Select",
  "TabPanel",
  "Tabs",
  "Tag",
];

describe("публичный API UI-кита", () => {
  it("экспортирует все компоненты", () => {
    expect(Object.keys(ui)).toEqual(expect.arrayContaining(EXPECTED_EXPORTS));
  });

  it.each(EXPECTED_EXPORTS)("%s определён", (name) => {
    expect(ui).toHaveProperty(name);
  });
});
