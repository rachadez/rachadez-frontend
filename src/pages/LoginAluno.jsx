import './LoginAluno.css';
import DefaultButton from './components/Buttons/DefaultButton';
import InputTemplate from './components/InputTemplate/InputTemplate';
import PasswordInput from './components/Password/PasswordInput';
import { useNavigate } from 'react-router-dom';

function LoginAluno() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui pode ir a lógica para autenticação.
        navigate('/aluno-home');
    };

    return (

        <>
            <div className="container">

                <div className="left-section">
                    <div className="left-section-elements">
                        <img src="src/assets/Logo_3.png" alt="Logo" />
                        <p>O Racha10 é uma plataforma desenvolvida por estudantes de Computação com o objetivo de facilitar a organização de eventos e partidas no complexo desportivo da UFCG, proporcionando uma experiência mais prática e dinâmica para todos os participantes.</p>
                        <img className="team-image" src="src/assets/imagem_equipe_tela_login.png" alt="Equipe" />
                    </div>
                </div>

                <div className="login-aluno">
                    <div className="right-section-elements">
                        <h1>Faça login no sistema</h1>
                        <form onSubmit={handleSubmit}>
                            <InputTemplate type="email" placeholder="email@ufcg.edu.br" />
                            <PasswordInput />
                            <DefaultButton label="Entrar" />
                        </form>
                        <p>Esqueci minha senha</p>
                        <p onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
                            Ainda não tenho cadastro
                        </p>                    
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default LoginAluno;
