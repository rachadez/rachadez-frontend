import React from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import PasswordInput from "./components/Password/PasswordInput";

function Cadastro() {

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent path={"/"} title={"Faça seu cadastro!"} subtitle={"Certifique-se de informar seus dados corretamente. Somente membros da comunidade da UFCG (alunos, professores e servidores) podem se cadastrar."}/>
  
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
          <DefaultButton label={"Realizar cadastro"} />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
