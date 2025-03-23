import "./AdminMenu.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { Calendar, Users } from "lucide-react";
import Card from "./components/Cards/Card";

const AdminMenu = () => {

  return (
    <div className="container-admin-menu">
      <Header />
      <MainContent title="Menu Principal - Administração" />

      <div className="container-options">
      <Card 
          icon={Calendar} 
          title="Reservas" 
          path="/visualizar-reservas" 
        />
        <Card 
          icon={Users} 
          title="Usuários" 
          path="/usuarios-menu" 
        />
      </div>
    </div>
  );
};

export default AdminMenu;
