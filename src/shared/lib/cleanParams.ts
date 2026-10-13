type ParamValue = string | number | boolean;

export const cleanParams = (params: Record<string, unknown>): Record<string, ParamValue> => {
  const result: Record<string, ParamValue> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      if (value.length > 0) result[key] = value.join(",");
      return;
    }

    result[key] = value as ParamValue;
  });

  return result;
};
