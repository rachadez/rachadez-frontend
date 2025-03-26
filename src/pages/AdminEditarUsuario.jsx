import React from "react";
import "./Cadastro.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { useParams } from "react-router-dom";
import InputTemplateEdit from "./components/InputTemplate/InputTemplateEdit";
import DefaultButton from "./components/Buttons/DefaultButton";

function AdminEditarUsuario() {
    let { usuarioId } = useParams();

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent path={"/editar-usuarios"} title={"Editando usuário"} subtitle={"Você pode editar quaisquer campos que desejar. Tome as devidas precauções ao efetuar esta operação."}/>
  
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplateEdit label="Nome completo" value={"Ciclano Fulano da Silva"} />
          </div>
          <div className="form-group">
            <InputTemplateEdit label="CPF" value={"123.456.789-00"}/>
          </div>
          <div className="form-group">
            <InputTemplateEdit label="Ocupação" value={"Ocupação"}/>
          </div>
          <div className="form-group">
            <InputTemplateEdit label="E-mail" value={"email@gmail.com"}/>
          </div>
          <div className="form-group">
            <InputTemplateEdit type="password" label="Senha" value={"senha???"}/>
          </div>
          <div className="form-group">
            <InputTemplateEdit label="Telefone" value={"(00) 91234-5678"}/>
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Finalizar edição"} />
        </div>
      </div>
    </div>
  );
}

export default AdminEditarUsuario;