import React from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import InputReadOnly from "./components/InputReadOnly/InputReadOnly";

function AdminCadastroUsuarioExterno() {

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent path={"/usuarios-menu"} title={"Cadastrando novo Usuário Externo"} subtitle={"Adicione usuários externos ao sistema. Membros externos são todos aqueles que não pertencem a UFCG."}/>
  
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate type="text" label="Nome completo" placeholder="Nome" />
          </div>
          <div className="form-group">
            <InputTemplate type="text" label="CPF" placeholder="123.456.789-00" />
          </div>
          <div className="form-group">
            <InputReadOnly type="text" label="Tipo de Usuário" />
          </div>
          <div className="form-group">
            <InputTemplate type="email" label="E-mail" placeholder="email@gmail.com" />
          </div>
          <div className="form-group">
            <InputTemplate type="password" label="Senha" placeholder="**********" />
          </div>
          <div className="form-group">
            <InputTemplate type="text" label="Telefone" placeholder="(00) 91234-5678"/>
          </div>
        </div>
  
        <div className="button">
          <DefaultButton label={"Cadastrar"} />
        </div>
      </div>
    </div>
  );
}

export default AdminCadastroUsuarioExterno;
