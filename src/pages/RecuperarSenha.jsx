import React, { useState } from "react";
import MainContent from "./components/MainContent/MainContent";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import DefaultButton from "./components/Buttons/DefaultButton";
import "./ReSenha.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRecuperarSenha = async () => {
    try {
      const encodedEmail = encodeURIComponent(email); // Codifica o email
      console.log("Email codificado:", encodedEmail); // Adiciona o log

      const response = await axios.post(
        `http://127.0.0.1:8000/v1/password-recovery/${encodedEmail}` // Usa o email codificado
      );

      // ... (tratamento da resposta)
    } catch (error) {
      // ... (tratamento do erro)
    }
  };
  
  return (
    <section className="senha">
      <MainContent
        title={"Problemas para entrar?"}
        subtitle={
          "Insira os dados abaixo. Um código para recuperar sua senha será enviado para seu e-mail. Lembre-se de checar o spam."
        }
        path={"/login"}
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail acadêmico"
              placeholder="email@estudante.ufcg.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Receber código"} onClick={handleRecuperarSenha} />
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </section>
  );
};

export default RecuperarSenha;