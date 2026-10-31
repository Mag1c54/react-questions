import { forwardRef, type SelectHTMLAttributes } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./select.scss";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "outline" | "filled";
  hasError?: boolean;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { variant = "outline", hasError, wrapperClassName = "", className = "", children, ...props },
    ref,
  ) => (
    <span className={`ui-select ${wrapperClassName}`}>
      <select
        ref={ref}
        className={[
          "ui-select__control",
          `ui-select__control--${variant}`,
          hasError && "ui-select__control--error",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={hasError || undefined}
        {...props}
      >
        {children}
      </select>
      <FiChevronDown className="ui-select__icon" aria-hidden="true" />
    </span>
  ),
);

Select.displayName = "Select";
