import type { FieldErrors } from "react-hook-form";
import type { TabItem } from "@/shared/ui";
import type { ProfileEditValues } from "./schema";

export const PROFILE_EDIT_TABS = [
  { id: "personal", label: "Личная информация" },
  { id: "about", label: "Обо мне" },
  { id: "skills", label: "Навыки" },
] as const;

export type ProfileEditTabId = (typeof PROFILE_EDIT_TABS)[number]["id"];

export const TABS_ID_PREFIX = "profile-edit";

const COMING_SOON_LABELS = ["Проекты", "Профиль", "Образование"];

export const TAB_ITEMS: TabItem[] = [
  ...PROFILE_EDIT_TABS,
  ...COMING_SOON_LABELS.map((label) => ({
    id: label,
    label,
    disabled: true,
    title: "Скоро",
  })),
];

export const parseTab = (value: string | null): ProfileEditTabId =>
  PROFILE_EDIT_TABS.find((tab) => tab.id === value)?.id ?? "personal";

export const getTabWithError = (
  errors: FieldErrors<ProfileEditValues>,
): ProfileEditTabId | null => {
  if (errors.username || errors.country || errors.city || errors.links) return "personal";
  if (errors.description) return "about";
  if (errors.skills) return "skills";
  return null;
};
