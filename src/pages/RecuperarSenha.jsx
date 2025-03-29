import React from "react";
import MainContent from "./components/MainContent/MainContent";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import DefaultButton from "./components/Buttons/DefaultButton";
import "./ReSenha.css";
import Header from "./components/Header/Header";
import { useNavigate } from "react-router-dom";

const RecuperarSenha = () => {
  const navigate = useNavigate();

  return (
    <section className="senha">
      <MainContent
        title={"Problemas para entrar?"}
        subtitle={
          "Insira os dados abaixo. Um código para recuperar sua senha será enviado para seu e-mail. Lembre-se de checar o spam."
        }
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail acadêmico"
              placeholder="email@estudante.ufcg.edu.br"
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Receber código"} onClick={() => navigate(`/redefinir-senha`)}/>
        </div>
      </div>
    </section>
  );
};

export default RecuperarSenha;
