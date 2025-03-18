import './LoginProfessor.css';
import DefaultButton from './components/Buttons/DefaultButton';
import PasswordInput from './components/Password/PasswordInput';
import { useNavigate } from 'react-router-dom';
import InputTemplate from './components/InputTemplate/InputTemplate';

function LoginProfessor() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui pode ir a lógica para autenticação.
        navigate('/professor-home');
    };

    return (
        <>
            <div className="container">

                <div className="left-section">
                    <div className="left-section-elements">
                        <img src="src/assets/Logo_3.png"></img>
                        <p>O Racha10 é uma plataforma desenvolvida por estudantes de Computação com o objetivo de facilitar a organização de eventos e partidas no complexo desportivo da UFCG, proporcionando uma experiência mais prática e dinâmica para todos os participantes.</p>
                        <img className="team-image" src="src/assets/imagem_equipe_tela_login.png" ></img>
                    </div>
                </div>

                <div className="login-professor">
                    <div className="right-section-elements">
                        <h1>Faça login no sistema</h1>
                        <form onSubmit={handleSubmit}>
                            <InputTemplate type="cpf" placeholder="CPF" />
                            <PasswordInput></PasswordInput>
                            <DefaultButton label={"Entrar"}></DefaultButton>
                        </form>
                        <p>Esqueci minha senha </p>
<p onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
        Ainda não tenho cadastro
</p>   
                    </div>
                </div>
            </div>
        </>

    );
}

export default LoginProfessor;
