import type { ChangeEvent } from "react";

import "./Input.css";

type TextArea = {
  multiline: true;
  type?: never;
  value: string;

  setValue: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

type TextInput = {
  multiline?: false;
  type?: "text" | "url";
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

type NumberInput = {
  multiline?: false;
  type: "number";
  value: number;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

type InputProps = (TextArea | TextInput | NumberInput) & {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
};

export default function Input({
  label,
  multiline,
  name,
  required,
  setValue,
  ...inputProps
}: InputProps) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        {required && (
          <>
            {" "}
            <strong>
              <span aria-label="required">*</span>
            </strong>
          </>
        )}
      </label>
      {multiline ? (
        <textarea
          {...inputProps}
          id={name}
          name={name}
          onChange={(e) => setValue(e)}
          required={required}
        />
      ) : (
        <input
          {...inputProps}
          id={name}
          name={name}
          onChange={(e) => setValue(e)}
          required={required}
        />
      )}
    </>
  );
}
