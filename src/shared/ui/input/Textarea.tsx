import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from "react";
import "./input.scss";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  counter?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, counter, className = "", ...props }, ref) => (
    <div className="ui-textarea">
      <textarea
        ref={ref}
        className={["ui-textarea__control", hasError && "ui-textarea__control--error", className]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={hasError || undefined}
        {...props}
      />
      {counter && <span className="ui-textarea__counter">{counter}</span>}
    </div>
  ),
);

Textarea.displayName = "Textarea";
