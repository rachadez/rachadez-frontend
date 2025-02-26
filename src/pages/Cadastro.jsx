import React from "react";
import "./Cadastro.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./components/Buttons/DefaultButton";

function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="cadastro-page">
      <div className="header">
        <ArrowLeft color="#ffffff" size={40} onClick={() => navigate("/")} />
        <div className="header-content">
          <h1>Faça seu cadastro!</h1>
          <p>
            Certifique-se de informar seus dados corretamente.
            <br />
            Você poderá alterar alguns dos dados quando quiser.
          </p>
        </div>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label>Nome completo</label>
          <input type="text" placeholder="Fulano de Tal" />
        </div>
        <div className="form-group">
          <label>Matrícula</label>
          <input type="text" placeholder="123456789" />
        </div>
        <div className="form-group">
          <label>Curso</label>
          <select>
            <option>Selecione</option>
          </select>
        </div>
        <div className="form-group">
          <label>E-mail acadêmico</label>
          <input type="email" placeholder="aluno@estudante.ufcg.edu.br" />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="**********" />
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input type="text" placeholder="(00) 91234-5678" />
        </div>
      </div>

      <div className="button">
        <DefaultButton label={"Realizar cadastro"}></DefaultButton>
        <a href="#" className="link">
          Não possuo matrícula &gt;
        </a>
      </div>
    </div>
  );
}

export default Cadastro;
