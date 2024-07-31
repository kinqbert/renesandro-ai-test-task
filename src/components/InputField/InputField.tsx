import React from "react";
import "./InputField.scss";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: "text" | "number" | "email";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      <input
        className="input-field__input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
