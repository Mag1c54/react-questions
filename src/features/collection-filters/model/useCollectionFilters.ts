import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const parseIds = (value: string | null): number[] =>
  value ? value.split(",").map(Number).filter(Number.isFinite) : [];

export const useCollectionFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const specializations = useMemo(
    () => parseIds(searchParams.get("specializations")),
    [searchParams],
  );
  const isFreeParam = searchParams.get("isFree");
  const isFree = isFreeParam === null ? undefined : isFreeParam === "true";

  const update = useCallback(
    (patch: Record<string, string | undefined>, keepPage = false) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(patch).forEach(([key, value]) => {
          if (value) next.set(key, value);
          else next.delete(key);
        });
        if (!keepPage) next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const setPage = (p: number) => update({ page: p > 1 ? String(p) : undefined }, true);
  const setSearch = (value: string) => update({ search: value.trim() || undefined });

  const toggleSpecialization = (id: number) => {
    const next = specializations.includes(id)
      ? specializations.filter((s) => s !== id)
      : [...specializations, id];
    update({ specializations: next.length ? next.join(",") : undefined });
  };

  const setIsFree = (value: boolean | undefined) =>
    update({ isFree: value === undefined ? undefined : String(value) });

  const reset = () =>
    setSearchParams(() => new URLSearchParams());

  const hasFilters = Boolean(search) || specializations.length > 0 || isFree !== undefined;

  return {
    page,
    search,
    specializations,
    isFree,
    hasFilters,
    setPage,
    setSearch,
    toggleSpecialization,
    setIsFree,
    reset,
  };
};