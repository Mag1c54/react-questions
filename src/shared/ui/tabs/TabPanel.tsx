import type { ReactNode } from "react";
import { panelId, tabId } from "./tabIds";
import "./tabs.scss";

interface TabPanelProps {
  idPrefix: string;
  id: string;
  active: boolean;
  className?: string;
  children: ReactNode;
}

export const TabPanel = ({ idPrefix, id, active, className = "", children }: TabPanelProps) => (
  <div
    role="tabpanel"
    id={panelId(idPrefix, id)}
    aria-labelledby={tabId(idPrefix, id)}
    hidden={!active}
    className={`ui-tab-panel ${className}`}
  >
    {children}
  </div>
);
