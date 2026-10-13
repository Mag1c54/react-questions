export const logError = (error: unknown, info?: { componentStack?: string | null }) => {
  console.error("Uncaught error:", error, info?.componentStack ?? "");
}; // SEntry
