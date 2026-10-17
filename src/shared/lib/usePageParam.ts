import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { parsePositiveInt } from "./parseParams";

export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePositiveInt(searchParams.get("page"));

  const setPage = useCallback(
    (next: number, replace = false) =>
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next > 1) params.set("page", String(next));
          else params.delete("page");
          return params;
        },
        { replace },
      ),
    [setSearchParams],
  );

  return { page, setPage };
};

export const useClampPage = (
  page: number,
  totalPages: number,
  enabled: boolean,
  setPage: (page: number, replace?: boolean) => void,
) => {
  useEffect(() => {
    if (enabled && page > totalPages) setPage(totalPages, true);
  }, [enabled, page, totalPages, setPage]);
};
