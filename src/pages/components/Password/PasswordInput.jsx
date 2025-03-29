import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.css";

const PasswordInput = ({ value, onChange, showToggle = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-container">
      <input
        type={showPassword ? "text" : "password"} // Alterna entre texto e senha
        placeholder="Senha"
        className="password-input"
        value={value} // Propaga o valor do estado do componente pai
        onChange={onChange} // Propaga o evento onChange para o componente pai
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="toggle-button"
        >
          {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;