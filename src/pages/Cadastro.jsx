import React, { useEffect } from "react";
import { useState } from "react";
import "./Cadastro.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
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

  const navigate = useNavigate();

  return (
    <div className="cadastro-page">
      <div className="header">
        <ArrowLeft className="arrow-left" color="#ffffff" size={40} onClick={() => navigate("/")} />
        <div className="header-content">
          <h1>Faça seu cadastro!</h1>
          <p>
            Certifique-se de informar seus dados corretamente.
            <br />
            Você poderá alterar alguns dos dados quando quiser.
          </p>
        </div>
      </div>
  
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate type="text" label="Nome completo" placeholder="Fulano de tal" />
          </div>
          <div className="form-group">
            <InputTemplate type="text" label="Matrícula" placeholder="123456789" />
          </div>
          <div className="form-group">
            <label>Curso</label>
            <select>
              <option>Selecione</option>
            </select>
          </div>
          <div className="form-group">
            <InputTemplate type="email" label="E-mail acadêmico" placeholder="email@ufcg.edu.br" />
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
          <a href="#" className="link">
            Não possuo matrícula &gt;
          </a>
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
                  onClose={closeModal}
              />
          )
      )}
    </div>
  );
}

export default Cadastro;
