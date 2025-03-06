import React, { useState } from 'react';
import './InputTemplate.css';

const InputTemplate = ({ label, placeholder, type = 'text' }) => {
  const [error, setError] = useState('');

  const handleBlur = (e) => {
    if (!e.target.value) {
      setError('Preencha este campo corretamente');
    }
  };

  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={type}
        name={type}
        placeholder={placeholder}
        required
        onBlur={handleBlur}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputTemplate;
