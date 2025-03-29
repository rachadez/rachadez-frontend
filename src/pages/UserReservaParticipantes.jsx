import { useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

const UserReservaParticipantes = () => {
    const { modalidade, quadra } = useParams();

    return (
        <div>
            <Header />
            <MainContent title="Reservas de Participantes" subtitle="Aqui você pode visualizar e gerenciar suas reservas de participantes." path={`/user-reserva-horario/${modalidade}/${quadra}`}/>
        </div>
    );
}

export default UserReservaParticipantes;