import React, { useState } from 'react';
import './InputEmail.css'

const EmailInput = () => {
    const [error, setError] = useState('');
  
    const handleBlur = (e) => {
      if (!e.target.value) {
        setError('Preencha este campo corretamente');
      }
    };
  
    return (
      <div className="email-container">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          onBlur={handleBlur}
          className={error ? 'error' : ''}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  };
  
  export default EmailInput;