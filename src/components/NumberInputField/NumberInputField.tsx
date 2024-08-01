import React from "react";

import "./NumberInputField.scss";

interface NumberInputFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step = 1,
  required = false,
}) => {
  return (
    <div className="number-input-field">
      <label className="number-input-field__label small-text">{label}</label>
      <input
        type="number"
        name={name}
        className="number-input-field__input"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
      />
    </div>
  );
};

export default NumberInputField;
