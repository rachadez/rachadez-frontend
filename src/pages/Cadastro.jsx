import React from "react";
import "./Cadastro.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";

function Cadastro() {
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
          <DefaultButton label={"Realizar cadastro"} />
          <a href="#" className="link">
            Não possuo matrícula &gt;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
