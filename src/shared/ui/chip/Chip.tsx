import type { ReactNode } from "react";
import "./Chip.scss";

interface ChipProps {
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
  name?: string;
  value?: string;
  icon?: string | ReactNode;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const hideBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

export const Chip = ({
  checked,
  onChange,
  type = "checkbox",
  name,
  value,
  icon,
  disabled = false,
  className,
  children,
}: ChipProps) => {
  const classes = ["chip", checked && "chip--checked", disabled && "chip--disabled", className]
    .filter(Boolean)
    .join(" ");

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <img src={icon} alt="" className="chip__icon" loading="lazy" onError={hideBrokenImage} />
      );
    }

    return <span className="chip__icon">{icon}</span>;
  };

  return (
    <label className={classes}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="chip__native"
      />
      {renderIcon()}
      <span className="chip__label">{children}</span>
    </label>
  );
};
