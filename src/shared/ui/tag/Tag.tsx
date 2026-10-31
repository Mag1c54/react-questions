import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { SafeImage } from "../safe-image/SafeImage";
import "./tag.scss";

interface TagProps {
  children: ReactNode;
  iconSrc?: string | null;
  onRemove?: () => void;
  removeLabel?: string;
}

export const Tag = ({ children, iconSrc, onRemove, removeLabel = "Убрать" }: TagProps) => (
  <span className="ui-tag">
    {iconSrc && <SafeImage src={iconSrc} className="ui-tag__icon" />}
    {children}

    {onRemove && (
      <button type="button" className="ui-tag__remove" aria-label={removeLabel} onClick={onRemove}>
        <FiX aria-hidden="true" />
      </button>
    )}
  </span>
);
