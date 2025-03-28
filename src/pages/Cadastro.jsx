import React from "react";
import { useState } from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalOneOption from "./components/Modal/ModalOneOption";

function Cadastro() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleCadastroClick = () => {
      const cadastroSuccess = false; // Isso é apenas um exemplo, substitua pela lógica de cadastro

      if (cadastroSuccess) {
          setModalType("sucesso"); 
      } else {
          setModalType("erro");
      }

      setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent title={"Faça seu cadastro!"} subtitle={"Certifique-se de informar seus dados corretamente. Somente membros da comunidade da UFCG (alunos, professores e servidores) podem se cadastrar."} path={"/login"}/>
  
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate type="text" label="Nome completo" placeholder="Nome" />
          </div>
          <div className="form-group">
            <InputTemplate type="text" label="CPF" placeholder="123.456.789-00" />
          </div>
          <div className="form-group">
            <label>Ocupação</label>
            <select>
              <option>Selecione</option>
            </select>
          </div>
          <div className="form-group">
            <InputTemplate type="email" label="E-mail acadêmico" placeholder="email@estudante.ufcg.edu.br" />
          </div>
          <div className="form-group">
            <InputTemplate type="password" label="Senha" placeholder="**********" />
          </div>
          <div className="form-group">
            <InputTemplate type="text" label="Telefone" placeholder="(00) 91234-5678"/>
          </div>
        </div>
  
        <div className="button">
          <DefaultButton label={"Realizar cadastro"} onClick={handleCadastroClick} />
        </div>
      </div>

        {/* Exibe o Modal dependendo do tipo de sucesso ou erro */}
        {isModalOpen && (
          modalType === "sucesso" ? (
              <ModalOneOption
                  iconName="triangulo-amarelo" 
                  modalText="Enviamos um e-mail para você! Para concluir
                            o seu cadastro, clique no link de confirmação
                            que está em seu e-mail. Lembre-se de checar
                            sua pasta de spam."
                  buttonText="Entendido!"
                  buttonPath="/login-aluno"
              />
          ) : (
              <ModalOneOption
                  iconName="X" 
                  modalText="Ocorreu um erro inesperado.
                            Por favor, tente novamente!"
                  buttonText="Tentar novamente"
                  onClick={(closeModal)}
              />
          )
      )}
    </div>
  );
}

export default Cadastro;
