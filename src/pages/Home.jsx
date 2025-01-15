import { useNavigate } from 'react-router-dom';
import './Home.css';


function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Bem-vindo ao RachaDez</h1>
            <p>Escolha uma opção:</p>
            <button onClick={() => navigate('/login-professor')}>Sou Professor</button>
            <button onClick={() => navigate('/login-aluno')}>Sou Aluno</button>
        </div>
    );
}

export default Home;
