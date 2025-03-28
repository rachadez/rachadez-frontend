import React, { useState } from 'react';
import './InputReadOnly.css';

const InputReadOnly = ({ label, type = 'text' }) => {
  const [error, setError] = useState('');

  // Não há necessidade de lidar com mudança de valor aqui,
  // pois o select será apenas leitura.
  const handleBlur = (e) => {
    if (!e.target.value) {
      setError('Preencha este campo corretamente');
    }
  };

  return (
    <div className="input-container-read-only">
      <label htmlFor={label}>{label}</label>
      <select
        disabled
        onBlur={handleBlur}
        type={type}
        className={error ? 'error' : ''}
      >
        <option value="UsuarioExterno" selected>Usuário Externo</option>
      </select>
      {error && <span className="error-message-read-only">{error}</span>}
    </div>
  );
};

export default InputReadOnly;
