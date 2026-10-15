export const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const stripDataUrlPrefix = (dataUrl: string): string =>
  dataUrl.slice(dataUrl.indexOf(",") + 1);
