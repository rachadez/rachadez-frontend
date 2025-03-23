import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { UserRoundPlus, UserRoundPen, UserRoundMinus, UserRoundSearch, UserRoundX } from "lucide-react";
import Card from "./components/Cards/Card";
import "./AdminMenu.css";

const AdminUsuarios = () => {
  return (
    <div className="container-admin-menu">
      <Header />
      <MainContent title="Usuários" subtitle="Gerencie todos os usuários cadastrados no sistema! Acesse o tipo de operação nas abas abaixo!" />

      <div className="cards-container">
        <Card icon={UserRoundPlus} title="Cadastrar usuário" path="/cadastrar-usuarios" />
        <Card icon={UserRoundPen} title="Editar usuários" path="/editar-usuarios" />
        <Card icon={UserRoundMinus} title="Excluir usuários" path="/excluir-usuarios" />
        <Card icon={UserRoundSearch} title="Visualizar usuários" path="/visualizar-usuarios" />
        <Card icon={UserRoundX} title="Usuários banidos" path="/usuarios-banidos" />
      </div>
    </div>
  );
};

export default AdminUsuarios;
