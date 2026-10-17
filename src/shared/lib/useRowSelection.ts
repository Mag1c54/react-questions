import { useState } from "react";

export const useRowSelection = <T extends string | number>(resetKey: string) => {
  const [state, setState] = useState<{ key: string; ids: T[] }>({ key: resetKey, ids: [] });
  const selectedIds = state.key === resetKey ? state.ids : [];

  const setSelectedIds = (ids: T[]) => setState({ key: resetKey, ids });

  const toggle = (id: T) =>
    setSelectedIds(
      selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id],
    );

  const toggleAll = (allIds: T[]) => {
    const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : allIds);
  };

  return { selectedIds, setSelectedIds, toggle, toggleAll };
};
