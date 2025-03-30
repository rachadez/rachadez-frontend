import Card from "./components/Cards/Card";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import getCustomIcon from "./components/Modal/getIcon/getIcon";
import './UserModalidade.css'

const UserModalidade = () => {
    const modalidades = [
        { icon: getCustomIcon("futebol"), title: "Society", path: "/user-reserva-horario/society/quadra1", disabled: false },
        { icon: getCustomIcon("tennis"), title: "Tênis", path: "/user-reserva-horario/tenis/quadra1", disabled: false },
        { icon: getCustomIcon("volei"), title: "Vôlei de areia 1", path: "/user-reserva-horario/volei/quadra1", disabled: false },
        { icon: getCustomIcon("volei"), title: "Vôlei de areia 2", path: "/user-reserva-horario/volei/quadra2", disabled: true },
        { icon: getCustomIcon("beach-tennis"), title: "Beach tennis 1", path: "/user-reserva-horario/beach-tennis/quadra1", disabled: false },
        { icon: getCustomIcon("beach-tennis"), title: "Beach tennis 2", path: "/user-reserva-horario/beach-tennis/quadra2", disabled: true },
      ];

    return (
      <div className="container-user-modalidade">
        <Header />
        <MainContent title="Modalidade" subtitle="As modalidades que possuem mais de uma quadra são identificadas por números no título, indicando qual quadra está disponível para reserva. Por exemplo: 'Vôlei de areia 1' e 'Vôlei de areia 2' se referem a duas quadras diferentes." path={"/user-home"}/>
  
        <div className="modalidade-cards-container">
            {modalidades.map((modalidade, index) => (
            <Card
                key={index}
                icon={modalidade.icon}
                title={modalidade.title}
                path={modalidade.path}
                disabled={modalidade.disabled}
            />
            ))}   
        </div>
      </div>
    );
  };

  export default UserModalidade;