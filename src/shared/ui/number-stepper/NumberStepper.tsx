import { FiMinus, FiPlus } from "react-icons/fi";
import "./NumberStepper.scss";

interface NumberStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const NumberStepper = ({ value, min = 1, max = 100, onChange }: NumberStepperProps) => (
  <div className="number-stepper">
    <button
      type="button"
      className="number-stepper__btn"
      aria-label="Уменьшить"
      disabled={value <= min}
      onClick={() => onChange(Math.max(min, value - 1))}
    >
      <FiMinus aria-hidden="true" />
    </button>
    <span className="number-stepper__value" aria-live="polite">
      {value}
    </span>
    <button
      type="button"
      className="number-stepper__btn"
      aria-label="Увеличить"
      disabled={value >= max}
      onClick={() => onChange(Math.min(max, value + 1))}
    >
      <FiPlus aria-hidden="true" />
    </button>
  </div>
);