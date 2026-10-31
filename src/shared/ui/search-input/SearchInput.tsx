import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input, type InputProps } from "../input/Input";

interface SearchInputProps extends Omit<InputProps, "value" | "onChange" | "type" | "leftIcon"> {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}

export const SearchInput = ({ value, onChange, delay = 400, ...props }: SearchInputProps) => {
  const [text, setText] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const timer = useRef<number>(0);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== text.trim()) setText(value);
  }

  useEffect(() => () => window.clearTimeout(timer.current), [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setText(next);

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => onChange(next), delay);
  };

  return (
    <Input type="search" leftIcon={<FiSearch />} value={text} onChange={handleChange} {...props} />
  );
};
