import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.css";

const PasswordInput = ({ showToggle = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-container">
      <input
       type={showPassword ? "password" : "text"}
        placeholder="Senha"
        className="password-input"
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