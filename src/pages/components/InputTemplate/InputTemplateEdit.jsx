import React, { useEffect, useState } from "react";
import "./InputTemplate.css";

const InputTemplateEdit = ({ id, label, name, value, type = "text" }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(value || "");

  const handleBlur = () => {
    if (!formData) {
      setError("Preencha este campo corretamente");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={formData}
        required
        onBlur={handleBlur}
        onChange={handleChange}
        className={error ? "error" : ""}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputTemplateEdit;
