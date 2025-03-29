import React from 'react';
import './SelectInput.css';

const SelectInput = ({ label, name, value, onChange, options }) => {
  return (
    <div className="select-container">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={value === "" ? "error" : ""}
      >
        <option value="">Selecione</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="select-icon">
        <i className="pi pi-chevron-down"></i>
      </span>
    </div>
  );
};

export default SelectInput;
