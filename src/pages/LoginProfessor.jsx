import './LoginProfessor.css';
import DefaultButton from './components/Buttons/DefaultButton';
import EmailInput from './components/InputEmail/InputEmail';
import PasswordInput from './components/Password/PasswordInput';
import { useNavigate } from 'react-router-dom';

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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        <img className="team-image" src="src/assets/imagem_equipe_tela_login.png" ></img>
                    </div>
                </div>

                <div className="login-professor">
                    <div className="right-section-elements">
                        <h1>Faça login no sistema</h1>
                        <form onSubmit={handleSubmit}>
                            <EmailInput></EmailInput>
                            <PasswordInput></PasswordInput>
                            <DefaultButton label={"Entrar"}></DefaultButton>
                        </form>
                        <p>Esqueci minha senha </p>
                        <p>Ainda não tenho cadastro</p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default LoginProfessor;
