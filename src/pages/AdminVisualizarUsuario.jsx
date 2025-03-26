import React from "react";
import "./Cadastro.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { useParams } from "react-router-dom";
import InputTemplateDisabled from "./components/InputTemplate/InputTemplateDisabled";

function AdminVisualizarUsuario() {
    let { usuarioId } = useParams();

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent path={"/visualizar-usuarios"} title={"Visualizando usuário"} subtitle={"Nesta seção, você pode apenas verificar os dados de um membro do sistema."}/>
  
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplateDisabled label="Nome completo" value={"Ciclano Fulano da Silva"} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="CPF" value={"123.456.789-00"}/>
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Ocupação" value={"Ocupação"}/>
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="E-mail" value={"email@gmail.com"}/>
          </div>
          <div className="form-group">
            <InputTemplateDisabled type="password" label="Senha" value={"senha???"}/>
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Telefone" value={"(00) 91234-5678"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminVisualizarUsuario;