import React from "react";
import MainContent from "./components/MainContent/MainContent";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import DefaultButton from "./components/Buttons/DefaultButton";

const CodigoRedefinirSenha = () => {
  return (
    <section className="senha">
      <MainContent
        title={"Problemas para entrar?"}
        subtitle={
          "Um código de confirmação foi enviado por e-mail"
        }
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Digite o código recebido"
              placeholder="Código"
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Enviar"} />
        </div>

        <a>Reenviar código</a>
      </div>
    </section>
  );
};

export default CodigoRedefinirSenha;
