import { useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

const UserReservaParticipantes = () => {
    const { modalidade, quadra } = useParams();

    const correctAccents = (str) => {
        const accents = {
            'tenis': 'Tênis',
            'volei': 'Vôlei',
            'beach-tennis': 'Beach Tennis',
            'society': 'Society',
        };
        return accents[str.toLowerCase()] || str;
    };
    
    const formattedModalidade = correctAccents(modalidade);
    const formattedQuadra = quadra.replace('quadra', '').trim();

    return (
        <div>
            <Header />
            <MainContent title={`${formattedModalidade} - Quadra ${formattedQuadra}`} subtitle="Preencha a lista de participantes" path={`/user-reserva-horario/${modalidade}/${quadra}`}/>
        </div>
    );
}

export default UserReservaParticipantes;