
import './CheckboxChip.scss'

interface CheckboxChipProps {
  checked: boolean;
  onChange: () => void;
  icon?: string;
  children: React.ReactNode;
}

export const CheckboxChip: React.FC<CheckboxChipProps> = ({
  checked,
  onChange,
  icon,
  children,
}) => {
  return (
    <label className={`checkbox-chip ${checked ? "checkbox-chip--checked" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-chip__native"
      />
      {icon && (
        <img src={icon} alt="" className="checkbox-chip__icon" />
      )}
      <span className="checkbox-chip__label">{children}</span>
    </label>
  );
};