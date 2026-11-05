import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

interface Options extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

export const renderWithRouter = (ui: ReactElement, { route = "/", ...options }: Options = {}) =>
  render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
    ...options,
  });
