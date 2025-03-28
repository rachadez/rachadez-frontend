import React, { useState } from 'react';
import './SelectInput.css';

const SelectInput = ({ label, value, onChange, error, setError }) => {
    
  const occupationOptions = ['Aluno', 'Professor', 'Servidor'];

  const handleBlur = () => {
    if (value === '') {
      setError('Por favor, selecione uma ocupação');
    }
  };

  return (
    <div className="select-container">
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={error ? 'error' : ''}
      >
        <option value="">Selecione</option>
        {occupationOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <span className="select-icon">
        {/* Ícone de seta do PrimeIcons */}
        <i className="pi pi-chevron-down"></i>
      </span>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default SelectInput;
