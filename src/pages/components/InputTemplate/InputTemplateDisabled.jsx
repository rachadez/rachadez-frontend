import React from 'react';
import './InputTemplate.css';

const InputTemplateDisabled = ({ label, value, id, type = 'text'  }) => {


  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        disabled={true}
        type={type}
        id={id}
        name={value}
        value={value}
      />
    </div>
  );
};

export default InputTemplateDisabled;
