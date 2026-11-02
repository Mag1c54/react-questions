import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      include: ["src/**/*.test.{ts,tsx}"],
      css: false,
      coverage: {
        provider: "v8",
        include: ["src/shared/ui/**/*.{ts,tsx}"],
        exclude: ["**/*.stories.tsx", "**/*.test.{ts,tsx}", "src/shared/ui/index.ts"],
      },
    },
  }),
);
