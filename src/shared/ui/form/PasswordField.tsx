import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TextField, type TextFieldProps } from "./TextField";

export const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<TextFieldProps, "type" | "endAdornment">
>((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      ref={ref}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          className="text-field__toggle"
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          aria-pressed={visible}
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
        </button>
      }
      {...props}
    />
  );
});

PasswordField.displayName = "PasswordField";