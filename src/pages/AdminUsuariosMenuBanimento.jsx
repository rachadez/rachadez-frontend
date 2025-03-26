import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { ShieldX, ListX } from "lucide-react";
import Card from "./components/Cards/Card";
import "./AdminMenu.css";

const AdminUsuariosMenuBanimento = () => {
  return (
    <div className="container-admin-menu">
      <Header />
      <MainContent title="Menu de Banimento" subtitle="Gerencie bloqueios e desbloqueios de usuários através das opções abaixo." path={"/usuarios-menu"}/>

      <div className="cards-container">
        <Card icon={ShieldX} title="Banir usuários" path="/admin-banir-usuarios" />
        <Card icon={ListX} title="Visualizar banidos" path="/admin-visualizar-usuarios-banidos" />
      </div>
    </div>
  );
};

export default AdminUsuariosMenuBanimento;
