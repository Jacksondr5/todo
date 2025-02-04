"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export type TaskInputProps = {
  dataTestId: string;
  defaultValue: string;
  onChange: (value: string) => void;
  ref: React.RefObject<TaskInputRef | null>;
  type: "input" | "textarea";
};

type TaskInputRef = HTMLInputElement | HTMLTextAreaElement;

export const TaskInput = ({
  dataTestId,
  defaultValue,
  onChange,
  ref,
  type,
}: TaskInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (e: React.KeyboardEvent<TaskInputRef>) => {
    if (e.ctrlKey && e.key === "Enter") {
      onChange(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, [ref]);

  const sharedProps = {
    "data-testid": dataTestId,
    onChange: (e: React.ChangeEvent<TaskInputRef>) => setValue(e.target.value),
    onKeyDown: handleKeyDown,
    value: value,
  };
  return type === "textarea" ? (
    <Textarea
      ref={ref as React.RefObject<HTMLTextAreaElement>}
      {...sharedProps}
    />
  ) : (
    <Input ref={ref as React.RefObject<HTMLInputElement>} {...sharedProps} />
  );
};
