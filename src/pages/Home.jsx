import { useNavigate } from 'react-router-dom';
import './Home.css';
import DefaultButton from './components/Buttons/DefaultButton';
import AddButton from './components/Buttons/AddButton';
import DeleteButton from './components/Buttons/DeleteButton';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Bem-vindo ao RachaDez</h1>
            <p>Escolha uma opção:</p>
            <DefaultButton label={"Sou professor"} onClick={() => navigate('/login-professor')}></DefaultButton>
            <DefaultButton label={"Sou aluno"} onClick={() => navigate('/login-aluno')}></DefaultButton>
            <AddButton label={"Reservar nova partida"} icon="pi pi-plus"></AddButton>
            <DeleteButton label={"Excluir Administrador"} text></DeleteButton>
        </div>
    );
}

export default Home;
