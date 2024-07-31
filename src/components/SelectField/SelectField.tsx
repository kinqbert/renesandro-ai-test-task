import React from "react";
import "./SelectField.scss";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, options, onChange, required = false }) => {
  return (
    <div className="select-field">
      <label className="select-field__label">{label}</label>
      <select
        className="select-field__select"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
