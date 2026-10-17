export interface BulkFailure<T> {
  id: T;
  reason: unknown;
}

export const runBulk = async <T extends string | number>(
  ids: T[],
  action: (id: T) => Promise<unknown>,
): Promise<BulkFailure<T>[]> => {
  const results = await Promise.allSettled(ids.map(action));

  return results.flatMap((result, index) =>
    result.status === "rejected" ? [{ id: ids[index], reason: result.reason }] : [],
  );
};
