import React, { useState } from 'react';
import './InputTemplate.css';

const InputTemplate = ({ label, placeholder, type = 'text', name, value, onChange }) => {
  const [error, setError] = useState('');

  const handleBlur = (e) => {
    if (!e.target.value) {
      setError('Preencha este campo corretamente');
    } else {
      setError(''); // Remove o erro se o campo estiver preenchido
    }
  };

  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value} // Propaga o valor do estado do componente pai
        onChange={onChange} // Propaga o evento onChange para o componente pai
        onBlur={handleBlur}
        className={error ? 'error' : ''}
        required
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputTemplate;