import React from "react";
import "./Cadastro.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { UserRoundSearch } from "lucide-react";
import { useParams } from "react-router-dom";
import InputTemplateEdit from "./components/InputTemplate/InputTemplateEdit";
import DefaultButton from "./components/Buttons/DefaultButton";

function AdminEditarUsuario() {
  let { id } = useParams();

  const usuarios = [
    {
      id: 1,
      nome: 'Maria do Rosário',
      cpf: '987.654.321-00',
      ocupacao: 'Usuário Externo',
      telefone: '(83) 9 97777 1202',
      email: "maria@gmail.com",
      senha: "senha456"
    }
  ]

  const usuario = usuarios.find(user => user.id == id);
  
  if (!usuario) {
    return (
        <div className="cadastro-page">
            <Header />
            <MainContent path={"/admin-editar-usuarios"} title={"Usuário não encontrado"} subtitle={"Não foi possível encontrar esse usuário."}/>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "70px"}}>
              <UserRoundSearch color="#0B53B8" size={300} strokeWidth={1}/>
            </div>
        </div>
    );
  }

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent path={"/admin-editar-usuarios"} title={"Editando usuário"} subtitle={"Você pode editar quaisquer campos que desejar. Tome as devidas precauções ao efetuar esta operação."}/>
  
      <div className="form-wrapper">
      <div className="form-container">
        <div className="form-group">
            <InputTemplateEdit label="Nome completo" value={usuario.nome} />
        </div>
        <div className="form-group">
            <InputTemplateEdit label="CPF" value={usuario.cpf}/>
        </div>
        <div className="form-group">
            <InputTemplateEdit label="Ocupação" value={usuario.ocupacao}/>
        </div>
        <div className="form-group">
            <InputTemplateEdit label="E-mail" value={usuario.email}/>
        </div>
        <div className="form-group">
            <InputTemplateEdit type="password" label="Senha" value={usuario.senha}/>
        </div>
        <div className="form-group">
            <InputTemplateEdit label="Telefone" value={usuario.telefone}/>
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