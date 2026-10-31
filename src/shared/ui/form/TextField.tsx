import { forwardRef, useId } from "react";
import { Field } from "../field/Field";
import { Input, type InputProps } from "../input/Input";

export interface TextFieldProps extends Omit<InputProps, "id" | "hasError"> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, variant = "filled", ...props }, ref) => {
    const id = useId();

    return (
      <Field label={label} htmlFor={id} error={error} hint={hint}>
        <Input
          ref={ref}
          id={id}
          variant={variant}
          hasError={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </Field>
    );
  },
);

TextField.displayName = "TextField";
